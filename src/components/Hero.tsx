import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    const el = ref.current;
    el?.addEventListener("mousemove", onMove);
    return () => el?.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden flex flex-col justify-end pb-20 md:pb-28 grain"
    >
      <img
        src={hero}
        alt="Aethera Drop 04 — chrome silk coat in midnight street"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-top scale-105 animate-[blur-in_1.6s_var(--ease-out-expo)_both]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, oklch(0.88 0.15 200 / 0.18), transparent 60%)`,
        }}
      />

      <div className="absolute top-1/2 right-6 md:right-10 -translate-y-1/2 mono-label hidden md:block rotate-90 origin-right">
        Drop 04 · Obsidian Protocol · 12.04.26
      </div>

      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-10">
        <p className="mono-label mb-6 animate-[reveal_1s_var(--ease-out-expo)_both]">
          / Chapter 04 — A garment for the post-cultural city
        </p>
        <h1 className="font-display text-[18vw] md:text-[12rem] xl:text-[16rem] leading-[0.82] tracking-tighter text-edge-glow">
          <span className="block animate-[blur-in_1.1s_var(--ease-out-expo)_both]">Obsidian</span>
          <span className="block md:ml-[18%] animate-[blur-in_1.3s_var(--ease-out-expo)_0.2s_both]">
            Protocol
          </span>
        </h1>
        <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 max-w-5xl">
          <p className="max-w-xs text-sm text-muted-foreground font-mono leading-relaxed animate-[reveal_1s_var(--ease-out-expo)_0.5s_both]">
            ENGINEERED SILK AND CHROMATIC ARMOR FOR THE NEXT DECADE. SIX PIECES. THREE HUNDRED UNITS.
            ZERO RESTOCKS.
          </p>
          <div className="flex gap-3 animate-[reveal_1s_var(--ease-out-expo)_0.7s_both]">
            <Link to="/shop" className="btn-luxury btn-luxury-filled">Enter the Drop</Link>
            <a href="#story" className="btn-luxury">Watch the Film</a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground">
        <span className="mono-label">Scroll</span>
        <span className="block w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
