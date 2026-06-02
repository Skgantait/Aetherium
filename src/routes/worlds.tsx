import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { MoodSelector } from "@/components/MoodSelector";
import { WorldsTeaser } from "@/components/WorldsTeaser";

export const Route = createFileRoute("/worlds")({
  head: () => ({
    meta: [
      { title: "Worlds — Aethera" },
      { name: "description", content: "Four cinematic universes. One wardrobe. Pick a frequency and the store re-skins around you." },
      { property: "og:title", content: "Worlds — Aethera" },
      { property: "og:description", content: "Four cinematic universes. One wardrobe." },
    ],
  }),
  component: WorldsPage,
});

function WorldsPage() {
  return (
    <main className="pt-32">
      <header className="px-6 md:px-10 max-w-[1600px] mx-auto mb-20">
        <p className="mono-label mb-4">/ Worlds</p>
        <h1 className="font-display text-6xl md:text-[10rem] tracking-tighter leading-[0.85] max-w-[14ch]">
          Four universes. One wardrobe.
        </h1>
        <p className="max-w-md text-sm text-muted-foreground mt-10">
          Aethera lives across multiple cinematic frequencies. Choose your scene — the store
          recomposes itself.
        </p>
      </header>
      <WorldsTeaser />
      <MoodSelector />
      <Footer />
    </main>
  );
}
