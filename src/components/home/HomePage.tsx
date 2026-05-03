"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────────
   DESIGN SYSTEM
───────────────────────────────────────────────────────────── */
const T = {
  font:    "'DM Sans', system-ui, sans-serif",
  green:   "#1a6b3c",
  greenL:  "#2d9455",
  greenXL: "#f0faf4",
  gold:    "#c8973a",
  ink:     "#0e1117",
  slate:   "#3a4553",
  muted:   "#7a8694",
  line:    "#e8ecf0",
  bg:      "#ffffff",
  bgOff:   "#f7f8fa",
  r12:     "12px",
  r20:     "20px",
  r999:    "999px",
};

const ease = "cubic-bezier(0.4,0,0.2,1)";

/* Google Fonts injection */
const FONT_URL = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap";

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('${FONT_URL}');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    font-family: ${T.font};
    color: ${T.ink};
    background: ${T.bg};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
  button { cursor: pointer; font-family: inherit; border: none; background: none; }
  input, select { font-family: inherit; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }

  /* ── Keyframes ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideRight {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    33%     { transform: translateY(-6px) rotate(0.5deg); }
    66%     { transform: translateY(-3px) rotate(-0.5deg); }
  }
  @keyframes pulse {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.5; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── Utility ── */
  .wu-fadeup    { animation: fadeUp 0.6s ${ease} both; }
  .wu-scalein   { animation: scaleIn 0.4s ${ease} both; }
  .wu-fadein    { animation: fadeIn 0.5s ease both; }
  .d1 { animation-delay: 0.08s; }
  .d2 { animation-delay: 0.16s; }
  .d3 { animation-delay: 0.24s; }
  .d4 { animation-delay: 0.32s; }
  .d5 { animation-delay: 0.40s; }
  .d6 { animation-delay: 0.48s; }

  /* ── Container ── */
  .wrap {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  @media (min-width: 768px) { .wrap { padding: 0 40px; } }

  /* ── Responsive hide ── */
  @media (max-width: 1024px) { .nav-hide { display: none !important; } }
  @media (max-width:  768px) { .sm-hide  { display: none !important; } }
  @media (max-width:  480px) { .xs-hide  { display: none !important; } }
  @media (min-width: 1025px) { .nav-show { display: none !important; } }

  /* ── Card hover ── */
  .card-lift {
    transition: transform 0.32s ${ease}, box-shadow 0.32s ${ease};
    will-change: transform;
  }
  .card-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.11) !important;
  }

  /* ── Image zoom ── */
  .img-zoom { overflow: hidden; }
  .img-zoom img {
    transition: transform 0.55s ${ease};
    will-change: transform;
  }
  .img-zoom:hover img { transform: scale(1.06); }

  /* ── Pill tag ── */
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 13px;
    border-radius: 99px;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* ── Btn ── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    font-family: ${T.font};
    font-weight: 600;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ${ease};
    white-space: nowrap;
  }
  .btn:focus-visible { outline: 2px solid ${T.green}; outline-offset: 2px; }
  .btn-primary {
    background: ${T.green};
    color: white;
    border-radius: ${T.r12};
    padding: 13px 26px;
    font-size: 14.5px;
    box-shadow: 0 4px 16px rgba(26,107,60,0.30);
  }
  .btn-primary:hover {
    background: ${T.greenL};
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(26,107,60,0.35);
  }
  .btn-outline {
    background: transparent;
    color: ${T.ink};
    border: 1.5px solid ${T.line};
    border-radius: ${T.r12};
    padding: 12px 24px;
    font-size: 14.5px;
  }
  .btn-outline:hover {
    border-color: ${T.green};
    color: ${T.green};
    background: ${T.greenXL};
  }
  .btn-ghost {
    background: rgba(255,255,255,0.12);
    color: white;
    border: 1.5px solid rgba(255,255,255,0.22);
    border-radius: ${T.r12};
    padding: 12px 22px;
    font-size: 14px;
    backdrop-filter: blur(8px);
  }
  .btn-ghost:hover {
    background: rgba(255,255,255,0.22);
  }
  .btn-cta {
    background: linear-gradient(135deg, #1a6b3c 0%, #2d9455 100%);
    color: white;
    border-radius: ${T.r12};
    padding: 13px 26px;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 6px 20px rgba(26,107,60,0.38);
  }
  .btn-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 28px rgba(26,107,60,0.42);
  }

  /* ── Section spacing ── */
  .section { padding: 88px 0; }
  @media (max-width: 768px) { .section { padding: 64px 0; } }

  /* ── Section label ── */
  .section-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${T.green};
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: ${T.green};
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* ── Divider ── */
  .hdivider {
    width: 100%;
    height: 1px;
    background: ${T.line};
  }

  /* ── Input ── */
  .field {
    height: 48px;
    padding: 0 16px;
    border: 1.5px solid ${T.line};
    border-radius: ${T.r12};
    font-family: ${T.font};
    font-size: 14px;
    color: ${T.ink};
    background: white;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    width: 100%;
  }
  .field:focus {
    border-color: ${T.green};
    box-shadow: 0 0 0 3px rgba(26,107,60,0.10);
  }
  .field::placeholder { color: #adb5bd; }
`;

/* ─────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────────────────────── */
function useCounter(target: number, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
}

function StatItem({ value, label, suf, visible, isLast }: { value: number; label: string; suf?: string; visible: boolean; isLast: boolean }) {
  const count = useCounter(value, 1800, visible);
  return (
    <div style={{ textAlign: "center", padding: "40px 24px", borderRight: !isLast ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
      <div style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: "8px", letterSpacing: "-0.04em", fontFamily: T.font }}>
        {count}{suf || ""}
      </div>
      <div style={{ color: "rgba(255,255,255,0.84)", fontSize: "16px", fontWeight: 600 }}>{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SVG ICONS (self-contained, no deps)
───────────────────────────────────────────────────────────── */
const IC = {
  menu:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>,
  x:       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  search:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  phone:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .27h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.1a16 16 0 006.29 6.29l1.19-1.19a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
  chevD:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  user:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  pin:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  arrow:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  arrowL:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  heart:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  check:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  star:    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  eye:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  ruler:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.3 8.7l-9-9a1 1 0 00-1.4 0l-9 9a1 1 0 000 1.4l9 9a1 1 0 001.4 0l9-9a1 1 0 000-1.4z"/><path d="M9 10.5L8 11.5"/><path d="M12 7.5L11 8.5"/><path d="M15 10.5l-1 1"/><path d="M12 13.5l-1 1"/></svg>,
  bell:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  quote:   <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.12"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "NA Plots",     href: "#" },
  { label: "Agriculture",  href: "#" },
  { label: "Commercial",   href: "#" },
  { label: "Localities",   href: "#" },
  { label: "About Nashik", href: "#" },
];

const CATEGORIES = [
  { icon: "🏞️", label: "NA Plots",          count: "480+", href: "#", accent: "#1a6b3c", bg: "linear-gradient(135deg,#f0faf4,#dcfce7)" },
  { icon: "📋", label: "Collector NA",       count: "95+",  href: "#", accent: "#1d4ed8", bg: "linear-gradient(135deg,#eff6ff,#dbeafe)" },
  { icon: "🌾", label: "Agriculture Land",   count: "120+", href: "#", accent: "#92400e", bg: "linear-gradient(135deg,#fffbeb,#fef3c7)" },
  { icon: "🏭", label: "Warehouse",          count: "45+",  href: "#", accent: "#6d28d9", bg: "linear-gradient(135deg,#f5f3ff,#ede9fe)" },
  { icon: "🏢", label: "Commercial",         count: "70+",  href: "#", accent: "#be123c", bg: "linear-gradient(135deg,#fff1f2,#ffe4e6)" },
  { icon: "📈", label: "Investment Plots",   count: "200+", href: "#", accent: "#0f766e", bg: "linear-gradient(135deg,#f0fdfa,#ccfbf1)" },
];

const PROPERTIES = [
  {
    id: "1",
    title: "Prime NA Plot — Gangapur Road",
    locality: "Gangapur Road",
    cat: "NA Plot",
    price: "₹42 L",
    area: "2,000 sq.ft",
    rera: true,
    badge: "Featured",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80",
  },
  {
    id: "2",
    title: "Agriculture Land — Igatpuri",
    locality: "Igatpuri",
    cat: "Agriculture Land",
    price: "₹85 L",
    area: "3 Acres",
    rera: true,
    badge: "Hot Deal",
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=80",
  },
  {
    id: "3",
    title: "Industrial Shed — MIDC Satpur",
    locality: "Satpur MIDC",
    cat: "Industrial Shed",
    price: "₹1.2 Cr",
    area: "5,000 sq.ft",
    rera: false,
    badge: "New",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
  },
  {
    id: "4",
    title: "Commercial Plot — Nashik Road",
    locality: "Nashik Road",
    cat: "Commercial",
    price: "₹68 L",
    area: "1,800 sq.ft",
    rera: true,
    badge: null,
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
  },
  {
    id: "5",
    title: "Investment Plot — Meri Village",
    locality: "Meri Village",
    cat: "Investment Plot",
    price: "₹18 L",
    area: "1,200 sq.ft",
    rera: true,
    badge: "Best Buy",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
  },
  {
    id: "6",
    title: "Warehouse Land — Ambad",
    locality: "Ambad",
    cat: "Warehouse",
    price: "₹2.4 Cr",
    area: "12,000 sq.ft",
    rera: false,
    badge: null,
    img: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=700&q=80",
  },
];

const LOCALITIES = [
  { name: "Gangapur Road",  type: "Premium Residential", count: "280+", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=75", hot: true  },
  { name: "Igatpuri",       type: "Agriculture & Hills", count: "110+", img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=500&q=75", hot: true  },
  { name: "Nashik Road",    type: "Industrial Belt",     count: "320+", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=75", hot: false },
  { name: "Trimbak Road",   type: "Spiritual & Farms",   count: "88+",  img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=75", hot: false },
  { name: "Meri Village",   type: "NA Plot Investment",  count: "95+",  img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=75", hot: true  },
  { name: "Ambad MIDC",     type: "Industrial Hub",      count: "145+", img: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=500&q=75", hot: false },
];

const TESTIMONIALS = [
  { name: "Rahul Deshmukh",  role: "Bought NA Plot",       location: "Gangapur Road", stars: 5, text: "Found the perfect NA plot within budget. The team was exceptional — responsive, transparent, zero surprises at registration. I'd been searching for 8 months before finding MahaProperties.", avatar: "R", color: "#1a6b3c" },
  { name: "Sunita Patil",    role: "Agriculture Land",      location: "Igatpuri",      stars: 5, text: "Six months of searching ended in one week. Three verified options, clear titles, and a price I hadn't seen elsewhere. The RERA compliance gave me confidence to invest immediately.", avatar: "S", color: "#0891b2" },
  { name: "Vikram Joshi",    role: "Industrial Shed",       location: "MIDC Satpur",   stars: 5, text: "Needed a shed near MIDC Satpur urgently for my manufacturing unit. Five verified listings in 24 hours, deal closed in 2 weeks. Genuinely outstanding service.", avatar: "V", color: "#7c3aed" },
  { name: "Priya Kulkarni",  role: "Investment Plots",      location: "Meri Village",  stars: 5, text: "Invested in two plots through MahaProperties. Already seeing 35% appreciation in 18 months. Their knowledge of Nashik's micro-markets is unparalleled.", avatar: "P", color: "#c8973a" },
];

const BLOGS = [
  { slug: "na-plot-guide",        title: "Complete Guide to Buying NA Plots in Nashik",          cat: "Buying Guide", date: "Jan 15",  read: "8 min",  img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=75", featured: true  },
  { slug: "agriculture-invest",   title: "Why Nashik Agriculture Land is Maharashtra's Best Bet", cat: "Investment",   date: "Jan 22",  read: "6 min",  img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=75", featured: false },
  { slug: "midc-industrial",      title: "MIDC Nashik: Industrial Property Opportunities in 2025",cat: "Commercial",   date: "Feb 1",   read: "7 min",  img: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=500&q=75", featured: false },
  { slug: "rera-guide",           title: "RERA for Property Buyers: A Plain-English Guide",       cat: "Legal",        date: "Feb 10",  read: "5 min",  img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=75", featured: false },
];

const STAT_DATA = [
  { val: 2500, suf: "+", label: "Active Listings",    desc: "Across all categories"  },
  { val: 840,  suf: "+", label: "Deals Closed",       desc: "Happy buyers & sellers" },
  { val: 42,   suf: "+", label: "Localities Covered", desc: "Nashik district"        },
  { val: 98,   suf: "%", label: "Satisfaction Rate",  desc: "Client reviews"         },
];

const WHY_NASHIK = [
  { icon: "✈️", title: "Connectivity",      body: "60 km from Mumbai–Pune expressway. Direct highways to all major Maharashtra cities. Upcoming Metro project." },
  { icon: "🍷", title: "Wine Capital",      body: "India's Napa Valley. World-class wineries driving tourism, hospitality and high-end residential demand." },
  { icon: "🏭", title: "Industrial Hub",    body: "MIDC Satpur & Ambad: Maharashtra's fastest-growing zones with 3,000+ registered companies." },
  { icon: "💧", title: "Water Abundance",   body: "Three major rivers. India's grape & onion capital. Agriculture land here is among Maharashtra's most fertile." },
  { icon: "📈", title: "Price Appreciation",body: "30–40% appreciation in select localities over 5 years. NA plots doubling value every 3–4 years." },
  { icon: "🏛️", title: "Infrastructure",   body: "IIM, world-class hospitals, Phoenix Mall, top schools. Quality of life that rivals Pune & Aurangabad." },
];

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [drawerOpen,setDrawerOpen]= useState(false);
  const [srchFocus, setSrchFocus] = useState(false);
  const [srchQ,     setSrchQ]     = useState("");
  const prevY = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      prevY.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Lock body when drawer open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const onDark = !scrolled;

  const hStyle: React.CSSProperties = {
    position:   "fixed",
    top:        0,
    left:       0,
    right:      0,
    zIndex:     900,
    height:     "72px",
    background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
    borderBottom: scrolled ? `1px solid ${T.line}` : "1px solid transparent",
    backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
    boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.07)" : "none",
    transition: `background 0.4s ${ease}, border-color 0.4s ${ease}, box-shadow 0.4s ${ease}, backdrop-filter 0.4s ${ease}`,
    willChange: "background",
  };

  const iconColor  = onDark ? "white" : T.slate;
  const navColor   = onDark ? "rgba(255,255,255,0.88)" : T.slate;

  const navMenu = (
    <nav className="nav-hide" style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
      {NAV_ITEMS.map(n => (
        <Link key={n.label} href={n.href} style={{
          padding: "7px 13px", borderRadius: "9px",
          fontSize: "14px", fontWeight: 600,
          color: navColor,
          display: "flex", alignItems: "center", gap: "4px",
          transition: "all 0.18s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = navColor; }}
        >
          {n.label} {IC.chevD}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <header style={hStyle}>
        <div className="wrap" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{
              width: "200px",
              height: "50px",
              borderRadius: "10px",
              background: "white",
              overflow: "hidden",
              position: "relative",
              boxShadow: "none",
              transition: "all 0.4s",
            }}>
              <Image src="/mahaproperties-logo.png" alt="MahaProperties logo" fill style={{ objectFit: "contain", objectPosition: "center" }} />
            </div>
          </Link>

          {/* ── Menu (non-sticky) ── */}
          {navMenu}

          {/* ── Scrolled: Search bar inline ── */}
          {scrolled ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                flex: 1,
                display: "flex", alignItems: "center", gap: "9px",
                height: "40px", borderRadius: T.r12,
                border: `1.5px solid ${srchFocus ? T.green : T.line}`,
                background: srchFocus ? T.greenXL : T.bgOff,
                padding: "0 14px",
                transition: `border-color 0.2s, background 0.2s`,
              }}>
                <span style={{ color: srchFocus ? T.green : T.muted, flexShrink: 0, transition: "color 0.2s" }}>{IC.search}</span>
                <input
                  value={srchQ}
                  onChange={e => setSrchQ(e.target.value)}
                  onFocus={() => setSrchFocus(true)}
                  onBlur={() => setSrchFocus(false)}
                  placeholder="Search locality, type, project…"
                  style={{
                    border: "none", outline: "none", background: "transparent",
                    fontSize: "13.5px", color: T.ink, fontFamily: T.font, width: "100%",
                  }}
                />
              </div>

              <select className="sm-hide" style={{
                height: "40px", padding: "0 12px",
                border: `1.5px solid ${T.line}`, borderRadius: T.r12,
                fontSize: "13px", fontWeight: 500, color: T.slate,
                background: "white", outline: "none", cursor: "pointer",
              }}>
                <option value="">All Types</option>
                {["NA Plot","Collector NA","Agriculture","Warehouse","Commercial","Investment"].map(t => <option key={t}>{t}</option>)}
              </select>

              <div style={{ width: "1px", height: "28px", background: T.line, flexShrink: 0 }} className="sm-hide" />

              <Link href="/login" className="sm-hide" style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 600, color: T.slate, padding: "0 2px", whiteSpace: "nowrap" }}>
                {IC.user}&nbsp;Login
              </Link>

              <Link href="/enquiry" className="btn btn-cta xs-hide" style={{ padding: "0 18px", height: "40px", fontSize: "13px", borderRadius: T.r12 }}>
                {IC.bell}&nbsp;Enquiry Now
              </Link>

              <button onClick={() => setDrawerOpen(true)} style={{
                width: "40px", height: "40px", borderRadius: T.r12,
                border: `1.5px solid ${T.line}`, background: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: T.slate, flexShrink: 0,
              }}>
                {IC.menu}
              </button>
            </div>
          ) : (
            /* ── Default: right actions ── */
            <>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button className="sm-hide" style={{
                  width: "38px", height: "38px", borderRadius: "9px",
                  border: onDark ? "1.5px solid rgba(255,255,255,0.22)" : `1.5px solid ${T.line}`,
                  background: onDark ? "rgba(255,255,255,0.08)" : "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: iconColor, flexShrink: 0,
                  transition: "all 0.2s",
                }}>
                  {IC.search}
                </button>

                <a href="tel:+919876543210" className="sm-hide" style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "8px 14px", borderRadius: "9px",
                  border: onDark ? "1.5px solid rgba(255,255,255,0.22)" : `1.5px solid ${T.line}`,
                  background: onDark ? "rgba(255,255,255,0.08)" : "white",
                  color: iconColor, fontSize: "13px", fontWeight: 600,
                  transition: "all 0.2s",
                }}>
                  {IC.phone}&nbsp;98765 43210
                </a>

                <div className="sm-hide" style={{
                  display: "flex", borderRadius: "9px",
                  border: onDark ? "1.5px solid rgba(255,255,255,0.22)" : `1.5px solid ${T.line}`,
                  overflow: "hidden",
                  background: onDark ? "rgba(255,255,255,0.08)" : "white",
                }}>
                  <Link href="/login" style={{ display: "flex", alignItems: "center", gap: "5px", padding: "8px 13px", fontSize: "13px", fontWeight: 600, color: iconColor, borderRight: onDark ? "1px solid rgba(255,255,255,0.15)" : `1px solid ${T.line}` }}>
                    {IC.user}&nbsp;Login
                  </Link>
                  <Link href="/register" style={{ padding: "8px 13px", fontSize: "13px", fontWeight: 600, color: iconColor }}>Register</Link>
                </div>

                <Link href="/post-property" className="btn btn-primary xs-hide" style={{ padding: "9px 18px", fontSize: "13px", borderRadius: "9px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  List your property
                  <span style={{ background: "#dcfce7", color: "#166534", fontSize: "10px", fontWeight: 700, borderRadius: "999px", padding: "1px 7px" }}>FREE</span>
                </Link>

                <button onClick={() => setDrawerOpen(true)} style={{
                  width: "40px", height: "40px", borderRadius: "9px",
                  border: onDark ? "1.5px solid rgba(255,255,255,0.22)" : `1.5px solid ${T.line}`,
                  background: onDark ? "rgba(255,255,255,0.08)" : "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: iconColor, flexShrink: 0, transition: "all 0.2s",
                }}>
                  {IC.menu}
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* ── Drawer ── */}
      {drawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(14,17,23,0.55)", backdropFilter: "blur(4px)", animation: "fadeIn 0.25s ease" }}
          />
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: "min(400px, 94vw)", background: "white",
            display: "flex", flexDirection: "column", overflowY: "auto",
            boxShadow: "-24px 0 80px rgba(0,0,0,0.18)",
            animation: "slideRight 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}>
            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "linear-gradient(135deg,#1a6b3c,#2d9455)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 28 28" fill="none" width="16" height="16"><path d="M14 3L25 12V25H18V18H10V25H3V12L14 3Z" fill="white" opacity="0.95"/><circle cx="14" cy="11" r="2.5" fill="rgba(255,255,255,0.5)"/></svg>
                </div>
                <span style={{ fontWeight: 800, fontSize: "1rem", color: T.ink, letterSpacing: "-0.02em" }}>Maha<span style={{ color: T.green }}>Properties</span></span>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ width: "36px", height: "36px", borderRadius: "9px", border: `1.5px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.slate }}>
                {IC.x}
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: "16px 24px", borderBottom: `1px solid ${T.line}`, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px", height: "44px", border: `1.5px solid ${T.line}`, borderRadius: T.r12, padding: "0 14px", background: T.bgOff }}>
                {IC.search}
                <input placeholder="Search property, locality…" style={{ border: "none", outline: "none", background: "transparent", fontSize: "14px", fontFamily: T.font, width: "100%", color: T.ink }} />
              </div>
            </div>

            {/* Categories */}
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.line}`, flexShrink: 0 }}>
              <div className="section-label" style={{ marginBottom: "14px" }}>Property Types</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  { e: "🏞️", l: "NA Plots"        },
                  { e: "📋", l: "Collector NA"    },
                  { e: "🌾", l: "Agriculture"     },
                  { e: "🏭", l: "Warehouse"       },
                  { e: "🏢", l: "Commercial"      },
                  { e: "📈", l: "Investment Plot" },
                  { e: "🍇", l: "Farmhouse"       },
                  { e: "🏗️", l: "Industrial Shed" },
                ].map(c => (
                  <a key={c.l} href="#" onClick={() => setDrawerOpen(false)} style={{
                    display: "flex", alignItems: "center", gap: "9px",
                    padding: "10px 12px", borderRadius: "10px",
                    border: `1.5px solid ${T.line}`, background: T.bgOff,
                    fontSize: "13px", fontWeight: 600, color: T.slate,
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor="#86efac"; el.style.background=T.greenXL; el.style.color=T.green; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=T.line; el.style.background=T.bgOff; el.style.color=T.slate; }}
                  >
                    <span style={{ fontSize: "1.05rem" }}>{c.e}</span>{c.l}
                  </a>
                ))}
              </div>
            </div>

            {/* Localities */}
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.line}`, flexShrink: 0 }}>
              <div className="section-label" style={{ marginBottom: "14px" }}>Localities</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {["Gangapur Road","Nashik Road","Igatpuri","Meri","Ambad","Pathardi Phata","Trimbak Road","Indira Nagar","Sinnar","Panchavati","College Road","Varavandi"].map(l => (
                  <a key={l} href="#" onClick={() => setDrawerOpen(false)} style={{
                    padding: "6px 13px", borderRadius: T.r999,
                    background: T.bgOff, border: `1px solid ${T.line}`,
                    color: T.slate, fontSize: "12.5px", fontWeight: 500, transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background=T.greenXL; el.style.borderColor="#86efac"; el.style.color=T.green; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background=T.bgOff; el.style.borderColor=T.line; el.style.color=T.slate; }}
                  >{l}</a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div style={{ padding: "20px 24px", flex: 1 }}>
              {[["All Properties","#"],["About Nashik","#"],["Market Insights","#"],["Blog","#"],["Post Property","#"],["Contact","#"]].map(([l,h]) => (
                <a key={l} href={h} onClick={() => setDrawerOpen(false)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "13px 0", borderBottom: `1px solid ${T.bgOff}`,
                  fontSize: "14.5px", fontWeight: 600, color: T.slate, transition: "color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color=T.green)}
                  onMouseLeave={e => (e.currentTarget.style.color=T.slate)}
                >
                  {l}<span>{IC.arrow}</span>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: "20px 24px", borderTop: `1px solid ${T.line}`, display: "flex", flexDirection: "column", gap: "10px", flexShrink: 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <Link href="/login" style={{ padding: "12px", borderRadius: T.r12, textAlign: "center", border: `1.5px solid ${T.line}`, color: T.slate, fontWeight: 700, fontSize: "14px" }}>Login</Link>
                <Link href="/register" style={{ padding: "12px", borderRadius: T.r12, textAlign: "center", border: `1.5px solid ${T.line}`, color: T.slate, fontWeight: 700, fontSize: "14px" }}>Register</Link>
              </div>
              <Link href="/enquiry" className="btn btn-cta" style={{ borderRadius: T.r12, padding: "14px", fontSize: "14.5px" }} onClick={() => setDrawerOpen(false)}>
                {IC.bell}&nbsp; Enquiry Now — It&apos;s Free
              </Link>
              <a href="tel:+919876543210" style={{
                padding: "12px", borderRadius: T.r12, textAlign: "center",
                background: T.bgOff, border: `1.5px solid ${T.line}`,
                color: T.slate, fontWeight: 600, fontSize: "14px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
              }}>
                {IC.phone}&nbsp;+91 98765 43210
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    img:  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85",
    tag:  "NA Plots from ₹8 Lakh",
    h1:   "Find Your Perfect\nPlot in Nashik",
    sub:  "2,500+ verified properties. Transparent pricing. Zero surprises.",
    cta1: "Explore Properties",
    cta2: "Free Consultation",
  },
  {
    img:  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1800&q=85",
    tag:  "Agriculture Land — Clear Title Guaranteed",
    h1:   "Invest in Nashik's\nFertile Farmlands",
    sub:  "Prime agriculture land with RERA compliance and clean ownership records.",
    cta1: "View Agriculture Land",
    cta2: "Talk to an Expert",
  },
  {
    img:  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85",
    tag:  "Commercial & Industrial Properties",
    h1:   "Premium Commercial\nSpaces in Nashik",
    sub:  "Industrial sheds, warehouses, commercial plots across MIDC Satpur & Ambad.",
    cta1: "View Commercial",
    cta2: "Get a Callback",
  },
];

const SEARCH_TYPES = ["NA Plot","Collector NA","Agriculture","Warehouse","Commercial","Investment Plot","Farmhouse","Industrial Shed"];
const LOCALITIES_LIST = ["Any Locality","Gangapur Road","Nashik Road","Meri","Igatpuri","Ambad","Pathardi Phata","Trimbak Road","Indira Nagar","Sinnar","Panchavati","College Road","Varavandi","Dindori Road","Ozar","Satpur"];



/* ─────────────────────────────────────────────────────────────
   HERO SECTION — with live JSON API search
   (Filter logic mirrors /properties page: multi-field search
    across title + category + locality + city + area.)
   ───────────────────────────────────────────────────────────── */
type ApiProp = {
  id?: string;
  _id?: string;
  slug?: string;
  title?: string;
  t?: string;
  category?: string;
  cat?: string;
  locality?: string;
  loc?: string;
  city?: string;
  area?: string;
};

/* Same normalizer used on /properties page */
function norm(s: unknown): string {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function Hero() {
  const router = useRouter();

  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState([false, false, false]);
  const [srchQ, setSrchQ] = useState("");
  const [type, setType] = useState("");
  const [loc, setLoc] = useState("");

  // ✅ API state
  const [allProps, setAllProps] = useState<ApiProp[]>([]);
  const [suggestions, setSuggestions] = useState<ApiProp[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Fetch all properties once from your JSON API ── */
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/properties", { cache: "no-store", signal: ctrl.signal })
      .then((r) => r.json())
      .then((data) => {
        const list: ApiProp[] = Array.isArray(data) ? data : data.properties || [];
        setAllProps(list);
      })
      .catch(() => setAllProps([]));
    return () => ctrl.abort();
  }, []);

  /* ── Distinct categories & localities from API data ── */
  const apiCategories = Array.from(
    new Set(allProps.map((p) => (p.category || p.cat || "").trim()).filter(Boolean))
  ).sort();

  const apiLocalities = Array.from(
    new Set(
      allProps
        .map((p) => (p.locality || p.loc || "").trim())
        .filter(Boolean)
    )
  ).sort();

  /* ── Live suggestions — same logic as /properties page ── */
  useEffect(() => {
    const q = norm(srchQ);
    if (!q) {
      setSuggestions([]);
      return;
    }
    const matches = allProps
      .filter((p) => {
        const title    = norm(p.title || p.t || "");
        const category = norm(p.category || p.cat || "");
        const locality = norm(p.locality || p.loc || "");
        const city     = norm(p.city || "");
        const area     = norm(p.area || "");

        // ✅ one searchable string (identical to properties page)
        const searchText = `${title} ${category} ${locality} ${city} ${area}`;
        return searchText.includes(q);
      })
      .slice(0, 6);
    setSuggestions(matches);
  }, [srchQ, allProps]);

  /* ── Slider timer ── */
  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      6000
    );
  }, []);
  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  const goTo = (i: number) => {
    setSlide(i);
    startTimer();
  };

  /* ── Search handler — redirect to /properties with the same
        param names the properties page already reads
        (q, category, locality) ── */
  const handleSearch = () => {
    const qs = new URLSearchParams();
    if (srchQ.trim())                  qs.set("q", srchQ.trim());
    if (type)                          qs.append("category", type);
    if (loc && loc !== "Any Locality") qs.set("locality", loc);
    router.push(`/properties${qs.toString() ? `?${qs.toString()}` : ""}`);
  };

  const handleSuggestionClick = (p: ApiProp) => {
    if (p.slug) {
      router.push(`/properties/${p.slug}`);
    } else {
      setSrchQ(p.title || p.t || "");
      setShowSuggest(false);
    }
  };

  const S = HERO_SLIDES[slide];

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: "680px", overflow: "hidden", color: "white" }}>
      {/* ── Background slides ── */}
      {HERO_SLIDES.map((sl, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === slide ? 1 : 0, transition: `opacity 1s ${ease}` }}>
          <img
            src={sl.img}
            alt=""
            onLoad={() => setLoaded((prev) => { const n = [...prev]; n[i] = true; return n; })}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,17,23,0.35) 0%, rgba(14,17,23,0.75) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.5)" }} />
        </div>
      ))}

      {/* ── Content ── */}
      <div className="wrap" style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "40px" }}>
        <div style={{ maxWidth: "780px" }}>
          <span className="tag wu-fadeup d1" style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}>
            {S.tag}
          </span>

          <h1 className="wu-fadeup d2" style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 800, lineHeight: 1.05, margin: "18px 0", whiteSpace: "pre-line" }}>
            {S.h1}
          </h1>

          <p className="wu-fadeup d3" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", color: "rgba(255,255,255,0.85)", maxWidth: "560px", lineHeight: 1.6 }}>
            {S.sub}
          </p>

          {/* ── Search Box ── */}
          <div
            className="wu-fadeup d4"
            style={{
              marginTop: "32px",
              background: "white",
              borderRadius: T.r20,
              padding: "10px",
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr 1fr auto",
              gap: "8px",
              alignItems: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              maxWidth: "860px",
              position: "relative",
            }}
          >
            {/* Keyword + autocomplete */}
            <div style={{ padding: "4px 12px", position: "relative" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>
                Search
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: T.green }}>{IC.search}</span>
                <input
                  value={srchQ}
                  onChange={(e) => {
                    setSrchQ(e.target.value);
                    setShowSuggest(true);
                  }}
                  onFocus={() => setShowSuggest(true)}
                  onBlur={() => setTimeout(() => setShowSuggest(false), 180)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                  placeholder="Property name, locality, category…"
                  style={{ border: "none", outline: "none", fontSize: "14px", fontWeight: 500, color: T.ink, background: "transparent", width: "100%", fontFamily: T.font }}
                />
              </div>

              {/* Suggestions dropdown */}
              {showSuggest && suggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: "8px",
                    background: "white",
                    border: `1px solid ${T.line}`,
                    borderRadius: "12px",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    zIndex: 50,
                    maxHeight: "320px",
                    overflowY: "auto",
                  }}
                >
                  {suggestions.map((p) => (
                    <button
                      key={p.id || p._id || p.slug}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(p)}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "10px 14px",
                        background: "white",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        borderBottom: `1px solid ${T.bgOff}`,
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = T.greenXL)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}
                    >
                      <span style={{ fontSize: "13.5px", fontWeight: 600, color: T.ink }}>
                        {p.title || p.t}
                      </span>
                      <span style={{ fontSize: "11.5px", color: T.muted, marginTop: "2px" }}>
                        {(p.category || p.cat) && <>🏷 {p.category || p.cat} · </>}
                        📍 {p.locality || p.loc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type — from API */}
            <div style={{ padding: "4px 12px", borderLeft: `1px solid ${T.line}` }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>
                Type
              </div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ border: "none", outline: "none", fontSize: "14px", fontWeight: 600, color: T.ink, background: "transparent", cursor: "pointer", fontFamily: T.font, width: "100%" }}
              >
                <option value="">All Types</option>
                {apiCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Locality — from API */}
            <div style={{ padding: "4px 12px", borderLeft: `1px solid ${T.line}`, display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>
                  Locality
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: T.green }}>{IC.pin}</span>
                  <select
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    style={{ border: "none", outline: "none", fontSize: "14px", fontWeight: 600, color: T.ink, background: "transparent", cursor: "pointer", fontFamily: T.font, flex: 1 }}
                  >
                    <option value="">Any Locality</option>
                    {apiLocalities.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Button */}
            <button type="button" onClick={handleSearch} className="btn btn-cta" style={{ height: "54px", padding: "0 26px" }}>
              {IC.search} Search
            </button>
          </div>

          {/* CTAs */}
          <div className="wu-fadeup d5" style={{ display: "flex", gap: "14px", marginTop: "28px", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={handleSearch}>{S.cta1}</button>
            <button className="btn btn-ghost">{S.cta2}</button>
          </div>
        </div>

        {/* Slide controls */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 3 }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === slide ? "28px" : "8px",
                height: "8px",
                borderRadius: "99px",
                background: i === slide ? "white" : "rgba(255,255,255,0.35)",
                border: "none",
                cursor: "pointer",
                transition: `all 0.4s ${ease}`,
              }}
            />
          ))}
        </div>

        <div
          className="sm-hide"
          style={{ position: "absolute", bottom: "40px", right: "40px", zIndex: 3, display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          Scroll ↓
        </div>
      </div>
    </section>
  );
}
/* ─────────────────────────────────────────────────────────────
   TICKER — marquee property types
───────────────────────────────────────────────────────────── */
function Ticker() {
  const items = ["NA Plots","Collector NA","Agriculture Land","Warehouse Land","Commercial Plots","Investment Plots","Farmhouse Land","Industrial Sheds","NA Plots","Collector NA","Agriculture Land","Warehouse Land","Commercial Plots","Investment Plots","Farmhouse Land","Industrial Sheds"];
  return (
    <div style={{ background: T.green, padding: "12px 0", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content" }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "0 24px", color: "white", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "inline-block" }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CATEGORY GRID — Apple Bento Style
───────────────────────────────────────────────────────────── */
function CategoryGrid() {
  const [ref, visible] = useInView();
  return (
    <section className="section" style={{ background: T.bg }}>
      <div className="wrap">
        <div ref={ref} style={{ marginBottom: "52px" }}>
          <div className="section-label">Browse Properties</div>
          <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", color: T.ink, maxWidth: "520px", lineHeight: 1.15 }}>
            What are you<br />looking for?
          </h2>
        </div>

        {/* Apple Bento Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridTemplateRows: "auto", gap: "16px" }}>
          {CATEGORIES.map((cat, i) => {
            const spans = [
              [6,5], [6,5], [4,4], [4,4], [4,4], [12,3],
            ];
            const [col, row] = spans[i] || [4,4];
            return (
              <a key={cat.label} href={cat.href}
                className={`card-lift ${visible ? "wu-fadeup" : ""}`}
                style={{
                  gridColumn: `span ${col}`, gridRow: `span 1`,
                  background: cat.bg,
                  borderRadius: "20px",
                  padding: i === 5 ? "28px 36px" : "28px",
                  border: `1px solid rgba(0,0,0,0.05)`,
                  display: "flex",
                  flexDirection: i === 5 ? "row" : "column",
                  alignItems: i === 5 ? "center" : "flex-start",
                  justifyContent: i === 5 ? "space-between" : "space-between",
                  minHeight: i < 2 ? "200px" : i === 5 ? "auto" : "160px",
                  cursor: "pointer",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  animationDelay: `${i * 0.07}s`,
                  overflow: "hidden",
                  position: "relative",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(0,0,0,0.11)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; }}
              >
                <div style={{ display: "flex", flexDirection: i === 5 ? "row" : "column", gap: i === 5 ? "16px" : "0", alignItems: i === 5 ? "center" : "flex-start", flex: 1 }}>
                  <div style={{ fontSize: i < 2 ? "2.5rem" : "2rem", marginBottom: i === 5 ? 0 : "auto", lineHeight: 1 }}>{cat.icon}</div>
                  {i === 5 && <div style={{ width: "1px", height: "40px", background: "rgba(0,0,0,0.1)" }} />}
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: i < 2 ? "1.15rem" : i === 5 ? "1rem" : "0.975rem", color: T.ink, marginBottom: "4px", letterSpacing: "-0.01em" }}>{cat.label}</h3>
                    <p style={{ fontSize: "12px", color: cat.accent, fontWeight: 700 }}>{cat.count} listings</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: cat.accent, fontWeight: 700, fontSize: "12.5px", marginTop: i === 5 ? 0 : "20px" }}>
                  View all {IC.arrow}
                </div>
              </a>
            );
          })}
        </div>

        {/* Mobile fallback: 2-col grid */}
        <style>{`
          @media(max-width:768px){
            .bento-grid > a { grid-column: span 6 !important; min-height: 140px !important; flex-direction: column !important; }
            .bento-grid > a:last-child { grid-column: span 12 !important; }
          }
          @media(max-width:480px){
            .bento-grid > a { grid-column: span 12 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURED LISTINGS
───────────────────────────────────────────────────────────── */
const TABS = ["All","NA Plot","Agriculture Land","Commercial","Warehouse","Investment Plot"];

function FeaturedListings() {
  const [tab, setTab] = useState("All");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [ref, visible] = useInView();

  const filtered = tab === "All" ? PROPERTIES : PROPERTIES.filter(p => p.cat.includes(tab.split(" ")[0]));

  const toggle = (id: string) => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <section className="section" style={{ background: T.bgOff }} ref={ref}>
      <div className="wrap">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div className="section-label">Handpicked</div>
            <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", color: T.ink, lineHeight: 1.15 }}>
              Featured Properties
            </h2>
          </div>
          <Link href="/properties" className="btn btn-outline" style={{ fontSize: "13.5px" }}>View all listings {IC.arrow}</Link>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "20px", scrollbarWidth: "none", marginBottom: "8px" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className="btn" style={{
              padding: "8px 18px", borderRadius: T.r999,
              fontSize: "13.5px", fontWeight: 600,
              background: tab === t ? T.ink : "white",
              color: tab === t ? "white" : T.slate,
              border: `1.5px solid ${tab === t ? T.ink : T.line}`,
              boxShadow: tab === t ? "0 4px 12px rgba(14,17,23,0.2)" : "none",
              flexShrink: 0,
              transition: `all 0.2s ${ease}`,
            }}>{t}</button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "20px" }}>
          {filtered.map((p, i) => (
            <div key={p.id}
              className={`card-lift ${visible ? "wu-fadeup" : ""}`}
              style={{
                background: "white", borderRadius: "18px",
                border: `1px solid ${T.line}`,
                overflow: "hidden",
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {/* Image */}
              <div className="img-zoom" style={{ position: "relative", aspectRatio: "16/10", background: T.bgOff }}>
                <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                {/* Gradient */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }} />

                {/* Badges */}
                <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px" }}>
                  {p.rera && (
                    <span className="tag" style={{ background: "rgba(26,107,60,0.88)", color: "white", fontSize: "10px", backdropFilter: "blur(8px)" }}>
                      {IC.check}&nbsp;RERA
                    </span>
                  )}
                  {p.badge && (
                    <span className="tag" style={{ background: "rgba(200,151,58,0.92)", color: "white", fontSize: "10px", backdropFilter: "blur(8px)" }}>
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Save */}
                <button onClick={() => toggle(p.id)} style={{
                  position: "absolute", top: "12px", right: "12px",
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "none", transition: `transform 0.2s ${ease}`,
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={saved.has(p.id) ? "#ef4444" : "none"} stroke={saved.has(p.id) ? "#ef4444" : "#9ca3af"} strokeWidth="2.2" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>

                {/* Category */}
                <span style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,0,0,0.6)", color: "white", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "7px", backdropFilter: "blur(8px)" }}>
                  {p.cat}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "18px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "15px", color: T.ink, marginBottom: "7px", lineHeight: 1.35, letterSpacing: "-0.01em" }}>{p.title}</h3>

                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: T.muted, fontSize: "12.5px", marginBottom: "14px" }}>
                  <span style={{ color: T.green }}>{IC.pin}</span> {p.locality}, Nashik
                </div>

                <div style={{ fontSize: "1.45rem", fontWeight: 800, color: T.green, letterSpacing: "-0.025em", marginBottom: "14px", fontFamily: T.font }}>
                  {p.price}
                </div>

                <div style={{ display: "flex", gap: "16px", padding: "12px 0", borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, marginBottom: "16px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: T.muted }}>{IC.ruler} {p.area}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: T.muted, marginLeft: "auto" }}>{IC.eye} 234 views</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <Link href={`/properties/${p.id}`} className="btn btn-outline" style={{ fontSize: "13px", padding: "9px 12px" }}>Details</Link>
                  <Link href="/enquiry" className="btn btn-cta" style={{ fontSize: "13px", padding: "9px 12px" }}>{IC.phone}&nbsp;Contact</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   STATS — animated counters
───────────────────────────────────────────────────────────── */
function Stats() {
  const [ref, visible] = useInView(0.3);

  return (
    <section style={{ background: T.ink, padding: "72px 0", position: "relative", overflow: "hidden" }} ref={ref}>
      {/* Noise texture overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4 }} />

      <div className="wrap" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="section-label" style={{ justifyContent: "center", color: "#4ade80" }}>
            <span style={{ background: "#4ade80" }} />
            By the numbers
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em" }}>
            Nashik&apos;s most trusted<br />property portal
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0" }}>
          {STAT_DATA.map((s, i) => (
            <StatItem key={s.label} value={s.val} label={s.label} suf={s.suf} visible={visible} isLast={i === STAT_DATA.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   LOCALITIES — editorial grid with real images
───────────────────────────────────────────────────────────── */
function Localities() {
  const [ref, visible] = useInView();
  const [hovIdx, setHovIdx] = useState<number|null>(null);
  return (
    <section className="section" style={{ background: T.bg }} ref={ref}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "end", marginBottom: "48px", gap: "24px" }}>
          <div>
            <div className="section-label">Explore Nashik</div>
            <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", color: T.ink, lineHeight: 1.15 }}>
              Top localities
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <a href="#" className="btn btn-outline" style={{ fontSize: "13.5px" }}>All localities {IC.arrow}</a>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridAutoRows: "180px", gap: "14px" }}>
          {LOCALITIES.map((loc, i) => {
            const layouts = [
              { col: "span 5", row: "span 2" },
              { col: "span 4", row: "span 1" },
              { col: "span 3", row: "span 2" },
              { col: "span 4", row: "span 1" },
              { col: "span 4", row: "span 2" },
              { col: "span 3", row: "span 1" },
            ];
            const l = layouts[i] || layouts[0];
            return (
              <a key={loc.name} href="#"
                className="img-zoom"
                onMouseEnter={() => setHovIdx(i)}
                onMouseLeave={() => setHovIdx(null)}
                style={{
                  gridColumn: l.col, gridRow: l.row,
                  borderRadius: "16px", overflow: "hidden",
                  position: "relative", cursor: "pointer",
                  display: "block",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(20px)",
                  transition: `opacity 0.55s ${ease} ${i*0.07}s, transform 0.55s ${ease} ${i*0.07}s`,
                }}
              >
                <img src={loc.img} alt={loc.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: hovIdx === i ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)", transition: `background 0.3s ${ease}` }} />

                {/* HOT badge */}
                {loc.hot && (
                  <span className="tag" style={{ position: "absolute", top: "12px", right: "12px", background: "#ef4444", color: "white", fontSize: "9.5px" }}>
                    🔥 HOT
                  </span>
                )}

                {/* Info */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>
                  <h3 style={{ fontWeight: 800, fontSize: l.row === "span 2" ? "1.1rem" : "0.95rem", color: "white", marginBottom: "3px" }}>{loc.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>{loc.type}</span>
                    <span style={{ fontSize: "11px", background: "rgba(255,255,255,0.15)", color: "white", padding: "3px 9px", borderRadius: "99px", fontWeight: 700, backdropFilter: "blur(8px)" }}>{loc.count}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* All localities pills */}
        <div style={{ marginTop: "32px", padding: "24px", background: T.bgOff, borderRadius: "16px", border: `1px solid ${T.line}` }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>All Nashik Localities</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Dindori Road","Cidco","Satpur","Ozar","Nandur Shingote","Trimbak","Deolali","Adgaon","Nashik Phata","Sinner Road","Vilholi","Janori","Niphad","Yeola","Manmad"].map(l => (
              <a key={l} href="#" style={{
                padding: "6px 13px", borderRadius: T.r999,
                background: "white", border: `1px solid ${T.line}`,
                fontSize: "12.5px", fontWeight: 500, color: T.slate, transition: "all 0.15s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor="#86efac"; el.style.color=T.green; el.style.background=T.greenXL; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=T.line; el.style.color=T.slate; el.style.background="white"; }}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WHY NASHIK — full bleed background with content grid
───────────────────────────────────────────────────────────── */
function WhyNashik() {
  const [ref, visible] = useInView();
  return (
    <section style={{ background: T.bgOff, padding: "88px 0" }} ref={ref}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

          {/* Left: image collage */}
          <div style={{ position: "relative", height: "560px" }}>
            {/* Main image */}
            <div className="img-zoom" style={{ position: "absolute", top: 0, left: 0, right: "15%", height: "65%", borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 56px rgba(0,0,0,0.14)" }}>
              <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=80" alt="Nashik agriculture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Secondary image */}
            <div className="img-zoom" style={{ position: "absolute", bottom: 0, right: 0, left: "20%", height: "42%", borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 56px rgba(0,0,0,0.14)", border: "4px solid white" }}>
              <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80" alt="Nashik commercial" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Floating stat card */}
            <div style={{
              position: "absolute", bottom: "30%", left: "-24px",
              background: "white", borderRadius: "16px", padding: "18px 22px",
              boxShadow: "0 20px 48px rgba(0,0,0,0.12)",
              border: `1px solid ${T.line}`,
              animation: "float 6s ease-in-out infinite",
            }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: T.green, lineHeight: 1 }}>40%</div>
              <div style={{ fontSize: "12px", color: T.muted, fontWeight: 500, marginTop: "4px" }}>Avg. appreciation<br />over 5 years</div>
            </div>
          </div>

          {/* Right: reasons */}
          <div>
            <div className="section-label">Location Advantage</div>
            <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", color: T.ink, lineHeight: 1.15, marginBottom: "16px" }}>
              Why invest<br />in Nashik?
            </h2>
            <p style={{ fontSize: "15px", color: T.muted, lineHeight: 1.7, marginBottom: "40px", maxWidth: "420px" }}>
              Maharashtra&apos;s fastest-growing real estate destination — combining industrial might, agricultural abundance, and lifestyle infrastructure.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {WHY_NASHIK.map((r, i) => (
                <div key={r.title}
                  style={{
                    background: "white", borderRadius: "14px",
                    padding: "20px", border: `1px solid ${T.line}`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(16px)",
                    transition: `opacity 0.5s ${ease} ${i*0.08}s, transform 0.5s ${ease} ${i*0.08}s`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor="#86efac"; el.style.boxShadow=`0 8px 24px rgba(26,107,60,0.08)`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=T.line; el.style.boxShadow="0 2px 8px rgba(0,0,0,0.04)"; }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{r.icon}</div>
                  <h4 style={{ fontWeight: 700, fontSize: "13.5px", color: T.ink, marginBottom: "6px", letterSpacing: "-0.01em" }}>{r.title}</h4>
                  <p style={{ fontSize: "12px", color: T.muted, lineHeight: 1.6 }}>{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Content Block */}
        <div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div style={{ background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenL} 100%)`, borderRadius: "20px", padding: "36px", color: "white", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <h3 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "12px", letterSpacing: "-0.02em" }}>MahaProperties — Nashik&apos;s Trusted Partner</h3>
            <p style={{ fontSize: "13.5px", lineHeight: 1.75, opacity: 0.85 }}>
              Connecting buyers with verified sellers across NA plots, agriculture land, commercial spaces and industrial properties. 40+ localities, RERA-compliant listings, transparent pricing since 2018.
            </p>
            <Link href="/about" className="btn" style={{ marginTop: "20px", background: "rgba(255,255,255,0.15)", color: "white", padding: "10px 20px", borderRadius: "9px", fontSize: "13px", border: "1.5px solid rgba(255,255,255,0.25)" }}>
              Our Story {IC.arrow}
            </Link>
          </div>

          <div style={{ background: T.ink, borderRadius: "20px", padding: "36px", color: "white", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <h3 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "12px", letterSpacing: "-0.02em" }}>Post Your Property Free</h3>
            <p style={{ fontSize: "13.5px", lineHeight: 1.75, opacity: 0.6, marginBottom: "20px" }}>
              List your NA plot, agriculture land, warehouse or commercial property. Reach 10,000+ active buyers every month.
            </p>
            <Link href="/post-property" className="btn btn-primary" style={{ fontSize: "13.5px" }}>
              Post Property {IC.arrow}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────── */
function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useInView();

  const prev = () => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive(a => (a + 1) % TESTIMONIALS.length);

  const T2 = TESTIMONIALS[active];

  return (
    <section className="section" style={{ background: T.bg }} ref={ref}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Testimonials</div>
          <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", color: T.ink, lineHeight: 1.15 }}>
            What our clients say
          </h2>
          <p style={{ fontSize: "15px", color: T.muted, marginTop: "12px" }}>500+ verified buyers trust MahaProperties</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

          {/* Left: main quote */}
          <div>
            <div style={{ color: T.green, marginBottom: "16px" }}>{IC.quote}</div>

            <blockquote key={active} className="wu-fadeup" style={{ fontFamily: T.font, fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 500, color: T.ink, lineHeight: 1.7, marginBottom: "28px", letterSpacing: "-0.01em" }}>
              “{T2.text}”
            </blockquote>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: `linear-gradient(135deg,${T2.color},${T2.color}88)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "1.2rem", color: "white", flexShrink: 0,
              }}>{T2.avatar}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: T.ink }}>{T2.name}</div>
                <div style={{ fontSize: "12.5px", color: T.muted, marginTop: "2px" }}>{T2.role} · {T2.location}</div>
                <div style={{ display: "flex", gap: "2px", marginTop: "5px" }}>{Array.from({length:5}).map((_,i)=><span key={i}>{IC.star}</span>)}</div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button onClick={prev} className="btn" style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: `1.5px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "center",
                color: T.slate, transition: "all 0.2s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=T.green; el.style.color=T.green; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=T.line; el.style.color=T.slate; }}
              >{IC.arrowL}</button>

              <div style={{ display: "flex", gap: "6px" }}>
                {TESTIMONIALS.map((_,i) => (
                  <button key={i} onClick={() => setActive(i)} style={{
                    width: active===i?"28px":"8px", height:"8px",
                    borderRadius:"99px", border:"none", cursor:"pointer",
                    background: active===i ? T.ink : T.line,
                    transition:`all 0.3s ${ease}`,
                  }} />
                ))}
              </div>

              <button onClick={next} className="btn" style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: `1.5px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "center",
                color: T.slate, transition: "all 0.2s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=T.green; el.style.color=T.green; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=T.line; el.style.color=T.slate; }}
              >{IC.arrow}</button>
            </div>
          </div>

          {/* Right: mini cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {TESTIMONIALS.map((t, i) => (
              <button key={t.name} onClick={() => setActive(i)} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "16px", borderRadius: "14px", cursor: "pointer",
                background: active===i ? T.greenXL : "white",
                border: `1.5px solid ${active===i ? "#86efac" : T.line}`,
                transition: `all 0.22s ${ease}`,
                textAlign: "left",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateX(20px)",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: `linear-gradient(135deg,${t.color},${t.color}88)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "1rem", color: "white", flexShrink: 0,
                }}>{t.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "13.5px", color: T.ink }}>{t.name}</div>
                  <div style={{ fontSize: "11.5px", color: T.muted, marginTop: "2px" }}>{t.role} · {t.location}</div>
                </div>
                <div style={{ display: "flex", gap: "1px", flexShrink: 0 }}>{Array.from({length:5}).map((_,i)=><span key={i}>{IC.star}</span>)}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   BLOGS
───────────────────────────────────────────────────────────── */
const CAT_COLORS: Record<string, {bg:string;color:string}> = {
  "Buying Guide": { bg:"#f0fdf4", color:"#16a34a"  },
  "Investment":   { bg:"#fffbeb", color:"#d97706"  },
  "Commercial":   { bg:"#f5f3ff", color:"#7c3aed"  },
  "Legal":        { bg:"#eff6ff", color:"#1d4ed8"  },
};

function Blogs() {
  const [ref, visible] = useInView();
  const [main, ...rest] = BLOGS;

  return (
    <section className="section" style={{ background: T.bgOff }} ref={ref}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "44px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div className="section-label">Insights</div>
            <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", color: T.ink, lineHeight: 1.15 }}>
              Nashik property<br />insights
            </h2>
          </div>
          <Link href="/blog" className="btn btn-outline" style={{ fontSize: "13.5px" }}>All articles {IC.arrow}</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: "20px" }}>

          {/* Featured */}
          <a href={`/blog/${main.slug}`}
            className="card-lift img-zoom"
            style={{
              background: "white", borderRadius: "20px", overflow: "hidden",
              border: `1px solid ${T.line}`, display: "block",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
              transition: `opacity 0.55s ${ease}, transform 0.55s ${ease}`,
            }}
          >
            <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
              <img src={main.img} alt={main.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", gap: "8px" }}>
                <span className="tag" style={{ ...CAT_COLORS[main.cat], fontSize: "10.5px" }}>{main.cat}</span>
                <span className="tag" style={{ background: "rgba(200,151,58,0.9)", color: "white", fontSize: "10.5px" }}>Featured</span>
              </div>
            </div>
            <div style={{ padding: "24px" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.15rem", color: T.ink, marginBottom: "10px", lineHeight: 1.3, letterSpacing: "-0.02em" }}>{main.title}</h3>
              <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: T.muted }}>
                <span>📅 {main.date}</span><span>⏱ {main.read} read</span>
              </div>
            </div>
          </a>

          {/* Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {rest.map((b, i) => (
              <a key={b.slug} href={`/blog/${b.slug}`}
                className="card-lift"
                style={{
                  background: "white", borderRadius: "16px", overflow: "hidden",
                  border: `1px solid ${T.line}`, display: "flex", flex: 1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(20px)",
                  transition: `opacity 0.55s ${ease} ${i*0.1}s, transform 0.55s ${ease} ${i*0.1}s`,
                }}
              >
                <div className="img-zoom" style={{ width: "110px", flexShrink: 0, overflow: "hidden" }}>
                  <img src={b.img} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span className="tag" style={{ ...CAT_COLORS[b.cat], fontSize: "9.5px", marginBottom: "7px", display: "inline-flex" }}>{b.cat}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "13px", color: T.ink, lineHeight: 1.35, marginBottom: "8px", letterSpacing: "-0.01em" }}>{b.title}</h3>
                  <div style={{ display: "flex", gap: "12px", fontSize: "11.5px", color: T.muted }}><span>{b.date}</span><span>{b.read} read</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{ padding: "88px 0", background: T.ink, position: "relative", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=60" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(14,17,23,0.95) 0%, rgba(26,107,60,0.6) 100%)" }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", color: "#4ade80" }}>
          <span style={{ background: "#4ade80" }} />
          Free Consultation
        </div>

        <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "20px" }}>
          Ready to find your<br />dream property?
        </h2>

        <p style={{ fontSize: "clamp(0.95rem,2vw,1.1rem)", color: "rgba(255,255,255,0.62)", maxWidth: "500px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Talk to our Nashik property experts for free. We&apos;ll help you find the right plot at the right price — no pressure, no brokerage surprises.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
          <a href="tel:+919876543210" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "15px" }}>
            {IC.phone}&nbsp;Call Now — Free
          </a>
          <a href="https://wa.me/919876543210" className="btn btn-ghost" style={{ padding: "14px 32px", fontSize: "15px" }}>
            WhatsApp Us
          </a>
          <Link href="/properties" className="btn btn-ghost" style={{ padding: "14px 32px", fontSize: "15px" }}>
            Browse Properties {IC.arrow}
          </Link>
        </div>

        {/* Trust badges */}
        <div style={{ marginTop: "52px", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center", opacity: 0.55 }}>
          {["RERA Compliant","Zero Hidden Charges","2,500+ Verified Listings","10,000+ Monthly Visitors"].map(b => (
            <span key={b} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, color: "white", letterSpacing: "0.02em" }}>
              <span style={{ color: "#4ade80" }}>{IC.check}</span> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
  const COL = [
    { title: "NA Plots", links: [["NA Plots Gangapur Road","#"],["NA Plots Nashik Road","#"],["NA Plots Meri","#"],["NA Plots Igatpuri","#"],["NA Plots Trimbak Road","#"],["Collector NA Plot","#"]] },
    { title: "Agriculture & More", links: [["Agriculture Land Nashik","#"],["Igatpuri Farm Land","#"],["Farmhouse Plots","#"],["Grape Farm Land","#"],["Warehouse Land","#"],["Industrial Sheds MIDC","#"]] },
    { title: "Commercial", links: [["Commercial Plots Nashik","#"],["MIDC Satpur Properties","#"],["Ambad Industrial","#"],["Showroom / Shop Space","#"],["Investment Plots","#"],["Collector NA Nashik","#"]] },
    { title: "Company", links: [["About Us","#"],["Post Property","#"],["Blogs","#"],["Contact Us","#"],["Privacy Policy","#"],["Terms of Use","#"]] },
  ];

  return (
    <footer style={{ background: "#080b0f", color: "#6b7280" }}>
      <div className="wrap" style={{ paddingTop: "64px", paddingBottom: "48px" }}>

        {/* Brand row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4,1fr)", gap: "48px", marginBottom: "48px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg,#1a6b3c,#2d9455)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 28 28" fill="none" width="18" height="18"><path d="M14 3L25 12V25H18V18H10V25H3V12L14 3Z" fill="white" opacity="0.9"/><circle cx="14" cy="11" r="2.5" fill="rgba(255,255,255,0.45)"/></svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "white" }}>Maha<span style={{ color: "#2d9455" }}>Properties</span></span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.75, marginBottom: "20px", maxWidth: "220px" }}>
              Nashik&apos;s most comprehensive property portal — NA plots, agriculture land, commercial & industrial properties since 2018.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
              <a href="tel:+919876543210" style={{display: "flex",alignItems: "center",gap: "8px",color: "#ffffff",transition: "color 0.15s"}}
               /*onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
               onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}  */
            > <span style={{ color: "#ffffff" }}>{IC.phone}</span> +91 98765 43210</a>
              <a href="mailto:hello@mahaproperties.in" style={{ color: "#ffffff",transition: "color 0.15s"}}
                /*onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}
               */>hello@mahaproperties.in</a>
            </div>
          </div>

          {/* Columns */}
          {COL.map(col => (
            <div key={col.title}>
              <h5 style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "18px" }}>{col.title}</h5>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} style={{ fontSize: "13px", color: "#6b7280", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color="#4ade80")}
                      onMouseLeave={e => (e.currentTarget.style.color="#6b7280")}
                    >{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "24px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", fontSize: "12.5px" }}>
          <span>© 2026 MahaProperties. All rights reserved. Made with ❤️ in Nashik.</span>
          <span>Developed by G.K. Digital</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   AI CHAT WIDGET
───────────────────────────────────────────────────────────── */
function AIChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "ai", text: "Namaste! 🙏 Ask me about NA plots, agriculture land, or property prices in Nashik." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null!);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setMsgs(m => [...m, { role: "ai", text: "Thanks for your query! Our team will reach out shortly. You can also call us at +91 98765 43210 for immediate assistance." }]);
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setOpen(o=>!o)} style={{
        position: "fixed", bottom: "24px", right: "24px", zIndex: 800,
        width: "56px", height: "56px", borderRadius: "50%",
        background: "linear-gradient(135deg,#1a6b3c,#2d9455)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 32px rgba(26,107,60,0.45)",
        border: "none", cursor: "pointer",
        transition: `transform 0.2s ${ease}`,
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open
          ? IC.x
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        }
        {!open && <span style={{ position: "absolute", top: "-2px", right: "-2px", width: "16px", height: "16px", background: T.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </span>}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: "90px", right: "24px", zIndex: 800,
          width: "clamp(300px,90vw,360px)",
          background: "white", borderRadius: "20px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "scaleIn 0.22s ease",
        }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg,#1a6b3c,#2d9455)", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "white", fontSize: "14px" }}>MahaProperties AI</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>Nashik Property Expert</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", maxHeight: "300px" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px", borderRadius: "14px",
                  fontSize: "13.5px", lineHeight: 1.55,
                  background: m.role === "user" ? T.green : T.bgOff,
                  color: m.role === "user" ? "white" : T.ink,
                  borderBottomRightRadius: m.role === "user" ? "4px" : "14px",
                  borderBottomLeftRadius:  m.role === "ai"   ? "4px" : "14px",
                }}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "4px", padding: "10px 14px", background: T.bgOff, borderRadius: "14px", borderBottomLeftRadius: "4px", width: "fit-content" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: "6px", height: "6px", background: "#9ca3af", borderRadius: "50%", animation: `pulse 1s ease infinite`, animationDelay: `${i*0.15}s` }} />)}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px", borderTop: `1px solid ${T.line}`, display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about properties…"
              className="field"
              style={{ height: "40px", borderRadius: "10px", fontSize: "13px" }}
            />
            <button onClick={send} disabled={loading} style={{
              width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
              background: T.green, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: loading ? 0.5 : 1,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <CategoryGrid />
        <FeaturedListings />
        <Stats />
        <Localities />
        <WhyNashik />
        <Testimonials />
        <Blogs />
        <CTABanner />
      </main>
      <Footer />
      <AIChat />
    </>
  );
}