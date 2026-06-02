import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = { product: Product; qty: number; size: string };

type CartState = {
  items: CartItem[];
  open: boolean;
  add: (product: Product, size?: string) => void;
  remove: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  toggle: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      add: (product, size = "M") => {
        const items = [...get().items];
        const existing = items.find((i) => i.product.id === product.id && i.size === size);
        if (existing) existing.qty += 1;
        else items.push({ product, qty: 1, size });
        set({ items, open: true });
      },
      remove: (id, size) =>
        set({ items: get().items.filter((i) => !(i.product.id === id && i.size === size)) }),
      setQty: (id, size, qty) =>
        set({
          items: get()
            .items.map((i) =>
              i.product.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i,
            ),
        }),
      clear: () => set({ items: [] }),
      setOpen: (v) => set({ open: v }),
      toggle: () => set({ open: !get().open }),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.qty * i.product.price, 0),
    }),
    { name: "aethera-cart", partialize: (s) => ({ items: s.items }) },
  ),
);
