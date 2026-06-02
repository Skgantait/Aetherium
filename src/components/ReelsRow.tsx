import r1 from "@/assets/reel-1.jpg";
import r2 from "@/assets/reel-2.jpg";
import r3 from "@/assets/reel-3.jpg";
import r4 from "@/assets/reel-4.jpg";

const reels = [
  { img: r1, title: "Midnight loop", handle: "@aethera" },
  { img: r2, title: "Material study", handle: "@thelab" },
  { img: r3, title: "Phase shift", handle: "@aethera" },
  { img: r4, title: "Inside the flagship", handle: "@flagship" },
  { img: r1, title: "Rain protocol", handle: "@aethera" },
  { img: r2, title: "Hand of the maker", handle: "@thelab" },
];

export function ReelsRow() {
  return (
    <section id="reels" className="py-24 md:py-32 border-t border-white/10">
      <div className="px-6 md:px-10 mb-10 max-w-[1600px] mx-auto flex justify-between items-end">
        <div>
          <p className="mono-label mb-3">/ The Feed</p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tighter">Editorial in motion.</h2>
        </div>
        <span className="mono-label hidden md:block">Swipe →</span>
      </div>
      <div className="flex gap-4 overflow-x-auto px-6 md:px-10 no-scrollbar snap-x snap-mandatory">
        {reels.map((r, i) => (
          <div
            key={i}
            className="snap-start min-w-[260px] md:min-w-[320px] aspect-[9/16] rounded-md overflow-hidden ring-1 ring-white/5 relative group bg-card"
          >
            <img src={r.img} alt={r.title} width={576} height={1024} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-sm font-semibold">{r.title}</p>
                <p className="mono-label">{r.handle}</p>
              </div>
              <div className="size-9 rounded-full glass grid place-items-center text-xs">▶</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
