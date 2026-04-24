"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar as MegaNavbar } from "@/components/layout/navbar/Navbar";

/* ═══════════════════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════════════════ */
const G = {
  g: "#1a6b3c",
  gm: "#2d9455",
  gl: "#f0faf4",
  gll: "#dcfce7",
  ink: "#0e1117",
  sl: "#374151",
  mu: "#6b7280",
  li: "#e5e7eb",
  bg: "#ffffff",
  off: "#f8f9fa",
  wa: "#25d366",
  go: "#c8973a",
};
const FONT = "'DM Sans', system-ui, sans-serif";
const E = "cubic-bezier(0.4,0,0.2,1)";

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS  (injected once via <style>)
═══════════════════════════════════════════════════════════ */
const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:${FONT};color:${G.ink};background:#fff;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%;height:auto}
button{cursor:pointer;font-family:inherit;border:none;background:none;padding:0}
input,select{font-family:inherit;font-size:16px;-webkit-appearance:none}
::selection{background:rgba(26,107,60,.15)}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}

@keyframes _fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes _fi{from{opacity:0}to{opacity:1}}
@keyframes _sr{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes _fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes _pd{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes _wb{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes _sd{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

.fu{animation:_fu .46s ${E} both}
.fi{animation:_fi .32s ease both}
.d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}

/* Wrapper — mobile-first */
.w{width:100%;max-width:1240px;margin:0 auto;padding:0 14px}
@media(min-width:480px){.w{padding:0 18px}}
@media(min-width:768px){.w{padding:0 28px}}
@media(min-width:1100px){.w{padding:0 40px}}
@media(min-width:1280px){.w{padding:0 52px}}

/* Section padding */
.sec{padding:32px 0}
@media(min-width:768px){.sec{padding:44px 0}}

/* Visibility */
@media(max-width:1099px){.navonly{display:none!important}}
@media(max-width:767px){.mdhide{display:none!important}}
@media(max-width:479px){.smhide{display:none!important}}
@media(min-width:1100px){.moonly{display:none!important}}

/* Utility */
.lf{transition:transform .25s ${E},box-shadow .25s ${E};will-change:transform}
@media(hover:hover){.lf:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(0,0,0,.10)!important}}
.zm img{transition:transform .46s ${E};will-change:transform}
@media(hover:hover){.zm:hover img{transform:scale(1.05)}}
.ns{scrollbar-width:none;-ms-overflow-style:none}.ns::-webkit-scrollbar{display:none}

/* Label */
.sl{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${G.g};display:flex;align-items:center;gap:7px;margin-bottom:10px}
.sl::before{content:'';width:14px;height:2px;background:${G.g};border-radius:2px;flex-shrink:0}

/* Buttons */
.b{display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:${FONT};font-weight:600;cursor:pointer;border:none;outline:none;transition:all .17s ${E};white-space:nowrap;text-decoration:none;line-height:1;-webkit-tap-highlight-color:transparent}
.b:focus-visible{outline:2px solid ${G.g};outline-offset:2px}
.bg{background:${G.g};color:#fff;border-radius:8px;box-shadow:0 3px 10px rgba(26,107,60,.26)}
@media(hover:hover){.bg:hover{background:${G.gm};transform:translateY(-1px)}}
.bo{background:transparent;color:${G.sl};border:1.5px solid ${G.li};border-radius:8px}
@media(hover:hover){.bo:hover{border-color:${G.g};color:${G.g};background:${G.gl}}}
.bgh{background:rgba(255,255,255,.14);color:#fff;border:1.5px solid rgba(255,255,255,.24);border-radius:8px;backdrop-filter:blur(8px)}
@media(hover:hover){.bgh:hover{background:rgba(255,255,255,.24)}}
.bwa{background:${G.wa};color:#fff;border-radius:8px}
@media(hover:hover){.bwa:hover{background:#1db954;transform:translateY(-1px)}}

/* Heading */
.sh2{font-size:clamp(1.15rem,2.8vw,1.85rem);font-family:${FONT};font-weight:800;letter-spacing:-0.03em;line-height:1.15;color:${G.ink}}

/* GRIDS — mobile-first, 2 col base */

/* Category: 2 → 3 → 6 */
.cg{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
@media(min-width:600px){.cg{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.cg{grid-template-columns:repeat(6,1fr)}}
.cg a{height:125px}
@media(min-width:600px){.cg a{height:140px}}
@media(min-width:1024px){.cg a{height:152px}}

/* Featured: 1 → 2 → 4 */
.pg{display:grid;grid-template-columns:1fr;gap:13px}
@media(min-width:540px){.pg{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1100px){.pg{grid-template-columns:repeat(4,1fr)}}

/* Stats: 2 → 3 → 5 */
.sg{display:grid;grid-template-columns:repeat(2,1fr)}
@media(min-width:600px){.sg{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1000px){.sg{grid-template-columns:repeat(5,1fr)}}
.sg>div{padding:18px 10px;text-align:center;border-bottom:1px solid rgba(255,255,255,.07)}
@media(min-width:1000px){.sg>div{border-bottom:none;border-right:1px solid rgba(255,255,255,.07);padding:24px 14px}}
@media(min-width:1000px){.sg>div:last-child{border-right:none}}

/* Localities: 2 → 3 → 4 */
.lg{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
@media(min-width:768px){.lg{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.lg{grid-template-columns:repeat(4,1fr)}}
.lg a{height:115px}
@media(min-width:768px){.lg a{height:130px}}

/* Why: 1 → 2-col */
.wg{display:grid;grid-template-columns:1fr;gap:20px}
@media(min-width:768px){.wg{grid-template-columns:1fr 1fr;gap:48px;align-items:center}}
.wcol{display:none}
@media(min-width:768px){.wcol{display:block}}
.wac{display:grid;grid-template-columns:1fr;gap:11px;margin-top:18px}
@media(min-width:540px){.wac{grid-template-columns:1fr 1fr}}

/* Testimonials: 1 → 2-col */
.tg{display:grid;grid-template-columns:1fr;gap:14px}
@media(min-width:768px){.tg{grid-template-columns:1.05fr 1fr;gap:22px;align-items:start}}
.tc{display:flex;flex-direction:column;gap:7px}
@media(max-width:767px){.tc{flex-direction:row;overflow-x:auto;padding-bottom:6px;gap:8px}}
@media(max-width:767px){.tc>button{flex-shrink:0;min-width:190px}}

/* Blogs: 1 → 2-col */
.bgg{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:768px){.bgg{grid-template-columns:1.4fr 1fr}}

/* Footer: 2 → 3 → 5-col */
.fg{display:grid;grid-template-columns:1fr 1fr;gap:18px 12px}
@media(min-width:768px){.fg{grid-template-columns:1.2fr 1fr 1fr;gap:22px 18px}}
@media(min-width:1024px){.fg{grid-template-columns:1.2fr repeat(4,1fr);gap:28px 20px}}
.fb{grid-column:1/-1}
@media(min-width:1024px){.fb{grid-column:1/2}}

/* Hero section */
.hh{position:relative;height:min(470px,85svh);min-height:290px;overflow:hidden}
@media(max-width:479px){.hh{height:min(390px,88svh);min-height:260px}}
@media(max-width:639px){.hsd{display:none!important}}

/* Section header row */
.sec-hdr{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:8px;margin-bottom:16px}

/* Filter tab row — scroll on mobile */
.tabrow{display:flex;gap:5px;margin-bottom:13px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.tabrow::-webkit-scrollbar{display:none}

/* CTA button row — column on tiny screens */
@media(max-width:479px){.cta-row{flex-direction:column!important}}
@media(max-width:479px){.cta-row>.b{justify-content:center;width:100%}}

/* MEGA MENU — desktop only, full-width below header */
.mega-wrap{position:absolute;top:100%;left:0;right:0;background:white;border-top:3px solid ${G.g};box-shadow:0 20px 60px rgba(0,0,0,.12);animation:_sd .2s ${E};z-index:800}
@media(max-width:1099px){.mega-wrap{display:none!important}}
.mega-inner{padding:22px 0 28px}
.mega-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
.mega-col{padding:0 20px}
.mega-col+.mega-col{border-left:1px solid ${G.li}}
`;

/* ═══════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════ */
const I = {
  menu: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  ),
  x: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  srch: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  ph: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .27h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.1a16 16 0 006.29 6.29l1.19-1.19a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  usr: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  pin: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  arr: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  arL: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  arR: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 19 19 12 12 5" />
    </svg>
  ),
  chk: (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  cd: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  bll: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  rul: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 3l18 18M9 3v6M3 9h6M15 21v-6M21 15h-6" />
    </svg>
  ),
  eye: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  star: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="#f59e0b"
      stroke="none"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  hrt: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85",
    tag: "NA Plots from ₹8 Lakh",
    h: "Find Your Perfect\nPlot in Nashik",
    sub: "2,500+ verified properties · 40+ localities · RERA compliant",
  },
  {
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&q=85",
    tag: "Agriculture Land — Clear Title",
    h: "Invest in Nashik&apos;s\nFertile Farmlands",
    sub: "Prime agriculture land with RERA compliance and clean title records",
  },
  {
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85",
    tag: "Commercial & Industrial",
    h: "Premium Commercial\nSpaces in Nashik",
    sub: "Industrial sheds, warehouses & commercial plots across MIDC zones",
  },
];

const CATS = [
  {
    e: "🏞️",
    l: "NA Plots",
    c: "480+",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80",
  },
  {
    e: "📋",
    l: "Collector NA",
    c: "95+",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
  },
  {
    e: "🌾",
    l: "Agriculture Land",
    c: "120+",
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=80",
  },
  {
    e: "🏭",
    l: "Warehouse",
    c: "45+",
    img: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=500&q=80",
  },
  {
    e: "🏢",
    l: "Commercial",
    c: "70+",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80",
  },
  {
    e: "📈",
    l: "Investment Plots",
    c: "200+",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
  },
];

const PIMGS: Record<string, string[]> = {
  "1": [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80",
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=700&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
  ],
  "2": [
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80",
    "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=700&q=80",
  ],
  "3": [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
    "https://images.unsplash.com/photo-1565891741441-64926e441838?w=700&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
  ],
  "4": [
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80",
  ],
  "5": [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80",
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=700&q=80",
  ],
  "6": [
    "https://images.unsplash.com/photo-1565891741441-64926e441838?w=700&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
  ],
  "7": [
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=700&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80",
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=80",
  ],
  "8": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
  ],
};

// const PROPS = [
//   { id:"1", slug:"na-plot-gangapur-road", t:"Prime NA Plot — Gangapur Road",     loc:"Gangapur Road",  cat:"NA Plot",         pr:"₹42 L",   ar:"2,000 sq.ft", rera:true,  badge:"Featured"  },
//   { id:"2", slug:"agri-land-igatpuri",      t:"Agriculture Land — Igatpuri",       loc:"Igatpuri",       cat:"Agriculture Land",pr:"₹85 L",   ar:"3 Acres",     rera:true,  badge:"Hot Deal"  },
//   { id:"3", slug:"industrial-shed-satpur",  t:"Industrial Shed — MIDC Satpur",     loc:"Satpur MIDC",    cat:"Industrial Shed", pr:"₹1.2 Cr", ar:"5,000 sq.ft", rera:false, badge:"New"       },
//   { id:"4", slug:"commercial-plot-nashik-road", t:"Commercial Plot — Nashik Road",     loc:"Nashik Road",    cat:"Commercial",      pr:"₹68 L",   ar:"1,800 sq.ft", rera:true,  badge:null        },
//   { id:"5", slug:"investment-plot-meri-village",t:"Investment Plot — Meri Village",    loc:"Meri Village",   cat:"Investment Plot", pr:"₹18 L",   ar:"1,200 sq.ft", rera:true,  badge:"Best Buy"  },
//   { id:"6", slug:"warehouse-land-ambad-midc",  t:"Warehouse Land — Ambad MIDC",       loc:"Ambad",          cat:"Warehouse",       pr:"₹2.4 Cr", ar:"12,000 sq.ft",rera:false, badge:null        },
//   { id:"7", slug:"collector-na-trimbak-road",  t:"Collector NA — Trimbak Road",       loc:"Trimbak Road",   cat:"Collector NA",    pr:"₹55 L",   ar:"3,500 sq.ft", rera:true,  badge:"Verified"  },
//   { id:"8", slug:"na-plot-pathardi-phata",     t:"NA Plot — Pathardi Phata",          loc:"Pathardi Phata", cat:"NA Plot",         pr:"₹28 L",   ar:"1,600 sq.ft", rera:true,  badge:null        },
// ];

// const PROPERTY_LINKS = PROPS.map(p => `/properties/${p.slug}`);

function PropertyLinks({ properties }: any) {
  if (!properties || properties.length === 0) return null;

  const links = properties.map((p: any) => `/properties/${p.slug}`);

  return (
    <section
      className="sec"
      style={{ background: "#f9fafb", padding: "40px 0" }}
    >
      <div className="w">
        <div className="sl">Property details</div>

        <h2
          style={{
            fontFamily: FONT,
            fontSize: "clamp(1.2rem,2.5vw,1.7rem)",
            fontWeight: 800,
            color: G.ink,
          }}
        >
          All dynamic property detail URLs
        </h2>

        <p style={{ color: G.mu, marginBottom: "16px" }}>
          Click any entry to go directly to the property details page.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {links.map((link: string) => (
            <Link
              key={link}
              href={link}
              className="b bo"
              style={{
                padding: "7px 12px",
                fontSize: "12px",
                borderRadius: "7px",
              }}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const LOCS = [
  {
    n: "Gangapur Road",
    tp: "Premium Residential",
    c: "280+",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=75",
    hot: true,
  },
  {
    n: "Igatpuri",
    tp: "Agriculture & Hills",
    c: "110+",
    img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=500&q=75",
    hot: true,
  },
  {
    n: "Nashik Road",
    tp: "Industrial Belt",
    c: "320+",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=75",
    hot: false,
  },
  {
    n: "Trimbak Road",
    tp: "Spiritual & Farms",
    c: "88+",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=75",
    hot: false,
  },
  {
    n: "Meri Village",
    tp: "NA Plot Investment",
    c: "95+",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=75",
    hot: true,
  },
  {
    n: "Ambad MIDC",
    tp: "Industrial Hub",
    c: "145+",
    img: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=500&q=75",
    hot: false,
  },
  {
    n: "Pathardi Phata",
    tp: "Emerging Zone",
    c: "78+",
    img: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=500&q=75",
    hot: false,
  },
  {
    n: "Indira Nagar",
    tp: "Established Area",
    c: "145+",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=75",
    hot: false,
  },
  {
    n: "Panchavati",
    tp: "Heritage Locality",
    c: "92+",
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=75",
    hot: false,
  },
  {
    n: "College Road",
    tp: "Education Hub",
    c: "167+",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=75",
    hot: false,
  },
  {
    n: "Sinnar",
    tp: "Industrial Corridor",
    c: "54+",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=75",
    hot: false,
  },
  {
    n: "Ozar",
    tp: "Airport Vicinity",
    c: "41+",
    img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=500&q=75",
    hot: false,
  },
];

const WHY = [
  {
    e: "✈️",
    t: "Connectivity",
    b: "60 km from Mumbai–Pune expressway. Direct highway to all major cities. Upcoming Metro project approved.",
  },
  {
    e: "🍷",
    t: "Wine Capital",
    b: "India's Napa Valley. World-class wineries driving high-end residential and tourism demand.",
  },
  {
    e: "🏭",
    t: "Industrial Hub",
    b: "MIDC Satpur & Ambad: Maharashtra's fastest-growing zones. 3,000+ registered companies.",
  },
  {
    e: "💧",
    t: "Water Abundance",
    b: "Three rivers, India's grape & onion capital. Most fertile agriculture land in Maharashtra.",
  },
  {
    e: "📈",
    t: "30–40% Appreciation",
    b: "Select localities doubled in value over 5 years. NA plots compounding 25–35% annually.",
  },
  {
    e: "🏛️",
    t: "Quality of Life",
    b: "IIM Nashik, world-class hospitals, Phoenix Mall. Quality that rivals Pune & Aurangabad.",
  },
];

const TESTI = [
  {
    n: "Rahul Deshmukh",
    r: "Bought NA Plot",
    lc: "Gangapur Road",
    av: "R",
    col: "#1a6b3c",
    pImg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=75",
    txt: "Found the perfect NA plot within budget. Zero surprises at registration. I'd searched 8 months before finding MahaProperties — closed in 2 weeks.",
  },
  {
    n: "Sunita Patil",
    r: "Agriculture Land",
    lc: "Igatpuri",
    av: "S",
    col: "#0891b2",
    pImg: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=75",
    txt: "Six months of searching ended in one week. Three verified options, clear titles. RERA compliance gave me full confidence.",
  },
  {
    n: "Vikram Joshi",
    r: "Industrial Shed",
    lc: "MIDC Satpur",
    av: "V",
    col: "#7c3aed",
    pImg: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=400&q=75",
    txt: "Needed a shed near MIDC Satpur urgently. Five verified listings in 24 hours, deal closed in 2 weeks. Outstanding.",
  },
  {
    n: "Priya Kulkarni",
    r: "Investment Plots",
    lc: "Meri Village",
    av: "P",
    col: "#c8973a",
    pImg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=75",
    txt: "Invested in two plots. Already 35% appreciation in 18 months. Their knowledge of Nashik&apos;s micro-markets is unmatched.",
  },
];

// const BLOGS = [
//   { s:"na-plot-guide",      t:"Complete Guide to Buying NA Plots in Nashik 2025",    cat:"Buying Guide", d:"Jan 15", r:"8 min", img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=75", feat:true  },
//   { s:"agriculture-invest", t:"Why Nashik Agriculture Land Is Maharashtra's Best Bet",cat:"Investment",   d:"Jan 22", r:"6 min", img:"https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=75", feat:false },
//   { s:"midc-industrial",    t:"MIDC Nashik: Industrial Opportunities 2025",           cat:"Commercial",   d:"Feb 1",  r:"7 min", img:"https://images.unsplash.com/photo-1565891741441-64926e441838?w=500&q=75", feat:false },
//   { s:"rera-guide",         t:"RERA for Property Buyers: Plain-English Guide",        cat:"Legal",        d:"Feb 10", r:"5 min", img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=75", feat:false },
//   { s:"villa-plots-nashik", t:"Best Villa Plots in Nashik for Smart Investment 2025", cat:"Residential",  d:"Feb 18", r:"6 min", img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=75",    feat:false }
// ];

const TABS_P = [
  "All",
  "NA Plot",
  "Agriculture",
  "Commercial",
  "Warehouse",
  "Investment",
  "Collector NA",
];
const TYPES = [
  "All Types",
  "NA Plot",
  "Collector NA",
  "Agriculture",
  "Warehouse",
  "Commercial",
  "Investment Plot",
];
const LOCS_D = [
  "Any Locality",
  "Gangapur Road",
  "Nashik Road",
  "Meri",
  "Igatpuri",
  "Ambad",
  "Trimbak Road",
  "Indira Nagar",
  "Sinnar",
];
const CC: Record<string, { bg: string; c: string }> = {
  "Buying Guide": { bg: "#f0fdf4", c: "#166534" },
  Investment: { bg: "#fffbeb", c: "#854d0e" },
  Commercial: { bg: "#f5f3ff", c: "#5b21b6" },
  Legal: { bg: "#eff6ff", c: "#1e40af" },
};

/* ═══════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════ */
function useInView(thr = 0.1) {
  const ref = useRef<HTMLDivElement>(null!);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.disconnect();
        }
      },
      { threshold: thr },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [thr]);
  return [ref, v] as const;
}

function useCnt(target: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s = 0;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1500, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active]);
  return v;
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR  — only one, lives here
═══════════════════════════════════════════════════════════ */
function Nav() {
  return <MegaNavbar />;
}

/* ═══════════════════════════════════════════════════════════
   HERO  — 450px max, real images, prev/next arrows
═══════════════════════════════════════════════════════════ */
function Hero() {
  const [slide, setSlide] = useState(0);
  const [sq, setSq] = useState("");
  const [type, setType] = useState("");
  const [loc, setLoc] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((i: number) => {
    setSlide(i);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setSlide((s) => (s + 1) % SLIDES.length),
      6000,
    );
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const S = SLIDES[slide];

  return (
    <section
      style={{
        position: "relative",
        height: "min(450px,90svh)",
        minHeight: "320px",
        overflow: "hidden",
      }}
    >
      {/* Slides — ALL pre-mounted, opacity cross-fade only (no layout/size change = no jerk) */}
      {SLIDES.map((sl, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === slide ? 1 : 0,
            transition: `opacity 1s ${E}`,
            pointerEvents: i === slide ? "auto" : "none",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={sl.img}
              alt=""
              fill
              style={{ objectFit: "cover" }}
              priority={i === 0}
            />
          </div>
          {/* Two-stop gradient: light top for logo visibility, heavy bottom for text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,.38) 0%, rgba(0,0,0,.08) 38%, rgba(0,0,0,.60) 72%, rgba(0,0,0,.84) 100%)",
            }}
          />
        </div>
      ))}

      {/* ← → arrows — transparent circles */}
      <button
        onClick={() => go((slide - 1 + SLIDES.length) % SLIDES.length)}
        style={{
          position: "absolute",
          top: "50%",
          left: "18px",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "rgba(255,255,255,.13)",
          backdropFilter: "blur(10px)",
          border: "1.5px solid rgba(255,255,255,.26)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: `background .18s ${E}`,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,.24)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,.13)")
        }
      >
        {I.arL}
      </button>
      <button
        onClick={() => go((slide + 1) % SLIDES.length)}
        style={{
          position: "absolute",
          top: "50%",
          right: "18px",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "rgba(255,255,255,.13)",
          backdropFilter: "blur(10px)",
          border: "1.5px solid rgba(255,255,255,.26)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: `background .18s ${E}`,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,.24)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,.13)")
        }
      >
        {I.arR}
      </button>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 0 28px",
        }}
      >
        <div className="w">
          <div
            key={`tag-${slide}`}
            className="fu"
            style={{ marginBottom: "9px" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(26,107,60,.76)",
                color: "#86efac",
                border: "1px solid rgba(134,239,172,.24)",
                backdropFilter: "blur(8px)",
                borderRadius: "99px",
                padding: "4px 12px",
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  display: "inline-block",
                  animation: "_pd 1.8s infinite",
                }}
              />
              {S.tag}
            </span>
          </div>
          <h1
            key={`h-${slide}`}
            className="fu d1"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1.5rem,4vw,2.75rem)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: "8px",
              whiteSpace: "pre-line",
              maxWidth: "640px",
              textShadow: "0 2px 20px rgba(0,0,0,.3)",
            }}
          >
            {S.h}
          </h1>
          <p
            key={`s-${slide}`}
            className="fu d2"
            style={{
              fontSize: "clamp(.85rem,1.7vw,.975rem)",
              color: "rgba(255,255,255,.7)",
              marginBottom: "18px",
              lineHeight: 1.6,
              maxWidth: "520px",
            }}
          >
            {S.sub}
          </p>

          {/* Search bar */}
          <div
            // key={`sb-${slide}`}
            className="fu d3"
            style={{
              background: "rgba(255,255,255,.97)",
              backdropFilter: "blur(24px)",
              borderRadius: "13px",
              padding: "7px",
              maxWidth: "720px",
              boxShadow:
                "0 18px 56px rgba(0,0,0,.26), 0 0 0 1px rgba(255,255,255,.1)",
              display: "grid",
              gridTemplateColumns: "1fr auto auto auto",
              gap: 0,
              alignItems: "center",
            }}
          >
            <div
              style={{ padding: "6px 13px", borderRight: `1px solid ${G.li}` }}
            >
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  color: G.mu,
                  textTransform: "uppercase",
                  letterSpacing: ".07em",
                  marginBottom: "3px",
                }}
              >
                Search
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span style={{ color: G.g, flexShrink: 0 }}>{I.srch}</span>
                <input
                  value={sq}
                  onChange={(e) => setSq(e.target.value)}
                  placeholder="Locality, project, keyword…"
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: G.ink,
                    background: "transparent",
                    width: "100%",
                    fontFamily: FONT,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                padding: "6px 13px",
                borderRight: `1px solid ${G.li}`,
                minWidth: "148px",
              }}
              className="mdhide"
            >
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  color: G.mu,
                  textTransform: "uppercase",
                  letterSpacing: ".07em",
                  marginBottom: "3px",
                }}
              >
                Type
              </div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: G.ink,
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: FONT,
                  width: "100%",
                }}
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div
              style={{
                padding: "6px 13px",
                borderRight: `1px solid ${G.li}`,
                minWidth: "148px",
              }}
              className="mdhide"
            >
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  color: G.mu,
                  textTransform: "uppercase",
                  letterSpacing: ".07em",
                  marginBottom: "3px",
                }}
              >
                Locality
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <span style={{ color: G.g, flexShrink: 0 }}>{I.pin}</span>
                <select
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: G.ink,
                    background: "transparent",
                    cursor: "pointer",
                    fontFamily: FONT,
                    flex: 1,
                  }}
                >
                  {LOCS_D.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ padding: "5px" }}>
              <Link
                href="/properties"
                className="b bg"
                style={{
                  padding: "0 20px",
                  height: "42px",
                  borderRadius: "9px",
                  fontSize: "13.5px",
                  gap: "6px",
                }}
              >
                {I.srch} Search
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "13px",
          right: "28px",
          zIndex: 3,
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === slide ? "22px" : "7px",
              height: "7px",
              borderRadius: "99px",
              border: "none",
              cursor: "pointer",
              background: i === slide ? "white" : "rgba(255,255,255,.35)",
              transition: `all .3s ${E}`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CATEGORY GRID  — images on all cards, no white space
═══════════════════════════════════════════════════════════ */
function CatGrid() {
  const [ref, v] = useInView();
  return (
    <section
      className="sec"
      style={{ background: G.off, padding: "44px 0" }}
      ref={ref}
    >
      <div className="w">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "22px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <div className="sl">Browse Properties</div>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.4rem,2.8vw,2.1rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: G.ink,
                lineHeight: 1.15,
              }}
            >
              What are you looking for?
            </h2>
          </div>
          <Link
            href="/properties"
            className="b bo"
            style={{ padding: "8px 16px", fontSize: "12.5px" }}
          >
            All Properties {I.arr}
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gap: "12px",
          }}
        >
          {CATS.map((c, i) => (
            <Link
              key={c.l}
              href={`/properties?category=${encodeURIComponent(c.l)}`}
              className={`zm lf ${v ? "fu" : ""}`}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                display: "block",
                height: "152px",
                animationDelay: `${i * 0.065}s`,
                boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                border: `1px solid ${G.li}`,
                flexShrink: 0,
              }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={c.img}
                  alt={c.l}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.22) 55%, transparent 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,.17)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  border: "1px solid rgba(255,255,255,.24)",
                }}
              >
                {c.e}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "10px 11px",
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "12.5px",
                    color: "white",
                    lineHeight: 1.2,
                    marginBottom: "2px",
                  }}
                >
                  {c.l}
                </div>
                <div
                  style={{
                    fontSize: "10.5px",
                    color: "rgba(255,255,255,.72)",
                    fontWeight: 600,
                  }}
                >
                  {c.c} listings
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:1024px){.cg{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:640px){.cg{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROP CARD  — multi-image gallery
═══════════════════════════════════════════════════════════ */
function PCard({ p, vis, d }: { p: any; vis: boolean; d: number }) {
  const imgs = p.img ? [p.img] : [];
  const [ii, setIi] = useState(0);
  const [sv, setSv] = useState(false);
  return (
    <div
      className="lf"
      style={{
        background: "white",
        borderRadius: "13px",
        overflow: "hidden",
        border: `1px solid ${G.li}`,
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(14px)",
        transition: `opacity .45s ${E} ${d}s,transform .45s ${E} ${d}s,box-shadow .26s ${E},transform .26s ${E}`,
      }}
    >
      {/* Gallery */}
      <div
        style={{
          position: "relative",
          height: "170px",
          overflow: "hidden",
          background: G.off,
          flexShrink: 0,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {imgs.length > 0 && (
            <Image
              src={imgs[ii]}
              alt={p.t}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(0,0,0,.32) 0%,transparent 50%)",
          }}
        />
        {/* Image prev/next */}
        {imgs.length > 1 && (
          <>
            <button
              onClick={() => setIi((n) => (n - 1 + imgs.length) % imgs.length)}
              style={{
                position: "absolute",
                top: "50%",
                left: "7px",
                transform: "translateY(-50%)",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.8)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: G.ink,
                zIndex: 2,
              }}
            >
              {I.arL}
            </button>
            <button
              onClick={() => setIi((n) => (n + 1) % imgs.length)}
              style={{
                position: "absolute",
                top: "50%",
                right: "7px",
                transform: "translateY(-50%)",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.8)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: G.ink,
                zIndex: 2,
              }}
            >
              {I.arR}
            </button>
            <div
              style={{
                position: "absolute",
                bottom: "7px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "4px",
                zIndex: 2,
              }}
            >
              {imgs.map((_, j) => (
                <button
                  key={j}
                  onClick={() => setIi(j)}
                  style={{
                    width: ii === j ? "16px" : "5px",
                    height: "5px",
                    borderRadius: "99px",
                    border: "none",
                    background: ii === j ? "white" : "rgba(255,255,255,.5)",
                    transition: `all .22s ${E}`,
                  }}
                />
              ))}
            </div>
          </>
        )}
        {/* Badges */}
        <div
          style={{
            position: "absolute",
            top: "9px",
            left: "9px",
            display: "flex",
            gap: "5px",
            zIndex: 3,
          }}
        >
          {p.rera && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                background: "rgba(26,107,60,.88)",
                color: "white",
                fontSize: "9px",
                fontWeight: 700,
                padding: "3px 7px",
                borderRadius: "5px",
                backdropFilter: "blur(8px)",
              }}
            >
              {I.chk} RERA
            </span>
          )}
          {p.badge && (
            <span
              style={{
                background: "rgba(200,151,58,.9)",
                color: "white",
                fontSize: "9px",
                fontWeight: 700,
                padding: "3px 7px",
                borderRadius: "5px",
                backdropFilter: "blur(8px)",
              }}
            >
              {p.badge}
            </span>
          )}
        </div>
        <button
          onClick={() => setSv((s) => !s)}
          style={{
            position: "absolute",
            top: "9px",
            right: "9px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "rgba(255,255,255,.9)",
            backdropFilter: "blur(8px)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill={sv ? "#ef4444" : "none"}
            stroke={sv ? "#ef4444" : "#9ca3af"}
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
        <span
          style={{
            position: "absolute",
            bottom: "17px",
            left: "9px",
            background: "rgba(0,0,0,.58)",
            color: "white",
            fontSize: "9.5px",
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: "5px",
            backdropFilter: "blur(8px)",
            zIndex: 2,
          }}
        >
          {p.cat || p.category}
        </span>
      </div>
      {/* Info */}
      <div style={{ padding: "13px 14px" }}>
        <h3
          style={{
            fontWeight: 700,
            fontSize: "13.5px",
            color: G.ink,
            marginBottom: "5px",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {p.t || p.title}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: G.mu,
            fontSize: "11.5px",
            marginBottom: "9px",
          }}
        >
          <span style={{ color: G.g }}>{I.pin}</span>
          {p.loc || p.location}, Nashik
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: 900,
            color: G.g,
            letterSpacing: "-0.025em",
            marginBottom: "9px",
            fontFamily: FONT,
          }}
        >
          {p.pr || p.price}
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            padding: "7px 0",
            borderTop: `1px solid ${G.li}`,
            borderBottom: `1px solid ${G.li}`,
            marginBottom: "11px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              color: G.mu,
            }}
          >
            {I.rul} {p.area}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              color: G.mu,
              marginLeft: "auto",
            }}
          >
            {I.eye} {p.views} views
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "7px",
          }}
        >
          <Link
            href={`/properties/${p.slug}`}
            className="b bo"
            style={{
              fontSize: "12px",
              padding: "8px 10px",
              borderRadius: "7px",
            }}
          >
            Details
          </Link>
          <Link
            href="/enquiry"
            className="b bg"
            style={{
              fontSize: "12px",
              padding: "8px 10px",
              borderRadius: "7px",
            }}
          >
            {I.ph} Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURED LISTINGS  — 4/row + right-side filter
═══════════════════════════════════════════════════════════ */
function Featured({ properties }: any) {
  const [tab, setTab] = useState("All");
  const [ref, vis] = useInView();

  if (!properties) return null;

  // ✅ FIXED FILTER (supports both API + old data)
  const filtered =
    tab === "All"
      ? properties
      : properties.filter((p: any) =>
          (p.category || p.cat || "")
            .toLowerCase()
            .includes(tab.toLowerCase().split(" ")[0]),
        );

  return (
    <section
      className="sec"
      style={{ background: "white", padding: "44px 0" }}
      ref={ref}
    >
      <div className="w">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <div className="sl">Handpicked</div>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.4rem,2.8vw,2.1rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: G.ink,
              }}
            >
              Featured Properties
            </h2>
          </div>

          <Link
            href="/properties"
            className="b bo"
            style={{ padding: "8px 15px", fontSize: "12.5px" }}
          >
            View All {I.arr}
          </Link>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            overflowX: "auto",
            marginBottom: "14px",
          }}
        >
          {TABS_P.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="b"
              style={{
                padding: "6px 14px",
                borderRadius: "99px",
                fontSize: "12.5px",
                fontWeight: 600,
                background: tab === t ? G.ink : "white",
                color: tab === t ? "white" : G.sl,
                border: `1.5px solid ${tab === t ? G.ink : G.li}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ✅ USE PCARD HERE (IMPORTANT FIX) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "14px",
          }}
        >
          {filtered.map((p: any, i: number) => (
            <PCard key={p.id || i} p={p} vis={vis} d={i * 0.05} />
          ))}
        </div>

        {/* Responsive */}
        <style>{`
          @media(max-width:1100px){
            .sec div[style*="grid-template-columns"]{
              grid-template-columns:repeat(3,1fr)!important
            }
          }
          @media(max-width:768px){
            .sec div[style*="grid-template-columns"]{
              grid-template-columns:repeat(2,1fr)!important
            }
          }
          @media(max-width:480px){
            .sec div[style*="grid-template-columns"]{
              grid-template-columns:1fr!important
            }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   STATS  — background image + 5 columns incl. 2000+ clients
═══════════════════════════════════════════════════════════ */
const SDATA = [
  { v: 2500, s: "+", l: "Active Listings", d: "All categories" },
  { v: 2000, s: "+", l: "Happy Clients", d: "Buyers & investors" },
  { v: 840, s: "+", l: "Deals Closed", d: "Successfully" },
  { v: 42, s: "+", l: "Localities", d: "Nashik district" },
  { v: 98, s: "%", l: "Satisfaction Rate", d: "Client reviews" },
];

function Stats() {
  const [ref, vis] = useInView(0.3);
  const v0 = useCnt(SDATA[0].v, vis),
    v1 = useCnt(SDATA[1].v, vis),
    v2 = useCnt(SDATA[2].v, vis),
    v3 = useCnt(SDATA[3].v, vis),
    v4 = useCnt(SDATA[4].v, vis);
  const vals = [v0, v1, v2, v3, v4];

  return (
    <section
      ref={ref}
      style={{ position: "relative", padding: "56px 0", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=55"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,12,18,.87)",
          }}
        />
      </div>
      <div className="w" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            className="sl"
            style={{ justifyContent: "center", color: "#4ade80" }}
          >
            <span style={{ background: "#4ade80" }} />
            Nashik&apos;s Most Trusted
          </div>
          <h2
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1.4rem,2.8vw,2.1rem)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
            }}
          >
            By the numbers
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 0,
          }}
        >
          {SDATA.map((s, i) => (
            <div
              key={s.l}
              style={{
                textAlign: "center",
                padding: "24px 12px",
                borderRight:
                  i < SDATA.length - 1
                    ? "1px solid rgba(255,255,255,.08)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.75rem,3.5vw,2.75rem)",
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1,
                  marginBottom: "5px",
                  letterSpacing: "-0.04em",
                  fontFamily: FONT,
                }}
              >
                {vals[i].toLocaleString()}
                {s.s}
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  color: "#4ade80",
                  marginBottom: "3px",
                }}
              >
                {s.l}
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,.38)" }}>
                {s.d}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "36px",
            paddingTop: "28px",
            borderTop: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,.52)",
              fontSize: "14.5px",
              marginBottom: "18px",
            }}
          >
            Join thousands of happy property owners across Nashik
          </p>
          <Link
            href="/register"
            className="b bg"
            style={{
              padding: "12px 30px",
              fontSize: "14px",
              borderRadius: "9px",
            }}
          >
            Join the List {I.arr}
          </Link>
        </div>
      </div>
      <style>{`@media(max-width:768px){.sg{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:480px){.sg{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOCALITIES  — 4/row, 3 rows, CTA instead of pill list
═══════════════════════════════════════════════════════════ */
function Locs() {
  const [ref, vis] = useInView();
  const show = LOCS.slice(0, 12); // exactly 3 rows × 4

  return (
    <section
      className="sec"
      style={{ background: G.off, padding: "44px 0" }}
      ref={ref}
    >
      <div className="w">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "22px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <div className="sl">Explore Nashik</div>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.4rem,2.8vw,2.1rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: G.ink,
              }}
            >
              Top Localities
            </h2>
          </div>
          <Link
            href="/localities"
            className="b bo"
            style={{ padding: "8px 16px", fontSize: "12.5px" }}
          >
            View All Localities {I.arr}
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "12px",
          }}
        >
          {show.map((l, i) => (
            <a
              key={l.n}
              href="#"
              className="lf zm"
              style={{
                borderRadius: "11px",
                overflow: "hidden",
                position: "relative",
                display: "block",
                height: "138px",
                boxShadow: "0 2px 8px rgba(0,0,0,.07)",
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(10px)",
                transition: `opacity .45s ${E} ${i * 0.04}s,transform .45s ${E} ${i * 0.04}s,box-shadow .26s ${E},transform .26s ${E}`,
              }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={l.img}
                  alt={l.n}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.12) 60%,transparent 100%)",
                }}
              />
              {l.hot && (
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "#ef4444",
                    color: "white",
                    fontSize: "8.5px",
                    fontWeight: 800,
                    padding: "2px 7px",
                    borderRadius: "99px",
                  }}
                >
                  🔥 HOT
                </span>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "9px 11px",
                }}
              >
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "12.5px",
                    color: "white",
                    marginBottom: "2px",
                  }}
                >
                  {l.n}
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ fontSize: "10px", color: "rgba(255,255,255,.68)" }}
                  >
                    {l.tp}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      background: "rgba(255,255,255,.17)",
                      color: "white",
                      padding: "2px 7px",
                      borderRadius: "99px",
                      fontWeight: 700,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {l.c}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "22px" }}>
          <Link
            href="/localities"
            className="b bo"
            style={{ padding: "10px 24px", fontSize: "13px" }}
          >
            Explore All 40+ Nashik Localities {I.arr}
          </Link>
        </div>
      </div>
      <style>{`@media(max-width:900px){.lg{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:640px){.lg{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   WHY NASHIK  — compact horizontal auto-slide tabs
═══════════════════════════════════════════════════════════ */
function WhyNashik() {
  const [ac, setAc] = useState(0);
  const [ref] = useInView();

  useEffect(() => {
    const t = setInterval(() => setAc((a) => (a + 1) % WHY.length), 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="sec"
      style={{ background: "white", padding: "44px 0" }}
      ref={ref}
    >
      <div className="w">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "52px",
            alignItems: "center",
          }}
        >
          {/* Image collage */}
          <div style={{ position: "relative", height: "340px" }}>
            <div
              className="zm"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: "10%",
                height: "58%",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 18px 44px rgba(0,0,0,.13)",
              }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=80"
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div
              className="zm"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                left: "16%",
                height: "44%",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 18px 44px rgba(0,0,0,.11)",
                border: "3px solid white",
              }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80"
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "40%",
                left: "-16px",
                background: "white",
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 14px 36px rgba(0,0,0,.11)",
                border: `1px solid ${G.li}`,
                animation: "_fl 5s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  color: G.g,
                  lineHeight: 1,
                }}
              >
                40%
              </div>
              <div
                style={{
                  fontSize: "10.5px",
                  color: G.mu,
                  marginTop: "3px",
                  lineHeight: 1.4,
                }}
              >
                Avg. price appreciation
                <br />
                over 5 years
              </div>
            </div>
          </div>

          {/* Tabs + content */}
          <div>
            <div className="sl">Location Advantage</div>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.4rem,2.6vw,2.1rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: G.ink,
                lineHeight: 1.15,
                marginBottom: "8px",
              }}
            >
              Why invest in Nashik?
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                color: G.mu,
                lineHeight: 1.65,
                marginBottom: "20px",
              }}
            >
              Maharashtra&apos;s fastest-growing real estate destination.
            </p>
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              {WHY.map((w, i) => (
                <button
                  key={w.t}
                  onClick={() => setAc(i)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "99px",
                    fontSize: "12px",
                    fontWeight: 600,
                    border: `1.5px solid ${ac === i ? G.g : G.li}`,
                    background: ac === i ? G.gl : "transparent",
                    color: ac === i ? G.g : G.sl,
                    cursor: "pointer",
                    transition: `all .18s ${E}`,
                  }}
                >
                  {w.e} {w.t}
                </button>
              ))}
            </div>
            <div
              key={ac}
              className="fu"
              style={{
                background: G.off,
                borderRadius: "12px",
                padding: "18px",
                border: `1px solid ${G.li}`,
                minHeight: "76px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>
                  {WHY[ac].e}
                </span>
                <div>
                  <h4
                    style={{
                      fontWeight: 800,
                      fontSize: "14px",
                      color: G.ink,
                      marginBottom: "5px",
                    }}
                  >
                    {WHY[ac].t}
                  </h4>
                  <p
                    style={{ fontSize: "13px", color: G.mu, lineHeight: 1.62 }}
                  >
                    {WHY[ac].b}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "12px", display: "flex", gap: "4px" }}>
              {WHY.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: "2.5px",
                    borderRadius: "99px",
                    background: ac === i ? G.g : G.li,
                    transition: `background .28s ${E}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Two action cards */}
        <div
          style={{
            marginTop: "32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
          }}
        >
          <div
            style={{
              background: G.ink,
              borderRadius: "14px",
              padding: "24px 28px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-24px",
                right: "-24px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.025)",
              }}
            />
            <p
              style={{
                fontWeight: 800,
                fontSize: "15px",
                color: "white",
                marginBottom: "7px",
                letterSpacing: "-0.02em",
              }}
            >
              MahaProperties — Nashik&apos;s Trusted Partner
            </p>
            <p
              style={{
                fontSize: "12.5px",
                color: "rgba(255,255,255,.52)",
                lineHeight: 1.68,
                marginBottom: "16px",
              }}
            >
              40+ localities · RERA-compliant · transparent pricing since 2018.
              Connecting buyers with verified sellers across all property
              categories in Nashik.
            </p>
            <Link
              href="/about"
              className="b bg"
              style={{
                padding: "9px 18px",
                fontSize: "13px",
                borderRadius: "8px",
              }}
            >
              Our Story {I.arr}
            </Link>
          </div>
          <div
            style={{
              background: `linear-gradient(135deg,${G.g},${G.gm})`,
              borderRadius: "14px",
              padding: "24px 28px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-28px",
                left: "-16px",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.06)",
              }}
            />
            <p
              style={{
                fontWeight: 800,
                fontSize: "15px",
                color: "white",
                marginBottom: "7px",
                letterSpacing: "-0.02em",
              }}
            >
              Post Your Property Free
            </p>
            <p
              style={{
                fontSize: "12.5px",
                color: "rgba(255,255,255,.72)",
                lineHeight: 1.68,
                marginBottom: "16px",
              }}
            >
              List your NA plot, agriculture land, warehouse or commercial
              property. Reach{" "}
              <strong style={{ color: "white" }}>10,000+ active buyers</strong>{" "}
              every month — completely free.
            </p>
            <Link
              href="/post-property"
              className="b"
              style={{
                padding: "9px 18px",
                fontSize: "13px",
                borderRadius: "8px",
                background: "white",
                color: G.g,
                fontWeight: 700,
              }}
            >
              Post Property Free {I.arr}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS  — property image + client avatar
═══════════════════════════════════════════════════════════ */
function Testi() {
  const [ac, setAc] = useState(0);
  const [ref, vis] = useInView();

  useEffect(() => {
    const interval = setInterval(() => {
      setAc((prev) => (prev + 1) % TESTI.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const T = TESTI[ac];

  return (
    <section
      className="sec"
      style={{ background: G.off, padding: "44px 0" }}
      ref={ref}
    >
      <div className="w">
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div className="sl" style={{ justifyContent: "center" }}>
            Testimonials
          </div>
          <h2
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1.4rem,2.8vw,2.1rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: G.ink,
            }}
          >
            What our clients say
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Big card */}
          <div>
            <div
              key={ac}
              className="fu"
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${G.li}`,
                boxShadow: "0 4px 18px rgba(0,0,0,.06)",
              }}
            >
              <div
                style={{
                  aspectRatio: "16/7",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={T.pImg}
                  alt={T.r}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 60%)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "11px",
                    left: "12px",
                    background: "rgba(255,255,255,.15)",
                    color: "white",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "99px",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,.2)",
                  }}
                >
                  📍 {T.r} · {T.lc}
                </span>
              </div>
              <div style={{ padding: "20px 22px" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill={G.gll}
                  width="28"
                  height="28"
                  style={{ marginBottom: "10px" }}
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p
                  style={{
                    fontSize: "14.5px",
                    color: G.ink,
                    lineHeight: 1.72,
                    fontStyle: "italic",
                    marginBottom: "16px",
                  }}
                >
                  &quot;{T.txt}&quot;
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "11px" }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg,${T.col},${T.col}88)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    {T.av}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "13.5px",
                        color: G.ink,
                      }}
                    >
                      {T.n}
                    </div>
                    <div style={{ fontSize: "11.5px", color: G.mu }}>
                      {T.r} · {T.lc}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1.5px",
                        marginTop: "3px",
                      }}
                    >
                      {[0, 1, 2, 3, 4].map((j) => (
                        <span key={j}>{I.star}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Nav */}
            <div
              style={{
                display: "flex",
                gap: "9px",
                marginTop: "14px",
                alignItems: "center",
              }}
            >
              <button
                onClick={() =>
                  setAc((a) => (a - 1 + TESTI.length) % TESTI.length)
                }
                className="b bo"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  padding: 0,
                }}
              >
                {I.arL}
              </button>
              <div style={{ display: "flex", gap: "5px" }}>
                {TESTI.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAc(i)}
                    style={{
                      width: ac === i ? "22px" : "6px",
                      height: "6px",
                      borderRadius: "99px",
                      border: "none",
                      cursor: "pointer",
                      background: ac === i ? G.ink : G.li,
                      transition: `all .28s ${E}`,
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => setAc((a) => (a + 1) % TESTI.length)}
                className="b bo"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  padding: 0,
                }}
              >
                {I.arR}
              </button>
            </div>
          </div>

          {/* Right: client list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {TESTI.map((t, i) => (
              <button
                key={t.n}
                onClick={() => setAc(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  padding: "13px 14px",
                  borderRadius: "11px",
                  background: ac === i ? "white" : G.off,
                  border: `1.5px solid ${ac === i ? "#86efac" : G.li}`,
                  cursor: "pointer",
                  textAlign: "left",
                  boxShadow:
                    ac === i ? "0 3px 14px rgba(26,107,60,.09)" : "none",
                  transition: `all .2s ${E}`,
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateX(14px)",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <Image
                    src={t.pImg}
                    alt={t.n}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: "13px", color: G.ink }}
                  >
                    {t.n}
                  </div>
                  <div
                    style={{ fontSize: "11px", color: G.mu, marginTop: "1px" }}
                  >
                    {t.r} · {t.lc}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1px" }}>
                  {[0, 1, 2, 3, 4].map((j) => (
                    <span key={j}>{I.star}</span>
                  ))}
                </div>
              </button>
            ))}
            <div
              style={{
                marginTop: "6px",
                background: "white",
                borderRadius: "11px",
                padding: "16px",
                border: `1px solid ${G.li}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: G.g,
                  lineHeight: 1,
                }}
              >
                500+
              </div>
              <div
                style={{ fontSize: "12.5px", color: G.mu, marginTop: "3px" }}
              >
                Verified reviews
              </div>
              <Link
                href="/testimonials"
                className="b bo"
                style={{
                  marginTop: "12px",
                  padding: "8px 16px",
                  fontSize: "12px",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Read All Reviews {I.arr}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   BLOGS
═══════════════════════════════════════════════════════════ */
function Blogs({ blogs }: any) {
  const [ref, vis] = useInView();

  // dynamic blogs data

  if (!blogs || blogs.length === 0) return null;

  const [main, ...rest] = blogs;

  return (
    <section
      className="sec"
      style={{ background: "white", padding: "44px 0" }}
      ref={ref}
    >
      <div className="w">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "22px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <div className="sl">Insights</div>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.4rem,2.8vw,2.1rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: G.ink,
              }}
            >
              Nashik Property Insights
            </h2>
          </div>

          <Link
            href="/blog"
            className="b bo"
            style={{ padding: "8px 16px", fontSize: "12.5px" }}
          >
            All Articles {I.arr}
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "16px",
          }}
        >
          {/* Main Blog */}
          <Link
            href={`/blog/${main.s}`}
            className="lf zm"
            style={{
              background: "white",
              borderRadius: "14px",
              overflow: "hidden",
              border: `1px solid ${G.li}`,
              display: "block",
            }}
          >
            <div
              style={{
                aspectRatio: "16/9",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={main.img}
                alt={main.t}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "18px" }}>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: G.ink,
                  marginBottom: "7px",
                }}
              >
                {main.t}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "11.5px",
                  color: G.mu,
                }}
              >
                <span>📅 {main.d}</span>
                <span>⏱ {main.r} read</span>
              </div>
            </div>
          </Link>

          {/* Side Blogs */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "11px" }}
          >
            {rest.map((b: any, i: number) => (
              <Link
                key={b.s}
                href={`/blog/${b.s}`}
                className="lf"
                style={{
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1px solid ${G.li}`,
                  display: "flex",
                }}
              >
                <div
                  style={{ width: "96px", flexShrink: 0, position: "relative" }}
                >
                  <Image
                    src={b.img}
                    alt={b.t}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "11px 13px" }}>
                  <span
                    style={{
                      ...CC[b.cat],
                      display: "inline-flex",
                      padding: "2px 9px",
                      borderRadius: "99px",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    {b.cat}
                  </span>

                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "12.5px",
                      color: G.ink,
                      marginBottom: "5px",
                    }}
                  >
                    {b.t}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: "9px",
                      fontSize: "10.5px",
                      color: G.mu,
                    }}
                  >
                    <span>{b.d}</span>
                    <span>{b.r} read</span>
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
/* ═══════════════════════════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section
      style={{ padding: "60px 0", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1600&q=70"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,rgba(8,12,18,.94) 0%,rgba(22,90,50,.72) 100%)",
          }}
        />
      </div>
      <div
        className="w"
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <div
          className="sl"
          style={{ justifyContent: "center", color: "#4ade80" }}
        >
          <span style={{ background: "#4ade80" }} />
          Free Consultation Available
        </div>
        <h2
          style={{
            fontFamily: FONT,
            fontSize: "clamp(1.6rem,3.8vw,2.85rem)",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          Ready to find your dream property?
        </h2>
        <p
          style={{
            fontSize: "clamp(.875rem,1.7vw,1rem)",
            color: "rgba(255,255,255,.6)",
            maxWidth: "460px",
            margin: "0 auto 28px",
            lineHeight: 1.7,
          }}
        >
          Talk to our Nashik property experts for free. Right plot, right price
          — no pressure, zero brokerage surprises.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "11px",
            justifyContent: "center",
            marginBottom: "28px",
          }}
        >
          <a
            href="tel:+919876543210"
            className="b bg"
            style={{
              padding: "12px 26px",
              fontSize: "14px",
              borderRadius: "9px",
            }}
          >
            {I.ph} Call Now — Free
          </a>
          <a
            href="https://wa.me/919876543210"
            className="b bwa"
            style={{
              padding: "12px 26px",
              fontSize: "14px",
              borderRadius: "9px",
            }}
          >
            {I.wa} WhatsApp Us
          </a>
          <Link
            href="/properties"
            className="b bgh"
            style={{
              padding: "12px 26px",
              fontSize: "14px",
              borderRadius: "9px",
            }}
          >
            Browse Properties {I.arr}
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            justifyContent: "center",
          }}
        >
          {[
            "RERA Compliant",
            "Zero Hidden Charges",
            "2,500+ Verified Listings",
            "Free Expert Advice",
          ].map((b) => (
            <span
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "11.5px",
                fontWeight: 600,
                color: "rgba(255,255,255,.48)",
              }}
            >
              <span style={{ color: "#4ade80" }}>{I.chk}</span>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER  — single, best UI
═══════════════════════════════════════════════════════════ */
const FCOLS = [
  {
    t: "NA Plots",
    ll: [
      ["NA Plots On Gangapur Road", "#"],
      ["NA Plots On Nashik Road", "#"],
      ["NA Plots In Meri", "#"],
      ["NA Plots In Igatpuri", "#"],
      ["NA Plots On Trimbak Road", "#"],
      ["Collector NA Plot", "#"],
    ],
  },
  {
    t: "Agriculture",
    ll: [
      ["Agriculture Land In Nashik", "#"],
      ["Farm Land In Igatpuri", "#"],
      ["Farmhouse Plots In Nashik", "#"],
      ["Grape Farm Land", "#"],
      ["Warehouse Land", "#"],
      ["Industrial Sheds MIDC", "#"],
    ],
  },
  {
    t: "Commercial",
    ll: [
      ["Commercial Plots In Nashik", "#"],
      ["Plots In Satpur MIDC", "#"],
      ["Industrial Plots In Ambad", "#"],
      ["Showroom / Office Space", "#"],
      ["Investment Plots In Nashik", "#"],
      ["Collector NA Plots InNashik", "#"],
    ],
  },
  {
    t: "Company",
    ll: [
      ["About Us", "#"],
      ["Post Property", "#"],
      ["Blogs", "#"],
      ["Contact Us", "#"],
      ["Privacy Policy", "#"],
      ["Terms of Use", "#"],
    ],
  },
];

function Foot() {
  const lk: React.CSSProperties = {
    fontSize: "12.5px",
    color: "white",
    transition: `color .14s ${E}`,
  };
  return (
    <footer style={{ background: "#070b0e", color: "white" }}>
      <div className="w" style={{ paddingTop: "52px", paddingBottom: "36px" }}>
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
                <span style={{ color: "#2d9455" }}>{I.ph}</span>+91 98765 43210
              </a>
              <a
                href="mailto:hello@mahaproperties.in"
                style={{ ...lk, color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                hello@mahaproperties.in
              </a>
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
                    <a
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
                    </a>
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
          style={{ display: "flex", alignItems: "center", fontSize: "12px" }}
        >
          <span style={{ whiteSpace: "nowrap" }}>
            {" "}
            © 2026 MahaProperties. All rights reserved. Made with ❤️ in Nashik.
          </span>
          <span style={{ marginLeft: "570px", whiteSpace: "nowrap" }}>
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
function WA() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 850,
        width: "54px",
        height: "54px",
        borderRadius: "50%",
        background: G.wa,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 5px 20px rgba(37,211,102,.42)",
        animation: "_wb 3s ease-in-out infinite",
        border: "2px solid rgba(255,255,255,.28)",
      }}
    >
      {I.wa}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT EXPORT  — single component, zero duplicates
═══════════════════════════════════════════════════════════ */
export default function MahaHome() {
  const [properties, setProperties] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GCSS }} />
      {/* Nav is here — NOT in layout.tsx (which is now a passthrough) */}
      <Nav />
      <main style={{ paddingTop: "72px" }}>
        <Hero />
        <CatGrid />
        <Featured properties={properties} />
        <Stats />
        <Locs />
        <WhyNashik />
        <Testi />
        <Blogs blogs={blogs} />
        <CTA />
      </main>
      {/* Single footer */}
      <Foot />
      {/* WhatsApp sticky — official logo */}
      <WA />
    </>
  );
}
