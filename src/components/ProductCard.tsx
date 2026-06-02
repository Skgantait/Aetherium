import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export function ProductCard({ product, offset = 0 }: { product: Product; offset?: number }) {
  const add = useCart((s) => s.add);
  return (
    <article
      className="group flex flex-col gap-5 magnetic-card"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <Link
        to="/shop/$id"
        params={{ id: product.id }}
        className="relative block aspect-[3/4] overflow-hidden bg-card ring-1 ring-white/5"
      >
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={1066}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="mono-label glass px-2.5 py-1 rounded-full">{product.drop}</span>
        </div>
        <button
          aria-label={`Add ${product.name} to bag`}
          onClick={(e) => {
            e.preventDefault();
            add(product);
          }}
          className="absolute bottom-4 right-4 size-12 rounded-full bg-silk text-obsidian grid place-items-center text-lg font-bold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-accent"
        >
          +
        </button>
      </Link>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xs uppercase tracking-[0.18em] font-semibold">{product.name}</h3>
          <p className="mono-label mt-1.5 normal-case tracking-widest">{product.material}</p>
        </div>
        <span className="font-mono text-xs">{formatINR(product.price)}</span>
      </div>
    </article>
  );
}
