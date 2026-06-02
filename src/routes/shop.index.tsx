import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "The Archive — Aethera" },
      { name: "description", content: "Browse Aethera's complete archive of engineered garments." },
    ],
  }),
  component: ShopPage,
});

const categories = ["All", "Outerwear", "Legwear", "Midlayer", "Footwear", "Eveningwear", "Accessories"];
const sorts = ["Featured", "Price ↓", "Price ↑", "Newest"];

function ShopPage() {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Featured");

  let list = cat === "All" ? products : products.filter((p) => p.category === cat);
  if (sort === "Price ↓") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "Price ↑") list = [...list].sort((a, b) => a.price - b.price);

  return (
    <main className="pt-32 min-h-screen">
      <header className="px-6 md:px-10 max-w-[1600px] mx-auto mb-16">
        <p className="mono-label mb-4">/ The Archive · {list.length.toString().padStart(2, "0")} artifacts</p>
        <h1 className="font-display text-6xl md:text-9xl tracking-tighter leading-[0.9]">
          The Archive
        </h1>
      </header>

      <div className="sticky top-[72px] z-40 glass border-y border-white/10">
        <div className="px-6 md:px-10 max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-mono transition-all whitespace-nowrap ${
                  cat === c ? "bg-silk text-obsidian" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="mono-label">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-white/15 rounded-full text-[10px] uppercase tracking-[0.25em] font-mono px-3 py-1.5 hover:border-accent transition-colors"
            >
              {sorts.map((s) => <option key={s} className="bg-background">{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-10 max-w-[1600px] mx-auto py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-x-10 gap-y-16 md:gap-y-24">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} offset={i % 3 === 1 ? 48 : 0} />
          ))}
        </div>
        {list.length === 0 && (
          <div className="text-center py-32">
            <p className="font-display text-3xl">No artifacts in this frequency.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
