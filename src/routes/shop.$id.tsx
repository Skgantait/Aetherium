import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Product360View } from "@/components/Product360View";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products, formatINR } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Aethera` },
          { name: "description", content: loaderData.product.story },
          { property: "og:title", content: `${loaderData.product.name} — Aethera` },
          { property: "og:description", content: loaderData.product.story },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center text-center px-6">
      <div>
        <p className="mono-label text-accent mb-4">/ Not found</p>
        <h1 className="font-display text-6xl mb-6">This artifact is sealed.</h1>
        <Link to="/shop" className="btn-luxury btn-luxury-filled inline-block">Back to Archive</Link>
      </div>
    </main>
  ),
  component: ProductPage,
});

const sizes = ["XS", "S", "M", "L", "XL"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("M");
  const add = useCart((s) => s.add);
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="pt-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-[1600px] mx-auto">
        <div className="relative bg-card lg:sticky lg:top-24 lg:h-[calc(100svh-6rem)] overflow-hidden">
          {product.images360 && product.images360.length > 1 ? (
            <Product360View images={product.images360} alt={product.name} />
          ) : (
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={1066}
              className="w-full h-full object-contain animate-[blur-in_1.2s_var(--ease-out-expo)_both]"
            />
          )}
          <div className="absolute top-6 left-6 mono-label glass px-3 py-1.5 rounded-full">
            {product.code} · {product.drop}
          </div>
          <div className="absolute bottom-6 right-6 glass p-4 rounded">
            <p className="mono-label mb-1">Stock</p>
            <p className="font-mono text-sm text-accent">{product.stock} of {product.stock + 8} remaining</p>
          </div>
        </div>

        <div className="p-6 md:p-12 lg:p-20 flex flex-col gap-10">
          <div>
            <Link to="/shop" className="mono-label hover:text-accent">← Back to Archive</Link>
            <h1 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.95] mt-6">
              {product.name}
            </h1>
            <p className="mono-label mt-4 normal-case tracking-widest">{product.material}</p>
            <p className="mt-8 text-base text-muted-foreground leading-relaxed max-w-md">
              {product.story}
            </p>
          </div>

          <div className="hairline" />

          <div>
            <div className="flex justify-between items-baseline mb-4">
              <p className="mono-label">Size</p>
              <button className="mono-label hover:text-accent">Size guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-3 border text-xs uppercase tracking-[0.2em] transition-all ${
                    size === s ? "bg-silk text-obsidian border-silk" : "border-white/15 hover:border-accent hover:text-accent"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-2xl">{formatINR(product.price)}</span>
            <button
              onClick={() => add(product, size)}
              className="btn-luxury btn-luxury-filled flex-1"
            >
              Add to Bag · Size {size}
            </button>
          </div>

          <div className="space-y-1">
            {[
              ["Composition", "70% engineered silk, 30% chromium polymer"],
              ["Construction", "Laser-welded seams. Hand finished in tokyo."],
              ["Care", "Cold rinse. Air dry. Do not iron the chrome."],
              ["Shipping", "Worldwide express. Carbon-offset."],
            ].map(([t, b]) => (
              <details key={t} className="group border-b border-white/10 py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold">{t}</span>
                  <span className="font-mono text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{b}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 md:py-32 max-w-[1600px] mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <p className="mono-label mb-3">/ Complete the look</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter">Pair with</h2>
          </div>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-x-10 gap-y-16">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} offset={i === 1 ? 32 : 0} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
