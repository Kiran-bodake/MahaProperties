import { NextRequest, NextResponse } from "next/server";
import { MOCK_LOCALITIES, MOCK_PROPERTIES, MOCK_KEYWORDS, SuggestionItem } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q")?.toLowerCase() || "";
    const category = request.nextUrl.searchParams.get("category") || "all";

    if (!query || query.length < 1) {
      return NextResponse.json({
        suggestions: [],
        message: "Query too short"
      });
    }

    // Filter based on category
    let results: SuggestionItem[] = [];

    if (category === "all" || category === "locality") {
      const localities = MOCK_LOCALITIES.filter(l =>
        l.name.toLowerCase().includes(query)
      );
      results = [...results, ...localities];
    }

    if (category === "all" || category === "property") {
      const properties = MOCK_PROPERTIES.filter(p =>
        p.name.toLowerCase().includes(query)
      );
      results = [...results, ...properties];
    }

    if (category === "all" || category === "keyword") {
      const keywords = MOCK_KEYWORDS.filter(k =>
        k.name.toLowerCase().includes(query)
      );
      results = [...results, ...keywords];
    }

    // Limit results
    const suggestions = results.slice(0, 10);

    return NextResponse.json({
      success: true,
      query,
      suggestions,
      total: suggestions.length,
    });
  } catch (error) {
    console.error("Search autocomplete error:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions", success: false },
      { status: 500 }
    );
  }
}
