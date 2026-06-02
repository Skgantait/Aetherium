import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Aethera" },
      { name: "description", content: "Secure checkout for your Aethera artifacts." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const shipping = items.length ? 1499 : 0;
  const total = subtotal() + shipping;

  const place = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setPlacing(true);
    setTimeout(() => {
      const id = "AE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      clear();
      setDone(id);
      setPlacing(false);
    }, 1400);
  };

  if (done) {
    return (
      <main className="pt-32 min-h-screen">
        <section className="max-w-2xl mx-auto px-6 text-center py-24">
          <p className="mono-label text-accent mb-6">/ Order received</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.95] mb-8">
            Thank you.<br/>The chapter begins.
          </h1>
          <p className="text-muted-foreground mb-10">
            Your order <span className="font-mono text-foreground">{done}</span> has been reserved.
            A cinematic confirmation has been dispatched to your inbox. Express delivery in 5–7 working days across tokyo.
          </p>
          <Link to="/shop" className="btn-luxury btn-luxury-filled inline-block">Continue exploring</Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pt-28 min-h-screen">
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 pb-24">
        <div>
          <p className="mono-label mb-4">/ Checkout</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.95] mb-12">
            Secure the artifacts.
          </h1>
          <form onSubmit={place} className="space-y-10">
            <Section title="Contact">
              <Input name="email" type="email" placeholder="Email address" required />
              <Input name="phone" type="tel" placeholder="+91 phone number" required />
            </Section>
            <Section title="Delivery">
              <div className="grid grid-cols-2 gap-3">
                <Input name="first" placeholder="First name" required />
                <Input name="last" placeholder="Last name" required />
              </div>
              <Input name="address" placeholder="Street address" required />
              <div className="grid grid-cols-3 gap-3">
                <Input name="city" placeholder="City" required />
                <Input name="state" placeholder="State" required />
                <Input name="pin" placeholder="PIN code" required pattern="[0-9]{6}" />
              </div>
            </Section>
            <Section title="Payment">
              <div className="grid grid-cols-1 gap-2">
                {[
                  ["card", "Card · Visa / Mastercard / Amex"],
                  ["upi", "UPI · GPay / PhonePe / Paytm"],
                  ["netbanking", "Netbanking · All major tokyon banks"],
                  ["cod", "Cash on delivery (₹199 extra)"],
                ].map(([v, l]) => (
                  <label key={v} className="flex items-center gap-3 border border-white/15 px-4 py-3 cursor-pointer hover:border-accent transition-colors">
                    <input type="radio" name="method" defaultChecked={v === "upi"} value={v} className="accent-accent" />
                    <span className="text-xs uppercase tracking-[0.2em]">{l}</span>
                  </label>
                ))}
              </div>
              <p className="mono-label normal-case tracking-widest">
                Live payments arrive once payment processing is enabled. This is a demo order flow.
              </p>
            </Section>
            <button
              type="submit"
              disabled={!items.length || placing}
              className="btn-luxury btn-luxury-filled w-full disabled:opacity-40"
            >
              {placing ? "Reserving…" : `Place order · ${formatINR(total)}`}
            </button>
          </form>
        </div>

        <aside className="lg:sticky lg:top-28 self-start space-y-6">
          <p className="mono-label">/ Your bag · {items.length.toString().padStart(2, "0")}</p>
          {!items.length && (
            <div className="border border-white/10 p-8 text-center">
              <p className="font-display text-2xl mb-3">Your bag is empty.</p>
              <Link to="/shop" className="mono-label text-accent">Browse the Archive →</Link>
            </div>
          )}
          {items.map((i) => (
            <div key={i.product.id + i.size} className="flex gap-4 border-b border-white/10 pb-5">
              <img src={i.product.image} alt={i.product.name} className="w-20 aspect-[3/4] object-cover ring-1 ring-white/10" />
              <div className="flex-1 flex flex-col justify-between text-xs">
                <div>
                  <p className="uppercase tracking-[0.18em] font-semibold">{i.product.name}</p>
                  <p className="mono-label mt-1 normal-case tracking-widest">Size {i.size} · qty {i.qty}</p>
                </div>
                <span className="font-mono">{formatINR(i.product.price * i.qty)}</span>
              </div>
            </div>
          ))}
          {items.length > 0 && (
            <div className="space-y-3 text-sm font-mono pt-2">
              <Row k="Subtotal" v={formatINR(subtotal())} />
              <Row k="Shipping (express, tokyo)" v={formatINR(shipping)} />
              <div className="hairline my-3" />
              <Row k="Total (incl. GST)" v={formatINR(total)} big />
            </div>
          )}
        </aside>
      </section>
      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mono-label mb-4">/ {title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
    />
  );
}

function Row({ k, v, big }: { k: string; v: string; big?: boolean }) {
  return (
    <div className={`flex justify-between ${big ? "text-base" : ""}`}>
      <span className="mono-label">{k}</span>
      <span>{v}</span>
    </div>
  );
}
