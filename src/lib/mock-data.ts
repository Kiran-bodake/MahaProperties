// Mock data for autocomplete suggestions
export const MOCK_LOCALITIES = [
  { id: "1", name: "Gangapur Road", category: "locality", slug: "gangapur-road" },
  { id: "2", name: "Nashik Road", category: "locality", slug: "nashik-road" },
  { id: "3", name: "Meri", category: "locality", slug: "meri" },
  { id: "4", name: "Varavandi", category: "locality", slug: "varavandi" },
  { id: "5", name: "Pathardi Phata", category: "locality", slug: "pathardi-phata" },
  { id: "6", name: "Indira Nagar", category: "locality", slug: "indira-nagar" },
  { id: "7", name: "Igatpuri", category: "locality", slug: "igatpuri" },
  { id: "8", name: "Trimbak Road", category: "locality", slug: "trimbak-road" },
  { id: "9", name: "Dindori Road", category: "locality", slug: "dindori-road" },
  { id: "10", name: "CIDCO", category: "locality", slug: "cidco" },
  { id: "11", name: "Satpur", category: "locality", slug: "satpur" },
  { id: "12", name: "Ambad", category: "locality", slug: "ambad" },
  { id: "13", name: "Panchavati", category: "locality", slug: "panchavati" },
  { id: "14", name: "College Road", category: "locality", slug: "college-road" },
  { id: "15", name: "Sinnar", category: "locality", slug: "sinnar" },
  { id: "16", name: "Ozar", category: "locality", slug: "ozar" },
];

export const MOCK_PROPERTIES = [
  { id: "p1", name: "Green Valley NA Plot - Gangapur Road", category: "property", price: "₹18L - ₹25L", area: "500-1500 sq.ft", slug: "green-valley-na-plot" },
  { id: "p2", name: "Premium Agricultural Land - Meri", category: "property", price: "₹8L - ₹12L", area: "1-5 acres", slug: "premium-agricultural-land" },
  { id: "p3", name: "Warehouse Industrial Space - Nashik Road", category: "property", price: "₹25L - ₹50L", area: "2000-5000 sq.ft", slug: "warehouse-industrial-space" },
  { id: "p4", name: "Collector NA Plot - Pathardi Phata", category: "property", price: "₹15L - ₹22L", area: "400-1200 sq.ft", slug: "collector-na-plot" },
  { id: "p5", name: "Commercial Shop - Ambad MIDC", category: "property", price: "₹12L - ₹18L", area: "300-800 sq.ft", slug: "commercial-shop-ambad" },
  { id: "p6", name: "Investment Plot - Indira Nagar", category: "property", price: "₹10L - ₹16L", area: "600-1200 sq.ft", slug: "investment-plot-indira" },
  { id: "p7", name: "Farmhouse Plot - Igatpuri", category: "property", price: "₹20L - ₹35L", area: "1-2 acres", slug: "farmhouse-igatpuri" },
  { id: "p8", name: "MIDC Industrial Shed - Satpur", category: "property", price: "₹30L - ₹60L", area: "3000-8000 sq.ft", slug: "midc-industrial-shed" },
];

export const MOCK_KEYWORDS = [
  { id: "k1", name: "NA Plots", category: "keyword", icon: "🏞️" },
  { id: "k2", name: "Agricultural Land", category: "keyword", icon: "🌾" },
  { id: "k3", name: "Warehouse", category: "keyword", icon: "🏭" },
  { id: "k4", name: "Commercial Property", category: "keyword", icon: "🏢" },
  { id: "k5", name: "Investment Plots", category: "keyword", icon: "📈" },
  { id: "k6", name: "Collector NA", category: "keyword", icon: "📋" },
  { id: "k7", name: "Farmhouse", category: "keyword", icon: "🏡" },
  { id: "k8", name: "Industrial Shed", category: "keyword", icon: "🏗️" },
  { id: "k9", name: "MIDC Land", category: "keyword", icon: "🏭" },
  { id: "k10", name: "Coworking Space", category: "keyword", icon: "💼" },
];

export type SuggestionItem = 
  | (typeof MOCK_LOCALITIES)[0]
  | (typeof MOCK_PROPERTIES)[0]
  | (typeof MOCK_KEYWORDS)[0];

export const getAllSuggestions = (): SuggestionItem[] => [
  ...MOCK_LOCALITIES,
  ...MOCK_PROPERTIES,
  ...MOCK_KEYWORDS,
];
