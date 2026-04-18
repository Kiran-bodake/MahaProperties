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
    id: 1,
    slug: "prime-na-plot-gangapur-road",
    t: "Prime NA Plot — Gangapur Road",
    loc: "Gangapur Road",
    pr: "₹42 L",
    ar: "2,000 sq.ft",
    cat: "NA Plot",
    badge: "Featured",
    rera: true,
    imgs: [
      "/properties/p1.jpg",
      "/properties/p1-2.jpg"
    ]
  },
  {
    id: 2,
    slug: "agriculture-land-igatpuri",
    t: "Agriculture Land — Igatpuri",
    loc: "Igatpuri",
    pr: "₹85 L",
    ar: "3 Acres",
    cat: "Agriculture",
    badge: "Hot Deal",
    rera: true,
    imgs: [
      "/properties/p2.jpg",
      "/properties/p2-2.jpg"
    ]
  },
  {
    id: 3,
    slug: "commercial-plot-nashik-road",
    t: "Commercial Plot — Nashik Road",
    loc: "Nashik Road",
    pr: "₹68 L",
    ar: "1,800 sq.ft",
    cat: "Commercial",
    badge: "New",
    rera: true,
    imgs: [
      "/properties/p3.jpg"
    ]
  },
  {
    id: 4,
    slug: "warehouse-land-satpur",
    t: "Warehouse Land — Satpur",
    loc: "Satpur",
    pr: "₹1.2 Cr",
    ar: "5,000 sq.ft",
    cat: "Warehouse",
    badge: "",
    rera: false,
    imgs: [
      "/properties/p4.jpg"
    ]
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const filtered =
    !category || category === "All"
      ? properties
      : properties.filter((p) =>
          p.cat.toLowerCase().includes(category.toLowerCase())
        );

  return NextResponse.json(filtered);
}