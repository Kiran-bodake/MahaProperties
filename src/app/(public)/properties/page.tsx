// src/app/properties/page.tsx
import { Navbar as MegaNavbar } from "@/components/layout/navbar/Navbar";
import Link from "next/link";

// type Property = {
//   id?: string;
//   _id?: string;
//   slug: string;
//   title: string;
//   locality: string;
//   price: string | number;
//   area: string;
//   category: string;
//   img: string;
//   views?: number;
//   rera?: boolean;
//   badge?: string | null;
// };

type SearchParams = {
  category?: string;
  locality?: string;
  q?: string;
  sortBy?: string;
};

type Property = {
  id?: string;
  _id?: string;
  slug: string;

  // New schema
  title?: string;
  locality?: string;
  price?: string | number;
  category?: string;

  // Old schema (temporary support)
  t?: string;
  loc?: string;
  pr?: string | number;
  cat?: string;

  area: string;
  img: string;
  views?: number;
  rera?: boolean;
  badge?: string | null;
};

async function getProperties(searchParams: SearchParams) {
  const qs = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) qs.append(key, value);
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/properties?${qs.toString()}`,
    { cache: "no-store" },
  );

  return res.json();
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await getProperties(searchParams);

  const properties: Property[] = Array.isArray(data)
    ? data
    : data.properties || [];

  return (
    <>
      <MegaNavbar />
      <main
        style={{
          background: "linear-gradient(to bottom,#f8fafc,#ffffff)",
          minHeight: "100vh",
          padding: "96px 0 60px",
        }}
      >
        <div
          style={{
            width: "min(1320px,94%)",
            margin: "0 auto",
          }}
        >
          {/* HERO BAR */}
          <section
            style={{
              background: "linear-gradient(135deg,#052e16,#166534,#16a34a)",
              borderRadius: "24px",
              padding: "28px",
              color: "white",
              marginBottom: "24px",
              boxShadow: "0 25px 60px rgba(22,163,74,.18)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                opacity: 0.9,
                marginBottom: "10px",
              }}
            ></div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                maxWidth: "700px",
                color: "#ffffff",
              }}
            >
              Find Verified Properties in Nashik
            </h1>

            <p
              style={{
                marginTop: "10px",
                maxWidth: "620px",
                color: "rgba(255,255,255,.86)",
                lineHeight: 1.6,
              }}
            >
              Search NA plots, agriculture land, commercial, warehouse &
              investment properties with transparent pricing.
            </p>
          </section>

          {/* LAYOUT */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "300px 1fr",
              gap: "22px",
            }}
          >
            {/* SIDEBAR */}
            <aside
              style={{
                background: "white",
                borderRadius: "20px",
                border: "1px solid #e5e7eb",
                padding: "18px",
                height: "fit-content",
                position: "sticky",
                top: "20px",
                boxShadow: "0 10px 25px rgba(15,23,42,.04)",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: "#111827",
                  marginBottom: "16px",
                }}
              >
                Filter Search
              </div>

              <form method="GET">
                <input
                  type="text"
                  name="q"
                  defaultValue={searchParams.q || ""}
                  placeholder="Search keywords..."
                  style={input}
                />

                <select
                  name="category"
                  defaultValue={searchParams.category || ""}
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
                  defaultValue={searchParams.locality || ""}
                  placeholder="Enter locality"
                  style={input}
                />

                <select
                  name="sortBy"
                  defaultValue={searchParams.sortBy || "newest"}
                  style={input}
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price Low → High</option>
                  <option value="price_desc">Price High → Low</option>
                  <option value="popular">Popular</option>
                </select>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    height: "46px",
                    border: "none",
                    borderRadius: "14px",
                    cursor: "pointer",
                    background: "linear-gradient(135deg,#16a34a,#22c55e)",
                    color: "white",
                    fontWeight: 800,
                    marginTop: "4px",
                  }}
                >
                  Apply Filters
                </button>
              </form>
            </aside>

            {/* RESULTS */}
            <div>
              {/* TOP BAR */}
              <div
                style={{
                  background: "white",
                  borderRadius: "18px",
                  border: "1px solid #e5e7eb",
                  padding: "16px 18px",
                  marginBottom: "18px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  flexWrap: "wrap",
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
                    Results
                  </div>

                  <div
                    style={{
                      marginTop: "4px",
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    {properties.length} Properties Found
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

              {/* GRID */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
                  gap: "18px",
                }}
              >
                {properties.map((p) => (
                  <Link
                    key={p.id || p._id}
                    href={`/properties/${p.slug}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <article
                      style={{
                        background: "white",
                        borderRadius: "22px",
                        overflow: "hidden",
                        border: "1px solid #eef2f7",
                        transition: "all .25s ease",
                        boxShadow: "0 10px 24px rgba(15,23,42,.05)",
                      }}
                    >
                      <img
                        src={p.img}
                        alt={p.title}
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />

                      <div
                        style={{
                          padding: "16px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                        >
                          <span
                            style={{
                              background: "#ecfdf5",
                              color: "#166534",
                              padding: "5px 10px",
                              borderRadius: "999px",
                              fontSize: "12px",
                              fontWeight: 700,
                            }}
                          >
                            {p.category || p.cat}
                          </span>

                          {p.rera && (
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#dc2626",
                              }}
                            >
                              RERA
                            </span>
                          )}
                        </div>

                        <h3
                          style={{
                            margin: 0,
                            fontSize: "1.02rem",
                            fontWeight: 800,
                            color: "#111827",
                            lineHeight: 1.4,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {p.title || p.t}
                        </h3>

                        <div
                          style={{
                            marginTop: "8px",
                            color: "#64748b",
                            fontSize: "14px",
                          }}
                        >
                          📍 {p.locality || p.loc}
                        </div>

                        <div
                          style={{
                            marginTop: "14px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "1.45rem",
                                fontWeight: 900,
                                color: "#166534",
                              }}
                            >
                              {p.price || p.pr}
                            </div>

                            <div
                              style={{
                                color: "#64748b",
                                fontSize: "13px",
                              }}
                            >
                              {p.area}
                            </div>
                          </div>

                          <div
                            style={{
                              fontSize: "13px",
                              color: "#64748b",
                            }}
                          >
                            👁 {p.views || 0}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* EMPTY */}
              {properties.length === 0 && (
                <div
                  style={{
                    marginTop: "18px",
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "18px",
                    padding: "40px",
                    textAlign: "center",
                    color: "#64748b",
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
  height: "44px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  padding: "0 14px",
  marginBottom: "12px",
  background: "#fff",
  fontSize: "14px",
};
