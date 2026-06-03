import { getSupabase } from "./db";
import { createCheckoutSession, constructWebhookEvent } from "./stripe";

export async function handleCreatePaymentIntent(request: Request) {
  try {
    const body = await request.json();
    const { amount, userId, orderItems, email } = body;
    const url = new URL(request.url);
    const origin = `${url.protocol}//${url.host}`;

    if (!amount || !userId || !email) {
      return new Response(
        JSON.stringify({ error: "Missing amount, userId, or email" }),
        { status: 400 }
      );
    }

    // Create checkout session in Stripe
    const session = await createCheckoutSession(amount, origin, {
      userId,
      email,
      orderItems: JSON.stringify(orderItems || []),
    });

    const supabase = getSupabase();

    // Create order in database
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total: amount,
        status: "pending",
        stripe_payment_intent_id: session.payment_intent || session.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Add order items
    if (orderItems && Array.isArray(orderItems)) {
      const items = orderItems.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

      if (itemsError) throw itemsError;
    }

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        orderId: order.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment Intent Error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500 }
    );
  }
}

export async function handleWebhook(request: Request) {
  try {
    const signature = request.headers.get("stripe-signature") || "";
    const body = await request.text();

    const event = constructWebhookEvent(body, signature);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as any;

      // Update order status
      const supabase = getSupabase();
      await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("stripe_payment_intent_id", paymentIntent.id);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as any;

      // Update order status
      const supabase = getSupabase();
      await supabase
        .from("orders")
        .update({ status: "failed" })
        .eq("stripe_payment_intent_id", paymentIntent.id);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 400 }
    );
  }
}
