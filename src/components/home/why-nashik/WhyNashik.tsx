"use client";
const REASONS = [
  { icon:"✈️", title:"Excellent Connectivity",  body:"60km from Mumbai-Pune expressway. Direct highway to Pune, Mumbai & Aurangabad. Upcoming Metro project." },
  { icon:"🍷", title:"Wine Capital of India",    body:"World-class wineries attract tourism & high-end residential demand. Nashik is India's Napa Valley." },
  { icon:"🏭", title:"Industrial Growth Hub",    body:"MIDC Satpur & Ambad are Maharashtra's fastest-growing industrial areas with 3000+ companies." },
  { icon:"💧", title:"Water Abundance",          body:"Nashik receives abundant rainfall. Agriculture land here is among the most fertile in Maharashtra." },
  { icon:"📈", title:"Rising Property Values",   body:"30-40% appreciation in select localities over 5 years. NA plots are doubling in value every 3-4 years." },
  { icon:"🏫", title:"Quality Infrastructure",   body:"IIM, MIDC, hospitals, malls & good schools make Nashik ideal for families & investors alike." },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=75",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=75",
  "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&q=75",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=75",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=75",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=75",
];

export function WhyNashik() {
  return (
    <section style={{ padding:"80px 0", background:"linear-gradient(180deg,#f9fafb 0%,#fff 100%)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"60px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:"100px", padding:"6px 16px", marginBottom:"16px" }}>
            <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#1d4ed8", letterSpacing:"0.05em", textTransform:"uppercase" }}>🌟 Why Nashik</span>
          </div>
          <h2 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontSize:"clamp(1.75rem,4vw,2.75rem)", fontWeight:900, color:"#1a1a2e", marginBottom:"12px" }}>
            Why Invest in Nashik?
          </h2>
          <p style={{ color:"#6b7280", fontSize:"1.05rem", maxWidth:"600px", margin:"0 auto" }}>
            Nashik is Maharashtra&apos;s fastest-growing real estate destination — here&apos;s why smart investors are choosing Nashik
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"60px", alignItems:"center" }}>

          {/* Image Gallery */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gridTemplateRows:"repeat(2,180px)", gap:"12px" }}>
            {GALLERY.map((url,i) => (
              <div key={i} style={{
                borderRadius:"16px", overflow:"hidden",
                gridColumn: i===0?"span 2":"span 1",
                gridRow:    i===3?"span 2":"span 1",
                boxShadow:"0 8px 24px rgba(0,0,0,0.1)",
                transition:"transform 0.3s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform="scale(1.02)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform="scale(1)"}
              >
                <img src={url} alt="Nashik" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
            ))}
          </div>

          {/* Reasons */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
            {REASONS.map((r, i) => (
              <div key={r.title} className="animate-fade-up" style={{ animationDelay:`${i*0.1}s` }}>
                <div style={{
                  background:"white", borderRadius:"16px", padding:"20px",
                  border:"1.5px solid #f0f0f0",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
                  transition:"all 0.25s",
                  height:"100%",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#bbf7d2"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 24px rgba(22,163,74,0.1)"; (e.currentTarget as HTMLElement).style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#f0f0f0"; (e.currentTarget as HTMLElement).style.boxShadow="0 2px 8px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}
                >
                  <div style={{ fontSize:"1.75rem", marginBottom:"10px" }}>{r.icon}</div>
                  <h3 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:800, fontSize:"0.9rem", color:"#1a1a2e", marginBottom:"6px" }}>{r.title}</h3>
                  <p style={{ fontSize:"0.78rem", color:"#6b7280", lineHeight:1.6 }}>{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content Block */}
        <div style={{ marginTop:"60px", background:"linear-gradient(135deg,#f0fdf6,#dcfce9)", borderRadius:"20px", padding:"40px", border:"1px solid #bbf7d2" }}>
          <h3 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:900, fontSize:"1.3rem", color:"#14532d", marginBottom:"16px" }}>
            MahaProperties — Your Trusted Partner in Nashik Real Estate
          </h3>
          <p style={{ color:"#166534", lineHeight:1.8, fontSize:"0.95rem" }}>
            MahaProperties is Nashik&apos;s most comprehensive property portal, connecting buyers with verified sellers across all property categories. Whether you&apos;re looking for NA plots in Gangapur Road, agriculture land in Igatpuri, industrial sheds in MIDC Satpur, or commercial plots in Nashik Road — we have curated listings across 40+ localities in Nashik district. Our platform ensures RERA-compliant listings, transparent pricing, and zero brokerage options for property buyers.
          </p>
        </div>
      </div>
    </section>
  );
}
