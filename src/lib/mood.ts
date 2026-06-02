import { create } from "zustand";

export type MoodId = "midnight" | "tokyo" | "oldmoney" | "obsidian";

export type Mood = {
  id: MoodId;
  label: string;
  tagline: string;
  accent: string; // oklch
  bg: string; // oklch
  text: string; // oklch
};

export const moods: Mood[] = [
  { id: "midnight",  label: "Midnight City", tagline: "Cool cyan rain · monochrome",     accent: "0.88 0.15 200", bg: "0.08 0.005 240", text: "0.97 0.005 240" },
  { id: "tokyo",     label: "Neo tokyo",     tagline: "Crimson neon · vinyl reflections", accent: "0.7 0.24 25",  bg: "0.09 0.02 25",   text: "0.97 0.01 25" },
  { id: "oldmoney",  label: "Old Money",     tagline: "Marble · candlelit gold",          accent: "0.78 0.13 80", bg: "0.97 0.01 80",   text: "0.18 0.02 80" },
  { id: "obsidian",  label: "Obsidian Core", tagline: "Industrial · graphite shadow",     accent: "0.6 0.05 240", bg: "0.05 0 0",       text: "0.93 0 0" },
];

type MoodState = {
  mood: Mood;
  setMood: (id: MoodId) => void;
};

export const useMood = create<MoodState>((set) => ({
  mood: moods[0],
  setMood: (id) => set({ mood: moods.find((m) => m.id === id) ?? moods[0] }),
}));
