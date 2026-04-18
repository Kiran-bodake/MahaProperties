import axios from "axios";

interface ChatMessage { role: "user" | "assistant"; content: string; }
const api = axios.create({ baseURL: "/api" });

export const aiService = {
  chat: async (message: string, history: ChatMessage[], sessionId: string) => {
    const { data } = await api.post("/ai/chat", { message, history, sessionId });
    return data;
  },
};
