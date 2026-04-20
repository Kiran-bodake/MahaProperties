"use client";
import { useState,useEffect} from "react";
import Link from "next/link";
import { Heart, MapPin, Ruler, Eye, CheckCircle, Phone } from "lucide-react";

// const PROPS = [
//   { id:"1", title:"Prime NA Plot — Gangapur Road",      locality:"Gangapur Road",  category:"NA Plot",          price:"₹42 L",    area:"2000 sqft", views:234, rera:true,  img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80", badge:"Featured"  },
//   { id:"2", title:"Agriculture Land — Trimbak Road",    locality:"Trimbak Road",   category:"Agriculture Land", price:"₹85 L",    area:"3 Acre",    views:189, rera:true,  img:"https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80", badge:"Hot Deal"  },
//   { id:"3", title:"Industrial Shed — MIDC Satpur",      locality:"Satpur MIDC",    category:"Industrial Shed",  price:"₹1.2 Cr",  area:"5000 sqft", views:312, rera:false, img:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", badge:"New"       },
//   { id:"4", title:"Commercial Plot — Nashik Road",      locality:"Nashik Road",    category:"Commercial",       price:"₹68 L",    area:"1800 sqft", views:156, rera:true,  img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", badge:null        },
//   { id:"5", title:"Investment Plot — Meri Village",     locality:"Meri",           category:"Investment Plot",  price:"₹18 L",    area:"1200 sqft", views:445, rera:true,  img:"https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80", badge:"Best Buy"  },
//   { id:"6", title:"Warehouse Land — Ambad Industrial",  locality:"Ambad",          category:"Warehouse",        price:"₹2.4 Cr",  area:"12000 sqft",views:98,  rera:false, img:"https://images.unsplash.com/photo-1565891741441-64926e441838?w=600&q=80", badge:null        },
// ];
const PROPS = [
  {
    id:"1",
    slug:"na-plot-gangapur-road",
    title:"Prime NA Plot — Gangapur Road",
    locality:"Gangapur Road",
    category:"NA Plot",
    price:"₹42 L",
    area:"2000 sqft",
    views:234,
    rera:true,
    img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    badge:"Featured"
  },

  {
    id:"2",
    slug:"agriculture-land-igatpuri",
    title:"Agriculture Land — Igatpuri",
    locality:"Igatpuri",
    category:"Agriculture Land",
    price:"₹85 L",
    area:"3 Acre",
    views:189,
    rera:true,
    img:"https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
    badge:"Hot Deal"
  },

  {
    id:"3",
    slug:"industrial-shed-midc-satpur",
    title:"Industrial Shed — MIDC Satpur",
    locality:"Satpur MIDC",
    category:"Industrial Shed",
    price:"₹1.2 Cr",
    area:"5000 sqft",
    views:312,
    rera:false,
    img:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    badge:"New"
  },

  {
    id:"4",
    slug:"commercial-plot-nashik-road",
    title:"Commercial Plot — Nashik Road",
    locality:"Nashik Road",
    category:"Commercial",
    price:"₹68 L",
    area:"1800 sqft",
    views:156,
    rera:true,
    img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    badge:null
  },

  {
    id:"5",
    slug:"investment-plot-meri-village",
    title:"Investment Plot — Meri Village",
    locality:"Meri Village",
    category:"Investment",
    price:"₹35 L",
    area:"1500 sqft",
    views:145,
    rera:true,
    img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    badge:"Best Buy"
  },

  {
    id:"6",
    slug:"warehouse-land-ambad-midc",
    title:"Warehouse Land — Ambad MIDC",
    locality:"Ambad",
    category:"Warehouse",
    price:"₹1.8 Cr",
    area:"12000 sqft",
    views:98,
    rera:false,
    img:"https://images.unsplash.com/photo-1565891741441-64926e441838?w=600&q=80",
    badge:null
  },

  {
    id:"7",
    slug:"collector-na-trimbak-road",
    title:"Collector NA — Trimbak Road",
    locality:"Trimbak Road",
    category:"Collector NA",
    price:"₹52 L",
    area:"2400 sqft",
    views:190,
    rera:true,
    img:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    badge:"Verified"
  },

  {
    id:"8",
    slug:"na-plot-pathardi-phata",
    title:"NA Plot — Pathardi Phata",
    locality:"Pathardi Phata",
    category:"NA Plot",
    price:"₹39 L",
    area:"1800 sqft",
    views:210,
    rera:true,
    img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    badge:null
  }
];

