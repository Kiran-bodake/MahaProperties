export type PropertyCategory =
  | "agriculture" | "na-plot" | "commercial"
  | "commercial-land" | "industrial-shed" | "warehouse" | "residential";

export type PropertyStatus     = "available" | "sold" | "under-negotiation";
export type ConstructionStatus = "ready" | "under-construction" | "new-launch";
export type PostedBy           = "owner" | "builder" | "dealer";
export type AreaUnit           = "sqft" | "acre" | "gunta" | "sqm" | "hectare";

export interface PropertyImage {
  url: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface Property {
  _id: string;
  title: string;
  slug: string;
  category: PropertyCategory;
  status: PropertyStatus;
  constructionStatus: ConstructionStatus;
  price: number;
  priceMin?: number;
  priceMax?: number;
  pricePerUnit?: number;
  area: number;
  areaUnit: AreaUnit;
  locality: string;
  city: string;
  state: string;
  pincode?: string;
  lat?: number;
  lng?: number;
  description: string;
  images: PropertyImage[];
  highlights: string[];
  amenities: string[];
  isRERA: boolean;
  reraNumber?: string;
  isFeatured: boolean;
  isZeroBrokerage: boolean;
  postedBy: PostedBy;
  agentName: string;
  agentPhone?: string;
  agentId?: string;
  views: number;
  savedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  category?: PropertyCategory;
  locality?: string;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  constructionStatus?: ConstructionStatus;
  postedBy?: PostedBy;
  isRERA?: boolean;
  isZeroBrokerage?: boolean;
  isFeatured?: boolean;
  q?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "popular";
  page?: number;
  limit?: number;
}

export interface PropertyListResponse {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
}
