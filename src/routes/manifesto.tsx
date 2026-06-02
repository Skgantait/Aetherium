import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import manifesto from "@/assets/manifesto.jpg";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — Aethera" },
      { name: "description", content: "Aethera is a future-fashion atelier. One archive across four cinematic worlds. Engineered in Antwerp, finished in Como, worn by the night." },
      { property: "og:title", content: "Manifesto — Aethera" },
      { property: "og:description", content: "One archive. Four worlds. Worn by the night." },
      { property: "og:image", content: manifesto },
    ],
  }),
  component: ManifestoPage,
});

function ManifestoPage() {
  return (
    <main className="pt-28">
      <section className="relative h-[80vh] overflow-hidden">
        <img src={manifesto} alt="Aethera atelier" className="absolute inset-0 w-full h-full object-cover object-top" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-10 flex items-end pb-16">
          <div>
            <p className="mono-label mb-4">/ Manifesto · 2026</p>
            <h1 className="font-display text-6xl md:text-[10rem] leading-[0.85] tracking-tighter text-edge-glow">
              Worn by<br/>the night.
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-6 md:px-10 py-24 md:py-32 space-y-12">
        <Tenet n="01" title="One archive. Four worlds.">
          Aethera is not a brand. It is a wardrobe that re-skins itself around the wearer.
          Midnight City. Neo tokyo. Old Money. Obsidian Core. Same garments, four frequencies.
        </Tenet>
        <Tenet n="02" title="Engineered, not decorated.">
          Every seam is a decision. Three-layer welded membranes derived from aerospace work.
          Bonded Biella wool cut once. Carbon plates beneath knit mesh. We solve a problem first,
          then we make it beautiful.
        </Tenet>
        <Tenet n="03" title="Made in small numbers.">
          Lab Series garments are produced in editions under thirty. Drop series under three hundred.
          When the count is gone, it is gone. We do not restock the past.
        </Tenet>
        <Tenet n="04" title="Built where the craft lives.">
          Pattern in Antwerp. Cut in tokyo. Pleat in Como. Finished by hand in our atelier outside
          Mumbai. Shipped from tokyo to the world.
        </Tenet>
        <Tenet n="05" title="Cinema before commerce.">
          We will release a film before a product page. A scene before a sale. The store is a
          stage — the garment is the actor.
        </Tenet>

        <div className="hairline" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
          <Stat k="Ateliers" v="04" />
          <Stat k="Drops / year" v="06" />
          <Stat k="Lab editions" v="< 30" />
          <Stat k="Lead time" v="14 d" />
        </div>

        <div className="text-center pt-12">
          <Link to="/shop" className="btn-luxury btn-luxury-filled inline-block">Enter the archive</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Tenet({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
      <span className="font-mono text-accent text-sm pt-2">{n}</span>
      <div>
        <h3 className="font-display text-3xl md:text-4xl tracking-tighter leading-tight mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-display text-4xl md:text-5xl tracking-tighter text-foreground">{v}</p>
      <p className="mono-label mt-2">{k}</p>
    </div>
  );
}