// const TABS = ["All","NA Plot","Agriculture Land","Commercial","Warehouse","Investment Plot"];
const TABS = [
  "All",
  "NA Plot",
  "Agriculture Land",
  "Commercial",
  "Industrial Shed",
  "Warehouse",
  "Investment Plot"
];

export function FeaturedListings() {
  const [tab,   setTab]   = useState("All");
  const [saved, setSaved] = useState<string[]>([]);

  const [properties, setProperties] = useState(PROPS);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);

    const res = await fetch(
      `/api/properties?category=${encodeURIComponent(tab)}`
    );

    const data = await res.json();

    setProperties(data);
    setLoading(false);
  };

  fetchData();
}, [tab]);

  return (
    <section style={{ padding:"80px 0", background:"#f9fafb" }}>
      <div className="container">

        {/* Header */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"20px", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"40px" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#f0fdf6", border:"1px solid #bbf7d2", borderRadius:"100px", padding:"6px 16px", marginBottom:"12px" }}>
              <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#16a34a", letterSpacing:"0.05em", textTransform:"uppercase" }}>🔥 Featured</span>
            </div>
            <h2 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontSize:"clamp(1.75rem,3.5vw,2.5rem)", fontWeight:900, color:"#1a1a2e", marginBottom:"8px" }}>
              Handpicked Properties
            </h2>
            <p style={{ color:"#6b7280", fontSize:"1rem" }}>Curated selection of best investment opportunities in Nashik</p>
          </div>
          <Link href="/properties" style={{
            padding:"10px 22px", borderRadius:"12px",
            border:"2px solid #16a34a", color:"#16a34a",
            fontWeight:700, fontSize:"0.9rem",
            transition:"all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#16a34a"; (e.currentTarget as HTMLElement).style.color="white"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="#16a34a"; }}
          >View All Properties →</Link>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"8px", overflowX:"auto", paddingBottom:"16px", marginBottom:"32px", scrollbarWidth:"none" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:"8px 20px", borderRadius:"100px", whiteSpace:"nowrap",
              fontWeight:600, fontSize:"0.85rem", cursor:"pointer", border:"none",
              background: tab===t ? "#16a34a" : "white",
              color:       tab===t ? "white"   : "#6b7280",
              boxShadow:   tab===t ? "0 4px 12px rgba(22,163,74,0.3)" : "0 1px 3px rgba(0,0,0,0.08)",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"24px" }}>
          {loading ? (
  <p>Loading...</p>
) : (
  properties.map((p, i) => (
            <div key={p.id} className="animate-fade-up" style={{ animationDelay:`${i*0.07}s` }}>
              <div style={{
                background:"white", borderRadius:"20px",
                overflow:"hidden", border:"1px solid #f0f0f0",
                boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
                transition:"all 0.3s ease",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(-6px)"; el.style.boxShadow="0 20px 50px rgba(0,0,0,0.12)"; el.style.borderColor="#bbf7d2"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(0)"; el.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)"; el.style.borderColor="#f0f0f0"; }}
              >
                {/* Image */}
                <div style={{ position:"relative", aspectRatio:"16/10", overflow:"hidden", background:"#f3f4f6" }}>
                  <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }}
                    onMouseOver={e => (e.currentTarget.style.transform="scale(1.06)")}
                    onMouseOut={e  => (e.currentTarget.style.transform="scale(1)")}
                  />

                  {/* Badges */}
                  <div style={{ position:"absolute", top:"12px", left:"12px", display:"flex", gap:"6px" }}>
                    {p.rera && (
                      <span style={{ display:"flex", alignItems:"center", gap:"4px", background:"rgba(22,163,74,0.9)", backdropFilter:"blur(8px)", color:"white", fontSize:"0.65rem", fontWeight:700, padding:"4px 8px", borderRadius:"6px" }}>
                        <CheckCircle size={10} /> RERA
                      </span>
                    )}
                    {p.badge && (
                      <span style={{ background:"rgba(245,158,11,0.9)", backdropFilter:"blur(8px)", color:"white", fontSize:"0.65rem", fontWeight:700, padding:"4px 8px", borderRadius:"6px" }}>
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Save */}
                  <button onClick={() => setSaved(s => s.includes(p.id) ? s.filter(x=>x!==p.id) : [...s,p.id])} style={{
                    position:"absolute", top:"12px", right:"12px",
                    width:"34px", height:"34px", borderRadius:"50%",
                    background:"rgba(255,255,255,0.92)", backdropFilter:"blur(8px)",
                    border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.12)", transition:"transform 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform="scale(1.12)")}
                    onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")}
                  >
                    <Heart size={15} color={saved.includes(p.id)?"#ef4444":"#9ca3af"} fill={saved.includes(p.id)?"#ef4444":"none"} />
                  </button>

                  {/* Category tag */}
                  <div style={{ position:"absolute", bottom:"12px", left:"12px" }}>
                    <span style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(8px)", color:"white", fontSize:"0.7rem", fontWeight:600, padding:"4px 10px", borderRadius:"8px" }}>
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding:"20px" }}>
                  <h3 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:700, fontSize:"0.975rem", color:"#1a1a2e", marginBottom:"8px", lineHeight:1.35 }}>{p.title}</h3>

                  <div style={{ display:"flex", alignItems:"center", gap:"5px", color:"#6b7280", fontSize:"0.82rem", marginBottom:"14px" }}>
                    <MapPin size={13} color="#16a34a" /> {p.locality}, Nashik
                  </div>

                  <div style={{ fontSize:"1.5rem", fontWeight:900, color:"#16a34a", fontFamily:"var(--font-syne,Syne,serif)", marginBottom:"12px" }}>{p.price}</div>

                  <div style={{ display:"flex", gap:"16px", paddingBlock:"12px", borderTop:"1px solid #f3f4f6", borderBottom:"1px solid #f3f4f6", marginBottom:"16px" }}>
                    <span style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"0.78rem", color:"#6b7280" }}><Ruler size={12} /> {p.area}</span>
                    <span style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"0.78rem", color:"#6b7280", marginLeft:"auto" }}><Eye size={12} /> {p.views} views</span>
                  </div>

                  <div style={{ display:"flex", gap:"8px" }}>
                    {/* <Link href={`/properties/${p.id}`} style={{ */}
                    <Link
  href={`/properties/${encodeURIComponent(String(p.slug).trim())}`}
  style={{
    flex: 1,
    padding: "9px",
    borderRadius: "10px",
    textAlign: "center",
    border: "1.5px solid #e5e7eb",
    color: "#374151",
    fontWeight: 600,
    fontSize: "0.83rem",
    transition: "all 0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = "#16a34a";
    e.currentTarget.style.color = "#16a34a";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.color = "#374151";
  }}
>
  View Details
</Link>
                    <button style={{
                      flex:1, padding:"9px", borderRadius:"10px", textAlign:"center",
                      background:"linear-gradient(135deg,#16a34a,#22c55e)",
                      color:"white", fontWeight:600, fontSize:"0.83rem",
                      border:"none", cursor:"pointer",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:"5px",
                    }}>
                      <Phone size={13} /> Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );
}
