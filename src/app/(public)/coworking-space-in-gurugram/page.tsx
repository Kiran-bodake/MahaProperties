"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer";
import { PropertyGrid } from "@/components/property/property-grid/PropertyGrid";
import type { Property } from "@/types/property";

const SAMPLE_PROPERTIES: Property[] = [
  {
    _id: "cws-1",
    title: "Premium Dedicated Coworking Desk - Sector 44",
    slug: "dedicated-coworking-sector-44",
    category: "commercial",
    status: "available",
    constructionStatus: "ready",
    price: 9500000,
    area: 430,
    areaUnit: "sqft",
    locality: "Sector 44",
    city: "Gurugram",
    state: "Haryana",
    description: "Fully furnished dedicated desk with 24x7 access, high-speed internet, meeting room credits, and pantry access.",
    images: [{ url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80", isPrimary: true }],
    highlights: ["24x7 Access", "Dedicated Desk", "Power backup"],
    amenities: ["High speed WiFi", "Printing & scanning", "Meeting rooms", "Exclusive breakout area"],
    isRERA: false,
    isFeatured: true,
    isZeroBrokerage: true,
    postedBy: "dealer",
    agentName: "John Doe",
    views: 631,
    savedCount: 98,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "cws-2",
    title: "Dedicated Cabin - Cyber City, Gurugram",
    slug: "dedicated-cabin-cyber-city",
    category: "commercial",
    status: "available",
    constructionStatus: "ready",
    price: 13500000,
    area: 650,
    areaUnit: "sqft",
    locality: "Cyber City",
    city: "Gurugram",
    state: "Haryana",
    description: "Spacious dedicated cabin with private access, reserved parking, and premium clubhouse facilities.",
    images: [{ url: "https://images.unsplash.com/photo-1498604492510-5df6dda8f878?w=1200&q=80", isPrimary: true }],
    highlights: ["Private Office", "Pantry", "WiFi-enabled"],
    amenities: ["Theme lounge", "Security", "Cafeteria"],
    isRERA: false,
    isFeatured: true,
    isZeroBrokerage: true,
    postedBy: "builder",
    agentName: "John Doe",
    views: 1052,
    savedCount: 206,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "cws-3",
    title: "Shared Dedicated Workspace - Golf Course Road",
    slug: "shared-dedicated-golf-course-road",
    category: "commercial",
    status: "available",
    constructionStatus: "ready",
    price: 7800000,
    area: 400,
    areaUnit: "sqft",
    locality: "Golf Course Road",
    city: "Gurugram",
    state: "Haryana",
    description: "Premium dedicated workspace seat in a boutique coworking location with seamless business address and visitor lounge.",
    images: [{ url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80", isPrimary: true }],
    highlights: ["Best location", "Plug-and-play", "Housekeeping"],
    amenities: ["Coffee bar", "Event area", "Reception"],
    isRERA: false,
    isFeatured: false,
    isZeroBrokerage: true,
    postedBy: "owner",
    agentName: "John Doe",
    views: 822,
    savedCount: 77,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const LOCALITY_OPTIONS = ["All Localities", "Sector 44", "Cyber City", "Golf Course Road"];
const SORT_OPTIONS = [
  { key: "newest", label: "Newest" },
  { key: "price_asc", label: "Price: Low to High" },
  { key: "price_desc", label: "Price: High to Low" },
];

export default function CoworkingListPage() {
  const [search, setSearch] = useState("");
  const [locality, setLocality] = useState(LOCALITY_OPTIONS[0]);
  const [sortBy, setSortBy] = useState("newest");

  const filteredProperties = useMemo(() => {
    let items = SAMPLE_PROPERTIES;
    if (locality !== "All Localities") {
      items = items.filter((p) => p.locality === locality);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price_asc") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      items = [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return items;
  }, [locality, search, sortBy]);

  return (
    <>
      <Navbar />

      <main style={{ background: "#f3f6fb" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "15px 14px 36px" }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: "0.9rem", color: "#475569", marginBottom: "12px" }}>
            <ol style={{ display: "flex", gap: "6px", listStyle: "none", padding: 0, margin: 0 }}>
              <li><Link href="/" style={{ color: "#0f766e" }}>Home</Link></li>
              <li>›</li>
              <li><Link href="/" style={{ color: "#0f766e" }}>Gurugram</Link></li>
              <li>›</li>
              <li style={{ color: "#334155", fontWeight: 600 }}>Dedicated Coworking Space</li>
            </ol>
          </nav>

          <section style={{ background: "white", borderRadius: "14px", padding: "22px 20px", boxShadow: "0 4px 17px rgba(0,0,0,0.06)", marginBottom: "14px" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.4rem, 2.8vw, 2rem)", color: "#0f172a", fontWeight: 800 }}>Dedicated Coworking Spaces in Gurugram</h1>
            <p style={{ margin: "10px 0 0", color: "#64748b", fontSize: "0.95rem" }}>
              Your business address and team-ready infrastructure with 100% commitment from John Doe.
            </p>
          </section>

          <section style={{ position: "sticky", top: "80px", zIndex: 1050, background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 16px rgba(15, 23, 42, 0.08)", padding: "12px 14px", marginBottom: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "9px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by locality or project"
                  style={{ flex: 1, minWidth: "220px", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px 12px", fontSize: "0.95rem" }}
                />
                <select value={locality} onChange={(e) => setLocality(e.target.value)} style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px 12px", fontSize: "0.95rem" }}>
                  {LOCALITY_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "10px 12px", fontSize: "0.95rem" }}>
                  {SORT_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "#334155" }}>Showing {filteredProperties.length} results</span>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Text filter, location, and sorting applied</span>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: "18px" }}>
            <PropertyGrid properties={filteredProperties} />
          </section>

          <section style={{ background: "linear-gradient(135deg,#ecfdf5,#cffafe)", borderRadius: "14px", padding: "20px 18px", border: "1px solid #bbf7d0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h2 style={{ margin: 0, fontSize: "1.45rem", fontWeight: 800, color: "#065f46" }}>MahaProperties Price Guarantee</h2>
              <p style={{ margin: 0, color: "#134e4a" }}>100% buyback guarantee within 3 years for qualified listings. The same trust and transparency as our top-performing co-working inventory.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "9px" }}>
                <div style={{ background: "white", borderRadius: "10px", padding: "12px", border: "1px solid #86efac" }}>
                  <strong>Guaranteed Revaluation</strong>: We help you resell at higher or equal market price within 36 months.
                </div>
                <div style={{ background: "white", borderRadius: "10px", padding: "12px", border: "1px solid #86efac" }}>
                  <strong>No hidden fees</strong>: Clear all costs before onboarding, including stamp duty and brokerage.
                </div>
                <div style={{ background: "white", borderRadius: "10px", padding: "12px", border: "1px solid #86efac" }}>
                  <strong>Risk-free booking</strong>: 2-step verification and refundable initial confirm deposit.
                </div>
              </div>

              <div style={{ marginTop: "8px", color: "#065f46", fontWeight: 700 }}>
                Contact Person: John Doe | +91 98765 43210 | john.doe@mahaproperties.in
              </div>
            </div>
          </section>

          <section style={{ marginTop: "20px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>Explore more components</h3>
            <p style={{ marginTop: "8px", color: "#475569" }}>
              This page uses the same cards and sticky UI patterns from the main header flow to match your MyHQ reference.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
              <Link href="/post-property" style={{ padding: "9px 14px", borderRadius: "8px", background: "#10b981", color: "white", fontWeight: 600 }}>List a coworking space</Link>
              <Link href="/enquiry" style={{ padding: "9px 14px", borderRadius: "8px", background: "#22d3ee", color: "#0f172a", fontWeight: 600 }}>Request a callback</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}