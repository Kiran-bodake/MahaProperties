import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PropertyState {
  savedIds: string[];
  recentlyViewed: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      recentlyViewed: [],
      toggleSaved: (id) => set((s) => ({
        savedIds: s.savedIds.includes(id) ? s.savedIds.filter((x) => x !== id) : [...s.savedIds, id],
      })),
      isSaved: (id) => get().savedIds.includes(id),
      addRecentlyViewed: (id) => set((s) => ({
        recentlyViewed: [id, ...s.recentlyViewed.filter((x) => x !== id)].slice(0, 20),
      })),
    }),
    { name: "propvista-properties" }
  )
);
