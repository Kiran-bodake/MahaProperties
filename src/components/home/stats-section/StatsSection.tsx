"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { val:2500, suffix:"+", label:"Properties Listed",  icon:"🏘️", color:"#16a34a" },
  { val:800,  suffix:"+", label:"Happy Buyers",        icon:"😊", color:"#0891b2" },
  { val:40,   suffix:"+", label:"Localities Covered",  icon:"📍", color:"#d97706" },
  { val:12,   suffix:"Cr", label:"Total Deals Closed", icon:"💰", color:"#7c3aed" },
];

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ val, suffix, label, icon, color, start }: typeof STATS[0] & { start: boolean }) {
  const count = useCounter(val, 1800, start);
  return (
    <div style={{ textAlign:"center", padding:"40px 20px" }}>
      <div style={{ fontSize:"2.5rem", marginBottom:"12px" }}>{icon}</div>
      <div style={{ fontFamily:"var(--font-syne,Syne,serif)", fontSize:"clamp(2.5rem,5vw,3.5rem)", fontWeight:900, color, lineHeight:1, marginBottom:"8px" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.95rem", fontWeight:500 }}>{label}</div>
    </div>
  );
}

export function StatsSection() {
  const ref  = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background:"linear-gradient(135deg, #0f2027 0%, #1a3a2a 50%, #052e16 100%)",
      padding:"80px 0", position:"relative", overflow:"hidden",
    }}>
      {/* Decorative */}
      <div style={{ position:"absolute", top:"-100px", right:"-100px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)" }} />
      <div style={{ position:"absolute", bottom:"-50px", left:"-50px", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)" }} />

      <div className="container" style={{ position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:"20px" }}>
          <h2 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontSize:"clamp(1.75rem,3.5vw,2.5rem)", fontWeight:900, color:"white", marginBottom:"12px" }}>
            Nashik&apos;s Most Trusted Property Portal
          </h2>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"1rem" }}>Numbers that speak for our commitment</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"0", borderTop:"1px solid rgba(255,255,255,0.08)", marginTop:"40px" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ borderRight: i<STATS.length-1?"1px solid rgba(255,255,255,0.08)":"none" }}>
              <StatCard {...s} start={started} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
