// Stripe payment handling on the client side
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

export async function createPaymentSession(
  userId: string,
  amount: number,
  orderItems: Array<{ product_id: string; quantity: number; price: number }>
) {
  try {
    // Create payment intent on server
    const response = await fetch("/api/payment/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        amount,
        orderItems,
      }),
    });

    if (!response.ok) throw new Error("Failed to create payment intent");

    const { clientSecret, orderId } = await response.json();

    const stripe = await stripePromise;
    if (!stripe) throw new Error("Stripe failed to load");

    // Redirect to checkout
    const { error } = await stripe.redirectToCheckout({
      clientSecret,
      mode: "payment",
      successUrl: `${window.location.origin}/checkout?success=true&orderId=${orderId}`,
      cancelUrl: `${window.location.origin}/checkout?success=false`,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Payment error:", error);
    throw error;
  }
}

// Confirm payment with client secret
export async function confirmPayment(clientSecret: string) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error("Stripe failed to load");

    const { paymentIntent, error } = await stripe.retrievePaymentIntent(
      clientSecret
    );

    if (error) throw error;

    return paymentIntent;
  } catch (error) {
    console.error("Confirm payment error:", error);
    throw error;
  }
}
