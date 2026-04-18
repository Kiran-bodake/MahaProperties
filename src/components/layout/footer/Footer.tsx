"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const NA_LINKS = [
  ["NA Plots In Nashik",       "/properties?category=na-plot&locality=nashik"],
  ["NA Plots Isn Gangapur Road","/properties?category=na-plot&locality=gangapur-road"],
  ["NA Plots In Nashik Road",  "/properties?category=na-plot&locality=nashik-road"],
  ["NA Plots In Meri",         "/properties?category=na-plot&locality=meri"],
  ["NA Plots In Varavandi",    "/properties?category=na-plot&locality=varavandi"],
  ["NA Plots In Igatpuri",     "/properties?category=na-plot&locality=igatpuri"],
  ["NA Plots In Pathardi",     "/properties?category=na-plot&locality=pathardi-phata"],
  ["NA Plots In Trimbak Road", "/properties?category=na-plot&locality=trimbak-road"],
];

const AGRI_LINKS = [
  ["Agriculture Land In Igatpuri", "/properties?category=agriculture&locality=igatpuri"],
  ["Agriculture Land In Trimbak",  "/properties?category=agriculture&locality=trimbak"],
  ["Agriculture Land In Sinnar",   "/properties?category=agriculture&locality=sinnar"],
  ["Farmhouse Plots In Nashik",    "/properties?category=agriculture&type=farmhouse"],
  ["Agriculture Land In Nashik Road",   "/properties?category=agriculture&locality=nashik-road"],
  ["Investment Plots In Nashik",   "/properties?category=investment-plot"],
];

const COMMERCIAL = [
  ["Commercial Land In Nashik",    "/properties?category=commercial"],
  ["Industrial Sheds MIDC",     "/properties?category=industrial-shed&area=midc"],
  ["Warehouse Space In Nashik",    "/properties?category=warehouse"],
  ["Satpur MIDC Properties",    "/properties?locality=satpur-midc"],
  ["Ambad Industrial Area",     "/properties?locality=ambad"],
  ["Collector NA Plot",         "/properties?category=collector-na-plot"],
];

const COMPANY = [
  ["About Us",        "/about"],
  ["Post Property",   "/post-property"],
  ["Market Insights", "/insights"],
  ["Blog",            "/blog"],
  ["Contact Us",      "/contact"],
  ["Privacy Policy",  "/privacy"],
  ["Terms of Use",    "/terms"],
  ["Sitemap",         "/sitemap"],
];

export function Footer() {
  return (
    <footer style={{ background:"#000000", color:"#ffffff" }}>
      {/* Main Footer */}
      <div className="container" style={{ paddingTop:"64px", paddingBottom:"48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr repeat(3,1fr)", gap:"48px", marginBottom:"48px" }}>

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
              <div style={{
                width: "160px",
                height: "auto",
                borderRadius:"8px",
                overflow: "hidden",
                position:"relative",
                background: "transparent",
                flexShrink:0,
              }}>
                <Image src="/mahaproperties-logo.png" alt="MahaProperties logo" width={160} height={60} style={{ objectFit: "contain", objectPosition: "left" }} />
              </div>
            </div>
            <p style={{ fontSize:"0.88rem", lineHeight:1.8, marginBottom:"24px", maxWidth:"260px" }}>
              Nashik&apos;s most comprehensive property portal for NA plots, agriculture land, commercial & industrial properties since 2018.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", fontSize:"0.85rem", marginBottom:"24px" }}>
              <a href="tel:+919876543210" style={{ display:"flex", alignItems:"center", gap:"8px", color:"#ffffff", transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color="#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color="#ffffff")}
              ><Phone size={14} color="#ffffff" /> +91 98765 43210</a>
              <a href="mailto:hello@mahaproperties.in" style={{ display:"flex", alignItems:"center", gap:"8px", color:"#ffffff", transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color="#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color="#ffffff")}
              ><Mail size={14} color="#ffffff" /> hello@mahaproperties.in</a>
              <div style={{ display:"flex", alignItems:"flex-start", gap:"8px" }}><MapPin size={14} color="#4ade82" style={{ marginTop:"2px", flexShrink:0 }} /> Nashik, Maharashtra 422001</div>
            </div>
            <div style={{ display:"flex", gap:"10px" }}>
              {[Instagram,Facebook,Youtube,Twitter].map((Icon,i) => (
                <a key={i} href="#" style={{
                  width:"36px", height:"36px", borderRadius:"10px",
                  background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#9ca3af", transition:"all 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(22,163,74,0.2)"; (e.currentTarget as HTMLElement).style.color="#4ade82"; (e.currentTarget as HTMLElement).style.borderColor="rgba(74,222,128,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color="#9ca3af"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)"; }}
                ><Icon size={15} /></a>
              ))}
            </div>
          </div>

          {/* NA Plots */}
          <div>
            <h4 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:700, color:"white", fontSize:"0.9rem", marginBottom:"20px", letterSpacing:"0.02em" }}>NA Plots</h4>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
              {NA_LINKS.map(([label,href]) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize:"0.83rem", color:"white", transition:"color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color="#e8ffda")}
                    onMouseLeave={e => (e.currentTarget.style.color="white")}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agriculture + Commercial */}
          <div>
            <h4 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:700, color:"white", fontSize:"0.9rem", marginBottom:"20px" }}>Agriculture & Commercial</h4>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
              {[...AGRI_LINKS,...COMMERCIAL].map(([label,href]) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize:"0.83rem", color:"white", transition:"color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color="#e8ffda")}
                    onMouseLeave={e => (e.currentTarget.style.color="white")}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily:"var(--font-syne,Syne,serif)", fontWeight:700, color:"white", fontSize:"0.9rem", marginBottom:"20px" }}>Company</h4>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
              {COMPANY.filter(([label]) => label !== "Market Insights").map(([label,href]) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize:"0.83rem", color:"white", transition:"color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color="#e8ffda")}
                    onMouseLeave={e => (e.currentTarget.style.color="white")}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"24px", display:"flex", flexWrap:"wrap", gap:"16px", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ fontSize:"0.8rem" }}>© 2026 MahaProperties. All rights reserved. Made with ❤️ in Nashik</p>
          <p style={{ fontSize:"0.8rem" }}>Developed by G.K. Digital</p>
        </div>
      </div>
    </footer>
  );
}
