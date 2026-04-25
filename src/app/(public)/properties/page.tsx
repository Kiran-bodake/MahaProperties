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

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const locality = searchParams.get("locality") || "";
  const sortBy = searchParams.get("sortBy") || "newest";

  useEffect(() => {
    async function loadData() {
      try {
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
      } catch (error) {
        console.error("Property fetch error:", error);
        setProperties([]);
      }
    }

    loadData();
  }, [q, category, locality, sortBy]);

  return (
    <>
      <MegaNavbar />

      <ContactPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
      />

      <main className="page">
        <div className="container">

          <section className="hero">
            <h1>
              Discover Premium Properties in Nashik
            </h1>

            <p>
              Explore verified NA plots,
              commercial properties,
              warehouses, industrial spaces and
              investment opportunities with
              trusted pricing and premium
              locations.
            </p>
          </section>

          <section className="layout">

            {/* 99ACRES STYLE FILTER */}

            <aside className="sidebar">

              <div className="filterHeader">
                <h3>Filters</h3>

                <span>
                  {properties.length} Results
                </span>
              </div>

              <form method="GET">

                <div className="filterGroup">
                  <label>Search</label>

                  <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Search properties..."
                    className="input"
                  />
                </div>

                <div className="filterGroup">
                  <label>Property Type</label>

                  <select
                    name="category"
                    defaultValue={category}
                    className="input"
                  >
                    <option value="">
                      All Categories
                    </option>

                    <option value="NA Plot">
                      NA Plot
                    </option>

                    <option value="Agriculture Land">
                      Agriculture Land
                    </option>

                    <option value="Commercial">
                      Commercial
                    </option>

                    <option value="Industrial Shed">
                      Industrial Shed
                    </option>

                    <option value="Warehouse">
                      Warehouse
                    </option>

                    <option value="Investment Plot">
                      Investment Plot
                    </option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label>Location</label>

                  <input
                    type="text"
                    name="locality"
                    defaultValue={locality}
                    placeholder="Enter locality"
                    className="input"
                  />
                </div>

                <div className="filterGroup">
                  <label>Sort By</label>

                  <select
                    name="sortBy"
                    defaultValue={sortBy}
                    className="input"
                  >
                    <option value="newest">
                      Newest First
                    </option>

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
                </div>

                <div className="chipWrap">

                  <button
                    type="button"
                    className="chip"
                  >
                    Verified
                  </button>

                  <button
                    type="button"
                    className="chip"
                  >
                    Premium
                  </button>

                  <button
                    type="button"
                    className="chip"
                  >
                    Ready To Move
                  </button>

                </div>

                <button
                  type="submit"
                  className="filterBtn"
                >
                  Apply Filters
                </button>

              </form>

            </aside>

            {/* RIGHT */}

            <div className="content">

              <div className="topbar">

                <div>
                  <span className="topLabel">
                    PROPERTY RESULTS
                  </span>

                  <h2>
                    {properties.length} Properties Available
                  </h2>
                </div>

                <p>
                  Verified listings updated daily
                </p>

              </div>

              <div className="list">

                {properties.map((p) => {
                  const images =
                    p.images &&
                    p.images.length > 0
                      ? p.images
                      : [p.img];

                  return (
                    <Link
                      key={
                        p.id ||
                        p._id ||
                        p.slug
                      }
                      href={`/properties/${p.slug}`}
                      className="cardLink"
                    >
                      <article className="card">

                        <div className="imageWrap">

                          <PropertyImageSlider
                            title={
                              p.title ||
                              p.t ||
                              "Property"
                            }
                            images={
                              p.images?.length
                                ? p.images
                                : [
                                    p.img,
                                    p.img,
                                    p.img,
                                  ]
                            }
                          />

                          <div className="verified">
                            VERIFIED
                          </div>

                          {p.badge && (
                            <div className="badge">
                              {p.badge}
                            </div>
                          )}

                          <div className="photoCount">
                            📸 {images.length}
                          </div>

                        </div>

                        <div className="cardContent">

                          <div>

                            <div className="category">
                              {p.category ||
                                p.cat}
                            </div>

                            <h3 className="title">
                              {p.title || p.t}
                            </h3>

                            <p className="location">
                              📍{" "}
                              {p.locality ||
                                p.loc}
                            </p>

                            <div className="features">

                              <div className="feature">
                                📐 {p.area}
                              </div>

                              <div className="feature">
                                👁 {p.views || 0} views
                              </div>

                              {p.rera && (
                                <div className="rera">
                                  RERA Approved
                                </div>
                              )}

                            </div>

                          </div>

                          <div className="footer">

                            <div>

                              <div className="price">
                                {p.price ||
                                  p.pr}
                              </div>

                              <span className="neg">
                                Negotiable
                              </span>

                            </div>

                            <div className="btns">

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowPopup(true);
                                }}
                                className="secondaryBtn"
                              >
                                Contact
                              </button>

                              <button
                                type="button"
                                className="primaryBtn"
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

              {properties.length === 0 && (
                <div className="empty">
                  No matching properties found.
                </div>
              )}

            </div>

          </section>

        </div>

        <style jsx>{`

          .page {
            background: #f8fafc;
            min-height: 100vh;
            padding: 90px 0 40px;
          }

          .container {
            width: min(1400px, 94%);
            margin: auto;
          }

          .hero {
            background: linear-gradient(
              135deg,
              #052e16,
              #166534,
              #22c55e
            );

            border-radius: 28px;
            padding: 40px;
            color: white;
            margin-bottom: 24px;
          }

          .hero h1 {
            margin: 0;
            font-size: clamp(
              2rem,
              6vw,
              3.5rem
            );

            font-weight: 900;
          }

          .hero p {
            margin-top: 16px;
            max-width: 760px;
            line-height: 1.7;
          }

          .layout {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 24px;
            align-items: start;
          }

          /* SIDEBAR */

          .sidebar {
            background: white;

            border-radius: 24px;

            padding: 24px;

            border: 1px solid #e5e7eb;

            position: sticky;

            top: 100px;

            height: fit-content;

            box-shadow:
              0 10px 30px rgba(0,0,0,0.05);
          }

          .filterHeader {
            display: flex;
            justify-content: space-between;
            align-items: center;

            margin-bottom: 24px;

            padding-bottom: 16px;

            border-bottom: 1px solid #f1f5f9;
          }

          .filterHeader h3 {
            margin: 0;
            font-size: 1.3rem;
            font-weight: 800;
          }

          .filterHeader span {
            background: #dcfce7;
            color: #166534;

            padding: 8px 12px;

            border-radius: 999px;

            font-size: 12px;
            font-weight: 700;
          }

          .filterGroup {
            margin-bottom: 18px;
          }

          .filterGroup label {
            display: block;

            margin-bottom: 10px;

            font-size: 13px;
            font-weight: 700;

            color: #374151;
          }

          .input {
            width: 100%;

            height: 52px;

            border-radius: 14px;

            border: 1px solid #d1d5db;

            padding: 0 16px;

            background: #f9fafb;

            font-size: 14px;

            transition: 0.3s ease;
          }

          .input:focus {
            outline: none;

            border-color: #16a34a;

            background: white;

            box-shadow:
              0 0 0 4px rgba(34,197,94,0.15);
          }

          .chipWrap {
            display: flex;
            flex-wrap: wrap;

            gap: 10px;

            margin-bottom: 24px;
          }

          .chip {
            border: none;

            background: #f1f5f9;

            padding: 10px 14px;

            border-radius: 999px;

            font-size: 12px;
            font-weight: 700;

            cursor: pointer;

            transition: 0.3s ease;
          }

          .chip:hover {
            background: #dcfce7;
            color: #166534;
          }

          .filterBtn {
            width: 100%;

            height: 54px;

            border: none;

            border-radius: 16px;

            background: linear-gradient(
              135deg,
              #16a34a,
              #22c55e
            );

            color: white;

            font-size: 15px;
            font-weight: 800;

            cursor: pointer;

            transition: 0.3s ease;
          }

          .filterBtn:hover {
            transform: translateY(-2px);
          }

          /* TOPBAR */

          .topbar {
            background: white;

            border-radius: 22px;

            padding: 18px 22px;

            border: 1px solid #e5e7eb;

            display: flex;

            justify-content: space-between;

            align-items: center;

            flex-wrap: wrap;

            gap: 12px;

            margin-bottom: 22px;
          }

          .topLabel {
            color: #16a34a;

            font-size: 12px;

            font-weight: 800;
          }

          .topbar h2 {
            margin: 8px 0 0;
          }

          .topbar p {
            color: #64748b;
          }

          .list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .cardLink {
            text-decoration: none;
          }

          .card {
            display: grid;

            grid-template-columns: 340px 1fr;

            background: white;

            border-radius: 24px;

            overflow: hidden;

            border: 1px solid #e5e7eb;
          }

          .imageWrap {
            position: relative;
            min-height: 250px;
          }

          .verified {
            position: absolute;

            top: 14px;
            left: 14px;

            background: #16a34a;

            color: white;

            padding: 8px 14px;

            border-radius: 999px;

            font-size: 11px;

            z-index: 10;
          }

          .badge {
            position: absolute;

            bottom: 14px;
            left: 14px;

            background: black;

            color: white;

            padding: 8px 14px;

            border-radius: 999px;

            font-size: 11px;

            z-index: 10;
          }

          .photoCount {
            position: absolute;

            bottom: 14px;
            right: 14px;

            background: rgba(0,0,0,0.7);

            color: white;

            padding: 8px 14px;

            border-radius: 999px;

            font-size: 11px;

            z-index: 10;
          }

          .cardContent {
            padding: 22px;

            display: flex;

            flex-direction: column;

            justify-content: space-between;
          }

          .category {
            display: inline-flex;

            background: #ecfdf5;

            color: #166534;

            padding: 8px 14px;

            border-radius: 999px;

            font-size: 12px;

            font-weight: 800;

            margin-bottom: 14px;
          }

          .title {
            margin: 0;

            color: #111827;

            font-size: 1.5rem;
          }

          .location {
            margin-top: 12px;

            color: #64748b;
          }

          .features {
            display: flex;

            flex-wrap: wrap;

            gap: 10px;

            margin-top: 16px;
          }

          .feature {
            background: #f1f5f9;

            padding: 10px 14px;

            border-radius: 12px;

            font-size: 13px;
          }

          .rera {
            background: #fee2e2;

            color: #b91c1c;

            padding: 10px 14px;

            border-radius: 12px;

            font-size: 13px;

            font-weight: 700;
          }

          .footer {
            margin-top: 22px;

            display: flex;

            justify-content: space-between;

            align-items: center;

            flex-wrap: wrap;

            gap: 16px;
          }

          .price {
            color: #166534;

            font-size: 1.8rem;

            font-weight: 900;
          }

          .neg {
            color: #64748b;

            font-size: 13px;
          }

          .btns {
            display: flex;
            gap: 10px;
          }

          .primaryBtn {
            height: 48px;

            padding: 0 20px;

            border: none;

            border-radius: 14px;

            background: #16a34a;

            color: white;

            font-weight: 800;

            cursor: pointer;
          }

          .secondaryBtn {
            height: 48px;

            padding: 0 20px;

            border-radius: 14px;

            border: 1px solid #d1d5db;

            background: white;

            font-weight: 700;

            cursor: pointer;
          }

          .empty {
            background: white;

            padding: 50px;

            border-radius: 22px;

            text-align: center;

            margin-top: 20px;
          }

          @media (max-width: 1024px) {

            .layout {
              grid-template-columns: 1fr;
            }

            .sidebar {
              position: relative;
              top: 0;
            }

          }

          @media (max-width: 768px) {

            .card {
              grid-template-columns: 1fr;
            }

            .footer {
              flex-direction: column;
              align-items: stretch;
            }

            .btns {
              width: 100%;
            }

            .primaryBtn,
            .secondaryBtn {
              width: 100%;
            }

          }

        `}</style>

      </main>
    </>
  );
}