import { getSupabase } from "./db";
import {
  createRazorpayOrder,
  verifyRazorpayPaymentSignature,
  fetchRazorpayPayment,
} from "./razorpay";

export async function handleCreatePaymentIntent(request: Request) {
  try {
    const body = await request.json();
    const { amount, userId, orderItems, email, phone } = body;

    if (!amount || !userId || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing amount, userId, email, or phone" }),
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Missing Razorpay env vars:", {
        hasKeyId: !!process.env.RAZORPAY_KEY_ID,
        hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
      });
      return new Response(
        JSON.stringify({ error: "Razorpay credentials not configured" }),
        { status: 500 }
      );
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        userId,
        email,
        phone,
      },
    });

    const supabase = getSupabase();

    // Create order in database
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total: amount,
        status: "pending",
        stripe_payment_intent_id: razorpayOrder.id, // Store Razorpay order ID
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

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
        razorpayOrderId: razorpayOrder.id,
        orderId: order.id,
        keyId: process.env.RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment Intent Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500 }
    );
  }
}

export async function handlePaymentVerification(request: Request) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return new Response(
        JSON.stringify({ error: "Missing payment verification details" }),
        { status: 400 }
      );
    }

    // Verify signature
    const isSignatureValid = verifyRazorpayPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isSignatureValid) {
      return new Response(
        JSON.stringify({ error: "Invalid payment signature" }),
        { status: 400 }
      );
    }

    // Fetch payment details
    const payment = await fetchRazorpayPayment(razorpayPaymentId);

    const supabase = getSupabase();

    // Update order status
    const { error } = await supabase
      .from("orders")
      .update({
        status: payment.status === "captured" ? "completed" : "failed",
      })
      .eq("stripe_payment_intent_id", razorpayOrderId);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, status: payment.status }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500 }
    );
  }
}
