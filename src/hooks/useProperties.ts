"use client";
import useSWR from "swr";
import type { PropertyFilters, PropertyListResponse, Property } from "@/types/property";
import { buildQueryString } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useProperties(filters: PropertyFilters) {
  const { data, error, isLoading, mutate } = useSWR<PropertyListResponse>(
    `/api/properties?${buildQueryString(filters as Record<string, unknown>)}`,
    fetcher,
    { revalidateOnFocus: false, keepPreviousData: true }
  );
  return {
    properties: data?.properties ?? [],
    total:       data?.total      ?? 0,
    totalPages:  data?.totalPages ?? 0,
    isLoading, isError: !!error, mutate,
  };
}

export function useFeaturedProperties(limit = 6) {
  const { data, isLoading } = useSWR<Property[]>(
    `/api/properties/featured?limit=${limit}`, fetcher, { revalidateOnFocus: false }
  );
  return { properties: data ?? [], isLoading };
}

export function useProperty(slug: string) {
  const { data, isLoading, error } = useSWR<Property>(
    slug ? `/api/properties/${slug}` : null, fetcher
  );
  return { property: data, isLoading, isError: !!error };
}
