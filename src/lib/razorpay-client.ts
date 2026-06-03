// Razorpay payment handling on the client side

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Load Razorpay script
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
}

export async function createPaymentSession(
  userId: string,
  email: string,
  phone: string,
  amount: number,
  orderItems: Array<{ product_id: string; quantity: number; price: number }>
) {
  try {
    // Ensure Razorpay script is loaded
    await loadRazorpayScript();

    // Create payment order on server
    const response = await fetch("/api/payment/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        email,
        phone,
        amount,
        orderItems,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to create payment order: ${errorBody}`);
    }

    const { razorpayOrderId, orderId, keyId } = await response.json();

    if (!window.Razorpay) {
      throw new Error("Razorpay SDK not loaded");
    }

    // Open Razorpay payment modal
    const options = {
      key: keyId,
      order_id: razorpayOrderId,
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      name: "Aetherium",
      description: "Purchase artifacts",
      customer_notif: 1,
      prefill: {
        name: "Customer",
        email: email,
        contact: phone,
      },
      handler: async (response: any) => {
        // Verify payment on server
        const verifyResponse = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpayOrderId: razorpayOrderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });

        if (!verifyResponse.ok) {
          const errorBody = await verifyResponse.text();
          throw new Error(`Payment verification failed: ${errorBody}`);
        }

        const result = await verifyResponse.json();
        if (result.success) {
          // Redirect to success page
          window.location.href = `/checkout?success=true&orderId=${orderId}`;
        }
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal closed");
        },
      },
      theme: {
        color: "#ffffff",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);
    throw error;
  }
}
