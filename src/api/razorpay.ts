import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayKeyId =
  process.env.RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID || "";
const razorpayKeySecret =
  process.env.RAZORPAY_KEY_SECRET ||
  import.meta.env.VITE_RAZORPAY_KEY_SECRET ||
  "";

let razorpayClient: Razorpay | undefined;

function getRazorpay() {
  if (!razorpayClient) {
    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error(
        "Razorpay credentials are missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
      );
    }
    razorpayClient = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
  }
  return razorpayClient;
}

export interface RazorpayOrderOptions {
  amount: number; // Amount in INR (smallest unit: paise)
  currency?: string;
  receipt?: string;
  notes?: Record<string, any>;
}

export async function createRazorpayOrder(options: RazorpayOrderOptions) {
  const razorpay = getRazorpay();

  return await razorpay.orders.create({
    amount: options.amount,
    currency: options.currency || "INR",
    receipt: options.receipt,
    notes: options.notes,
  });
}

export async function fetchRazorpayOrder(orderId: string) {
  const razorpay = getRazorpay();
  return await razorpay.orders.fetch(orderId);
}

export async function fetchRazorpayPayment(paymentId: string) {
  const razorpay = getRazorpay();
  return await razorpay.payments.fetch(paymentId);
}

export function verifyRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!razorpayKeySecret) {
    throw new Error("Razorpay key secret is missing");
  }

  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}
