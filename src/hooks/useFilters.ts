"use client";
import { useRouter, usePathname } from "next/navigation";
import { useFilterStore } from "@/store/filter.store";
import type { PropertyFilters } from "@/types/property";
import { buildQueryString } from "@/lib/utils";

export function useFilters() {
  const router   = useRouter();
  const pathname = usePathname();
  const store    = useFilterStore();

  const applyFilters = (newFilters?: Partial<PropertyFilters>) => {
    const merged = { ...store.filters, ...newFilters };
    store.setFilters(merged);
    router.push(`${pathname}?${buildQueryString(merged as Record<string, unknown>)}`, { scroll: false });
  };

  const resetAll = () => { store.resetFilters(); router.push(pathname, { scroll: false }); };

  return {
    filters: store.filters, isOpen: store.isOpen, activeCount: store.activeCount(),
    setFilter: store.setFilter, setFilters: store.setFilters,
    applyFilters, resetAll, toggleOpen: store.toggleOpen, setOpen: store.setOpen,
  };
}
