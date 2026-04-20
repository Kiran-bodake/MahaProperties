"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, X, Search, Phone, User, ChevronDown,
  MapPin, Home, Building2, Landmark,
  TrendingUp, TreePine, ArrowRight, Bell,
  type LucideIcon,
} from "lucide-react";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { AutocompleteDropdown } from "@/components/shared/AutocompleteDropdown";

/* ─── Nav data types ─────────────────────────────────────── */
type NavSubLink = {
  label: string;
  href: string;
  sub?: string;
};

type NavMegaSection = {
  group: string;
  image?: string;
  items: NavSubLink[];
};

type NavLinkDef = {
  label: string;
  icon: LucideIcon;
  mega?: NavMegaSection[];
};

/* ─── Nav data ──────────────────────────────────────────── */
const NAV_LINKS: NavLinkDef[] = [
  {
    label: "All",
    icon: TrendingUp,
    mega: [
      {
        group: "Agriculture Land",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
        items: [
          { label: "Agriculture Land", sub: "Fertile farmland with clear title", href: "/properties?cat=agriculture" },
          { label: "Farmhouse Plots", sub: "Country-breeze weekend homes", href: "/properties?cat=farmhouse" },
          { label: "Orchard Land", sub: "Fruit-growing investment plots", href: "/properties?cat=orchard" },
        ]
      },
      {
        group: "Commercial Land",
        image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
        items: [
          { label: "Commercial Plots", sub: "High footfall business land", href: "/properties?cat=commercial" },
          { label: "Warehouse Land", sub: "Logistics & industrial zones", href: "/properties?cat=warehouse" },
          { label: "Industrial Sheds", sub: "Manufacturing-ready land", href: "/properties?cat=industrial-shed" },
        ]
      },
      {
        group: "NA Plots",
        image: "https://images.unsplash.com/photo-1484925044320-839be2566d41?auto=format&fit=crop&w=800&q=80",
        items: [
          { label: "NA Plots", sub: "Approved land for construction", href: "/properties?cat=na-plot" },
          { label: "Collector NA", sub: "Collector-approved plot options", href: "/properties?cat=collector-na" },
          { label: "CIDCO Plots", sub: "Planned development layouts", href: "/properties?cat=cidco-plot" },
        ]
      },
      {
        group: "Industrial Plots",
        image: "https://images.unsplash.com/photo-1590086782798-6de52b1d1e4f?auto=format&fit=crop&w=800&q=80",
        items: [
          { label: "MIDC Land", sub: "State industrial parks", href: "/properties?cat=midc" },
          { label: "Non-MIDC Land", sub: "Flexible industrial zones", href: "/properties?cat=non-midc" },
          { label: "Factory-ready", sub: "Plug-and-play industrial land", href: "/properties?cat=industrial" },
        ]
      },
      {
        group: "Top Localities",
        items: [
          { label: "Gangapur Road", href: "/locality/gangapur-road" },
          { label: "Nashik Road", href: "/locality/nashik-road" },
          { label: "Ambad MIDC", href: "/locality/ambad" },
          { label: "Pathardi Phata", href: "/locality/pathardi-phata" },
        ]
      },
    ],
  },
  {
    label: "Residential",
    icon: Home,
    mega: [
      { group: "NA Plots",
        items: [
          { label: "NA Plots",            sub: "Approved plots for construction", href: "/properties?cat=na-plot"           },
          { label: "Collector NA Plot",   sub: "Collector approved & clear title", href: "/properties?cat=collector-na"     },
          { label: "CIDCO Plots",         sub: "CIDCO approved layouts",           href: "/properties?cat=cidco-plot"       },
          { label: "Plots for Investment",sub: "High-return investment plots",     href: "/properties?cat=investment-plot"  },
        ]
      },
    ],
  },
  {
    label: "Agriculture",
    icon: TreePine,
    mega: [
      { group: "Land Types",
        items: [
          { label: "Agriculture Land",    sub: "Fertile farmland, clear title",    href: "/properties?cat=agriculture"      },
          { label: "Farmhouse Plots",     sub: "Weekend retreat land",             href: "/properties?cat=farmhouse"        },
          { label: "Mango / Orchard Land",sub: "Income-generating orchards",       href: "/properties?cat=orchard"          },
          { label: "Grape Farm Land",     sub: "Nashik's famous vineyards",        href: "/properties?cat=grape-farm"       },
        ]
      },
    ],
  },
  {
    label: "Commercial",
    icon: Building2,
    mega: [
      { group: "Commercial Properties",
        items: [
          { label: "Commercial Plots",    sub: "Prime commercial land",            href: "/properties?cat=commercial"       },
          { label: "Warehouse Land",      sub: "Industrial & logistics land",      href: "/properties?cat=warehouse"        },
          { label: "Industrial Sheds",    sub: "MIDC & non-MIDC sheds",            href: "/properties?cat=industrial-shed"  },
          { label: "Showroom / Shop",     sub: "Retail commercial spaces",         href: "/properties?cat=showroom"         },
        ]
      },
    ],
  },
  {
    label: "Localities",
    icon: MapPin,
    mega: [
      { group: "North Nashik",
        items: [
          { label: "Gangapur Road",   sub: "Premium residential zone",   href: "/locality/gangapur-road"   },
          { label: "College Road",    sub: "Education & lifestyle hub",  href: "/locality/college-road"    },
          { label: "Indira Nagar",    sub: "Established neighbourhood",  href: "/locality/indira-nagar"    },
          { label: "Panchavati",      sub: "Heritage locality",          href: "/locality/panchavati"      },
        ]
      },
      { group: "East & South",
        items: [
          { label: "Nashik Road",     sub: "Industrial & residential",   href: "/locality/nashik-road"     },
          { label: "Ambad MIDC",      sub: "Industrial powerhouse",      href: "/locality/ambad"           },
          { label: "Satpur MIDC",     sub: "Manufacturing hub",          href: "/locality/satpur"          },
          { label: "Pathardi Phata",  sub: "Emerging investment zone",   href: "/locality/pathardi-phata"  },
        ]
      },
      { group: "Outskirts & Taluka",
        items: [
          { label: "Igatpuri",        sub: "Hill station & agri land",   href: "/locality/igatpuri"        },
          { label: "Trimbak Road",    sub: "Spiritual & nature zone",    href: "/locality/trimbak-road"    },
          { label: "Meri Village",    sub: "Best value NA plots",        href: "/locality/meri"            },
          { label: "Sinnar",          sub: "Industrial growth corridor", href: "/locality/sinnar"          },
        ]
      },
    ],
  },
  {
    label: "Coworking",
    icon: Building2,
    mega: [
      { group: "Coworking",
        items: [
          { label: "Dedicated Coworking Space", sub: "Gurugram premium shared offices", href: "/coworking-space-in-gurugram" },
          { label: "All Coworking Options", sub: "Explore all coworking listings", href: "/properties?cat=commercial" },
        ]
      },
    ],
  },
  {
    label: "About Nashik",
    icon: Landmark,
    mega: [
      { group: "Why Nashik?",
        items: [
          { label: "Investment Guide",    sub: "Market trends & ROI insights",     href: "/nashik/investment-guide"  },
          { label: "Top Localities",      sub: "Best areas to buy in 2025",        href: "/nashik/localities"        },
          { label: "Infrastructure",      sub: "Roads, metro & development",       href: "/nashik/infrastructure"    },
          { label: "Price Trends",        sub: "Historical & projected prices",    href: "/nashik/price-trends"      },
        ]
      },
    ],
  },
];

