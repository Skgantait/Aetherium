import { supabase } from "./db";
import { createPaymentIntent, constructWebhookEvent, stripe } from "./stripe";

export async function handleCreatePaymentIntent(request: Request) {
  try {
    const body = await request.json();
    const { amount, userId, orderItems } = body;

    if (!amount || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing amount or userId" }),
        { status: 400 }
      );
    }

    // Create payment intent in Stripe
    const paymentIntent = await createPaymentIntent(amount, {
      userId,
    });

    // Create order in database
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total: amount,
        status: "pending",
        stripe_payment_intent_id: paymentIntent.id,
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
        clientSecret: paymentIntent.client_secret,
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
      await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("stripe_payment_intent_id", paymentIntent.id);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as any;

      // Update order status
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
