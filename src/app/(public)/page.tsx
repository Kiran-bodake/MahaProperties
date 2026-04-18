// ─── HOME PAGE ───────────────────────────────────────────────────────────────
// Single source of truth. MahaHome contains: Navbar, all sections, Footer, WA.
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import MahaHome from "@/components/home/MahaHome";

export const metadata: Metadata = {
  title: "MahaProperties — Nashik's #1 Property Portal | NA Plots, Agriculture Land",
  description: "2,500+ verified NA plots, agriculture land, collector NA, warehouse & commercial properties in Nashik. RERA compliant listings, transparent pricing.",
};

export default function HomePage() {
  return <MahaHome />;
}
