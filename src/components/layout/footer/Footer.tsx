"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";
import { FCOLS } from "@/lib/footerData";

export function Footer() {
  const lk: React.CSSProperties = {
    fontSize: "12.5px",
    color: "white",
  };
  return (
    <footer style={{ background: "#070b0e", color: "white" }}>
      <div
        className="container"
        style={{
          paddingTop: "52px",
          paddingBottom: "36px",
          marginLeft: "50px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr repeat(4,1fr)",
            gap: "36px",
            marginBottom: "36px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "18px",
              }}
            >
              <Image
                src="/maha.png"
                alt="Maha Properties Logo"
                width={150}
                height={50}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "12.5px",
                lineHeight: 1.72,
                marginBottom: "16px",
                maxWidth: "210px",
              }}
            >
              Nashik&apos;s most comprehensive property portal — NA plots,
              agriculture, commercial & industrial since 2018.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              <a
                href="tel:+919876543210"
                style={{
                  ...lk,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "white",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                <Phone size={14} color="#2d9455" />
                <span style={{ fontSize: "12.5px" }}>+91 98765 43210</span>
              </a>
              <a
                href="mailto:hello@mahaproperties.in"
                style={{
                  ...lk,
                  display: "flex",
                  alignItems: "center", // ✅ center align
                  gap: "6px",
                  color: "white",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                <span
                  style={{
                    color: "#2d9455",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  <Mail size={14} color="#2d9455" />
                </span>

                <span
                  style={{
                    fontSize: "12.5px",
                    lineHeight: "1.4",
                    wordBreak: "break-word",
                  }}
                >
                  hello@mahaproperties.in
                </span>
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <MapPin
                  size={14}
                  color="#4ade82"
                  style={{
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    fontSize: "12.5px",
                    color: "#ffffff",
                    lineHeight: "1.4",
                  }}
                >
                  Nashik, Maharashtra 422001
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9ca3af",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(22,163,74,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "#4ade82";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(74,222,128,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color = "#9ca3af";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {FCOLS.map((col) => (
            <div key={col.t}>
              <h5
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,.48)",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                {col.t}
              </h5>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "9px",
                }}
              >
                {col.ll.map(([l, h]) => (
                  <li key={l}>
                    <Link
                      href={h}
                      style={lk}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#e8ffda")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,.055)",
            marginBottom: "18px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            marginTop: "20px",
          }}
        >
          {/* LEFT TEXT */}
          <span style={{ flex: 1 }}>
            © 2026 MahaProperties. All rights reserved. Made with ❤️ in Nashik.
          </span>

          {/* GK DIGITAL (aligned with last column area) */}
          <span
            style={{
              width: "20%", // 👈 adjust this if needed
              textAlign: "right",
              marginRight: "70px",
            }}
          >
            Developed by G.K. Digital
          </span>
        </div>
        {/* <div style={{ marginTop:"16px", textAlign:"center" }}>
           <span style={{ fontSize:"1.2rem", fontWeight:800, color:"#0a0f14", letterSpacing:"0.03em" }}>Mahaproperties</span>
         </div> */}
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
    WHATSAPP STICKY  — official green, real WA logo, bouncing
 ═══════════════════════════════════════════════════════════ */
// function WA() {
//   return (
//     <a
//       href="https://wa.me/919876543210"
//       target="_blank"
//       rel="noopener noreferrer"
//       title="Chat on WhatsApp"
//       style={{
//         position: "fixed",
//         bottom: "24px",
//         right: "24px",
//         zIndex: 850,
//         width: "54px",
//         height: "54px",
//         borderRadius: "50%",
//         background: G.wa,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         boxShadow: "0 5px 20px rgba(37,211,102,.42)",
//         animation: "_wb 3s ease-in-out infinite",
//         border: "2px solid rgba(255,255,255,.28)",
//       }}
//     >
//       {I.wa}
//     </a>
//   );
// }
