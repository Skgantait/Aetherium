import minimal from "@/assets/world-minimal.jpg";
import tokyo from "@/assets/world-tokyo.jpg";
import oldmoney from "@/assets/world-oldmoney.jpg";
import obs from "@/assets/world-obsidian.jpg";

const worlds = [
  { name: "Minimalist", img: minimal, tag: "Pure form" },
  { name: "Neo tokyo", img: tokyo, tag: "Neon vinyl" },
  { name: "Old Money", img: oldmoney, tag: "Marble & gold" },
  { name: "Obsidian Core", img: obs, tag: "Industrial" },
];

export function WorldsTeaser() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 max-w-[1600px] mx-auto">
      <header className="mb-12">
        <p className="mono-label mb-3">/ Chapter 05 — Worlds</p>
        <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.95]">
          Four universes. <br/>One wardrobe.
        </h2>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {worlds.map((w, i) => (
          <div
            key={w.name}
            className="group relative aspect-[3/4] overflow-hidden rounded-md ring-1 ring-white/5 cursor-pointer"
            style={{ transform: `translateY(${i % 2 === 1 ? 32 : 0}px)` }}
          >
            <img src={w.img} alt={w.name} width={1024} height={1280} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="mono-label text-accent mb-1">World 0{i + 1}</p>
              <h3 className="font-display text-2xl md:text-3xl">{w.name}</h3>
              <p className="mono-label mt-1 normal-case tracking-widest">{w.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
