"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  s: string;
  t: string;
  cat: string;
  d: string;
  r: string;
  img: string;
  feat: boolean;
};

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  "Buying Guide": { bg: "#f0fdf6", color: "#16a34a" },
  Investment: { bg: "#fff7ed", color: "#d97706" },
  Commercial: { bg: "#f5f3ff", color: "#7c3aed" },
  "Legal Guide": { bg: "#eff6ff", color: "#1d4ed8" },
};

export function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const main = blogs.find((b) => b.feat) || blogs[0];
  const rest = blogs.filter((b) => b !== main);
  const cc = CATEGORY_COLORS;

  if (!blogs.length) return null;

  return (
    <section style={{ padding: "80px 0", background: "#f9fafb" }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#fef3c7",
                border: "1px solid #fde68a",
                borderRadius: "100px",
                padding: "6px 16px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#d97706",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                📝 Blog & Insights
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-syne,Syne,serif)",
                fontSize: "clamp(1.75rem,3.5vw,2.5rem)",
                fontWeight: 900,
                color: "#1a1a2e",
                marginBottom: "8px",
              }}
            >
              Nashik Property Insights
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1rem" }}>
              Expert advice, market trends & buying guides
            </p>
          </div>
          <Link
            href="/blog"
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              border: "2px solid #d97706",
              color: "#d97706",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            View All Articles →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "24px",
          }}
        >
          {/* Featured */}
          <Link href={`/blog/${main.slug}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #f0f0f0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                height: "100%",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 16px 48px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={main.img}
                  alt={main.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <div
                  style={{ position: "absolute", top: "16px", left: "16px" }}
                >
                  <span
                    style={{
                      ...cc[main.category],
                      padding: "5px 12px",
                      borderRadius: "100px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {main.category}
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(245,158,11,0.9)",
                    color: "white",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "100px",
                  }}
                >
                  FEATURED
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-syne,Syne,serif)",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    color: "#1a1a2e",
                    marginBottom: "10px",
                    lineHeight: 1.35,
                  }}
                >
                  {main.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    marginBottom: "16px",
                  }}
                >
                  {main.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    fontSize: "0.8rem",
                    color: "#9ca3af",
                  }}
                >
                  <span>📅 {main.date}</span>
                  <span>⏱ {main.readTime} read</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Side blogs */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {rest.map((b) => (
              <Link
                key={b.slug}
                href={`/blog/${b.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #f0f0f0",
                    display: "flex",
                    gap: "0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateX(4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateX(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.04)";
                  }}
                >
                  <div
                    style={{
                      width: "110px",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={b.img}
                      alt={b.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        ...cc[b.category],
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        marginBottom: "8px",
                      }}
                    >
                      {b.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-syne,Syne,serif)",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        color: "#1a1a2e",
                        lineHeight: 1.35,
                        marginBottom: "8px",
                      }}
                    >
                      {b.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                      }}
                    >
                      <span>{b.date}</span>
                      <span>{b.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
