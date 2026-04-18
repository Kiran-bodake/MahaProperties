import axios from "axios";
import type { Enquiry, Lead } from "@/types/enquiry";

const api = axios.create({ baseURL: "/api" });

export const enquiryService = {
  submit:       async (lead: Lead) => { const { data } = await api.post("/enquiries", lead); return data; },
  getAll:       async (): Promise<Enquiry[]> => { const { data } = await api.get("/enquiries"); return data; },
  markRead:     async (id: string) => { await api.patch(`/enquiries/${id}`, { isRead: true }); },
  updateStatus: async (id: string, status: Enquiry["status"]) => { await api.patch(`/enquiries/${id}`, { status }); },
};
