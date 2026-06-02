import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import e1 from "@/assets/editorial-1.jpg";
import e2 from "@/assets/editorial-2.jpg";
import e3 from "@/assets/editorial-3.jpg";
import e4 from "@/assets/editorial-4.jpg";
import e5 from "@/assets/editorial-5.jpg";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook · Vol. 04 — Aethera" },
      { name: "description", content: "A cinematic editorial of Aethera's fourth volume — sculptural garments shot across concrete halls, neon alleys and salt flats." },
      { property: "og:title", content: "Lookbook · Vol. 04 — Aethera" },
      { property: "og:description", content: "Sculptural garments. Cinematic frames. Volume Four." },
      { property: "og:image", content: e2 },
    ],
  }),
  component: LookbookPage,
});

function LookbookPage() {
  return (
    <main className="pt-28">
      {/* Cover */}
      <section className="relative h-[92vh] overflow-hidden">
        <img src={e2} alt="Aethera Volume Four cover" className="absolute inset-0 w-full h-full object-cover object-top" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col justify-between py-10">
          <div className="flex justify-between items-start">
            <p className="mono-label">/ Lookbook · Vol. 04</p>
            <p className="mono-label">Spring/Summer · 26</p>
          </div>
          <div>
            <h1 className="font-display text-6xl md:text-[12rem] leading-[0.82] tracking-tighter max-w-[14ch] text-edge-glow">
              After<br/>the rain.
            </h1>
            <p className="max-w-md mt-8 text-sm text-muted-foreground">
              Twenty-two frames, four cities, one wardrobe. Shot on 35mm between 03:00 and 05:00 across
              tokyo, Reykjavík, Uyuni and Antwerp.
            </p>
          </div>
        </div>
      </section>

      {/* Spread 01 */}
      <Spread chapter="I · Concrete & Cathedral Light" caption="A1/001 — C-Type Shell, worn raw over sculpted obsidian.">
        <div className="grid md:grid-cols-[1fr_0.7fr] gap-3 md:gap-6">
          <img src={e1} alt="Editorial spread" width={1080} height={1920} loading="lazy" className="w-full h-full object-cover object-top aspect-[3/4]" />
          <div className="flex flex-col gap-3 md:gap-6">
            <img src={e5} alt="Macro detail" width={1080} height={1280} loading="lazy" className="w-full object-cover object-top aspect-[3/4] md:aspect-[4/5]" />
            <blockquote className="font-display text-2xl md:text-3xl leading-tight italic text-foreground/90 px-2">
              "Cut once. Worn forever. Lit like architecture."
            </blockquote>
          </div>
        </div>
      </Spread>

      {/* Wide cinematic */}
      <Spread chapter="II · Salt & Silence" caption="G1/001 — Pleated Mercury, twin gowns under indigo dusk.">
        <img src={e4} alt="Twin gowns on salt flat" width={1920} height={1080} loading="lazy" className="w-full object-cover object-top aspect-[16/9]" />
      </Spread>

      {/* Asymmetric */}
      <Spread chapter="III · Mirror Hall" caption="J1/002 — Chrome Mirage, silk hood, no horizon.">
        <div className="grid md:grid-cols-2 gap-3 md:gap-6 items-end">
          <div className="md:translate-y-12">
            <img src={e3} alt="Chrome shades portrait" width={1080} height={1920} loading="lazy" className="w-full object-cover object-top aspect-[3/4]" />
            <p className="mono-label mt-3">Frame 014 · f/1.4 · ISO 400</p>
          </div>
          <div>
            <p className="font-display text-3xl md:text-5xl leading-tight tracking-tighter">
              "She does not arrive. She is already there — just before you notice."
            </p>
            <p className="mono-label mt-6">— Editor's note, page 47</p>
          </div>
        </div>
      </Spread>

      {/* Closing */}
      <section className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto text-center">
        <p className="mono-label mb-6">/ End of volume</p>
        <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.95] mb-10">
          Vol. 05 begins<br/>at the next eclipse.
        </h2>
        <Link to="/shop" className="btn-luxury btn-luxury-filled inline-block">Shop Volume 04</Link>
      </section>

      <Footer />
    </main>
  );
}

function Spread({ chapter, caption, children }: { chapter: string; caption: string; children: React.ReactNode }) {
  return (
    <section className="px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <p className="font-display text-xl md:text-2xl italic">{chapter}</p>
        <p className="mono-label">{caption}</p>
      </div>
      {children}
    </section>
  );
}
