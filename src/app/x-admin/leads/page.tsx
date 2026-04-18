"use client";

import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

type Lead = { _id: string; name: string; source: string; status: string; createdAt: string; contact?: string };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        const response = await fetch("/api/admin/leads");
        const data = await response.json();
        setLeads(data.leads ?? []);
        setLoading(false);
      })();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return leads;
    return leads.filter((lead) => lead.name.toLowerCase().includes(term) || lead.source.toLowerCase().includes(term) || (lead.contact ?? "").toLowerCase().includes(term));
  }, [leads, query]);

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <p className="text-sm text-slate-400">Search and move leads through stages with full controls.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads..."
            className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-cyan-400 outline-none"
          />
          <span className="rounded-lg bg-sky-500/20 px-2 py-1 text-xs text-sky-300">{filtered.length} leads found</span>
        </div>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        <div className="mb-3 flex gap-2">
          {["New", "Contacted", "Negotiation", "Closed"].map((status) => (
            <button key={status} className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700">
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-10 rounded-lg" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-slate-400"> 
                <tr>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Name</th>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Contact</th>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Source</th>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Status</th>
                  <th className="border-b border-slate-700 px-2 py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-800">
                    <td className="px-2 py-2">{lead.name}</td>
                    <td className="px-2 py-2">{lead.contact ?? "-"}</td>
                    <td className="px-2 py-2">{lead.source}</td>
                    <td className="px-2 py-2">{lead.status}</td>
                    <td className="px-2 py-2">{new Date(lead.createdAt).toLocaleDateString()}</td>
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
