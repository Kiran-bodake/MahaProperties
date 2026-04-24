// src/app/(public)/properties/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Navbar as MegaNavbar } from "@/components/layout/navbar/Navbar";
import PropertyImageSlider from "@/components/property/PropertyImageSlider";
import ContactPopup from "@/components/property/ContactPopup";
type Property = {
  id?: string;
  _id?: string;
  slug: string;

  title?: string;
  locality?: string;
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
};

async function getProperties(params: {
  q?: string;
  category?: string;
  locality?: string;
  sortBy?: string;
}) {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      qs.append(key, value);
    }
  });

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/properties?${qs.toString()}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  // FIXED SEARCH PARAMS ERROR
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const locality = searchParams.get("locality") || "";
  const sortBy = searchParams.get("sortBy") || "newest";

  useEffect(() => {
    async function loadData() {
      const data = await getProperties({
        q,
        category,
        locality,
        sortBy,
      });

      const result = Array.isArray(data)
        ? data
        : data.properties || [];

      setProperties(result);
    }

    loadData();
  }, [q, category, locality, sortBy]);

  return (
    <>
      <MegaNavbar />

      {/* CONTACT POPUP */}
      <ContactPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
      />

      <main
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "100px 0 60px",
        }}
      >
        <div
          style={{
            width: "min(1450px,95%)",
            margin: "0 auto",
          }}
        >
          {/* HERO SECTION */}

          <section
            style={{
              background:
                "linear-gradient(135deg,#052e16 0%, #166534 50%, #22c55e 100%)",
              borderRadius: "28px",
              padding: "42px",
              color: "#fff",
              marginBottom: "28px",
              boxShadow: "0 25px 70px rgba(22,163,74,.25)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2rem,5vw,3.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                maxWidth: "800px",
              }}
            >
              Discover Premium Properties in Nashik
            </h1>

            <p
              style={{
                marginTop: "16px",
                maxWidth: "760px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,.9)",
                fontSize: "15px",
              }}
            >
              Explore verified NA plots, commercial properties,
              industrial spaces, warehouses, and investment
              opportunities with trusted pricing and premium
              locations.
            </p>
          </section>

          {/* MAIN LAYOUT */}

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* SIDEBAR */}

            <aside
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "22px",
                border: "1px solid #e5e7eb",
                position: "sticky",
                top: "100px",
                boxShadow: "0 10px 30px rgba(15,23,42,.05)",
              }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  marginBottom: "20px",
                  color: "#111827",
                }}
              >
                Filter Properties
              </div>

              <form method="GET">
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search properties..."
                  style={input}
                />

                <select
                  name="category"
                  defaultValue={category}
                  style={input}
                >
                  <option value="">All Categories</option>
                  <option>NA Plot</option>
                  <option>Agriculture Land</option>
                  <option>Commercial</option>
                  <option>Industrial Shed</option>
                  <option>Warehouse</option>
                  <option>Investment Plot</option>
                </select>

                <input
                  type="text"
                  name="locality"
                  defaultValue={locality}
                  placeholder="Enter locality"
                  style={input}
                />

                <select
                  name="sortBy"
                  defaultValue={sortBy}
                  style={input}
                >
                  <option value="newest">Newest First</option>

                  <option value="price_asc">
                    Price Low → High
                  </option>

                  <option value="price_desc">
                    Price High → Low
                  </option>

                  <option value="popular">
                    Most Popular
                  </option>
                </select>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "16px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      "linear-gradient(135deg,#16a34a,#22c55e)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "15px",
                    marginTop: "6px",
                  }}
                >
                  Apply Filters
                </button>
              </form>
            </aside>

            {/* RIGHT SIDE */}

            <div>
              {/* TOPBAR */}

              <div
                style={{
                  background: "#fff",
                  borderRadius: "22px",
                  padding: "18px 24px",
                  border: "1px solid #e5e7eb",
                  marginBottom: "22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#16a34a",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                    }}
                  >
                    Property Results
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "1.25rem",
                      fontWeight: 900,
                      color: "#111827",
                    }}
                  >
                    {properties.length} Properties Available
                  </div>
                </div>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  Verified listings updated daily
                </div>
              </div>

              {/* PROPERTY LIST */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "22px",
                }}
              >
                {properties.map((p) => {
                  const images =
                    p.images && p.images.length > 0
                      ? p.images
                      : [p.img];

                  return (
                    <Link
                      key={p.id || p._id}
                      href={`/properties/${p.slug}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <article
                        style={{
                          display: "grid",
                          gridTemplateColumns: "360px 1fr",
                          background: "#fff",
                          borderRadius: "26px",
                          overflow: "hidden",
                          border: "1px solid #e5e7eb",
                          boxShadow:
                            "0 12px 40px rgba(15,23,42,.06)",
                        }}
                      >
                        {/* IMAGE */}

                        <div
                          style={{
                            position: "relative",
                            minHeight: "280px",
                            overflow: "hidden",
                          }}
                        >
                          <PropertyImageSlider
                            title={
                              p.title ||
                              p.t ||
                              "Property Image"
                            }
                            images={
                              p.images?.length
                                ? p.images
                                : [p.img, p.img, p.img]
                            }
                          />

                          {/* VERIFIED */}

                          <div
                            style={{
                              position: "absolute",
                              top: "16px",
                              left: "16px",
                              background: "#16a34a",
                              color: "#fff",
                              padding: "8px 14px",
                              borderRadius: "999px",
                              fontSize: "12px",
                              fontWeight: 800,
                              zIndex: 20,
                            }}
                          >
                            VERIFIED
                          </div>

                          {/* BADGE */}

                          {p.badge && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: "16px",
                                left: "16px",
                                background: "#111827",
                                color: "#fff",
                                padding: "8px 14px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                fontWeight: 700,
                                zIndex: 20,
                              }}
                            >
                              {p.badge}
                            </div>
                          )}

                          {/* PHOTO COUNT */}

                          <div
                            style={{
                              position: "absolute",
                              bottom: "16px",
                              right: "16px",
                              background:
                                "rgba(0,0,0,.75)",
                              color: "#fff",
                              padding: "8px 14px",
                              borderRadius: "999px",
                              fontSize: "12px",
                              fontWeight: 700,
                              zIndex: 20,
                            }}
                          >
                            📸 {images.length} Photos
                          </div>
                        </div>

                        {/* CONTENT */}

                        <div
                          style={{
                            padding: "28px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                background: "#ecfdf5",
                                color: "#166534",
                                padding: "8px 14px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                fontWeight: 800,
                                marginBottom: "16px",
                              }}
                            >
                              {p.category || p.cat}
                            </div>

                            <h2
                              style={{
                                margin: 0,
                                fontSize: "1.7rem",
                                fontWeight: 900,
                                color: "#111827",
                                lineHeight: 1.3,
                              }}
                            >
                              {p.title || p.t}
                            </h2>

                            <div
                              style={{
                                marginTop: "12px",
                                color: "#64748b",
                                fontSize: "15px",
                              }}
                            >
                              📍 {p.locality || p.loc}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                marginTop: "22px",
                              }}
                            >
                              <div style={featureBox}>
                                📐 {p.area}
                              </div>

                              <div style={featureBox}>
                                👁 {p.views || 0} views
                              </div>

                              {p.rera && (
                                <div
                                  style={{
                                    ...featureBox,
                                    background:
                                      "#fee2e2",
                                    color: "#b91c1c",
                                    fontWeight: 700,
                                  }}
                                >
                                  RERA Approved
                                </div>
                              )}
                            </div>
                          </div>

                          {/* FOOTER */}

                          <div
                            style={{
                              marginTop: "30px",
                              display: "flex",
                              justifyContent:
                                "space-between",
                              alignItems: "center",
                              flexWrap: "wrap",
                              gap: "18px",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: "2.1rem",
                                  fontWeight: 900,
                                  color: "#166534",
                                }}
                              >
                                {p.price || p.pr}
                              </div>

                              <div
                                style={{
                                  fontSize: "13px",
                                  color: "#64748b",
                                  marginTop: "4px",
                                }}
                              >
                                Negotiable Price
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                gap: "12px",
                              }}
                            >
                              {/* CONTACT BUTTON FIXED */}

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowPopup(true);
                                }}
                                style={secondaryBtn}
                              >
                                Contact
                              </button>

                              <button
                                style={primaryBtn}
                              >
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

              {/* EMPTY */}

              {properties.length === 0 && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "22px",
                    padding: "50px",
                    textAlign: "center",
                    border: "1px solid #e5e7eb",
                    color: "#64748b",
                    marginTop: "20px",
                  }}
                >
                  No matching properties found.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

const input = {
  width: "100%",
  height: "48px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  padding: "0 16px",
  marginBottom: "14px",
  background: "#fff",
  fontSize: "14px",
  outline: "none",
};

const featureBox = {
  background: "#f8fafc",
  padding: "10px 14px",
  borderRadius: "14px",
  fontSize: "13px",
  color: "#334155",
};

const primaryBtn = {
  height: "50px",
  padding: "0 22px",
  borderRadius: "14px",
  border: "none",
  background: "#16a34a",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryBtn = {
  height: "50px",
  padding: "0 22px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111827",
  fontWeight: 700,
  cursor: "pointer",
};