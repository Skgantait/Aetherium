// Stripe payment handling on the client side
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

export async function createPaymentSession(
  userId: string,
  email: string,
  amount: number,
  orderItems: Array<{ product_id: string; quantity: number; price: number }>
) {
  try {
    const response = await fetch("/api/payment/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        email,
        amount,
        orderItems,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to create payment session: ${errorBody}`);
    }

    const { sessionId } = await response.json();

    const stripe = await stripePromise;
    if (!stripe) throw new Error("Stripe failed to load");

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) throw error;
  } catch (error) {
    console.error("Payment error:", error);
    throw error;
  }
}
