import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { StickyContactForm } from "@/components/shared/StickyContactForm";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer";
import { Property } from "@/types/property";


// const PROPERTY_DATA: Record<string, Property> = {
//   "awfis-baner-2": {
//     _id: "p-awfis-ban2",
//     title: "Mahaproperties Office Plot near Nashik Road - Prime Business Hub",
//     slug: "awfis-baner-2",
//     category: "commercial",
//     status: "available",
//     constructionStatus: "ready",
//     price: 18500000,
//     area: 2800,
//     areaUnit: "sqft",
//     locality: "Nashik Road",
//     city: "Nashik",
//     state: "Maharashtra",
//     description: "Premium commercial plot with ready infrastructure, ideal for office and retail space in the Nashik growth corridor.",
//     images: [
//       { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80" },
//       { url: "https://images.unsplash.com/photo-1483389127114-cb1a8f70a4e2?w=1200&q=80" },
//       { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80" },
//     ],
//     highlights: ["Main road frontage", "Licensed 2486 sq.ft plan", "Immediate handover"],
//     amenities: ["24x7 CCTV", "Power backup", "Ample parking", "Lift facility"],
//     isRERA: true,
//     isFeatured: false,
//     isZeroBrokerage: true,
//     postedBy: "builder",
//     agentName: "Rakesh Nanda",
//     views: 1130,
//     savedCount: 315,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   "na-plot-gangapur-road": {
//     _id: "p-na-plot-gangapur",
//     title: "Prime NA Plot - Gangapur Road",
//     slug: "na-plot-gangapur-road",
//     category: "na-plot",
//     status: "available",
//     constructionStatus: "ready",
//     price: 4200000,
//     area: 2000,
//     areaUnit: "sqft",
//     locality: "Gangapur Road",
//     city: "Nashik",
//     state: "Maharashtra",
//     description: "Prime NA plot on Gangapur Road with quick approval, ideal for residential development and investment.",
//     images: [
//       { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80" },
//       { url: "https://images.unsplash.com/photo-1462858555511-64f2af96f9b0?w=1200&q=80" },
//     ],
//     highlights: ["Gangapur Road connectivity", "NA converted land", "Gated layout potential"],
//     amenities: ["24x7 security", "Main road access", "Electricity & water connection"],
//     isRERA: true,
//     isFeatured: true,
//     isZeroBrokerage: true,
//     postedBy: "dealer",
//     agentName: "Anjali Deshmukh",
//     views: 540,
//     savedCount: 128,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// };

export async function generateStaticParams() {
  return Object.keys(PROPERTY_DATA).map((slug) => ({ slug }));
}

