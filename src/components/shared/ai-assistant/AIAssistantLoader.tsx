"use client";
import dynamic from "next/dynamic";

const AIAssistant = dynamic(
  () => import("./AIAssistant").then((m) => ({ default: m.AIAssistant })),
  { ssr: false }
);

export function AIAssistantLoader() {
  return <AIAssistant />;
}
