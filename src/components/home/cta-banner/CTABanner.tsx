"use client";
import Link from "next/link";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

export function CTABanner() {
  return (
    <section style={{ padding:"80px 0", background:"linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, opacity:0.05, backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize:"40px 40px" }} />
      <div style={{ position:"absolute", top:"-100px", right:"-100px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)" }} />

      <div className="container" style={{ position:"relative", zIndex:1, textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.25)", borderRadius:"100px", padding:"6px 18px", marginBottom:"24px" }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade82", display:"inline-block" }} />
          <span style={{ fontSize:"0.8rem", fontWeight:700, color:"#4ade82" }}>Free Consultation Available</span>
        </div>

        <h2 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:900, color:"white", marginBottom:"16px", lineHeight:1.1 }}>
          Ready to Find Your<br />Dream Property in Nashik?
        </h2>

        <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"1.1rem", maxWidth:"520px", margin:"0 auto 40px", lineHeight:1.7 }}>
          Talk to our Nashik property experts for free. We&apos;ll help you find the right plot at the right price.
        </p>

        <div style={{ display:"flex", flexWrap:"wrap", gap:"16px", justifyContent:"center" }}>
          <a href="tel:+919876543210" style={{
            display:"flex", alignItems:"center", gap:"10px",
            padding:"16px 32px", borderRadius:"16px",
            background:"linear-gradient(135deg,#16a34a,#22c55e)",
            color:"white", fontWeight:700, fontSize:"1.05rem",
            boxShadow:"0 8px 24px rgba(22,163,74,0.4)",
            transition:"all 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform="translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform="translateY(0)")}
          ><Phone size={20} /> Call Now — FREE</a>

          <a href="https://wa.me/919876543210" style={{
            display:"flex", alignItems:"center", gap:"10px",
            padding:"16px 32px", borderRadius:"16px",
            background:"rgba(255,255,255,0.08)", backdropFilter:"blur(12px)",
            border:"1.5px solid rgba(255,255,255,0.15)",
            color:"white", fontWeight:700, fontSize:"1.05rem",
            transition:"all 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background="rgba(255,255,255,0.15)")}
            onMouseLeave={e => (e.currentTarget.style.background="rgba(255,255,255,0.08)")}
          ><MessageCircle size={20} /> WhatsApp Us</a>

          <Link href="/properties" style={{
            display:"flex", alignItems:"center", gap:"10px",
            padding:"16px 32px", borderRadius:"16px",
            background:"rgba(255,255,255,0.08)", backdropFilter:"blur(12px)",
            border:"1.5px solid rgba(255,255,255,0.15)",
            color:"white", fontWeight:700, fontSize:"1.05rem",
            transition:"all 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background="rgba(255,255,255,0.15)")}
            onMouseLeave={e => (e.currentTarget.style.background="rgba(255,255,255,0.08)")}
          >Browse Properties <ArrowRight size={20} /></Link>
        </div>
      </div>
    </section>
  );
}
