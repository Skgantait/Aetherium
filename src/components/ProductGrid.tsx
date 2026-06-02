import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products } from "@/lib/products";

export function ProductGrid() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 max-w-[1600px] mx-auto">
      <header className="flex justify-between items-end mb-16 gap-6">
        <div>
          <p className="mono-label mb-3">/ Chapter 03 — The Archive</p>
          <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.95] max-w-[16ch]">
            Six artifacts. <br/>Three hundred made.
          </h2>
        </div>
        <Link to="/shop" className="btn-luxury hidden md:inline-block">View Full Archive</Link>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-x-10 gap-y-16 md:gap-y-24">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} offset={i % 3 === 1 ? 48 : 0} />
        ))}
      </div>
    </section>
  );
}
