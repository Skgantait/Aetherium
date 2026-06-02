import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { DropMarquee } from "@/components/DropMarquee";
import { BentoCollections } from "@/components/BentoCollections";
import { MoodSelector } from "@/components/MoodSelector";
import { ProductGrid } from "@/components/ProductGrid";
import { StorySection } from "@/components/StorySection";
import { ReelsRow } from "@/components/ReelsRow";
import { WorldsTeaser } from "@/components/WorldsTeaser";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <DropMarquee />
      <BentoCollections />
      <MoodSelector />
      <ProductGrid />
      <StorySection />
      <ReelsRow />
      <WorldsTeaser />
      <Footer />
    </main>
  );
}
