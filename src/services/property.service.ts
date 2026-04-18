import axios from "axios";
import type { Property, PropertyFilters, PropertyListResponse } from "@/types/property";
import { buildQueryString } from "@/lib/utils";

const api = axios.create({ baseURL: "/api" });

export const propertyService = {
  getAll: async (filters: PropertyFilters): Promise<PropertyListResponse> => {
    const { data } = await api.get(`/properties?${buildQueryString(filters as Record<string, unknown>)}`);
    return data;
  },
  getBySlug: async (slug: string): Promise<Property> => {
    const { data } = await api.get(`/properties/${slug}`);
    return data;
  },
  getFeatured: async (limit = 6): Promise<Property[]> => {
    const { data } = await api.get(`/properties/featured?limit=${limit}`);
    return data;
  },
  create: async (payload: Partial<Property>): Promise<Property> => {
    const { data } = await api.post("/properties", payload);
    return data;
  },
  update: async (id: string, payload: Partial<Property>): Promise<Property> => {
    const { data } = await api.put(`/properties/${id}`, payload);
    return data;
  },
  delete: async (id: string): Promise<void> => { await api.delete(`/properties/${id}`); },
};
