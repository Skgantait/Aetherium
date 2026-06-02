import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Profile = {
  name: string;
  email: string;
  phone: string;
  city: string;
  size: string;
  signedIn: boolean;
};

type ProfileState = {
  profile: Profile;
  signIn: (p: Partial<Profile>) => void;
  signOut: () => void;
  update: (p: Partial<Profile>) => void;
};

const empty: Profile = {
  name: "",
  email: "",
  phone: "",
  city: "",
  size: "M",
  signedIn: false,
};

export const useProfile = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: empty,
      signIn: (p) => set({ profile: { ...get().profile, ...p, signedIn: true } }),
      signOut: () => set({ profile: empty }),
      update: (p) => set({ profile: { ...get().profile, ...p } }),
    }),
    { name: "aethera-profile" },
  ),
);
