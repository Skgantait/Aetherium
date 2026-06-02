import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Client-side Supabase (read-only by default)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Get products
export async function fetchProducts() {
  const response = await fetch("/api/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

// Get single product
export async function fetchProduct(id: string) {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

// Get user orders
export async function fetchUserOrders(userId: string) {
  const response = await fetch(`/api/orders?userId=${userId}`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
}

// Get single order
export async function fetchOrder(orderId: string) {
  const response = await fetch(`/api/orders/${orderId}`);
  if (!response.ok) throw new Error("Failed to fetch order");
  return response.json();
}
