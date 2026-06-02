import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, subtotal } = useCart();

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-[100svh] w-full sm:w-[460px] glass border-l border-white/10 flex flex-col transition-transform duration-700 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <p className="mono-label mb-1">/ Your Bag</p>
            <h3 className="font-display text-2xl">{items.length} {items.length === 1 ? "artifact" : "artifacts"}</h3>
          </div>
          <button onClick={() => setOpen(false)} className="mono-label hover:text-accent">Close ✕</button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 && (
            <div className="h-full grid place-items-center text-center pt-20">
              <div>
                <p className="font-display text-3xl mb-4">Your bag is empty.</p>
                <p className="text-sm text-muted-foreground mb-8">
                  Begin the chapter. Reserve an artifact.
                </p>
                <Link to="/shop" onClick={() => setOpen(false)} className="btn-luxury btn-luxury-filled inline-block">
                  Explore the Archive
                </Link>
              </div>
            </div>
          )}
          {items.map((i) => (
            <div key={i.product.id + i.size} className="flex gap-4 border-b border-white/10 pb-6">
              <img src={i.product.image} alt={i.product.name} className="w-24 aspect-[3/4] object-cover rounded ring-1 ring-white/10" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs uppercase tracking-[0.18em] font-semibold">{i.product.name}</h4>
                    <span className="font-mono text-xs">{formatINR(i.product.price * i.qty)}</span>
                  </div>
                  <p className="mono-label mt-1.5 normal-case tracking-widest">Size {i.size} · {i.product.material}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-white/15 rounded-full text-xs font-mono">
                    <button onClick={() => setQty(i.product.id, i.size, i.qty - 1)} className="px-3 py-1 hover:text-accent">−</button>
                    <span className="px-2">{i.qty}</span>
                    <button onClick={() => setQty(i.product.id, i.size, i.qty + 1)} className="px-3 py-1 hover:text-accent">+</button>
                  </div>
                  <button onClick={() => remove(i.product.id, i.size)} className="mono-label hover:text-accent">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <footer className="p-6 border-t border-white/10 space-y-4 bg-background/40">
            <div className="flex justify-between font-mono text-sm">
              <span className="mono-label">Subtotal</span>
              <span>{formatINR(subtotal())}</span>
            </div>
            <p className="mono-label normal-case tracking-widest">
              Shipping and taxes calculated at checkout.
            </p>
            <Link to="/checkout" onClick={() => setOpen(false)} className="btn-luxury btn-luxury-filled w-full block text-center">Proceed to Checkout</Link>
          </footer>
        )}
      </aside>
    </>
  );
}
