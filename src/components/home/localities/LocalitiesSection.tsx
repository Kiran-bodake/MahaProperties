"use client";
import Link from "next/link";

const LOCALITIES = [
  { name:"Nashik Road",    props:"320+", type:"Residential & Commercial", img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=75",  hot:true  },
  { name:"Gangapur Road",  props:"180+", type:"Premium Plots & Villas",   img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=75",  hot:true  },
  { name:"Meri Village",   props:"95+",  type:"Agriculture & NA Plots",   img:"https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=75",  hot:false },
  { name:"Indira Nagar",   props:"145+", type:"Apartments & Plots",       img:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=75",  hot:false },
  { name:"Pathardi Phata", props:"78+",  type:"Industrial & Warehouse",   img:"https://images.unsplash.com/photo-1565891741441-64926e441838?w=400&q=75",  hot:false },
  { name:"Igatpuri",       props:"110+", type:"Agriculture & Farmhouses",  img:"https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&q=75",  hot:true  },
  { name:"Trimbak Road",   props:"88+",  type:"Plots & Land",             img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=75",  hot:false },
  { name:"Varavandi",      props:"65+",  type:"Investment Plots",         img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=75",  hot:false },
];

const MORE = ["Dindori Road","Cidco","Satpur","Ambad","Panchavati","College Road","Sinnar","Ozar","Nandur Shingote","Trimbak","Deolali","Adgaon","Nashik Phata","Sinner Road"];

export function LocalitiesSection() {
  return (
    <section style={{ padding:"80px 0", background:"white" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"56px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#fff7ed", border:"1px solid #fed7aa", borderRadius:"100px", padding:"6px 16px", marginBottom:"16px" }}>
            <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#d97706", letterSpacing:"0.05em", textTransform:"uppercase" }}>📍 Explore Nashik</span>
          </div>
          <h2 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontSize:"clamp(1.75rem,4vw,2.75rem)", fontWeight:900, color:"#1a1a2e", marginBottom:"12px" }}>
            Popular Localities in Nashik
          </h2>
          <p style={{ color:"#6b7280", fontSize:"1.05rem", maxWidth:"520px", margin:"0 auto" }}>
            Discover properties across Nashik&apos;s most sought-after neighbourhoods
          </p>
        </div>

        {/* Main cards grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"20px", marginBottom:"40px" }}>
          {LOCALITIES.map((loc, i) => (
            <Link key={loc.name} href={`/locality/${loc.name.toLowerCase().replace(/\s+/g,"-")}`} style={{ textDecoration:"none", animationDelay:`${i*0.06}s` }} className="animate-fade-up">
              <div style={{
                borderRadius:"18px", overflow:"hidden", position:"relative",
                aspectRatio:"4/3", cursor:"pointer",
                boxShadow:"0 4px 16px rgba(0,0,0,0.1)",
                transition:"all 0.3s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 20px 48px rgba(0,0,0,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow="0 4px 16px rgba(0,0,0,0.1)"; }}
              >
                <img src={loc.img} alt={loc.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }}
                  onMouseOver={e => (e.currentTarget.style.transform="scale(1.08)")}
                  onMouseOut={e  => (e.currentTarget.style.transform="scale(1)")}
                />
                {/* Gradient */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />

                {/* Hot badge */}
                {loc.hot && (
                  <div style={{ position:"absolute", top:"12px", right:"12px", background:"#ef4444", color:"white", fontSize:"0.65rem", fontWeight:800, padding:"4px 10px", borderRadius:"100px", letterSpacing:"0.05em" }}>
                    🔥 HOT
                  </div>
                )}

                {/* Info */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 16px" }}>
                  <h3 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:800, fontSize:"1.05rem", color:"white", marginBottom:"4px" }}>{loc.name}</h3>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.75)" }}>{loc.type}</span>
                    <span style={{ fontSize:"0.78rem", background:"rgba(255,255,255,0.2)", backdropFilter:"blur(8px)", color:"white", padding:"3px 10px", borderRadius:"100px", fontWeight:700 }}>{loc.props}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All localities pills */}
        <div style={{ background:"#f9fafb", borderRadius:"20px", padding:"28px 32px" }}>
          <h3 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:800, fontSize:"1.1rem", color:"#1a1a2e", marginBottom:"16px" }}>All Nashik Localities</h3>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
            {[...LOCALITIES.map(l=>l.name), ...MORE].map((loc) => (
              <Link key={loc} href={`/locality/${loc.toLowerCase().replace(/\s+/g,"-")}`} style={{
                padding:"7px 16px", borderRadius:"100px",
                background:"white", border:"1px solid #e5e7eb",
                color:"#374151", fontSize:"0.82rem", fontWeight:500,
                transition:"all 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#16a34a"; (e.currentTarget as HTMLElement).style.color="#16a34a"; (e.currentTarget as HTMLElement).style.background="#f0fdf6"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#e5e7eb"; (e.currentTarget as HTMLElement).style.color="#374151"; (e.currentTarget as HTMLElement).style.background="white"; }}
              >{loc}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