export const dynamicParams = true;

 const RELATED_PROPERTIES: Property[] = [
  {
    _id: "p-rel-1",
    title: "Commercial Plot - Near Nashik Road Bus Stand",
    slug: "commercial-nashik-road-bus",
    category: "commercial",
    status: "available",
    constructionStatus: "ready",
    price: 21500000,
    area: 3450,
    areaUnit: "sqft",
    locality: "Nashik Road",
    city: "Nashik",
    state: "Maharashtra",
    description: "High footfall commercial property with immediate possession.",
    images: [{ url: "https://images.unsplash.com/photo-1549421263-0e4092c5bf60?w=800&q=80" }],
    highlights: ["Right next to main boulevard", "6 lane road"],
    amenities: ["24x7 security"],
    isRERA: true,
    isFeatured: false,
    isZeroBrokerage: false,
    postedBy: "dealer",
    agentName: "Shweta Kulkarni",
    views: 318,
    savedCount: 84,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "p-rel-2",
    title: "Warehouse-enabled Commercial Land - Satpur MIDC",
    slug: "warehouse-commercial-satpur",
    category: "warehouse",
    status: "available",
    constructionStatus: "ready",
    price: 41000000,
    area: 15000,
    areaUnit: "sqft",
    locality: "Satpur MIDC",
    city: "Nashik",
    state: "Maharashtra",
    description: "Operational-ready plot for industrial warehousing with RERA option.",
    images: [{ url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80" }],
    highlights: ["MIDC approved","Power & water supply"],
    amenities: ["Wide approach roads"],
    isRERA: true,
    isFeatured: false,
    isZeroBrokerage: true,
    postedBy: "builder",
    agentName: "Nitin Rao",
    views: 228,
    savedCount: 56,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const PROPERTY_DATA: Record<string, Property> = {
  "na-plot-gangapur-road": {
    _id: "1",
    title: "Prime NA Plot — Gangapur Road",
    slug: "na-plot-gangapur-road",
    category: "na-plot",
    status: "available",
    constructionStatus: "ready",
    price: 4200000,
    area: 2000,
    areaUnit: "sqft",
    locality: "Gangapur Road",
    city: "Nashik",
    state: "Maharashtra",
    description:
      "Premium NA plot located on Gangapur Road with excellent connectivity. Ideal for residential construction and long-term investment.",
    images: [
      { url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" },
      { url: "https://images.unsplash.com/photo-1462858555511-64f2af96f9b0?w=1200&q=80" }
    ],
    highlights: [
      "NA converted land",
      "Prime Gangapur Road location",
      "Strong resale potential"
    ],
    amenities: [
      "Road touch",
      "Electricity",
      "Water line",
      "Clear title"
    ],
    isRERA: true,
    isFeatured: true,
    isZeroBrokerage: true,
    postedBy: "dealer",
    agentName: "MahaProperties",
    views: 234,
    savedCount: 22,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  "agriculture-land-igatpuri": {
    _id: "2",
    title: "Agriculture Land — Igatpuri",
    slug: "agriculture-land-igatpuri",
    category: "agriculture",
    status: "available",
    constructionStatus: "ready",
    price: 8500000,
    area: 3,
    areaUnit: "acre",
    locality: "Igatpuri",
    city: "Nashik",
    state: "Maharashtra",
    description:
      "Scenic agriculture land near Igatpuri suitable for farming, farmhouse development, and weekend investment.",
    images: [
      { url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80" },
      { url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80" }
    ],
    highlights: [
      "Green surroundings",
      "Hill view",
      "Water availability"
    ],
    amenities: [
      "Road access",
      "Fencing",
      "Borewell option",
      "Natural surroundings"
    ],
    isRERA: true,
    isFeatured: true,
    isZeroBrokerage: true,
    postedBy: "owner",
    agentName: "MahaProperties",
    views: 189,
    savedCount: 17,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  "industrial-shed-midc-satpur": {
    _id: "3",
    title: "Industrial Shed — MIDC Satpur",
    slug: "industrial-shed-midc-satpur",
    category: "warehouse",
    status: "available",
    constructionStatus: "ready",
    price: 12000000,
    area: 5000,
    areaUnit: "sqft",
    locality: "Satpur MIDC",
    city: "Nashik",
    state: "Maharashtra",
    description:
      "Ready industrial shed in Satpur MIDC with power connection and excellent transport access.",
    images: [
      { url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80" },
      { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80" }
    ],
    highlights: [
      "MIDC approved zone",
      "Heavy vehicle access",
      "Ready possession"
    ],
    amenities: [
      "3-phase power",
      "Water supply",
      "Wide road",
      "Security"
    ],
    isRERA: false,
    isFeatured: true,
    isZeroBrokerage: true,
    postedBy: "builder",
    agentName: "MahaProperties",
    views: 312,
    savedCount: 28,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  "commercial-plot-nashik-road": {
    _id: "4",
    title: "Commercial Plot — Nashik Road",
    slug: "commercial-plot-nashik-road",
    category: "commercial",
    status: "available",
    constructionStatus: "ready",
    price: 6800000,
    area: 1800,
    areaUnit: "sqft",
    locality: "Nashik Road",
    city: "Nashik",
    state: "Maharashtra",
    description:
      "Prime commercial plot in Nashik Road area with strong footfall and future appreciation potential.",
    images: [
      { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80" },
      { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80" }
    ],
    highlights: [
      "High traffic zone",
      "Main road frontage",
      "Excellent ROI"
    ],
    amenities: [
      "Road touch",
      "Water connection",
      "Electricity",
      "Market nearby"
    ],
    isRERA: true,
    isFeatured: true,
    isZeroBrokerage: true,
    postedBy: "dealer",
    agentName: "MahaProperties",
    views: 156,
    savedCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  "investment-plot-meri-village": {
  _id:"5",
  title:"Investment Plot — Meri Village",
  slug:"investment-plot-meri-village",
  category:"commercial",
  status:"available",
  constructionStatus:"ready",
  price:1800000,
  area:1200,
  areaUnit:"sqft",
  locality:"Meri Village",
  city:"Nashik",
  state:"Maharashtra",
  description:"Affordable investment plot in fast-growing Meri area.",
  images:[{ url:"https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=80"}],
  highlights:["Budget investment","Growing locality"],
  amenities:["Road","Water"],
  isRERA:true,
  isFeatured:true,
  isZeroBrokerage:true,
  postedBy:"dealer",
  agentName:"MahaProperties",
  views:445,
  savedCount:15,
  createdAt:new Date().toISOString(),
  updatedAt:new Date().toISOString(),
},

"warehouse-land-ambad-midc": {
  _id:"6",
  title:"Warehouse Land — Ambad MIDC",
  slug:"warehouse-land-ambad-midc",
  category:"warehouse",
  status:"available",
  constructionStatus:"ready",
  price:24000000,
  area:12000,
  areaUnit:"sqft",
  locality:"Ambad",
  city:"Nashik",
  state:"Maharashtra",
  description:"Large warehouse land in Ambad MIDC.",
  images:[{ url:"https://images.unsplash.com/photo-1565891741441-64926e441838?w=1200&q=80"}],
  highlights:["MIDC zone","Logistics friendly"],
  amenities:["Wide road","Power"],
  isRERA:false,
  isFeatured:true,
  isZeroBrokerage:true,
  postedBy:"builder",
  agentName:"MahaProperties",
  views:98,
  savedCount:8,
  createdAt:new Date().toISOString(),
  updatedAt:new Date().toISOString(),
},

"collector-na-trimbak-road": {
  _id:"7",
  title:"Collector NA — Trimbak Road",
  slug:"collector-na-trimbak-road",
  category:"na-plot",
  status:"available",
  constructionStatus:"ready",
  price:5200000,
  area:2400,
  areaUnit:"sqft",
  locality:"Trimbak Road",
  city:"Nashik",
  state:"Maharashtra",
  description:"Collector NA approved plot on Trimbak Road.",
  images:[{ url:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80"}],
  highlights:["Collector approved","Prime road"],
  amenities:["Road","Water"],
  isRERA:true,
  isFeatured:true,
  isZeroBrokerage:true,
  postedBy:"dealer",
  agentName:"MahaProperties",
  views:190,
  savedCount:10,
  createdAt:new Date().toISOString(),
  updatedAt:new Date().toISOString(),
},

"na-plot-pathardi-phata": {
  _id:"8",
  title:"NA Plot — Pathardi Phata",
  slug:"na-plot-pathardi-phata",
  category:"na-plot",
  status:"available",
  constructionStatus:"ready",
  price:3900000,
  area:1800,
  areaUnit:"sqft",
  locality:"Pathardi Phata",
  city:"Nashik",
  state:"Maharashtra",
  description:"NA plot in premium Pathardi Phata zone.",
  images:[{ url:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"}],
  highlights:["Developed area","High demand"],
  amenities:["Road","Electricity"],
  isRERA:true,
  isFeatured:true,
  isZeroBrokerage:true,
  postedBy:"owner",
  agentName:"MahaProperties",
  views:210,
  savedCount:14,
  createdAt:new Date().toISOString(),
  updatedAt:new Date().toISOString(),
}
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const prop = PROPERTY_DATA[slug];
  if (!prop) {
    return { title: "Property not found" };
  }
  return {
    title: `${prop.title} | MahaProperties`,
    description: prop.description,
    keywords: `${prop.title}, Nashik commercial property, MahaProperties`,
    openGraph: {
      title: `${prop.title} | MahaProperties`,
      description: prop.description,
      type: "article",
      images: prop.images.map((img) => ({ url: img.url })),
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = PROPERTY_DATA[slug];
  if (!property) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main style={{ background: "#f4f7fb" }}>
        <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "24px 16px 64px" }}>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "14px", marginBottom: "18px" }}>
            <div style={{ color: "#64748b", fontSize: "0.9rem" }}>Home / investment options / {property.locality}</div>
            <div style={{ color: "#475569", fontSize: "0.9rem", fontWeight: 500 }}>Listed on: {new Date(property.createdAt).toLocaleDateString("en-IN")}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "16px" }}>

            <article style={{ background: "white", borderRadius: "14px", border: "1px solid #d7dde3", padding: "20px" }}>

              <h1 style={{ margin: 0, fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.1 }}>{property.title}</h1>
              <div style={{ marginTop: "8px", color: "#667085", fontSize: "0.95rem" }}>{property.locality}, {property.city}, {property.state}</div>

              <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ padding: "6px 10px", borderRadius: "999px", background: "#d1fae5", color: "#065f46", fontWeight: 700, fontSize:"0.8rem" }}>{property.status.toUpperCase()}</span>
                <span style={{ padding: "6px 10px", borderRadius: "999px", background: "#e0f2fe", color: "#0369a1", fontWeight: 700, fontSize:"0.8rem" }}>{property.constructionStatus.toUpperCase()}</span>
                {property.isRERA && <span style={{ padding: "6px 10px", borderRadius: "999px", background: "#fee2e2", color: "#991b1b", fontWeight: 700, fontSize:"0.8rem" }}>RERA Approved</span>}
                {property.isZeroBrokerage && <span style={{ padding: "6px 10px", borderRadius: "999px", background: "#f0fdf4", color: "#166534", fontWeight: 700, fontSize:"0.8rem" }}>Zero Brokerage</span>}
              </div>

              <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "10px" }}>
                <div style={{ background: "#f8fafc", border: "1px solid #dbeafe", borderRadius: "10px", padding: "10px" }}><div style={{ color: "#0f766e", fontWeight: 700 }}>₹{property.price.toLocaleString()}</div><div style={{ color: "#64748b", fontSize: "0.82rem" }}>Price</div></div>
                <div style={{ background: "#f8fafc", border: "1px solid #dbeafe", borderRadius: "10px", padding: "10px" }}><div style={{ color: "#0f766e", fontWeight: 700 }}>{property.area} {property.areaUnit}</div><div style={{ color: "#64748b", fontSize: "0.82rem" }}>Carpet</div></div>
                <div style={{ background: "#f8fafc", border: "1px solid #dbeafe", borderRadius: "10px", padding: "10px" }}><div style={{ color: "#0f766e", fontWeight: 700 }}>{property.agentName}</div><div style={{ color: "#64748b", fontSize: "0.82rem" }}>Agent</div></div>
                <div style={{ background: "#f8fafc", border: "1px solid #dbeafe", borderRadius: "10px", padding: "10px" }}><div style={{ color: "#0f766e", fontWeight: 700 }}>{property.views}</div><div style={{ color: "#64748b", fontSize: "0.82rem" }}>Views</div></div>
              </div>

              <div style={{ marginTop: "18px", borderRadius: "12px", overflow: "hidden", border: "1px solid #dbeafe" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
                  {property.images.map((img, idx) => (
                    <div key={idx} style={{ minHeight: "124px", position: "relative" }}>
                      <Image src={img.url} alt={`${property.title} image ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "22px", color: "#334155", fontSize: "0.98rem", lineHeight: 1.6 }}>
                {property.description}
              </div>

              <div style={{ marginTop: "22px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "14px" }}>
                <div style={{ fontWeight: 700, marginBottom: "8px" }}>Key highlights</div>
                <ul style={{ paddingLeft: "18px", margin: 0, color: "#334155" }}>
                  {property.highlights.map((item) => <li key={item} style={{ marginBottom: "5px" }}>{item}</li>)}
                </ul>
              </div>

              <div style={{ marginTop: "20px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px" }}>
                <div style={{ fontWeight: 700, marginBottom: "8px" }}>Prime amenities</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "8px" }}>
                  {property.amenities.map((item) => (
                    <span key={item} style={{ borderRadius: "8px", border: "1px solid #dbeafe", padding: "6px 8px", fontSize: "0.84rem", color: "#334155" }}>{item}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "22px", minHeight: "220px", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.locality + ", " + property.city + ", " + property.state)}&output=embed`}
                  style={{ width: "100%", height: "220px", border: 0 }}
                  loading="lazy"
                  title="Property Location"
                />
              </div>

            </article>

            <aside style={{ position: "sticky", top: "88px", alignSelf: "start" }}>
              <div style={{ background: "#ffffff", border: "1px solid #dbeafe", borderRadius: "14px", boxShadow: "0 10px 30px rgba(15,23,42,0.12)", overflow: "hidden" }}>
                <div style={{ background: "#ecfdf5", padding: "16px" }}>
                  <div style={{ fontWeight: 600, color: "#047857", fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Need help?</div>
                  <h3 style={{ margin: "8px 0 0", fontSize: "1.25rem", color: "#064e3b" }}>Book a site visit</h3>
                  <p style={{ marginTop: "6px", color: "#0f766e", fontSize: "0.9rem" }}>Get a call within 30 mins & a free property tour.</p>
                </div>
                <div style={{ padding: "14px" }}>
                  <StickyContactForm title="Contact Us" description="Get in touch to book viewing, pricing info or site support." />
                </div>
              </div>
            </aside>

          </div>

          <div style={{ marginTop: "22px", display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
            {RELATED_PROPERTIES.map((rel) => (
              <div key={rel._id} style={{ background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "12px" }}>
                <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>{rel.title}</h4>
                <div style={{ color: "#475569", fontSize: "0.875rem", marginBottom: "6px" }}>{rel.locality}, {rel.city}</div>
                <div style={{ fontWeight: 700, color: "#0f766e" }}>₹{rel.price.toLocaleString()}</div>
              </div>
            ))}
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
