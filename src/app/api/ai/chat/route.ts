import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/enquiry";
import AIConversation from "@/models/AIConversation";
import { logger } from "@/lib/logger";

const client = new Anthropic();
const SYSTEM = `You are PropVista's expert AI property investment advisor for Nashik real estate.
Cover: NA plots, agriculture land, commercial, industrial sheds (MIDC), warehousing.
Key areas: Nashik Road, Gangapur Road, Pathardi Phata, Indira Nagar, Meri, Varavandi, Igatpuri, Trimbak, Sinnar.
If user seems interested in buying, ask for their name and phone for a callback.
Keep responses concise and in simple conversational Indian English.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history, sessionId } = await req.json();
    const messages = [
      ...history.map((m: { role: string; content: string }) => ({ role: m.role as "user"|"assistant", content: m.content })),
      { role: "user" as const, content: message },
    ];

    const response = await client.messages.create({ model: "claude-sonnet-4-20250514", max_tokens: 500, system: SYSTEM, messages });
    const reply    = (response.content[0] as { type: string; text: string }).text;

    const phoneMatch  = message.match(/\b[6-9]\d{9}\b/);
    let leadCaptured  = false;

    if (phoneMatch) {
      await connectDB();
      await Enquiry.create({ name: "AI Chat Lead", phone: phoneMatch[0], source: "ai-chat", message: `Session: ${sessionId}\n${message}` }).catch(() => {});
      leadCaptured = true;
    }

    await connectDB();
    await AIConversation.findOneAndUpdate(
      { sessionId },
      {
        $push: { messages: [{ role: "user", content: message, timestamp: new Date() }, { role: "assistant", content: reply, timestamp: new Date() }] },
        $set:  { leadCaptured },
        $setOnInsert: { sessionId },
      },
      { upsert: true }
    ).catch(() => {});

    return NextResponse.json({ reply, leadCaptured });
  } catch (e) {
    logger.error("POST /api/ai/chat", e);
    return NextResponse.json({ reply: "Sorry, I'm having trouble right now. Please try again." });
  }
}
