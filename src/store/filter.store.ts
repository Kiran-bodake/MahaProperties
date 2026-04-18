import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { PropertyFilters } from "@/types/property";

interface FilterState {
  filters: PropertyFilters;
  isOpen: boolean;
  setFilter: <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  toggleOpen: () => void;
  setOpen: (v: boolean) => void;
  activeCount: () => number;
}

const DEFAULT: PropertyFilters = { page: 1, limit: 12 };

export const useFilterStore = create<FilterState>()(
  devtools(
    (set, get) => ({
      filters: DEFAULT,
      isOpen:  false,
      setFilter:    (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value, page: 1 } })),
      setFilters:   (filters)    => set((s) => ({ filters: { ...s.filters, ...filters, page: 1 } })),
      resetFilters: ()           => set({ filters: DEFAULT }),
      toggleOpen:   ()           => set((s) => ({ isOpen: !s.isOpen })),
      setOpen:      (isOpen)     => set({ isOpen }),
      activeCount:  () => {
        const { filters } = get();
        return [filters.category, filters.locality, filters.priceMin, filters.priceMax,
                filters.constructionStatus, filters.isRERA, filters.q].filter(Boolean).length;
      },
    }),
    { name: "FilterStore" }
  )
);
