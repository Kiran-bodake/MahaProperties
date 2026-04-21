import { NextResponse } from "next/server";
import csv from "csvtojson";
import path from "path";
import fs from "fs";

export async function GET(req: Request) {
  try {
    const filePath = path.join(process.cwd(), "data", "properties.csv");

    // ✅ check file
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "CSV file not found" },
        { status: 500 }
      );
    }

    // ✅ read csv
    const jsonArray = await csv().fromFile(filePath);

    // ✅ convert for UI cards
    const properties = jsonArray.map((item: any) => ({
      id: item._id,
      slug: item.slug,
      title: item.title,
      locality: item.locality,
      price: `₹${Number(item.price).toLocaleString()}`,
      area: `${item.area} ${item.areaUnit}`,
      category: item.category,
      badge: item.isFeatured === "true" ? "Featured" : null,
      rera: item.isRERA === "true",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
      views: Number(item.views) || 0,
    }));

    // ✅ filter
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const filtered =
      !category || category === "All"
        ? properties
        : properties.filter(
            (p) =>
              p.category?.toLowerCase() === category.toLowerCase()
          );

    return NextResponse.json(filtered);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "CSV load failed" },
      { status: 500 }
    );
  }
}