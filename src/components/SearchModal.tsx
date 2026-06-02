import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { products, formatINR } from "@/lib/products";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.material.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.drop.toLowerCase().includes(term),
    );
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center pt-24 px-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />
      <div className="relative w-full max-w-2xl glass border border-white/10 rounded-lg overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <span className="mono-label">Search</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Coats, silk, accessories, Drop 04…"
            className="flex-1 bg-transparent text-lg focus:outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} className="mono-label hover:text-accent">
            ESC
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {results.length === 0 && (
            <p className="text-center py-12 text-muted-foreground text-sm">
              No artifacts match that frequency.
            </p>
          )}
          {results.map((p) => (
            <Link
              key={p.id}
              to="/shop/$id"
              params={{ id: p.id }}
              onClick={onClose}
              className="flex items-center gap-4 p-3 rounded hover:bg-white/5 transition-colors"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-14 aspect-[3/4] object-cover ring-1 ring-white/10"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] font-semibold truncate">
                  {p.name}
                </p>
                <p className="mono-label mt-1 normal-case tracking-widest">
                  {p.category} · {p.drop}
                </p>
              </div>
              <span className="font-mono text-xs">{formatINR(p.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
