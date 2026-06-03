import { useEffect, useRef, useState } from "react";
import c1 from "@/assets/collection-1.jpg";

export function StorySection() {
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0..1
  useEffect(() => {
    const onScroll = () => {
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const h = window.innerHeight;
      const total = r.height - h;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="story" ref={wrap} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          src={c1}
          alt="Fabric craft"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ transform: `scale(${1.1 + p * 0.1}) translateY(${-p * 30}px)`, filter: `brightness(${0.6 - p * 0.2})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

        <div className="relative h-full flex items-center justify-center px-6">
          <div className="max-w-3xl text-center">
            <p className="mono-label text-accent mb-8">/ The Craft</p>
            <h2 className="font-display text-4xl md:text-7xl leading-[1.05] tracking-tighter text-edge-glow">
              {[
                "Every seam is laser-welded.",
                "Every thread is engineered.",
                "A garment is not made — it is composed.",
              ].map((line, i) => {
                const start = i * 0.25;
                const local = Math.min(Math.max((p - start) / 0.3, 0), 1);
                return (
                  <span
                    key={i}
                    className="block"
                    style={{
                      opacity: local,
                      transform: `translateY(${(1 - local) * 24}px)`,
                      filter: `blur(${(1 - local) * 10}px)`,
                      transition: "all 0.1s linear",
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </h2>
            <p className="mt-10 text-sm text-muted-foreground max-w-md mx-auto">
              From Biella spinning rooms to india finishing studios. Six artisans, eighteen months,
              one wardrobe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
