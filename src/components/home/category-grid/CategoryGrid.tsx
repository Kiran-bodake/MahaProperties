"use client";
import Link from "next/link";

const CATS = [
  { icon:"🏞️", label:"NA Plots",            sub:"480+ listings",  href:"/na-plots-in-nashik",            bg:"linear-gradient(135deg,#ecfdf5,#d1fae5)", accent:"#16a34a", border:"#bbf7d2" },
  { icon:"📋", label:"Collector NA Plot",    sub:"95+ listings",   href:"/collector-na-plots-in-nashik", bg:"linear-gradient(135deg,#eff6ff,#dbeafe)", accent:"#1d4ed8", border:"#bfdbfe" },
  { icon:"🌾", label:"Agriculture Land",     sub:"120+ acres",     href:"/agriculture-land-in-nashik",     bg:"linear-gradient(135deg,#fffbeb,#fef3c7)", accent:"#d97706", border:"#fde68a" },
  { icon:"🏭", label:"Warehouse Land",       sub:"45+ units",      href:"/warehouse-space-in-nashik",      bg:"linear-gradient(135deg,#f5f3ff,#ede9fe)", accent:"#7c3aed", border:"#c4b5fd" },
  { icon:"🏢", label:"Commercial Property",  sub:"70+ spaces",     href:"/commercial-properties-in-nashik", bg:"linear-gradient(135deg,#fff1f2,#ffe4e6)", accent:"#dc2626", border:"#fecdd3" },
  { icon:"📈", label:"Investment Plots",     sub:"200+ options",   href:"/plots-for-investment",          bg:"linear-gradient(135deg,#f0fdfa,#ccfbf1)", accent:"#0f766e", border:"#99f6e4" },
];

export function CategoryGrid() {
  return (
    <section style={{ padding:"80px 0", background:"white" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"56px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#f0fdf6", border:"1px solid #bbf7d2", borderRadius:"100px", padding:"6px 16px", marginBottom:"16px" }}>
            <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#16a34a", display:"inline-block" }} />
            <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#16a34a", letterSpacing:"0.05em", textTransform:"uppercase" }}>Browse Properties</span>
          </div>
          <h2 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontSize:"clamp(1.75rem,4vw,2.75rem)", fontWeight:900, color:"#1a1a2e", marginBottom:"12px" }}>
            What Are You Looking For?
          </h2>
          <p style={{ color:"#6b7280", fontSize:"1.05rem", maxWidth:"520px", margin:"0 auto" }}>
            From fertile farmlands to commercial hubs — find your ideal property in Nashik
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"20px" }}>
          {CATS.map((cat, i) => (
            <Link key={cat.label} href={cat.href} style={{ textDecoration:"none", animationDelay:`${i*0.08}s` }} className="animate-fade-up">
              <div style={{
                background: cat.bg, borderRadius:"20px",
                border:`1.5px solid ${cat.border}`,
                padding:"28px 24px", cursor:"pointer",
                transition:"all 0.25s ease",
                height:"100%",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.1)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize:"2.5rem", marginBottom:"16px", lineHeight:1 }}>{cat.icon}</div>
                <h3 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:800, fontSize:"1.05rem", color:"#1a1a2e", marginBottom:"6px" }}>{cat.label}</h3>
                <p style={{ fontSize:"0.82rem", color:"#6b7280", marginBottom:"20px" }}>{cat.sub}</p>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  color: cat.accent, fontWeight:700, fontSize:"0.82rem",
                }}>
                  View All →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
