import axios from "axios";
import type { AuthSession } from "@/types/user";

const api = axios.create({ baseURL: "/api" });

export const authService = {
  sendOTP:   async (phone: string) => { const { data } = await api.post("/otp/send", { phone }); return data; },
  verifyOTP: async (phone: string, otp: string): Promise<AuthSession> => {
    const { data } = await api.post("/otp/verify", { phone, otp });
    return data;
  },
  getProfile: async () => { const { data } = await api.get("/auth/profile"); return data; },
  logout:     async () => { await api.post("/auth/logout"); },
};
