
"use client";
// src/app/(public)/properties/page.tsx

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";


import { Navbar as MegaNavbar } from "@/components/layout/navbar/Navbar";
import PropertyImageSlider from "@/components/property/PropertyImageSlider";
import ContactPopup from "@/components/property/ContactPopup";
import { Footer } from "@/components/layout/footer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type Property = {
  id?: string;
  _id?: string;
  slug: string;
  title?: string;
  locality?: string;
  city?: string;
  price?: string | number;
  category?: string;
  t?: string;
  loc?: string;
  pr?: string | number;
  cat?: string;
  area: string;
  img: string;
  images?: string[];
  views?: number;
  rera?: boolean;
  badge?: string | null;
  createdAt?: string | number | Date;
};

type SortKey = "newest" | "price_asc" | "price_desc" | "popular";

type Filters = {
  q: string;
  category: string[]; // multi-select
  locality: string;
  sortBy: SortKey;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const FAV_KEY = "myFavoriteProperties";

const SORT_LABELS: Record<SortKey, string> = {
  newest: "Newest First",
  price_asc: "Price Low → High",
  price_desc: "Price High → Low",
  popular: "Most Popular",
};

function useDebounced<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function norm(s: unknown): string {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parsePrice(p: unknown): number {
  if (typeof p === "number") return p;
  const s = String(p ?? "").toLowerCase();
  if (!s) return 0;
  const num = parseFloat(s.replace(/[^\d.]/g, ""));
  if (Number.isNaN(num)) return 0;
  if (/cr|crore/.test(s)) return num * 1_00_00_000;
  if (/lakh|lac|l\b/.test(s)) return num * 1_00_000;
  if (/k\b/.test(s)) return num * 1_000;
  return num;
}

function getLocalityParts(p: Property): { locality: string; city: string } {
  const raw = (p.locality || p.loc || "").trim();
  const explicitCity = (p.city || "").trim();
  if (explicitCity) return { locality: raw, city: explicitCity };
  const parts = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return { locality: parts.slice(0, -1).join(", "), city: parts.at(-1)! };
  }
  return { locality: "", city: raw };
}

/* ------------------------------------------------------------------ */
/*  Favorites helpers (localStorage)                                   */
/* ------------------------------------------------------------------ */
function getPropKey(p: Property): string {
  return String(p.id || p._id || p.slug);
}

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  API                                                                */
/* ------------------------------------------------------------------ */
async function fetchAllProperties(signal?: AbortSignal): Promise<Property[]> {
  const res = await fetch(`${BASE_URL}/api/properties`, {
    cache: "no-store",
    signal,
  });
  if (!res.ok) throw new Error("Failed to fetch properties");
  const data = await res.json();
  return Array.isArray(data) ? data : data.properties || [];
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */
export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const location = searchParams.get("location");

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  // ✅ SELECTED PROPERTY FOR CONTACT POPUP
  const [selectedProperty, setSelectedProperty] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toast, setToast] = useState<string>("");

  const [filters, setFilters] = useState<Filters>({
    q: searchParams.get("q") || "",
    category: searchParams.getAll("category") || [],
    locality: searchParams.get("locality") || "",
    sortBy: (searchParams.get("sortBy") as SortKey) || "newest",
  });

  useEffect(() => {
    if (type || location) {
      setFilters((prev) => ({
        ...prev,
        category: type ? [type] : prev.category,
        locality: location || prev.locality,
      }));
    }
  }, [type, location]);

  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [activeCityIdx, setActiveCityIdx] = useState<number>(-1);
  const [catInput, setCatInput] = useState("");

  const debouncedFilters = useDebounced(filters, 250);

  const btnRef = useRef<HTMLButtonElement>(null);
  const cityWrapRef = useRef<HTMLDivElement>(null);
  const catWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setSidebarVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setFavorites(readFavorites());
    const sync = () => setFavorites(readFavorites());
    window.addEventListener("favorites-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("favorites-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetchAllProperties(ctrl.signal)
      .then(setAllProperties)
      .catch((e) => {
        if (e?.name !== "AbortError") {
          console.error("Property fetch error:", e);
          setAllProperties([]);
        }
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    const qs = new URLSearchParams();
    if (debouncedFilters.q) qs.append("q", debouncedFilters.q);
    debouncedFilters.category.forEach((cat) => qs.append("category", cat));
    if (debouncedFilters.locality) qs.append("locality", debouncedFilters.locality);
    if (debouncedFilters.sortBy !== "newest") qs.append("sortBy", debouncedFilters.sortBy);
    if (type) qs.set("type", type);
    if (location) qs.set("location", location);
    const next = qs.toString();
    router.replace(next ? `?${next}` : "?", { scroll: false });
  }, [debouncedFilters, router, type, location]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (cityWrapRef.current && !cityWrapRef.current.contains(e.target as Node)) {
        setShowCityDropdown(false);
      }
      if (catWrapRef.current && !catWrapRef.current.contains(e.target as Node)) {
        setShowCatDropdown(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const { cities, localities } = useMemo(() => {
    const cSet = new Set<string>();
    const lSet = new Set<string>();
    allProperties.forEach((p) => {
      const { city, locality } = getLocalityParts(p);
      if (city) cSet.add(city);
      if (locality) lSet.add(`${locality}, ${city}`);
    });
    return { cities: [...cSet].sort(), localities: [...lSet].sort() };
  }, [allProperties]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set<string>();
    allProperties.forEach((p) => {
      const c = (p.category || p.cat || "").trim();
      if (c) cats.add(c);
    });
    return [...cats].sort();
  }, [allProperties]);

  const locationSuggestions = useMemo(() => {
    const q = norm(debouncedFilters.locality);
    if (!q) return [] as Array<{ label: string; type: "city" | "locality" }>;
    const cityMatches = cities
      .filter((c) => norm(c).includes(q))
      .map((c) => ({ label: c, type: "city" as const }));
    const localityMatches = localities
      .filter((l) => norm(l).includes(q))
      .map((l) => ({ label: l, type: "locality" as const }));
    const seen = new Set<string>();
    const merged = [...cityMatches, ...localityMatches].filter((s) => {
      const k = norm(s.label);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    return merged.slice(0, 8);
  }, [debouncedFilters.locality, cities, localities]);

  const categorySuggestions = useMemo(() => {
    const q = norm(catInput);
    if (!q) return uniqueCategories.slice(0, 8);
    return uniqueCategories.filter((c) => norm(c).includes(q)).slice(0, 8);
  }, [catInput, uniqueCategories]);

const properties = useMemo(() => {
  const q = norm(debouncedFilters.q);
  const selectedCats = debouncedFilters.category.map((c) => norm(c));
  const loc = norm(debouncedFilters.locality);

  let list = allProperties.filter((p) => {
    const title = norm(p.title || p.t || "");
    const category = norm(p.category || p.cat || "");
    const locality = norm(p.locality || p.loc || "");
    const city = norm(p.city || "");
    const area = norm(p.area || "");

    // ✅ one searchable string
    const searchText = `
      ${title}
      ${category}
      ${locality}
      ${city}
      ${area}
    `;

    // ✅ SEARCH FROM MAIN SEARCH BOX
    if (q && !searchText.includes(q)) {
      return false;
    }

    // ✅ CATEGORY FILTER
    if (
      selectedCats.length > 0 &&
      !selectedCats.includes(category)
    ) {
      return false;
    }

    // ✅ LOCATION FILTER
    if (
      loc &&
      !locality.includes(loc) &&
      !city.includes(loc) &&
      !area.includes(loc)
    ) {
      return false;
    }

    return true;
  });

  switch (debouncedFilters.sortBy) {
    case "price_asc":
      list = [...list].sort(
        (a, b) =>
          parsePrice(a.price ?? a.pr) -
          parsePrice(b.price ?? b.pr)
      );
      break;

    case "price_desc":
      list = [...list].sort(
        (a, b) =>
          parsePrice(b.price ?? b.pr) -
          parsePrice(a.price ?? a.pr)
      );
      break;

    case "popular":
      list = [...list].sort(
        (a, b) => (b.views ?? 0) - (a.views ?? 0)
      );
      break;

    case "newest":
    default:
      list = [...list].sort((a, b) => {
        const da = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;

        const db = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return db - da;
      });
      break;
  }

  return list;
}, [allProperties, debouncedFilters]);

  const setF = useCallback(<K extends keyof Filters>(k: K, v: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [k]: v }));
  }, []);

  const toggleCategory = (cat: string) => {
    setFilters((prev) => {
      const updated = prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat];
      return { ...prev, category: updated };
    });
  };

  const resetFilters = () =>
    setFilters({ q: "", category: [], locality: "", sortBy: "newest" });

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
  };

  const toggleFavorite = (e: React.MouseEvent, p: Property) => {
    e.preventDefault();
    e.stopPropagation();
    const key = getPropKey(p);
    const stored: string[] = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    let updated: string[];
    if (stored.includes(key)) {
      updated = stored.filter((id) => id !== key);
      setToast("Removed from favorites");
    } else {
      updated = [...stored, key];
      setToast("Added to favorites ❤");
    }
    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
    setFavorites(updated);
    setTimeout(() => setToast(""), 1800);
  };

  const onCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showCityDropdown || locationSuggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveCityIdx((i) => Math.min(i + 1, locationSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveCityIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = locationSuggestions[activeCityIdx] ?? locationSuggestions[0];
      if (pick) {
        setF("locality", pick.label);
        setShowCityDropdown(false);
      }
    } else if (e.key === "Escape") {
      setShowCityDropdown(false);
    }
  };

  const activeFiltersCount =
    Number(!!filters.q) +
    Number(filters.category.length > 0) +
    Number(!!filters.locality) +
    Number(filters.sortBy !== "newest");

  const appliedChips: Array<{
    key: keyof Filters | string;
    label: string;
    value: string;
    icon: string;
  }> = [];
  if (filters.q)
    appliedChips.push({ key: "q", label: "Search", value: filters.q, icon: "🔍" });
  filters.category.forEach((cat) => {
    appliedChips.push({ key: `cat-${cat}`, label: "Type", value: cat, icon: "🏷️" });
  });
  if (filters.locality)
    appliedChips.push({ key: "locality", label: "Location", value: filters.locality, icon: "📍" });
  if (filters.sortBy !== "newest")
    appliedChips.push({ key: "sortBy", label: "Sort", value: SORT_LABELS[filters.sortBy], icon: "↕️" });

  const clearChip = (key: keyof Filters | string) => {
    if (key === "sortBy") setF("sortBy", "newest");
    else if (key === "q") setF("q", "");
    else if (key === "locality") setF("locality", "");
    else if (typeof key === "string" && key.startsWith("cat-")) {
      const cat = key.replace("cat-", "");
      toggleCategory(cat);
    }
  };

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <>
      <MegaNavbar />

      {/* ✅ PASS REAL propertyId & propertyName TO POPUP */}
      <ContactPopup
        open={showPopup}
        onClose={() => {
          setShowPopup(false);
          setSelectedProperty(null);
        }}
        propertyId={selectedProperty?.id}
        propertyName={selectedProperty?.name}
      />

      <main className="page">
        <div className="container">
          {/* HERO */}
          <section className="hero">
            <h1>Find Premium Properties in Nashik</h1>
            <p>
              Explore verified NA plots, commercial properties, warehouses and
              investment opportunities in prime locations.
            </p>

            <Link href="/favorites" className="favLink">
              <span className="favLinkHeart">❤</span>
              My Favorites
              <span className="favLinkCount">{favorites.length}</span>
            </Link>
          </section>

          <section className="layout">
            {/* SIDEBAR */}
            <aside className={`sidebar ${sidebarVisible ? "sidebar--visible" : ""}`}>
              <div className="glassOverlay" />
              <div className="sidebarInner">
                <div className="filterHeader">
                  <h3>
                    <span className="filterIcon"></span>
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="activeDot">{activeFiltersCount}</span>
                    )}
                  </h3>
                  <span className="resultBadge">
                    {loading ? "…" : `${properties.length} Results`}
                  </span>
                </div>

                <div className="filterForm">
                  {/* SEARCH */}
                  <div className="filterGroup">
                    <label htmlFor="f-search">Search Property</label>
                    <div className="inputWrap">
                      <input
                        id="f-search"
                        type="text"
                        placeholder='Try "NA plots", "warehouse"…'
                        className="input"
                        value={filters.q}
                        onChange={(e) => setF("q", e.target.value)}
                      />
                      {filters.q && (
                        <button
                          type="button"
                          className="clearBtn"
                          aria-label="Clear search"
                          onClick={() => setF("q", "")}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  {/* CATEGORY — MULTI SELECT */}
                  <div className="filterGroup">
                    <label htmlFor="f-cat">Property Type</label>
                    <div className="inputWrap" ref={catWrapRef}>
                      <input
                        id="f-cat"
                        type="text"
                        placeholder="Residential, NA Plot, Warehouse…"
                        className="input"
                        value={catInput}
                        autoComplete="off"
                        onFocus={() => setShowCatDropdown(true)}
                        onChange={(e) => {
                          setCatInput(e.target.value);
                          setShowCatDropdown(true);
                        }}
                      />

                      {filters.category.length > 0 && (
                        <div className="selectedTags">
                          {filters.category.map((cat) => (
                            <span key={cat} className="selectedTag">
                              {cat}
                              <button
                                type="button"
                                onClick={() => toggleCategory(cat)}
                                className="selectedTagClose"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {showCatDropdown && categorySuggestions.length > 0 && (
                        <div className="dropdown" role="listbox">
                          {categorySuggestions.map((cat) => (
                            <button
                              type="button"
                              key={cat}
                              className={`dropItem ${
                                filters.category.includes(cat) ? "dropItem--selected" : ""
                              }`}
                              onClick={() => {
                                toggleCategory(cat);
                                setCatInput("");
                              }}
                            >
                              <span className="dropCheckbox">
                                {filters.category.includes(cat) ? "✓" : ""}
                              </span>
                              <span className="dropIcon">🏷️</span>
                              {cat}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="filterGroup">
                    <label htmlFor="f-loc">City / Location</label>
                    <div className="inputWrap" ref={cityWrapRef}>
                      <input
                        id="f-loc"
                        type="text"
                        placeholder="Type a city or locality…"
                        className="input"
                        value={filters.locality}
                        autoComplete="off"
                        onFocus={() => setShowCityDropdown(true)}
                        onChange={(e) => {
                          setF("locality", e.target.value);
                          setShowCityDropdown(true);
                          setActiveCityIdx(-1);
                        }}
                        onKeyDown={onCityKeyDown}
                      />
                      {filters.locality && (
                        <button
                          type="button"
                          className="clearBtn"
                          aria-label="Clear location"
                          onClick={() => setF("locality", "")}
                        >
                          ×
                        </button>
                      )}
                      {showCityDropdown && locationSuggestions.length > 0 && (
                        <div className="dropdown" role="listbox">
                          {locationSuggestions.map((s, i) => (
                            <button
                              type="button"
                              key={s.label}
                              className={`dropItem ${
                                i === activeCityIdx ? "dropItem--active" : ""
                              }`}
                              onClick={() => {
                                setF("locality", s.label);
                                setShowCityDropdown(false);
                              }}
                              onMouseEnter={() => setActiveCityIdx(i)}
                            >
                              <span className="dropIcon">
                                {s.type === "city" ? "🏙️" : "📍"}
                              </span>
                              <span className="dropLabel">{s.label}</span>
                              <span className="dropTag">{s.type}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      {showCityDropdown &&
                        filters.locality &&
                        locationSuggestions.length === 0 && (
                          <div className="dropdown">
                            <div className="dropEmpty">No matches</div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* SORT */}
                  <div className="filterGroup">
                    <label htmlFor="f-sort">Sort By</label>
                    <div className="inputWrap">
                      <select
                        id="f-sort"
                        className="input"
                        value={filters.sortBy}
                        onChange={(e) => setF("sortBy", e.target.value as SortKey)}
                      >
                        <option value="newest">Newest First</option>
                        <option value="price_asc">Price Low → High</option>
                        <option value="price_desc">Price High → Low</option>
                        <option value="popular">Most Popular</option>
                      </select>
                    </div>
                  </div>

                  {/* ACTION ROW */}
                  <div className="filterGroup actionRow">
                    <button
                      ref={btnRef}
                      type="button"
                      className="filterBtn"
                      onClick={handleRipple}
                    >
                      {ripple && (
                        <span
                          className="ripple"
                          style={{ left: ripple.x, top: ripple.y }}
                        />
                      )}
                      {loading ? "Loading…" : "Apply Filters"}
                    </button>
                    {activeFiltersCount > 0 && (
                      <button type="button" className="resetBtn" onClick={resetFilters}>
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <div className="content">
              {appliedChips.length > 0 && (
                <section className="appliedBar" aria-label="Applied filters">
                  <div className="appliedLeft">
                    <span className="appliedTitle">
                      <span className="appliedDot" />
                      Applied Filters
                      <span className="appliedCount">{appliedChips.length}</span>
                    </span>
                    <div className="chips">
                      {appliedChips.map((chip) => (
                        <span key={chip.key} className="chip">
                          <span className="chipIcon">{chip.icon}</span>
                          <span className="chipLabel">{chip.label}:</span>
                          <span className="chipValue">{chip.value}</span>
                          <button
                            type="button"
                            className="chipClose"
                            aria-label={`Remove ${chip.label} filter`}
                            onClick={() => clearChip(chip.key)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <button type="button" className="clearAllBtn" onClick={resetFilters}>
                    Clear All
                  </button>
                </section>
              )}

              <div className="topbar">
                <div>
                  <span className="topLabel">PROPERTY RESULTS</span>
                  <h2>
                    {loading ? "Loading…" : `${properties.length} Properties Available`}
                  </h2>
                </div>
                <p>Verified listings updated daily</p>
              </div>

              <div className="list">
                {properties.map((p) => {
                  const images = p.images && p.images.length > 0 ? p.images : [p.img];
                  const key = getPropKey(p);
                  const isFav =
                    typeof window !== "undefined" &&
                    JSON.parse(localStorage.getItem(FAV_KEY) || "[]").includes(key);
                  return (
                    <Link
                      key={p.id || p._id || p.slug}
                      href={`/properties/${p.slug}`}
                      className="cardLink"
                    >
                      <article className="card">
                        <div className="imageWrap">
                          <PropertyImageSlider
                            title={p.title || p.t || "Property"}
                            images={p.images?.length ? p.images : [p.img, p.img, p.img]}
                          />
                          <div className="verified">VERIFIED</div>
                          {p.badge && <div className="badge">{p.badge}</div>}
                          <div className="photoCount">📸 {images.length}</div>

                          <button
                            type="button"
                            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                            aria-pressed={isFav}
                            className={`favBtn ${isFav ? "favBtn--active" : ""}`}
                            onClick={(e) => toggleFavorite(e, p)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              fill={isFav ? "#ffffff" : "none"}
                              stroke={isFav ? "#ffffff" : "#111827"}
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </button>
                        </div>
                        <div className="cardContent">
                          <div>
                            <div className="category">{p.category || p.cat}</div>
                            <h3 className="title">{p.title || p.t}</h3>
                            <p className="location">📍 {p.locality || p.loc}</p>
                            <div className="features">
                              <div className="feature">📐 {p.area}</div>
                              <div className="feature">👁 {p.views || 0} views</div>
                              {p.rera && <div className="rera">RERA Approved</div>}
                            </div>
                          </div>
                          <div className="footer">
                            <div>
                              <div className="price">{p.price || p.pr}</div>
                              <span className="neg">Negotiable</span>
                            </div>
                            <div className="btns">
                              {/* ✅ CAPTURE PROPERTY ID + NAME ON CONTACT CLICK */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedProperty({
                                    id: String(p.id || p._id || p.slug),
                                    name: p.title || p.t || "Property",
                                  });
                                  setShowPopup(true);
                                }}
                                className="secondaryBtn"
                              >
                                Contact
                              </button>
                              <button type="button" className="primaryBtn">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>

              {!loading && properties.length === 0 && (
                <div className="empty">
                  <div className="emptyIcon">🏚️</div>
                  <h3>No matching properties found</h3>
                  <p>Try adjusting your filters or searching another city.</p>
                  <button type="button" className="primaryBtn" onClick={resetFilters}>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {toast && <div className="toast">{toast}</div>}

        {/* ============ STYLES ============ */}
        <style jsx>{`
          .page { background: #f0f4f8; min-height: 100vh; padding: 16px 0 40px; }
          .container { width: min(1400px, 94%); margin: auto; }

          .hero {
            background: linear-gradient(135deg, #052e16, #166534, #22c55e);
            border-radius: 20px;
            padding: 24px;
            color: white;
            margin-bottom: 20px;
            position: relative;
          }
          .hero h1 { margin: 0; font-size: 2.2rem; font-weight: 800; }
          .hero p { margin-top: 10px; max-width: 700px; line-height: 1.5; }

          .favLink {
            position: absolute;
            top: 20px;
            right: 20px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.35);
            color: white;
            padding: 9px 14px;
            border-radius: 999px;
            font-weight: 700;
            font-size: 13px;
            text-decoration: none;
            transition: background .2s ease, transform .2s ease;
          }
          .favLink:hover { background: rgba(255,255,255,0.25); transform: translateY(-1px); }
          .favLinkHeart { color: #fecaca; font-size: 14px; }
          .favLinkCount {
            background: white;
            color: #166534;
            min-width: 22px;
            height: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
            padding: 0 7px;
            font-size: 12px;
            font-weight: 800;
          }

          .appliedBar { background: white; border: 1px solid #e5e7eb; border-radius: 16px; padding: 14px 16px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; box-shadow: 0 4px 14px rgba(0,0,0,0.04); animation: slideDown 0.3s ease; }
          @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
          .appliedLeft { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; flex: 1; min-width: 0; }
          .appliedTitle { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; color: #14532d; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
          .appliedDot { width: 8px; height: 8px; border-radius: 50%; background: #16a34a; box-shadow: 0 0 0 4px rgba(34,197,94,0.2); }
          .appliedCount { background: #16a34a; color: white; font-size: 11px; min-width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 0 6px; }
          .chips { display: flex; flex-wrap: wrap; gap: 8px; }
          .chip { display: inline-flex; align-items: center; gap: 6px; background: #ecfdf5; border: 1px solid #bbf7d0; color: #166534; padding: 6px 6px 6px 12px; border-radius: 999px; font-size: 13px; font-weight: 600; max-width: 100%; transition: background .15s ease, border-color .15s ease; }
          .chip:hover { background: #dcfce7; border-color: #86efac; }
          .chipIcon { font-size: 13px; }
          .chipLabel { color: #059669; font-weight: 700; font-size: 12px; }
          .chipValue { color: #111827; font-weight: 600; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .chipClose { width: 22px; height: 22px; border-radius: 999px; border: none; background: rgba(22,163,74,0.15); color: #14532d; font-size: 16px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .15s ease, color .15s ease, transform .15s ease; }
          .chipClose:hover { background: #16a34a; color: white; transform: rotate(90deg); }
          .clearAllBtn { height: 36px; padding: 0 14px; border-radius: 10px; border: 1px solid #fca5a5; background: #fef2f2; color: #b91c1c; font-weight: 700; font-size: 12px; cursor: pointer; white-space: nowrap; transition: background .15s ease, color .15s ease; }
          .clearAllBtn:hover { background: #b91c1c; color: white; border-color: #b91c1c; }

          .topbar { background: white; border-radius: 18px; padding: 18px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; }
          .topLabel { color: #16a34a; font-size: 11px; font-weight: 800; }
          .topbar h2 { margin: 6px 0 0; }

          .layout { display: grid; grid-template-columns: 300px 1fr; gap: 20px; align-items: start; }

          .sidebar { position: sticky; top: 90px; align-self: start; max-height: calc(100vh - 110px); overflow-y: auto; border-radius: 22px; opacity: 0; transform: translateX(-24px); transition: opacity .5s ease, transform .5s ease; scrollbar-width: none; -ms-overflow-style: none; }
          .sidebar::-webkit-scrollbar { display: none; }
          .sidebar--visible { opacity: 1; transform: translateX(0); }

          .glassOverlay { position: absolute; inset: 0; background: rgba(255,255,255,0.92); backdrop-filter: blur(18px); border-radius: 22px; border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
          .sidebarInner { position: relative; z-index: 2; padding: 18px; }

          .filterHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
          .filterHeader h3 { margin: 0; font-size: 1rem; font-weight: 800; color: #14532d; display: flex; align-items: center; gap: 8px; }
          .activeDot { background: #16a34a; color: white; font-size: 11px; min-width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 0 7px; }
          .filterIcon { width: 30px; height: 30px; border-radius: 10px; background: #16a34a; display: flex; align-items: center; justify-content: center; color: white; }
          .resultBadge { background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 800; }

          .filterForm { display: flex; flex-direction: column; gap: 14px; }
          .filterGroup label { display: block; margin-bottom: 8px; font-size: 12px; font-weight: 700; color: #374151; }
          .inputWrap { position: relative; }
          .input { width: 100%; height: 46px; border-radius: 14px; border: 1px solid #d1d5db; padding: 0 38px 0 14px; background: rgba(255,255,255,0.95); font-size: 14px; color: #111827; outline: none; transition: border-color .2s ease, box-shadow .2s ease; }
          .input:focus { border-color: #16a34a; box-shadow: 0 0 0 4px rgba(34,197,94,0.15); }
          .clearBtn { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 22px; height: 22px; border-radius: 999px; border: none; background: #e5e7eb; color: #374151; font-size: 16px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; }
          .clearBtn:hover { background: #16a34a; color: white; }

          .selectedTags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 6px 10px;
            background: #ecfdf5;
            border-radius: 10px;
            margin-top: 8px;
          }
          .selectedTag {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: white;
            border: 1px solid #bbf7d0;
            color: #166534;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
          }
          .selectedTagClose {
            width: 16px;
            height: 16px;
            border: none;
            background: rgba(22, 163, 74, 0.2);
            color: #166534;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            padding: 0;
            line-height: 1;
          }
          .selectedTagClose:hover {
            background: #16a34a;
            color: white;
          }

          .dropdown { position: absolute; top: 52px; left: 0; width: 100%; background: white; border: 1px solid #e5e7eb; border-radius: 14px; z-index: 999; max-height: 280px; overflow-y: auto; box-shadow: 0 14px 40px rgba(0,0,0,0.12); animation: fadeIn .15s ease; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

          .dropItem {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 11px 14px;
            border: none;
            background: white;
            cursor: pointer;
            font-size: 14px;
            color: #111827;
            text-align: left;
            transition: background .15s ease;
          }
          .dropItem:hover, .dropItem--active { background: #ecfdf5; color: #166534; }

          .dropCheckbox {
            width: 18px;
            height: 18px;
            border: 2px solid #d1d5db;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: white;
            font-weight: 700;
            transition: background .15s ease, border-color .15s ease;
          }
          .dropItem--selected .dropCheckbox {
            background: #16a34a;
            border-color: #16a34a;
          }

          .dropIcon { font-size: 14px; }
          .dropLabel { flex: 1; }
          .dropTag { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #16a34a; background: #dcfce7; padding: 2px 7px; border-radius: 999px; font-weight: 700; }
          .dropEmpty { padding: 14px; font-size: 13px; color: #6b7280; text-align: center; }

          .actionRow { display: flex; gap: 8px; }
          .filterBtn { flex: 1; height: 48px; border: none; border-radius: 14px; background: linear-gradient(135deg, #16a34a, #22c55e); color: white; font-weight: 800; cursor: pointer; position: relative; overflow: hidden; transition: transform .15s ease, box-shadow .2s ease; }
          .filterBtn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(22,163,74,0.35); }
          .resetBtn { height: 48px; padding: 0 14px; border-radius: 14px; border: 1px solid #d1d5db; background: white; color: #374151; font-weight: 700; cursor: pointer; }
          .resetBtn:hover { background: #f3f4f6; }
          .ripple { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.5); animation: ripple .6s linear; pointer-events: none; }
          @keyframes ripple { from { transform: scale(0); opacity: 1; } to { transform: scale(20); opacity: 0; } }

          .content { min-width: 0; }

          .list { display: flex; flex-direction: column; gap: 16px; }
          .cardLink { text-decoration: none; }
          .card { display: grid; grid-template-columns: 260px 1fr; background: white; border-radius: 18px; overflow: hidden; border: 1px solid #e5e7eb; transition: transform .2s ease, box-shadow .2s ease; }
          .card:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); }
          .imageWrap { position: relative; min-height: 200px; }
          .verified, .badge, .photoCount { position: absolute; z-index: 10; padding: 6px 10px; border-radius: 999px; font-size: 10px; color: white; font-weight: 700; }
          .verified { top: 10px; left: 10px; background: #16a34a; }
          .badge { bottom: 10px; left: 10px; background: black; }
          .photoCount { bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); }

          .favBtn {
            position: absolute;
            top: 12px;
            left: 850px;
            z-index: 50;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
            transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          }
          .favBtn:hover { transform: scale(1.08); background: #ffffff; box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22); }
          .favBtn:active { transform: scale(0.92); }
          .favBtn--active { background: #e11d48; }
          .favBtn--active:hover { background: #be123c; }
          .favBtn svg { transition: transform 0.2s ease; }
          .favBtn--active svg { animation: heartPop 0.35s ease; }
          @keyframes heartPop {
            0% { transform: scale(1); }
            40% { transform: scale(1.35); }
            100% { transform: scale(1); }
          }

          .cardContent { padding: 16px; display: flex; flex-direction: column; justify-content: space-between; }
          .category { display: inline-flex; background: #ecfdf5; color: #166534; padding: 6px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; margin-bottom: 10px; width: fit-content; }
          .title { margin: 0; color: #111827; }
          .location { margin-top: 8px; color: #64748b; }
          .features { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
          .feature, .rera { padding: 8px 10px; border-radius: 10px; font-size: 12px; }
          .feature { background: #f1f5f9; color: #334155; }
          .rera { background: #fee2e2; color: #b91c1c; font-weight: 700; }
          .footer { margin-top: 14px; display: flex; justify-content: space-between; align-items: center; }
          .price { color: #166534; font-size: 1.3rem; font-weight: 900; }
          .neg { font-size: 12px; color: #64748b; }
          .btns { display: flex; gap: 8px; }
          .primaryBtn, .secondaryBtn { height: 40px; padding: 0 16px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; transition: transform .15s ease, opacity .15s ease; }
          .primaryBtn:hover, .secondaryBtn:hover { transform: translateY(-1px); }
          .primaryBtn { border: none; background: #16a34a; color: white; }
          .secondaryBtn { border: 1px solid #d1d5db; background: white; color: #111827; }

          .empty { background: white; padding: 40px; border-radius: 18px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
          .emptyIcon { font-size: 42px; }
          .empty h3 { margin: 0; color: #111827; }
          .empty p { margin: 0; color: #6b7280; }
          .empty .primaryBtn { margin-top: 8px; }

          .toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #111827;
            color: white;
            padding: 12px 22px;
            border-radius: 999px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            z-index: 9999;
            animation: toastIn .25s ease;
          }
          @keyframes toastIn {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }

          @media (max-width: 1024px) {
            .layout { grid-template-columns: 1fr; }
            .sidebar { position: relative; top: 0; max-height: none; overflow: visible; }
            .favLink { position: static; margin-top: 14px; }
          }
          @media (max-width: 768px) {
            .card { grid-template-columns: 1fr; }
            .footer { flex-direction: column; align-items: stretch; gap: 12px; }
            .btns { width: 100%; }
            .primaryBtn, .secondaryBtn { width: 100%; }
            .appliedBar { flex-direction: column; align-items: stretch; }
            .clearAllBtn { align-self: flex-end; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}