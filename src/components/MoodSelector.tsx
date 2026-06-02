import { moods, useMood } from "@/lib/mood";

export function MoodSelector() {
  const { mood, setMood } = useMood();
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 border-y border-white/10">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="md:w-1/3 shrink-0">
          <p className="mono-label mb-3">/ Chapter 02 — Frequency</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tighter">
            Shop by the mood you're&nbsp;in.
          </h2>
          <p className="mt-6 text-sm text-muted-foreground max-w-sm">
            Pick a frequency. The store re-skins around you — palette, type, products. Same wardrobe,
            another universe.
          </p>
          <p className="mono-label mt-8">
            Now playing · <span className="text-accent">{mood.label}</span>
          </p>
        </div>
        <div className="flex-1 flex flex-col">
          {moods.map((m, idx) => {
            const active = m.id === mood.id;
            return (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`group flex items-baseline justify-between border-b border-white/10 py-6 md:py-8 transition-all ${
                  active ? "text-accent" : "text-foreground hover:text-accent"
                }`}
              >
                <span className="font-display text-5xl md:text-7xl tracking-tighter text-left">
                  {m.label}
                </span>
                <span className="mono-label hidden sm:inline">
                  Scene {String(idx + 1).padStart(2, "0")} · {m.tagline}
                </span>
                <span
                  className={`block w-2 h-2 rounded-full ml-4 ${active ? "bg-accent animate-[pulse-glow_2s_ease-in-out_infinite]" : "bg-white/20"}`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
