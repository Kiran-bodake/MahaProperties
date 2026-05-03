"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Tag, MapPin } from "lucide-react";

type Property = {
  category?: string;
  cat?: string;
  locality?: string;
  loc?: string;
  city?: string;
};

const G = {
  g: "#1a6b3c",
  gm: "#2d9455",
  ink: "#0e1117",
  sl: "#374151",
  mu: "#6b7280",
  li: "#e5e7eb",
};

function norm(s: unknown) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function HeroSearch() {
  const router = useRouter();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [locality, setLocality] = useState("");

  const [allProps, setAllProps] = useState<Property[]>([]);
  const [showCatDD, setShowCatDD] = useState(false);
  const [showLocDD, setShowLocDD] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLDivElement>(null);

  /* ---- fetch properties to build dropdown options ---- */
  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.properties || [];
        setAllProps(list);
      })
      .catch(() => setAllProps([]));
  }, []);

  /* ---- close dropdowns on outside click ---- */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node))
        setShowCatDD(false);
      if (locRef.current && !locRef.current.contains(e.target as Node))
        setShowLocDD(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* ---- unique categories & locations ---- */
  const categories = useMemo(() => {
    const s = new Set<string>();
    allProps.forEach((p) => {
      const c = (p.category || p.cat || "").trim();
      if (c) s.add(c);
    });
    return [...s].sort();
  }, [allProps]);

  const locations = useMemo(() => {
    const s = new Set<string>();
    allProps.forEach((p) => {
      const raw = (p.locality || p.loc || "").trim();
      const city = (p.city || "").trim();
      if (city) s.add(city);
      if (raw) s.add(raw);
    });
    return [...s].sort();
  }, [allProps]);

  const catSuggest = useMemo(() => {
    const n = norm(category);
    if (!n) return categories.slice(0, 8);
    return categories.filter((c) => norm(c).includes(n)).slice(0, 8);
  }, [category, categories]);

  const locSuggest = useMemo(() => {
    const n = norm(locality);
    if (!n) return locations.slice(0, 8);
    return locations.filter((l) => norm(l).includes(n)).slice(0, 8);
  }, [locality, locations]);

  /* ---- redirect to /properties with filter query params ---- */
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category.trim()) params.append("category", category.trim());
    if (locality.trim()) params.set("locality", locality.trim());
    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  };

  return (
    <form
      onSubmit={handleSearch}
      data-testid="hero-search-form"
      style={{
        background: "rgba(255,255,255,0.98)",
        borderRadius: "16px",
        padding: "10px",
        boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr auto",
        gap: "8px",
        alignItems: "center",
        maxWidth: "880px",
        width: "100%",
      }}
      className="hero-search"
    >
      {/* SEARCH */}
      <div style={{ position: "relative" }}>
        <span style={iconBox}>
          <Search size={18} color="#1a6b3c" />
        </span>
        <input
          data-testid="hero-search-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Try "NA plot", "warehouse"...'
          style={inputStyle}
        />
      </div>

      {/* CATEGORY */}
      <div style={{ position: "relative" }} ref={catRef}>
        <span style={iconBox}>
          <Tag size={18} color="#1a6b3c" />
        </span>
        <input
          data-testid="hero-category-input"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setShowCatDD(true);
          }}
          onFocus={() => setShowCatDD(true)}
          placeholder="Property type"
          style={inputStyle}
          autoComplete="off"
        />
        {showCatDD && catSuggest.length > 0 && (
          <div style={ddStyle}>
            {catSuggest.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setShowCatDD(false);
                }}
                style={ddItem}
                data-testid={`hero-cat-option-${c}`}
              >
                <Tag size={16} color="#1a6b3c" /> {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LOCATION */}
      <div style={{ position: "relative" }} ref={locRef}>
        <span style={iconBox}>
          <MapPin size={18} color="#1a6b3c" />
        </span>
        <input
          data-testid="hero-location-input"
          value={locality}
          onChange={(e) => {
            setLocality(e.target.value);
            setShowLocDD(true);
          }}
          onFocus={() => setShowLocDD(true)}
          placeholder="City / Locality"
          style={inputStyle}
          autoComplete="off"
        />
        {showLocDD && locSuggest.length > 0 && (
          <div style={ddStyle}>
            {locSuggest.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLocality(l);
                  setShowLocDD(false);
                }}
                style={ddItem}
                data-testid={`hero-loc-option-${l}`}
              >
                <MapPin size={16} color="#1a6b3c" /> {l}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SEARCH BUTTON */}
      <button
        type="submit"
        data-testid="hero-search-submit"
        style={{
          height: "52px",
          padding: "0 22px",
          borderRadius: "12px",
          background: G.g,
          color: "white",
          fontWeight: 700,
          fontSize: "14px",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          whiteSpace: "nowrap",
        }}
      >
        <>
          <Search size={16} />
          Search
        </>
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-search {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </form>
  );
}

/* ---- inline styles ---- */
const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "52px",
  border: `1.5px solid ${G.li}`,
  borderRadius: "12px",
  padding: "0 14px 0 40px",
  fontSize: "14px",
  color: G.ink,
  outline: "none",
  background: "white",
};

const iconBox: React.CSSProperties = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  zIndex: 2,
};

const ddStyle: React.CSSProperties = {
  position: "absolute",
  top: "58px",
  left: 0,
  right: 0,
  background: "white",
  border: `1px solid ${G.li}`,
  borderRadius: "12px",
  boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
  maxHeight: "260px",
  overflowY: "auto",
  zIndex: 100,
};

const ddItem: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "11px 14px",
  border: "none",
  background: "white",
  cursor: "pointer",
  fontSize: "14px",
  color: G.ink,
  textAlign: "left",
};
