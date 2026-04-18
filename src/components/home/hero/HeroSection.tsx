"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown, TrendingUp, Shield, Star } from "lucide-react";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { AutocompleteDropdown } from "@/components/shared/AutocompleteDropdown";

const SLIDES = [
  { bg: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", tag: "NA Plots from ₹8L", headline: "Find Your Perfect Plot in Nashik", sub: "2,500+ verified properties across 40+ localities" },
  { bg: "linear-gradient(135deg, #134e4a 0%, #065f46 50%, #064e3b 100%)", tag: "Agriculture Land — Best Rates", headline: "Invest in Nashik's Fertile Farmlands", sub: "Prime agriculture land with clear titles & RERA compliance" },
  { bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)", tag: "Commercial Properties", headline: "Premium Commercial Spaces Available", sub: "Industrial sheds, warehouses & commercial plots" },
];

const CATEGORIES = [
  { label: "NA Plot",             icon: "🏞️", href: "/properties?category=na-plot",          color: "#16a34a" },
  { label: "Collector NA Plot",   icon: "📋", href: "/properties?category=collector-na-plot", color: "#0891b2" },
  { label: "Agriculture Land",    icon: "🌾", href: "/properties?category=agriculture",       color: "#d97706" },
  { label: "Warehouse Land",      icon: "🏭", href: "/properties?category=warehouse",         color: "#7c3aed" },
  { label: "Commercial Property", icon: "🏢", href: "/properties?category=commercial",        color: "#dc2626" },
  { label: "Investment Plots",    icon: "📈", href: "/properties?category=investment-plot",   color: "#0f766e" },
];

const LOCALITIES = ["Nashik Road","Gangapur Road","Meri","Varavandi","Pathardi Phata","Indira Nagar","Igatpuri","Trimbak Road","Dindori Road","Cidco","Satpur","Ambad","Panchavati","College Road","Sinnar","Ozar"];

export function HeroSection() {
  const [slide,     setSlide]     = useState(0);
  const [category,  setCategory]  = useState("All Types");
  const [locality,  setLocality]  = useState("Any Locality");
  const [showLoc,   setShowLoc]   = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  
  // Refs
  const searchBoxRef = useRef<HTMLDivElement>(null);
  
  // Autocomplete hook
  const {
    query,
    suggestions,
    isLoading,
    showSuggestions,
    handleInputChange,
    handleSelectSuggestion,
    handleCloseSuggestions,
    setShowSuggestions,
  } = useAutocomplete({ category: "all", minChars: 1 });

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Update dropdown position when search box renders
  useEffect(() => {
    if (searchBoxRef.current && showSuggestions) {
      const rect = searchBoxRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [showSuggestions, suggestions]);

  const current = SLIDES[slide];

  return (
    <section style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", overflow:"visible" }}>

      {/* Animated background */}
      <div style={{
        position:"absolute", inset:0,
        background: current.bg,
        transition: "background 1.2s ease",
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position:"absolute", inset:0, opacity:0.07,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Glowing orbs */}
      <div style={{ position:"absolute", top:"20%", right:"10%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)", filter:"blur(40px)", animation:"float 6s ease-in-out infinite" }} />
      <div style={{ position:"absolute", bottom:"10%", left:"5%", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)", filter:"blur(30px)", animation:"float 8s ease-in-out infinite reverse" }} />

      <div className="container" style={{ position:"relative", zIndex:2, paddingTop:"120px", paddingBottom:"60px" }}>

        {/* Top badge */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:"28px" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            background:"rgba(255,255,255,0.12)", backdropFilter:"blur(12px)",
            border:"1px solid rgba(255,255,255,0.2)", borderRadius:"100px",
            padding:"8px 18px", color:"white", fontSize:"0.8rem", fontWeight:600,
          }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade82", display:"inline-block", animation:"pulse-ring 2s infinite" }} />
            {current.tag}
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ textAlign:"center", color:"white", fontSize:"clamp(2rem, 5vw, 3.75rem)", fontWeight:900, lineHeight:1.1, marginBottom:"20px", fontFamily:"var(--font-syne, Syne, serif)" }}>
          {current.headline}
        </h1>

        <p style={{ textAlign:"center", color:"rgba(255,255,255,0.75)", fontSize:"clamp(1rem, 2vw, 1.2rem)", marginBottom:"48px", maxWidth:"600px", margin:"0 auto 48px" }}>
          {current.sub}
        </p>

        {/* Search Box Container */}
        <div style={{ position:"relative", maxWidth:"860px", margin:"0 auto 48px" }} ref={searchBoxRef} id="search-box-container">
          {/* Search Box */}
          <div style={{
            background:"white", borderRadius:"20px",
            padding:"10px",
            boxShadow:"0 30px 80px rgba(0,0,0,0.3)",
            display:"grid", gridTemplateColumns:"1fr 1px 180px 1px auto auto",
            alignItems:"center", gap:"0",
          }}>
            {/* Keyword with Autocomplete */}
            <div style={{ padding:"8px 16px" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"4px" }}>Search</div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <Search size={16} color="#16a34a" />
                <input
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => {
                    setTimeout(() => handleCloseSuggestions(), 200);
                  }}
                  placeholder="Project, locality, keyword..."
                  style={{ border:"none", outline:"none", fontSize:"0.95rem", fontWeight:500, color:"#1a1a2e", width:"100%", background:"transparent" }}
                />
              </div>
            </div>
            
            <div style={{ width:"1px", height:"40px", background:"#e5e7eb" }} />

            {/* Category */}
            <div style={{ padding:"8px 16px" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"4px" }}>Property Type</div>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ border:"none", outline:"none", fontSize:"0.9rem", fontWeight:600, color:"#1a1a2e", background:"transparent", width:"100%", cursor:"pointer" }}>
                <option>All Types</option>
                <option>NA Plot</option>
                <option>Collector NA Plot</option>
                <option>Agriculture Land</option>
                <option>Warehouse Land</option>
                <option>Commercial Property</option>
                <option>Investment Plots</option>
              </select>
            </div>

            <div style={{ width:"1px", height:"40px", background:"#e5e7eb" }} />

            {/* Locality */}
            <div style={{ padding:"8px 16px", position:"relative", minWidth:"160px" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"4px" }}>Locality</div>
              <button onClick={() => setShowLoc(!showLoc)} style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"0.9rem", fontWeight:600, color:"#1a1a2e", background:"transparent", border:"none", cursor:"pointer" }}>
                <MapPin size={14} color="#16a34a" />
                {locality}
                <ChevronDown size={13} />
              </button>
              {showLoc && (
                <div style={{
                  position:"absolute", top:"calc(100% + 8px)", left:0,
                  background:"white", borderRadius:"16px", padding:"8px",
                  boxShadow:"0 20px 60px rgba(0,0,0,0.15)", width:"240px", zIndex:50,
                  border:"1px solid rgba(0,0,0,0.06)", maxHeight:"260px", overflowY:"auto",
                }}>
                  {["Any Locality", ...LOCALITIES].map(l => (
                    <button key={l} onClick={() => { setLocality(l); setShowLoc(false); }} style={{
                      display:"block", width:"100%", textAlign:"left",
                      padding:"8px 12px", borderRadius:"8px", fontSize:"0.85rem",
                      color: locality===l?"#16a34a":"#374151", fontWeight: locality===l?700:500,
                      background: locality===l?"#f0fdf6":"transparent",
                      border:"none", cursor:"pointer",
                    }}>{l}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <div style={{ padding:"6px" }}>
              <Link href={`/properties?q=${query}&category=${category}&locality=${locality}`} style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                padding:"14px 32px", borderRadius:"14px",
                background:"linear-gradient(135deg,#16a34a,#22c55e)",
                color:"white", fontWeight:700, fontSize:"1rem",
                boxShadow:"0 6px 20px rgba(22,163,74,0.4)",
                whiteSpace:"nowrap",
              }}>
                <Search size={18} />
                Search
              </Link>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center", marginBottom:"64px" }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} href={cat.href} style={{
              display:"flex", alignItems:"center", gap:"8px",
              background:"rgba(255,255,255,0.12)", backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,255,255,0.2)", borderRadius:"100px",
              padding:"8px 16px", color:"white", fontSize:"0.82rem", fontWeight:600,
              transition:"all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.22)"; (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}
            >
              <span>{cat.icon}</span> {cat.label}
            </Link>
          ))}
        </div>

        {/* Stats Row */}
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"48px" }}>
          {[
            { icon:<TrendingUp size={20}/>, val:"₹8L+",  lab:"Starting Price"     },
            { icon:<Shield size={20}/>,    val:"RERA",   lab:"Verified Listings"  },
            { icon:<Star size={20}/>,      val:"2500+",  lab:"Active Properties"  },
            { icon:<MapPin size={20}/>,    val:"40+",    lab:"Localities Covered" },
          ].map(s => (
            <div key={s.lab} style={{ display:"flex", alignItems:"center", gap:"12px", color:"rgba(255,255,255,0.85)" }}>
              <div style={{ color:"#4ade82" }}>{s.icon}</div>
              <div>
                <div style={{ fontWeight:800, fontSize:"1.25rem", color:"white", lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.6)", marginTop:"2px" }}>{s.lab}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autocomplete Dropdown - Fixed Position */}
      <div style={{ 
        position:"fixed", 
        top: `${dropdownPos.top}px`, 
        left: `${dropdownPos.left}px`, 
        width: `${Math.min(dropdownPos.width, 400)}px`,
        maxWidth: "400px",
        zIndex: 9999,
        pointerEvents: showSuggestions ? "auto" : "none",
      }}>
        <AutocompleteDropdown
          suggestions={suggestions}
          isLoading={isLoading}
          isOpen={showSuggestions}
          query={query}
          onSelect={(item) => {
            handleSelectSuggestion(item);
          }}
          onClose={handleCloseSuggestions}
          className="shadow-lg"
        />
      </div>

      {/* Slide indicators */}
      <div style={{ position:"absolute", bottom:"24px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"8px", zIndex:2 }}>
        {SLIDES.map((_,i) => (
          <button key={i} onClick={() => setSlide(i)} style={{
            width: slide===i ? "28px" : "8px", height:"8px",
            borderRadius:"100px", border:"none", cursor:"pointer",
            background: slide===i ? "#4ade82" : "rgba(255,255,255,0.4)",
            transition:"all 0.3s",
          }} />
        ))}
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }
        @media(max-width:768px) {
          section > .container > div[style*="grid"] {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
