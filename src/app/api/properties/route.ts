// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Property from "@/models/property";
// import { propertyFilterSchema } from "@/lib/validations";
// import { logger } from "@/lib/logger";

// export const revalidate = 60;

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();
//     const params  = Object.fromEntries(req.nextUrl.searchParams);
//     const filters = propertyFilterSchema.parse(params);
//     const query: Record<string, unknown> = { status: "available" };

//     if (filters.category)           query.category           = filters.category;
//     if (filters.locality)           query.locality           = new RegExp(filters.locality, "i");
//     if (filters.constructionStatus) query.constructionStatus = filters.constructionStatus;
//     if (filters.postedBy)           query.postedBy           = filters.postedBy;
//     if (filters.isRERA !== undefined) query.isRERA            = filters.isRERA;

//     if (filters.priceMin || filters.priceMax) {
//       query.price = {
//         ...(filters.priceMin && { $gte: filters.priceMin }),
//         ...(filters.priceMax && { $lte: filters.priceMax }),
//       };
//     }
//     if (filters.q) query.$text = { $search: filters.q };

//     const sortMap: Record<string, Record<string, 1 | -1>> = {
//       newest: { createdAt: -1 }, price_asc: { price: 1 }, price_desc: { price: -1 }, popular: { views: -1 },
//     };
//     const sort  = sortMap[filters.sortBy ?? "newest"] ?? { createdAt: -1 };
//     const skip  = (filters.page - 1) * filters.limit;

//     const [properties, total] = await Promise.all([
//       Property.find(query).sort(sort as Record<string, 1 | -1>).skip(skip).limit(filters.limit).lean(),
//       Property.countDocuments(query),
//     ]);

//     return NextResponse.json({ properties, total, page: filters.page, totalPages: Math.ceil(total / filters.limit) });
//   } catch (e) {
//     logger.error("GET /api/properties", e);
//     return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const property = await Property.create(body);
//     return NextResponse.json(property, { status: 201 });
//   } catch (e) {
//     logger.error("POST /api/properties", e);
//     return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
//   }
// }
// ================================
// 1️⃣ src/app/api/properties/route.ts
// ================================

import { NextResponse } from "next/server";

const properties = [
  {
    id:"1",
    slug:"na-plot-gangapur-road",
    title:"Prime NA Plot — Gangapur Road",
    locality:"Gangapur Road",
    price:"₹42 L",
    area:"2000 sqft",
    category:"NA Plot",
    badge:"Featured",
    rera:true,
    img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    views:234
  },

  {
    id:"2",
    slug:"agriculture-land-igatpuri",
    title:"Agriculture Land — Igatpuri",
    locality:"Igatpuri",
    price:"₹85 L",
    area:"3 Acre",
    category:"Agriculture Land",
    badge:"Hot Deal",
    rera:true,
    img:"https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
    views:189
  },

  {
    id:"3",
    slug:"industrial-shed-midc-satpur",
    title:"Industrial Shed — MIDC Satpur",
    locality:"Satpur MIDC",
    price:"₹1.2 Cr",
    area:"5000 sqft",
    category:"Industrial Shed",
    badge:"New",
    rera:false,
    img:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    views:312
  },

  {
    id:"4",
    slug:"commercial-plot-nashik-road",
    title:"Commercial Plot — Nashik Road",
    locality:"Nashik Road",
    price:"₹68 L",
    area:"1800 sqft",
    category:"Commercial",
    badge:null,
    rera:true,
    img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    views:156
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  // const filtered =
  //   !category || category === "All"
  //     ? properties
  //     : properties.filter((p) =>
  //         p.category.toLowerCase().includes(category.toLowerCase())
  //       );

  const filtered =
  !category || category === "All"
    ? properties
    : properties.filter(
        (p) =>
          p.category.trim().toLowerCase() ===
          category.trim().toLowerCase()
      );
  return NextResponse.json(filtered);
}