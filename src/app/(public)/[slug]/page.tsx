import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyGrid } from "@/components/property/property-grid";
import { Footer } from "@/components/layout/footer";
import { Property } from "@/types/property";

const CATEGORY_DATA: Record<string, { title: string; description: string; keywords: string; chartPoints: number[]; examples: Property[] }> = {
  "na-plots-in-nashik": {
    title: "NA Plots in Nashik | MahaProperties",
    description: "Find top NA plots in Nashik with verified title, clear approvals, and competitive pricing. Explore listings in Gangapur Road, Nashik Road and more.",
    keywords: "NA plots Nashik, NA plot sale, Nashik property, Mahaproperties",
    chartPoints: [8.9, 9.2, 9.5, 9.7, 10.1, 10.4],
    examples: [
      { _id: "na1", title: "NA Plot 5000 sqft on Gangapur Road", slug: "na-plot-gangapur-road", category: "na-plot", status: "available", constructionStatus: "ready", price: 6500000, area: 5000, areaUnit: "sqft", locality: "Gangapur Road", city: "Nashik", state: "Maharashtra", description: "Prime NA plot with 30m road frontage.", images: [{ url: "https://images.unsplash.com/photo-1466155585022-90ede8891187?w=800&q=80" }], highlights: ["Clear title","Wider roads","Immediate possession"], amenities: ["24x7 security", "800m from highway"], isRERA: true, isFeatured: false, isZeroBrokerage: true, postedBy: "dealer", agentName: "Ravi Sharma", views: 240, savedCount: 62, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
  },
  "collector-na-plots-in-nashik": {
    title: "Collector NA Plots in Nashik | MahaProperties",
    description: "Premium collector NA plots in Nashik with approvals and clear titles. Ideal for residential or investment purchase.",
    keywords: "Collector NA Nashik, Collector NA plots, Nashik real estate",
    chartPoints: [7.8, 8.1, 8.4, 8.7, 8.9, 9.0],
    examples: [
      { _id: "cna1", title: "Collector-NA Plot at Nashik Road", slug: "collector-na-nashik-road", category: "na-plot", status: "available", constructionStatus: "ready", price: 7200000, area: 5500, areaUnit: "sqft", locality: "Nashik Road", city: "Nashik", state: "Maharashtra", description: "Collector NA approved, perfect for villa project.", images: [{ url: "https://images.unsplash.com/photo-1523069235832-4a86b7f9c79b?w=800&q=80" }], highlights: ["Document ready","Prime location"], amenities: ["Nearby schools","Hospitals"], isRERA: true, isFeatured: false, isZeroBrokerage: true, postedBy: "builder", agentName: "Priya Joshi", views: 188, savedCount: 43, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
  },
  "agriculture-land-in-nashik": {
    title: "Agriculture Land in Nashik | MahaProperties",
    description: "Buy fertile agriculture land in Nashik: Igatpuri, Trimbak, Sinnar and more. Check soil test, irrigation options and growth potential.",
    keywords: "agriculture land Nashik, farmland Nashik, farm plots Nashik",
    chartPoints: [6.8, 7.1, 7.4, 7.8, 8.2, 8.7],
    examples: [
      { _id: "ag1", title: "30-acre Agriculture Land near Igatpuri", slug: "agri-land-igatpuri", category: "agriculture", status: "available", constructionStatus: "ready", price: 34000000, area: 30, areaUnit: "acre", locality: "Igatpuri", city: "Nashik", state: "Maharashtra", description: "High-yield farmland with guaranteed water source.", images: [{ url: "https://images.unsplash.com/photo-1549393220-c6f27829bd2a?w=800&q=80" }], highlights: ["IRR proposal","Clear legal status"], amenities: ["Water connection","Road access"], isRERA: false, isFeatured: false, isZeroBrokerage: false, postedBy: "owner", agentName: "Kunal Deshmukh", views: 134, savedCount: 45, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
  },
  "warehouse-space-in-nashik": {
    title: "Warehouse Space in Nashik | MahaProperties",
    description: "Secure warehouse land in Nashik for logistics, storage and industrial units. MIDC and non-MIDC locations available.",
    keywords: "warehouse Nashik, logistics space Nashik, industrial land Nashik",
    chartPoints: [8.2, 8.5, 8.7, 8.9, 9.2, 9.4],
    examples: [
      { _id: "wh1", title: "Warehouse plot in Satpur MIDC", slug: "warehouse-satpur-midc", category: "warehouse", status: "available", constructionStatus: "ready", price: 49000000, area: 12000, areaUnit: "sqft", locality: "Satpur MIDC", city: "Nashik", state: "Maharashtra", description: "Ideal for logistics: main road access & power supply.", images: [{ url: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&q=80" }], highlights: ["Approved site plan", "Good connectivity"], amenities: ["24x7 security", "Water & power"], isRERA: false, isFeatured: false, isZeroBrokerage: false, postedBy: "dealer", agentName: "Saurabh Bhagat", views: 205, savedCount: 33, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
  },
  "commercial-properties-in-nashik": {
    title: "Commercial Properties in Nashik | MahaProperties",
    description: "Best commercial properties in Nashik: retail shops, showrooms and offices with high footfall locations.",
    keywords: "commercial properties Nashik, shops for sale, office space Nashik",
    chartPoints: [8.0, 8.3, 8.6, 8.9, 9.1, 9.5],
    examples: [
      { _id: "cp1", title: "Commercial plot near College Road", slug: "commercial-college-road", category: "commercial", status: "available", constructionStatus: "ready", price: 22000000, area: 4000, areaUnit: "sqft", locality: "College Road", city: "Nashik", state: "Maharashtra", description: "High visibility plot for retail or office premise.", images: [{ url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80" }], highlights: ["Busy area", "Good return potential"], amenities: ["Parking","Public transport"], isRERA: true, isFeatured: false, isZeroBrokerage: true, postedBy: "builder", agentName: "Meera Jain", views: 270, savedCount: 60, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
  },
  "plots-for-investment": {
    title: "Plots for Investment in Nashik | MahaProperties",
    description: "Best investment plots in Nashik - NA, agriculture, and commercial land with high ROI and buyback options.",
    keywords: "investment plots Nashik, best property investment, Mahaproperties",
    chartPoints: [7.5, 7.8, 8.2, 8.7, 9.0, 9.4],
    examples: [
      { _id: "inv1", title: "Investment plot near Panchavati", slug: "investment-panchavati", category: "na-plot", status: "available", constructionStatus: "ready", price: 15500000, area: 3600, areaUnit: "sqft", locality: "Panchavati", city: "Nashik", state: "Maharashtra", description: "Future growth corridor with strong rental demand.", images: [{ url: "https://images.unsplash.com/photo-1523293834405-8927ce615f99?w=800&q=80" }], highlights: ["Buy-back guarantee","Market analysis report"], amenities: ["Near highway","Water access"], isRERA: false, isFeatured: false, isZeroBrokerage: true, postedBy: "owner", agentName: "Ananya Kapoor", views: 311, savedCount: 95, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const data = CATEGORY_DATA[slug];
  if (!data) return { title: "Page not found" };
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      siteName: "MahaProperties",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = CATEGORY_DATA[slug];
  if (!data) {
    notFound();
  }

  const monthlyEMI = (data.examples[0]?.price || 0) / 240 * 1.05;

  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "12px" }}>{data.title.replace("| MahaProperties", "")}</h1>
        <p style={{ color: "#475569", fontSize: "1rem", marginBottom: "20px" }}>{data.description}</p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {Object.keys(CATEGORY_DATA).map((slug) => (
            <Link key={slug} href={`/${slug}`} style={{ padding: "8px 14px", borderRadius: "999px", background: slug === params.slug ? "#16a34a" : "#e2e8f0", color: slug === params.slug ? "white" : "#334155", textDecoration: "none", fontWeight: 600 }}>
              {CATEGORY_DATA[slug].title.split("|")[0]}
            </Link>
          ))}
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "10px" }}>Pricing Trend (per sq.ft, indexed)</h2>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${data.chartPoints.length}, minmax(0, 1fr))`, gap: "10px", alignItems: "end", height: "160px", padding: "12px", background: "white", borderRadius: "12px" }}>
            {data.chartPoints.map((p, i) => (
              <div key={i} style={{ background: "#16a34a", borderRadius: "6px", height: `${Math.min(100, (p / 10) * 100)}%`, display: "flex", alignItems: "flex-end", justifyContent: "center", color: "white", fontSize: "10px" }}>{p}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "32px", background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Why MahaProperties</h2>
          <p style={{ color: "#475569", marginBottom: "12px" }}>MahaProperties offers verified listings, transparent pricing, and trusted local agents in Nashik.</p>
          <ul style={{ marginLeft: "18px", color: "#334155" }}>
            <li>Verified title and documents</li>
            <li>Best price comparison with historical data</li>
            <li>Buyback guarantee on select plots</li>
            <li>Dedicated property advisory and financing support</li>
          </ul>
        </div>

        <div style={{ marginBottom: "32px", background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>EMI Calculator</h2>
          <p style={{ color: "#334155", marginBottom: "10px" }}>Approx EMI starting from <strong>₹{Math.round(monthlyEMI).toLocaleString()}</strong> per month.</p>
          <details>
            <summary style={{ cursor: "pointer", color: "#0f766e", fontWeight: 700 }}>Calculate EMI for your budget</summary>
            <p style={{ color: "#475569", marginTop: "10px" }}>Use our calculator on property details for exact values. Loan term 20 years, rate 7.5% p.a.</p>
          </details>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "16px" }}>Featured Listings</h2>
          <PropertyGrid properties={data.examples} />
        </div>

        <div style={{ marginBottom: "40px", background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Location Advantage</h2>
          <ul style={{ marginLeft: "18px", color: "#334155" }}>
            <li>Close to major transport hubs (highway & airport)</li>
            <li>Developing residential and commercial neighborhoods</li>
            <li>Upcoming infrastructure projects within 3-5 km radius</li>
            <li>Water and power connections ready for quick start</li>
          </ul>
        </div>

        <div style={{ marginBottom: "40px", borderRadius: "12px", overflow: "hidden", height: "420px" }}>
          <iframe title="Property location map" width="100%" height="100%" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.850101893499!2d73.76337891503646!3d19.999397753144066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c0ce8f6f09f9%3A0x37e5a873c7d5a3cd!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" style={{ border: 0 }} loading="lazy"></iframe>
        </div>

      </section>
      <Footer />
    </main>
  );
}
