import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-11-20",
});

export async function createPaymentIntent(
  amount: number,
  metadata: Record<string, string> = {}
) {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: "usd",
    metadata,
  });
}

export async function getPaymentIntent(intentId: string) {
  return await stripe.paymentIntents.retrieve(intentId);
}

export function constructWebhookEvent(body: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${String(error)}`);
  }
}
