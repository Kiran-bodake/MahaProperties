"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Navbar as MegaNavbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer";
import PropertyImageSlider from "@/components/property/PropertyImageSlider";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const FAV_KEY = "myFavoriteProperties";

type Property = {
  id?: string;
  _id?: string;
  slug: string;

  title?: string;
  t?: string;

  locality?: string;
  loc?: string;

  price?: string | number;
  pr?: string | number;

  category?: string;
  cat?: string;

  area: string;
  img: string;
  images?: string[];

  views?: number;
  rera?: boolean;
};

const getKey = (p: Property) =>
  String(p.id || p._id || p.slug);

export default function FavoritesPage() {
  const [all, setAll] = useState<Property[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setFavs(
        JSON.parse(localStorage.getItem(FAV_KEY) || "[]")
      );
    } catch {
      setFavs([]);
    }

    fetch(`${BASE_URL}/api/properties`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((d) =>
        setAll(Array.isArray(d) ? d : d.properties || [])
      )
      .catch(() => setAll([]))
      .finally(() => setLoading(false));
  }, []);

  const remove = (key: string) => {
    const next = favs.filter((k) => k !== key);

    setFavs(next);

    localStorage.setItem(
      FAV_KEY,
      JSON.stringify(next)
    );

    window.dispatchEvent(
      new Event("favorites-updated")
    );
  };

  const list = all.filter((p) =>
    favs.includes(getKey(p))
  );

  return (
    <>
      <MegaNavbar />

      <main
        style={{
          background: "#f0f4f8",
          minHeight: "100vh",
          padding: "30px 0 60px",
        }}
      >
        <div
          style={{
            width: "min(1200px, 94%)",
            margin: "auto",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background:
                "linear-gradient(135deg,#052e16,#166534,#22c55e)",
              borderRadius: 20,
              padding: 28,
              color: "white",
              marginBottom: 24,
            }}
          >
           <h1
  style={{
    margin: 0,
    fontSize: "2rem",
    fontWeight: 800,
    color: "#ffffff",
  }}
>
  ❤ My Favorite Properties
</h1>

            <p style={{ marginTop: 8 }}>
              {loading
                ? "Loading…"
                : `${list.length} saved propert${
                    list.length === 1
                      ? "y"
                      : "ies"
                  }`}
            </p>
          </div>

          {/* EMPTY STATE */}
          {!loading && list.length === 0 && (
            <div
              style={{
                background: "white",
                padding: 50,
                borderRadius: 18,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 50 }}>
                💔
              </div>

              <h3
                style={{
                  margin: "12px 0",
                  color: "#111827",
                }}
              >
                No favorites yet
              </h3>

              <p style={{ color: "#6b7280" }}>
                Browse properties and tap the
                heart to save them here.
              </p>

              <Link
                href="/properties"
                style={{
                  display: "inline-block",
                  marginTop: 14,
                  background: "#16a34a",
                  color: "white",
                  padding: "10px 22px",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Browse Properties
              </Link>
            </div>
          )}

          {/* PROPERTY GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {list.map((p) => {
              const k = getKey(p);

              return (
                <article
                  key={k}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    overflow: "hidden",
                    border:
                      "1px solid #e5e7eb",
                    position: "relative",
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      position: "relative",
                      minHeight: 180,
                    }}
                  >
                    <PropertyImageSlider
                      title={
                        p.title ||
                        p.t ||
                        "Property"
                      }
                      images={
                        p.images?.length
                          ? p.images
                          : [p.img]
                      }
                    />

                    {/* HEART BUTTON */}
                    <button
                      onClick={() =>
                        remove(k)
                      }
                      aria-label="Remove from favorites"
                      style={{
                        position:
                          "absolute",
                        top: 10,
                        right: 10,

                        width: 42,
                        height: 42,

                        borderRadius:
                          "50%",

                        border: "none",

                        background:
                          "#ffffff",

                        cursor: "pointer",

                        boxShadow:
                          "0 4px 12px rgba(0,0,0,0.15)",

                        zIndex: 10,

                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",

                        padding: 0,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="#e11d48"
                        stroke="#e11d48"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          display:
                            "block",
                        }}
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* CONTENT */}
                  <Link
                    href={`/properties/${p.slug}`}
                    style={{
                      display: "block",
                      padding: 16,
                      textDecoration:
                        "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "inline-block",

                        background:
                          "#ecfdf5",

                        color:
                          "#166534",

                        padding:
                          "5px 10px",

                        borderRadius:
                          999,

                        fontSize: 11,

                        fontWeight: 700,

                        marginBottom: 8,
                      }}
                    >
                      {p.category ||
                        p.cat}
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        color:
                          "#111827",
                      }}
                    >
                      {p.title || p.t}
                    </h3>

                    <p
                      style={{
                        marginTop: 6,
                        color:
                          "#64748b",
                        fontSize: 14,
                      }}
                    >
                      📍{" "}
                      {p.locality ||
                        p.loc}
                    </p>

                    <div
                      style={{
                        marginTop: 12,
                        color:
                          "#166534",

                        fontWeight: 900,

                        fontSize:
                          "1.2rem",
                      }}
                    >
                      {p.price || p.pr}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}