const LOCALITIES_QUICK = ["Gangapur Road","Nashik Road","Meri","Igatpuri","Ambad","Pathardi Phata","Trimbak Road","Indira Nagar","Sinnar","Panchavati","College Road","Varavandi"];
const TYPES_QUICK      = ["NA Plot","Collector NA","Agriculture","Warehouse","Commercial","Investment Plot","Farmhouse","Industrial Shed"];

/* ─── Component ─────────────────────────────────────────── */
export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [atTop,      setAtTop]      = useState(true);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchFocus,setSearchFocus]= useState(false);
  const menuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autocomplete hook
  const {
    query: searchQ,
    suggestions,
    isLoading,
    showSuggestions,
    handleInputChange,
    handleSelectSuggestion,
    handleCloseSuggestions,
    setShowSuggestions,
  } = useAutocomplete({ category: "all", minChars: 1 });

  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setAtTop(y < 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu  = (label: string) => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    setActiveMenu(label);
  };
  const closeMenu = () => {
    menuTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };
  const keepMenu  = () => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
  };

  /* colour helpers */
  const onDark  = !scrolled && atTop;                 /* transparent phase = text white */
  const logoTxt = onDark ? "#ffffff" : "#14532d";
  const logoSub = onDark ? "rgba(255,255,255,0.65)" : "#6b7280";
  const navTxt  = onDark ? "rgba(255,255,255,0.88)" : "#374151";
  const navHov  = onDark ? "#ffffff"                : "#16a34a";
  const bgCls   = onDark ? "transparent"            : "#ffffff";
  const shadow  = scrolled ? "0 2px 20px rgba(0,0,0,0.10)" : "none";
  const border  = scrolled ? "1px solid rgba(0,0,0,0.07)"  : "1px solid transparent";

  const desktopNav = (
    <nav style={{ display:"flex", alignItems:"center", gap:"2px", flex:1 }} className="hide-md">
      {NAV_LINKS.map(item => (
        <div key={item.label} style={{ position:"relative", display: item.label === "Coworking" ? "none" : "relative" }}
          onMouseEnter={() => openMenu(item.label)}
          onMouseLeave={closeMenu}
        >
          <button style={{
            display:"flex", alignItems:"center", gap:"5px",
            padding:"8px 13px", borderRadius:"9px",
            fontFamily:"var(--font-dm,'DM Sans',sans-serif)",
            fontSize:"14px", fontWeight:600,
            color: activeMenu === item.label ? navHov : navTxt,
            background: activeMenu === item.label
              ? (onDark ? "rgba(255,255,255,0.12)" : "rgba(22,163,74,0.07)")
              : "transparent",
            border:"none", cursor:"pointer",
            transition:"all 0.18s ease",
          }}>
            {item.label}
            <ChevronDown size={13} style={{ transition:"transform 0.2s", transform: activeMenu===item.label?"rotate(180deg)":"rotate(0deg)" }} />
          </button>
          {activeMenu === item.label && item.mega && (
            <div
              onMouseEnter={keepMenu}
              onMouseLeave={closeMenu}
              style={{
                position:"absolute", top:"calc(100% + 10px)",
                left: item.label === "All Properties" ? "-20px" : item.label === "Localities" ? "-120px" : "0",
                right: item.label === "All Properties" ? "-20px" : undefined,
                width: item.label === "All Properties" ? "calc(100vw + 40px)" : undefined,
                background:"#ffffff",
                borderRadius:"18px",
                boxShadow:"0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)",
                padding:"24px 28px",
                minWidth: item.label === "All Properties" ? "auto" : item.label === "Localities" ? "680px" : "340px",
                zIndex:100,
                animation:"slideDown 0.2s ease",
                display:item.label === "All Properties" ? "grid" : "flex",
                gap:"20px",
              }}>
              {item.mega.map(section => (
                <div key={section.group} style={{ minWidth: section.group === "Top Localities" ? "160px" : "220px" }}>
                  <h4 style={{ fontSize:"14px", fontWeight:700, marginBottom:"10px" }}>{section.group}</h4>
                  <div style={{ display:"grid", gap:"8px" }}>
                    {section.items.map((link: NavSubLink) => (
                      <Link key={link.label} href={link.href} style={{ display:"block", color:"#334155", fontWeight:600, textDecoration:"none", fontSize:"13px" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#16a34a"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#334155"}>
                        {link.label}
                        {link.sub && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b", fontWeight: 400 }}>{link.sub}</p>}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* ── TOP ANNOUNCEMENT BAR ── */}
      {atTop && (
        <div style={{
          background: "linear-gradient(90deg,#14532d 0%,#16a34a 100%)",
          color:"white", fontSize:"12.5px", fontWeight:500,
          padding:"7px 0", textAlign:"center", letterSpacing:"0.01em",
          position:"relative", zIndex:1001,
        }}>
          <span>🏡 Nashik&apos;s #1 Property Portal — 2,500+ Verified Listings</span>
          <span style={{ margin:"0 20px", opacity:0.4 }}>|</span>
          <span>📞 Free Expert Consultation: <a href="tel:+919876543210" style={{ color:"#bbf7d2", fontWeight:700 }}>+91 98765 43210</a></span>
          <span style={{ margin:"0 20px", opacity:0.4 }}>|</span>
          <Link href="/post-property" style={{ color:"#fde68a", fontWeight:700, display:"inline-flex", alignItems:"center", gap:"6px" }}>
            List your property
            <span style={{ background: "#dcfce7", color: "#166534", fontSize: "10px", fontWeight: 700, borderRadius: "999px", padding: "1px 7px" }}>FREE</span>
          </Link>
        </div>
      )}

      {/* ── MAIN HEADER ── */}
      <header style={{
        position:       "sticky",
        top:            0,
        left:           0,
        right:          0,
        zIndex:         1000,
        background:     bgCls,
        borderBottom:   border,
        boxShadow:      shadow,
        backdropFilter: scrolled ? "blur(18px)" : "none",
        transition:     "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        fontFamily:     "var(--font-dm,'DM Sans',sans-serif)",
      }}>
        <div className="container" style={{ display:"flex", alignItems:"center", height: "100px", gap:"0", transition:"height 0.35s ease" }}>

          {/* ── LOGO ── */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none", flexShrink:0, marginRight:"28px" }}>
            <div style={{
              width: "200px",
              height: "50px",
              borderRadius:"11px",
              overflow: "hidden",
              position:"relative",
              boxShadow:"none",
              background: "white",
              flexShrink:0,
              transition:"all 0.35s ease",
            }}>
              <Image src="/mahaproperties-logo.png" alt="MahaProperties logo" fill style={{ objectFit: "contain", objectPosition: "center" }} />
            </div>
          </Link>

          {/* ── SCROLLED STATE: inline search bar ── */}
          {scrolled ? (
            <div style={{ flex:1, display:"flex", alignItems:"center", gap:"12px" }}>
              {desktopNav}
              {/* Search input with autocomplete */}
              <div style={{
                flex:1, display:"flex", alignItems:"center", gap:"10px",
                background: searchFocus ? "#f0fdf4" : "#f3f4f6",
                border: searchFocus ? "1.5px solid #16a34a" : "1.5px solid #e5e7eb",
                borderRadius:"10px", padding:"0 14px", height:"40px",
                transition:"all 0.2s",
                position:"relative",
              }}>
                <Search size={15} color={searchFocus?"#16a34a":"#9ca3af"} />
                <input
                  value={searchQ}
                  onChange={e => handleInputChange(e.target.value)}
                  onFocus={() => {
                    setSearchFocus(true);
                    setShowSuggestions(true);
                  }}
                  onBlur={() => {
                    setSearchFocus(false);
                    setTimeout(() => handleCloseSuggestions(), 200);
                  }}
                  placeholder="Search locality, project, property type..."
                  style={{
                    border:"none", outline:"none", background:"transparent",
                    fontSize:"13.5px", color:"#111827", fontWeight:500,
                    fontFamily:"var(--font-dm,'DM Sans',sans-serif)",
                    width:"150%",
                  }}
                />
                {searchQ && (
                  <button onClick={() => {
                    handleInputChange("");
                  }} style={{ color:"#9ca3af", display:"flex", alignItems:"center" }}>
                    <X size={13} />
                  </button>
                )}
                
                {/* Autocomplete Dropdown */}
                <div style={{ position:"absolute", top:"calc(100% + 4px)", left:0, right:0, minWidth:"300px", zIndex:50 }} ref={autocompleteRef}>
                  <AutocompleteDropdown
                    suggestions={suggestions}
                    isLoading={isLoading}
                    isOpen={showSuggestions}
                    query={searchQ}
                    onSelect={(item) => {
                      handleSelectSuggestion(item);
                      handleCloseSuggestions();
                    }}
                    onClose={handleCloseSuggestions}
                    className="shadow-lg"
                  />
                </div>
              </div>
              
              {/* Locality quick-pick 
              <select style={{
                height:"40px", padding:"0 10px", borderRadius:"10px",
                border:"1.5px solid #e5e7eb", background:"white",
                fontSize:"13px", fontWeight:500, color:"#374151",
                fontFamily:"var(--font-dm,'DM Sans',sans-serif)", cursor:"pointer",
                outline:"none",
              }}>
                <option value="">All Localities</option>
                {LOCALITIES_QUICK.map(l => <option key={l}>{l}</option>)}
              </select>
            
               Type quick-pick 
              <select style={{
                height:"40px", padding:"0 10px", borderRadius:"10px",
                border:"1.5px solid #e5e7eb", background:"white",
                fontSize:"13px", fontWeight:500, color:"#374151",
                fontFamily:"var(--font-dm,'DM Sans',sans-serif)", cursor:"pointer",
                outline:"none", display:"none",
              }} className="hide-md">
                <option value="">All Types</option>
                {TYPES_QUICK.map(t => <option key={t}>{t}</option>)}
              </select>
              */} 
              {/* Divider */}
              <div style={{ width:"1px", height:"28px", background:"#e5e7eb", flexShrink:0 }} />

              {/* Enquiry CTA */}
              <Link href="/enquiry" style={{
                display:"flex", alignItems:"center", gap:"6px", whiteSpace:"nowrap",
                padding:"0 16px", height:"40px", borderRadius:"10px",
                background:"linear-gradient(135deg,#16a34a,#22c55e)",
                color:"white", fontSize:"13px", fontWeight:700,
                boxShadow:"0 3px 10px rgba(22,163,74,0.32)", flexShrink:0,
              }}>
                {/* <Bell size={14} />*/} Enquiry Now 
              </Link>

              {/* Burger */}
              <button onClick={() => setMenuOpen(true)} style={{
                width:"40px", height:"40px", borderRadius:"10px",
                border:"1.5px solid #e5e7eb", background:"white",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#374151", flexShrink:0,
              }}>
                <Menu size={18} />
              </button>
            </div>

          ) : (
            /* ── DEFAULT STATE: full nav ── */
            <>
              {/* Desktop nav links */}
              <nav style={{ display:"flex", alignItems:"center", gap:"2px", flex:1 }} className="hide-md">
                {NAV_LINKS.map(item => (
                  <div key={item.label}
                    style={{ position:"relative", display: item.label === "Coworking" ? "none" : "relative" }}
                    onMouseEnter={() => openMenu(item.label)}
                    onMouseLeave={closeMenu}
                  >
                    <button style={{
                      display:"flex", alignItems:"center", gap:"5px",
                      padding:"8px 13px", borderRadius:"9px",
                      fontFamily:"var(--font-dm,'DM Sans',sans-serif)",
                      fontSize:"14px", fontWeight:600,
                      color: activeMenu === item.label ? navHov : navTxt,
                      background: activeMenu === item.label
                        ? (onDark ? "rgba(255,255,255,0.12)" : "rgba(22,163,74,0.07)")
                        : "transparent",
                      border:"none", cursor:"pointer",
                      transition:"all 0.18s ease",
                    }}>
                      {item.label}
                      <ChevronDown size={13} style={{ transition:"transform 0.2s", transform: activeMenu===item.label?"rotate(180deg)":"rotate(0deg)" }} />
                    </button>

                    {/* ── MEGA MENU ── */}
                    {activeMenu === item.label && item.mega && (
                      <div
                        onMouseEnter={keepMenu}
                        onMouseLeave={closeMenu}
                        style={{
                          position:"absolute", top:"calc(100% + 10px)",
                          left: item.label === "All Properties" ? "-20px" : item.label === "Localities" ? "-120px" : "0",
                          right: item.label === "All Properties" ? "-20px" : undefined,
                          width: item.label === "All Properties" ? "calc(100vw + 40px)" : undefined,
                          background:"#ffffff",
                          borderRadius:"18px",
                          boxShadow:"0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)",
                          padding:"24px 28px",
                          minWidth: item.label === "All Properties" ? "auto" : item.label === "Localities" ? "680px" : "340px",
                          zIndex:100,
                          animation:"slideDown 0.2s ease",
                          display:item.label === "All Properties" ? "grid" : "flex",
                          gridTemplateColumns:item.label === "All Properties" ? "repeat(5, minmax(180px, 1fr))" : undefined,
                          gap:"24px",
                        }}>
                        {item.mega.map((group) => {
                          const groupImage = (group as { image?: string }).image;

                          return (
                            <div key={group.group} style={{ minWidth: item.label === "All Properties" ? "0" : "180px" }}>
                              <div style={{
                                fontSize: "10.5px", fontWeight: 700, color: "#9ca3af",
                                letterSpacing: "0.1em", textTransform: "uppercase",
                                marginBottom: "12px", paddingBottom: "8px",
                                borderBottom: "1px solid #f3f4f6",
                              }}>{group.group}</div>

                              {groupImage ? (
                                <div style={{ marginBottom: "10px", borderRadius: "12px", overflow: "hidden", height: "100px", position: "relative" }}>
                                  <Image src={groupImage} alt={group.group} fill style={{ objectFit: "cover" }} />
                                </div>
                              ) : null}

                              {group.items.map((link: NavSubLink) => {
                                const subText = link.sub;
                                return (
                                  <Link key={link.label} href={link.href} style={{ display: "block", padding: "7px 8px", borderRadius: "8px", marginBottom: "6px", transition: "background 0.15s", color: "#111827" }}
                                    onMouseEnter={e => (e.currentTarget.style.background = "#f0fdf4")}
                                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                                  >
                                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{link.label}</div>
                                    {subText ? <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>{subText}</div> : null}
                                  </Link>
                                );
                              })}
                            </div>
                          );
                        })}

                        {/* Footer hint inside mega */}
                        <div style={{ position:"absolute", bottom:"16px", right:"24px" }}>
                          <Link href="/properties" style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", fontWeight:700, color:"#16a34a" }}>
                            View All <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right actions */}
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginLeft:"auto" }}>

                {/* Search icon button */}
                <button style={{
                  width:"38px", height:"38px", borderRadius:"9px", display:"flex", alignItems:"center", justifyContent:"center",
                  border: onDark ? "1.5px solid rgba(255,255,255,0.22)" : "1.5px solid #e5e7eb",
                  background: onDark ? "rgba(255,255,255,0.1)" : "white",
                  color: navTxt, transition:"all 0.18s",
                }}>
                  <Search size={16} />
                </button>

                {/* Phone */}
                <a href="tel:+919876543210" style={{
                  display:"flex", alignItems:"center", gap:"7px",
                  padding:"8px 14px", borderRadius:"9px",
                  border: onDark ? "1.5px solid rgba(255,255,255,0.22)" : "1.5px solid #e5e7eb",
                  background: onDark ? "rgba(255,255,255,0.1)" : "white",
                  color: onDark ? "white" : "#374151",
                  fontSize:"13px", fontWeight:600, transition:"all 0.18s",
                }} className="hide-sm">
                  <Phone size={14} /> +91 98765 43210
                </a>

                {/* Post CTA */}
                <Link href="/post-property" style={{
                  padding:"9px 18px", borderRadius:"9px",
                  background:"linear-gradient(135deg,#16a34a,#22c55e)",
                  color:"white", fontSize:"13px", fontWeight:700,
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  boxShadow:"0 4px 12px rgba(22,163,74,0.35)",
                  whiteSpace:"nowrap",
                }} className="hide-xs">
                  List your property
                  <span style={{ background: "#d1fae5", color: "#065f46", fontSize: "10px", fontWeight: 700, borderRadius: "999px", padding: "1px 7px" }}>FREE</span>
                </Link>

                {/* Burger (always visible) */}
                <button onClick={() => setMenuOpen(true)} style={{
                  width:"40px", height:"40px", borderRadius:"9px", display:"flex", alignItems:"center", justifyContent:"center",
                  border: onDark ? "1.5px solid rgba(255,255,255,0.22)" : "1.5px solid #e5e7eb",
                  background: onDark ? "rgba(255,255,255,0.1)" : "white",
                  color: onDark ? "white" : "#374151",
                  transition:"all 0.18s",
                }}>
                  <Menu size={18} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── NAV PILLS / SUBMENU ROW ── */}
        {scrolled ? (
          <div style={{ borderTop:"1px solid #e5e7eb", background:"#ffffff", boxShadow:"inset 0 1px 0 rgba(0,0,0,0.04)" }}>
            <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"8px", padding:"0 20px", overflowX:"auto", minHeight:"44px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"4px", overflowX:"auto", scrollbarWidth:"none" }}>
                {["All Properties","NA Plots","Collector NA","Agriculture Land","Warehouse","Commercial","Investment Plots","Farmhouses"].map((t) => (
                  <Link key={t} href={`/properties?cat=${t.toLowerCase().replace(/\s+/g,"-")}`} style={{
                    whiteSpace:"nowrap", padding:"6px 16px", borderRadius:"999px",
                    fontSize:"12.5px", fontWeight:600,
                    color:"#374151", background:"#f3f4f6", border:"1px solid #e5e7eb", transition:"all 0.15s", flexShrink:0,
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#e5f7ed")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#f3f4f6")}
                  >{t}</Link>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", flexShrink:0 }}>
                <Link href="/properties?sort=latest" style={{ whiteSpace:"nowrap", padding:"6px 14px", borderRadius:"8px", background:"#e0f2fe", color:"#0369a1", fontWeight:700, fontSize:"12px" }}>Latest</Link>
                <Link href="/properties?sort=popular" style={{ whiteSpace:"nowrap", padding:"6px 14px", borderRadius:"8px", background:"#dcfce7", color:"#15803d", fontWeight:700, fontSize:"12px" }}>Popular</Link>
                <Link href="/filter" style={{ whiteSpace:"nowrap", padding:"6px 14px", borderRadius:"8px", background:"#fef3c7", color:"#a16207", fontWeight:700, fontSize:"12px" }}>Filters</Link>
              </div>
            </div>
          </div>
        ) : atTop && (
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", background:"rgba(0,0,0,0.18)", backdropFilter:"blur(8px)" }}>
            <div className="container" style={{ display:"flex", gap:"4px", padding:"0 20px", overflowX:"auto", scrollbarWidth:"none", alignItems:"center", height:"44px" }}>
              {["All Properties","NA Plots","Collector NA","Agriculture Land","Warehouse","Commercial","Investment Plots","Farmhouses"].map((t,i) => (
                <Link key={t} href={`/properties?cat=${t.toLowerCase().replace(/\s+/g,"-")}`} style={{
                  whiteSpace:"nowrap", padding:"5px 14px", borderRadius:"100px",
                  fontSize:"12.5px", fontWeight:600,
                  color: i===0 ? "#14532d" : "rgba(255,255,255,0.85)",
                  background: i===0 ? "white" : "rgba(255,255,255,0.1)",
                  border: i===0 ? "none" : "1px solid rgba(255,255,255,0.15)",
                  transition:"all 0.18s", flexShrink:0,
                }}
                  onMouseEnter={e => { if(i!==0){(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.2)";} }}
                  onMouseLeave={e => { if(i!==0){(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.1)";} }}
                >{t}</Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════
           SLIDE-IN FULL-SCREEN DRAWER MENU
         ══════════════════════════════════════ */}
      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:2000, display:"flex" }}>
          {/* backdrop */}
          <div onClick={() => setMenuOpen(false)} style={{ flex:1, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(3px)", animation:"fadeIn 0.2s ease" }} />

          {/* Drawer */}
          <div style={{
            width:"min(420px, 92vw)", height:"100%", background:"white",
            display:"flex", flexDirection:"column", overflowY:"auto",
            boxShadow:"-20px 0 60px rgba(0,0,0,0.18)",
            animation:"slideRight 0.28s cubic-bezier(0.4,0,0.2,1)",}}>
            {/* Drawer Header */}
            <div style={{ padding:"20px 24px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{width: "56px",height: "56px",borderRadius: "14px", overflow: "hidden",background: "white",border: "1px solid #e5e7eb",boxShadow: "0 4px 14px rgba(0,0,0,0.08)",display: "flex",alignItems: "center",justifyContent: "center",flexShrink: 0}}>
              <Image src="/mahaproperties-logo.png" alt="MahaProperties Logo" width={54} height={54} style={{objectFit: "cover",padding: "1px"}}/>
            </div>
                {/* <div>
                <div style={{ fontWeight:800, fontSize:"1rem", color:"#14532d", letterSpacing:"-0.02em" }}>Maha<span style={{ color:"#16a34a" }}>Properties</span></div>
                  <div style={{ fontSize:"0.6rem", color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.08em" }}>Nashik Real Estate</div>
                </div> */}
              </div>
              <button onClick={() => setMenuOpen(false)} style={{ width:"36px", height:"36px", borderRadius:"9px", border:"1.5px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"center", color:"#374151" }}>
                <X size={18} />
              </button>
            </div>

            {/* Search inside drawer */}
            <div style={{ padding:"16px 24px", borderBottom:"1px solid #f3f4f6", flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", background:"#f9fafb", border:"1.5px solid #e5e7eb", borderRadius:"10px", padding:"0 14px", height:"44px" }}>
                <Search size={16} color="#9ca3af" />
                <input placeholder="Search property, locality..." style={{ border:"none", outline:"none", background:"transparent", fontSize:"14px", width:"100%", fontFamily:"var(--font-dm,'DM Sans',sans-serif)" }} />
              </div>
            </div>

            {/* Categories */}
            <div style={{ padding:"16px 24px 8px", flexShrink:0 }}>
              <div style={{ fontSize:"10.5px", fontWeight:700, color:"#9ca3af", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"12px" }}>Browse by Type</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                {[
                  { icon:"🏞️", label:"NA Plots",        href:"/properties?cat=na-plot"        },
                  { icon:"📋", label:"Collector NA",     href:"/properties?cat=collector-na"   },
                  { icon:"🌾", label:"Agriculture",      href:"/properties?cat=agriculture"    },
                  { icon:"🏭", label:"Warehouse",        href:"/properties?cat=warehouse"      },
                  { icon:"🏢", label:"Commercial",       href:"/properties?cat=commercial"     },
                  { icon:"📈", label:"Investment Plots", href:"/properties?cat=investment-plot"},
                  { icon:"🍇", label:"Farmhouse",        href:"/properties?cat=farmhouse"      },
                  { icon:"🏗️", label:"Industrial Shed",  href:"/properties?cat=industrial-shed"},
                ].map(c => (
                  <Link key={c.label} href={c.href} onClick={() => setMenuOpen(false)} style={{
                    display:"flex", alignItems:"center", gap:"9px",
                    padding:"10px 12px", borderRadius:"10px",
                    border:"1.5px solid #f0f0f0", background:"#fafafa",
                    fontSize:"13px", fontWeight:600, color:"#374151",
                    transition:"all 0.15s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#bbf7d2"; (e.currentTarget as HTMLElement).style.background="#f0fdf4"; (e.currentTarget as HTMLElement).style.color="#16a34a"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#f0f0f0"; (e.currentTarget as HTMLElement).style.background="#fafafa"; (e.currentTarget as HTMLElement).style.color="#374151"; }}
                  >
                    <span style={{ fontSize:"1rem" }}>{c.icon}</span> {c.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Localities */}
            <div style={{ padding:"16px 24px 8px", flexShrink:0 }}>
              <div style={{ fontSize:"10.5px", fontWeight:700, color:"#9ca3af", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"12px" }}>Popular Localities</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                {LOCALITIES_QUICK.map(l => (
                  <Link key={l} href={`/locality/${l.toLowerCase().replace(/\s+/g,"-")}`} onClick={() => setMenuOpen(false)} style={{
                    padding:"6px 13px", borderRadius:"100px",
                    background:"#f3f4f6", color:"#374151", fontSize:"12.5px", fontWeight:500,
                    border:"1px solid transparent", transition:"all 0.15s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#f0fdf4"; (e.currentTarget as HTMLElement).style.borderColor="#86efac"; (e.currentTarget as HTMLElement).style.color="#16a34a"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="#f3f4f6"; (e.currentTarget as HTMLElement).style.borderColor="transparent"; (e.currentTarget as HTMLElement).style.color="#374151"; }}
                  >{l}</Link>
                ))}
              </div>
            </div>

            {/* Nav links */}
            <div style={{ padding:"16px 24px", borderTop:"1px solid #f3f4f6", marginTop:"8px" }}>
              <div style={{ fontSize:"10.5px", fontWeight:700, color:"#9ca3af", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"12px" }}>Menu</div>
              {[
                { label:"All Properties",  href:"/properties"       },
                { label:"About Nashik",    href:"/nashik"           },
                { label:"Market Insights", href:"/insights"         },
                { label:"Blog",            href:"/blog"             },
                { label:"Post Property",   href:"/post-property"    },
                { label:"Contact Us",      href:"/contact"          },
              ].map(m => (
                <Link key={m.label} href={m.href} onClick={() => setMenuOpen(false)} style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"12px 4px", borderBottom:"1px solid #f9fafb",
                  fontSize:"14.5px", fontWeight:600, color:"#374151",
                  transition:"color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color="#16a34a")}
                  onMouseLeave={e => (e.currentTarget.style.color="#374151")}
                >
                  {m.label} <ArrowRight size={14} />
                </Link>
              ))}
            </div>

            {/* Auth + CTA at bottom */}
            <div style={{ padding:"20px 24px", marginTop:"auto", borderTop:"1px solid #f3f4f6", display:"flex", flexDirection:"column", gap:"10px", flexShrink:0 }}>
              <Link href="/enquiry" onClick={() => setMenuOpen(false)} style={{
                padding:"14px", borderRadius:"10px", textAlign:"center",
                background:"linear-gradient(135deg,#16a34a,#22c55e)",
                color:"white", fontWeight:700, fontSize:"15px",
                boxShadow:"0 4px 14px rgba(22,163,74,0.35)",
                display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
              }}><Bell size={16} /> Enquiry Now</Link>
              <a href="tel:+919876543210" style={{
                padding:"12px", borderRadius:"10px", textAlign:"center",
                background:"#f9fafb", border:"1.5px solid #e5e7eb",
                color:"#374151", fontWeight:600, fontSize:"14px",
                display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
              }}><Phone size={15} /> +91 98765 43210</a>
            </div>
          </div>
        </div>
      )}

      {/* ── Responsive helpers ── */}
      <style>{`
        @media (max-width: 1100px) { .hide-md { display: none !important; } }
        @media (max-width:  768px) { .hide-sm { display: none !important; } }
        @media (max-width:  480px) { .hide-xs { display: none !important; } }
        @keyframes slideRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideDown  { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn     { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
}
