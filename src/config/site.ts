export const siteConfig = {
  name:        "PropVista",
  tagline:     "Nashik's #1 Property Portal",
  description: "Find NA plots, agriculture land, commercial & industrial properties in Nashik",
  url:         process.env.NEXT_PUBLIC_SITE_URL ?? "https://propvista.in",
  phone:       "+91 98765 43210",
  email:       "hello@propvista.in",
  address:     "Nashik, Maharashtra 422001",
  social: {
    instagram: "https://instagram.com/propvista",
    facebook:  "https://facebook.com/propvista",
    youtube:   "https://youtube.com/@propvista",
    whatsapp:  "https://wa.me/919876543210",
  },
  adminPath: "/x-admin",
} as const;

export const PROPERTY_CATEGORIES = [
  { label: "NA Plots",         slug: "na-plot",        icon: "MapPin",    color: "from-emerald-500 to-green-600",  count: "480+" },
  { label: "Agriculture Land", slug: "agriculture",     icon: "TreePine",  color: "from-lime-500 to-green-500",     count: "120+" },
  { label: "Commercial",       slug: "commercial",      icon: "Building2", color: "from-blue-500 to-indigo-600",    count: "95+"  },
  { label: "Industrial Shed",  slug: "industrial-shed", icon: "Factory",   color: "from-orange-500 to-amber-600",   count: "60+"  },
  { label: "Warehousing",      slug: "warehouse",       icon: "Warehouse", color: "from-purple-500 to-violet-600",  count: "45+"  },
  { label: "Commercial Land",  slug: "commercial-land", icon: "Landmark",  color: "from-rose-500 to-pink-600",      count: "70+"  },
] as const;

export const NASHIK_LOCALITIES = [
  "Nashik Road", "Gangapur Road", "Pathardi Phata", "Indira Nagar",
  "Gangapur", "Ambad", "Satpur", "Cidco", "Panchavati", "Trimbak Road",
  "College Road", "Meri", "Varavandi", "Igatpuri", "Trimbak", "Sinnar",
] as const;

export const SORT_OPTIONS = [
  { label: "Newest First",    value: "newest"     },
  { label: "Price: Low-High", value: "price_asc"  },
  { label: "Price: High-Low", value: "price_desc" },
  { label: "Most Popular",    value: "popular"    },
] as const;
