"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

type Deal = { _id: string; title: string; value: number; status: string; updatedAt: string };

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/deals");
      const json = await res.json();
      setDeals(json.deals ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        <h1 className="text-2xl font-semibold">Deals</h1>
        <p className="text-sm text-slate-400">Manage deal pipeline and move objects through stages.</p>
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        {loading ? (
          <div className="space-y-3"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Title</th>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Value</th>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Status</th>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Updated</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr key={deal._id} className="hover:bg-slate-800">
                    <td className="px-2 py-2">{deal.title}</td>
                    <td className="px-2 py-2">₹{deal.value.toLocaleString()}</td>
                    <td className="px-2 py-2">{deal.status}</td>
                    <td className="px-2 py-2">{new Date(deal.updatedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
