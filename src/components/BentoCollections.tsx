import c1 from "@/assets/collection-1.jpg";
import c2 from "@/assets/collection-2.jpg";
import c3 from "@/assets/collection-3.jpg";
import c4 from "@/assets/collection-4.jpg";

const tile =
  "group relative overflow-hidden rounded-md ring-1 ring-white/5 bg-card";

export function BentoCollections() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 max-w-[1600px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="mono-label mb-3">/ Chapter 01 — The Atlas</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tighter max-w-[18ch]">
            Four chapters of a single&nbsp;wardrobe.
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          Every category is its own story — engineered, photographed, and released as a complete
          editorial volume.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:h-[80vh]">
        <div className={`${tile} md:col-span-2 md:row-span-2`}>
          <img src={c1} alt="Liquid obsidian fabric study" width={1024} height={1280} loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <p className="mono-label text-accent mb-2">Material Study 01</p>
              <h3 className="font-display text-3xl md:text-4xl">Liquid Obsidian</h3>
            </div>
            <span className="mono-label">↗</span>
          </div>
        </div>
        <div className={`${tile} md:col-span-2`}>
          <img src={c2} alt="Aether Optics" width={1280} height={768} loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <p className="mono-label text-accent mb-2">Optics V3</p>
              <h3 className="font-display text-3xl">Aether Optics</h3>
            </div>
            <span className="mono-label">↗</span>
          </div>
        </div>
        <div className={tile}>
          <img src={c3} alt="Footwear" width={768} height={768} loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
          <div className="absolute bottom-5 left-5"><p className="mono-label text-accent">Footwear Core</p></div>
        </div>
        <div className={tile}>
          <img src={c4} alt="Accessories" width={768} height={768} loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
          <div className="absolute bottom-5 left-5"><p className="mono-label text-accent">Accessories</p></div>
        </div>
      </div>
    </section>
  );
}
