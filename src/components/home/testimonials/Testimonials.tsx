"use client";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTS = [
  {
    name: "Rahul Deshmukh",
    role: "Bought NA Plot",
    location: "Gangapur Road",
    rating: 5,
    text: "MahaProperties helped me find the perfect NA plot within my budget. The team was very responsive and the entire process — from search to registration — was smooth. Highly recommend!",
    avatar: "R",
    color: "#16a34a",
  },
  {
    name: "Sunita Patil",
    role: "Agriculture Land Buyer",
    location: "Igatpuri",
    rating: 5,
    text: "I was looking for agriculture land near Igatpuri for 6 months with no luck. MahaProperties showed me 3 options in one week! The RERA-verified listings gave me confidence to invest.",
    avatar: "S",
    color: "#0891b2",
  },
  {
    name: "Amit Sharma",
    role: "Commercial Property",
    location: "Nashik Road",
    rating: 5,
    text: "Excellent platform! Found a great commercial plot in Nashik Road. The AI assistant on the website was surprisingly helpful in shortlisting options based on my requirements.",
    avatar: "A",
    color: "#7c3aed",
  },
  {
    name: "Priya Kulkarni",
    role: "Investment in Plots",
    location: "Meri Village",
    rating: 5,
    text: "Invested in 2 plots through MahaProperties. Returns have been amazing. The team's knowledge about Nashik localities and market trends is impressive.",
    avatar: "P",
    color: "#d97706",
  },
  {
    name: "Vikram Joshi",
    role: "Industrial Shed Buyer",
    location: "MIDC Satpur",
    rating: 5,
    text: "As a manufacturer, I needed a shed near MIDC Satpur quickly. Got 5 verified listings in 24 hours. Closed the deal in 2 weeks. Exceptional service!",
    avatar: "V",
    color: "#dc2626",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [tests, setTests] = useState<any[]>([]);
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + tests.length) % tests.length);
  const next = () => setActive((a) => (a + 1) % tests.length);
  useEffect(() => {
    setTests(tests);
  }, []);
  if (!tests.length) return null;

  return (
    <section
      style={{
        padding: "80px 0",
        background: "#1a1a2e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(22,163,74,0.12)",
              border: "1px solid rgba(22,163,74,0.25)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#4ade82",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              ⭐ Testimonials
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-syne,Syne,serif)",
              fontSize: "clamp(1.75rem,4vw,2.75rem)",
              fontWeight: 900,
              color: "white",
              marginBottom: "12px",
            }}
          >
            What Our Clients Say
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem" }}>
            500+ happy property buyers & investors trust MahaProperties
          </p>
        </div>

        {/* Main testimonial */}
        <div
          style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "28px",
              padding: "48px",
              position: "relative",
            }}
          >
            <Quote
              size={48}
              color="rgba(74,222,128,0.2)"
              style={{ position: "absolute", top: "28px", right: "32px" }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${TESTS[active].color}, ${TESTS[active].color}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.35rem",
                  fontWeight: 900,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {TESTS[active].avatar}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-syne,Syne,serif)",
                    fontWeight: 800,
                    color: "white",
                    fontSize: "1.05rem",
                  }}
                >
                  {TESTS[active].name}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "0.83rem",
                    marginTop: "2px",
                  }}
                >
                  {TESTS[active].role} · {TESTS[active].location}
                </div>
                <div style={{ marginTop: "6px" }}>
                  <Stars n={TESTS[active].rating} />
                </div>
              </div>
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              &ldquo;{TESTS[active].text}&rdquo;
            </p>
          </div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginTop: "32px",
              alignItems: "center",
            }}
          >
            <button
              onClick={prev}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(22,163,74,0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
            >
              <ChevronLeft size={20} />
            </button>

            <div style={{ display: "flex", gap: "8px" }}>
              {TESTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: active === i ? "28px" : "8px",
                    height: "8px",
                    borderRadius: "100px",
                    background:
                      active === i ? "#4ade82" : "rgba(255,255,255,0.25)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(22,163,74,0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini cards row */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {TESTS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background:
                  active === i
                    ? "rgba(22,163,74,0.15)"
                    : "rgba(255,255,255,0.04)",
                border:
                  active === i
                    ? "1px solid rgba(22,163,74,0.35)"
                    : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "100px",
                padding: "8px 16px 8px 8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg,${t.color},${t.color}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {t.avatar}
              </div>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "white",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {t.location}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
