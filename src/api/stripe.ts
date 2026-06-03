import Stripe from "stripe";

const stripeSecretKey =
  process.env.STRIPE_SECRET_KEY || import.meta.env.VITE_STRIPE_SECRET_KEY || "";
const stripeWebhookSecret =
  process.env.STRIPE_WEBHOOK_SECRET || import.meta.env.VITE_STRIPE_WEBHOOK_SECRET || "";

let stripeClient: Stripe | undefined;

function getStripe() {
  if (!stripeClient) {
    if (!stripeSecretKey) {
      throw new Error(
        "Stripe secret key is missing. Set STRIPE_SECRET_KEY or VITE_STRIPE_SECRET_KEY."
      );
    }
    stripeClient = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20",
    });
  }
  return stripeClient;
}

export async function createCheckoutSession(
  amount: number,
  origin: string,
  metadata: Record<string, string> = {}
) {
  const stripe = getStripe();

  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Aetherium order",
            metadata,
          },
          unit_amount: Math.round(amount),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: metadata.email,
    payment_intent_data: {
      metadata,
    },
    success_url: `${origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?canceled=true`,
  });
}

export async function getPaymentIntent(intentId: string) {
  const stripe = getStripe();
  return await stripe.paymentIntents.retrieve(intentId);
}

export function constructWebhookEvent(body: string, signature: string) {
  const stripe = getStripe();
  if (!stripeWebhookSecret) {
    throw new Error(
      "Stripe webhook secret is missing. Set STRIPE_WEBHOOK_SECRET or VITE_STRIPE_WEBHOOK_SECRET."
    );
  }
  try {
    return stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${String(error)}`);
  }
}
