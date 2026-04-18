"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

type Property = { _id: string; title: string; status: string };

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/properties");
      const data = await res.json();
      setProperties(data.properties ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        <h1 className="text-2xl font-semibold">Properties</h1>
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        {loading ? (
          <div className="space-y-3"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
        ) : (
          <ul className="space-y-2">
            {properties.map((property) => (
              <li key={property._id} className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                <div className="font-semibold text-slate-100">{property.title}</div>
                <div className="text-sm text-slate-400">{property.status}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
