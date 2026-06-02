import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { useProfile } from "@/lib/profile";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Aethera" },
      { name: "description", content: "Your Aethera profile, orders, and preferences." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { profile, signIn, signOut, update } = useProfile();
  const { items, subtotal } = useCart();
  const [draft, setDraft] = useState(profile);

  if (!profile.signedIn) {
    return (
      <main className="pt-32 min-h-screen">
        <section className="max-w-md mx-auto px-6 py-16">
          <p className="mono-label mb-4">/ Member access</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-tighter leading-[0.95] mb-10">
            Enter the atelier.
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn(draft);
            }}
            className="space-y-3"
          >
            <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} required />
            <Field label="Email" type="email" value={draft.email} onChange={(v) => setDraft({ ...draft, email: v })} required />
            <Field label="Phone (optional)" type="tel" value={draft.phone} onChange={(v) => setDraft({ ...draft, phone: v })} />
            <button type="submit" className="btn-luxury btn-luxury-filled w-full mt-6">
              Continue
            </button>
            <p className="mono-label normal-case tracking-widest text-center pt-4">
              No password. Your profile lives privately on this device.
            </p>
          </form>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pt-32 min-h-screen">
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="mono-label mb-3">/ Member · {profile.email}</p>
            <h1 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.95]">
              Hello, {profile.name.split(" ")[0] || "friend"}.
            </h1>
          </div>
          <button onClick={signOut} className="mono-label hover:text-accent">
            Sign out →
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="border border-white/10 p-8">
            <h2 className="mono-label mb-6">/ Profile</h2>
            <div className="space-y-3">
              <Field label="Name" value={profile.name} onChange={(v) => update({ name: v })} />
              <Field label="Email" type="email" value={profile.email} onChange={(v) => update({ email: v })} />
              <Field label="Phone" type="tel" value={profile.phone} onChange={(v) => update({ phone: v })} />
              <Field label="City" value={profile.city} onChange={(v) => update({ city: v })} />
              <div>
                <label className="mono-label block mb-2">Preferred size</label>
                <div className="grid grid-cols-5 gap-2">
                  {["XS", "S", "M", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      onClick={() => update({ size: s })}
                      className={`py-2.5 border text-xs uppercase tracking-[0.2em] transition-all ${
                        profile.size === s
                          ? "bg-silk text-obsidian border-silk"
                          : "border-white/15 hover:border-accent"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border border-white/10 p-8">
            <h2 className="mono-label mb-6">/ Current bag</h2>
            {items.length === 0 ? (
              <div className="text-center py-10">
                <p className="font-display text-2xl mb-4">No artifacts yet.</p>
                <Link to="/shop" className="btn-luxury btn-luxury-filled inline-block">
                  Browse the Archive
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {items.map((i) => (
                    <div key={i.product.id + i.size} className="flex gap-4 items-center">
                      <img src={i.product.image} alt={i.product.name} className="w-14 aspect-[3/4] object-cover ring-1 ring-white/10" />
                      <div className="flex-1 text-xs">
                        <p className="uppercase tracking-[0.18em] font-semibold">{i.product.name}</p>
                        <p className="mono-label mt-1 normal-case tracking-widest">
                          Size {i.size} · qty {i.qty}
                        </p>
                      </div>
                      <span className="font-mono text-xs">{formatINR(i.product.price * i.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="hairline mb-4" />
                <div className="flex justify-between font-mono text-sm mb-6">
                  <span className="mono-label">Subtotal</span>
                  <span>{formatINR(subtotal())}</span>
                </div>
                <Link to="/checkout" className="btn-luxury btn-luxury-filled w-full block text-center">
                  Proceed to Checkout
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mono-label block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
      />
    </div>
  );
}
