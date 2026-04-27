"use client";

import { useEffect, useState } from "react";
import {
  Navbar as MegaNavbar,
  Navbar,
} from "@/components/layout/navbar/Navbar";
import Link from "next/link";

type Blog = {
  s: string;
  t: string;
  excerpt: string;
  cat: string;
  d: string;
  r: string;
  img: string;
  feat: boolean;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  if (!blogs.length) return null;

  const categories = ["All", ...new Set(blogs.map((b) => b.cat))];

  const filtered =
    active === "All" ? blogs : blogs.filter((b) => b.cat === active);

  return (
    <>
      <MegaNavbar />
      <main>
        <div style={{ padding: "60px 0", background: "#f9fafb" }}>
          <div
            style={{ maxWidth: "1200px", margin: "auto", padding: "0 20px" }}
          >
            {/* HEADER */}
            <h1
              style={{
                fontFamily: "var(--font-syne,Syne,serif)",
                fontSize: "clamp(1.8rem,3vw,2.4rem)",
                fontWeight: 900,
                color: "#1a1a2e",
                marginBottom: "24px",
              }}
            >
              All Articles
            </h1>

            {/* CATEGORY FILTER */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "35px",
                flexWrap: "wrap",
              }}
            >
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "999px",
                    border: active === c ? "none" : "1px solid #e5e7eb",
                    background: active === c ? "#1a1a2e" : "#fff",
                    color: active === c ? "#fff" : "#374151",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "0.25s",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* BLOG GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
                gap: "28px",
              }}
            >
              {filtered.map((b) => (
                <Link
                  key={b.s}
                  href={`/blogs/${b.s}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #f0f0f0",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow =
                        "0 18px 50px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 12px rgba(0,0,0,0.05)";
                    }}
                  >
                    {/* IMAGE */}
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={b.img}
                        alt={b.t}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          transition: "transform 0.4s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </div>

                    {/* CONTENT */}
                    <div style={{ padding: "18px" }}>
                      {/* CATEGORY BADGE */}
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: "999px",
                          fontSize: "11px",
                          fontWeight: 700,
                          marginBottom: "8px",
                          background: "#fef3c7",
                          color: "#d97706",
                        }}
                      >
                        {b.cat}
                      </span>

                      {/* TITLE */}
                      <h3
                        style={{
                          fontFamily: "var(--font-syne,Syne,serif)",
                          fontWeight: 800,
                          fontSize: "1.05rem",
                          color: "#1a1a2e",
                          marginBottom: "8px",
                          lineHeight: 1.4,
                        }}
                      >
                        {b.t}
                      </h3>

                      {/* EXCERPT */}
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#6b7280",
                          lineHeight: 1.6,
                          marginBottom: "12px",
                        }}
                      >
                        {b.excerpt}
                      </p>

                      {/* META */}
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "#9ca3af",
                        }}
                      >
                        {b.d} • {b.r}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
