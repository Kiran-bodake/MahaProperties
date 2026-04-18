"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

const dateOptions = ["today", "tomorrow", "weekly", "monthly", "custom"] as const;

function formatDate(dateString: string) {
  try {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  } catch {
    return dateString;
  }
}

type DateRange = { from: string; to: string };

const emptyState = {
  leads: 0,
  deals: 0,
  tasks: 0,
  featureCards: [] as Array<{ title: string; desc: string }> ,
};


export default function AdminDashboard() {
  const [selected, setSelected] = useState<typeof dateOptions[number]>("today");
  const [range, setRange] = useState<DateRange>({ from: "", to: "" });
  const [stats, setStats] = useState(emptyState);
  const [leads, setLeads] = useState<Array<{ _id: string; source: string; status: string; createdAt: string }>>([]);
  const [loading, setLoading] = useState(true);

  const data = leads;

  const filteredLeads = (() => {
    if (selected === "custom") {
      return data;
    }
    const now = new Date();
    return data.filter((lead) => {
      const date = new Date(lead.createdAt);
      if (selected === "today") return date.toDateString() === now.toDateString();
      if (selected === "tomorrow") {
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        return date.toDateString() === tomorrow.toDateString();
      }
      if (selected === "weekly") {
        const week = new Date(now);
        week.setDate(now.getDate() - 7);
        return date >= week && date <= now;
      }
      if (selected === "monthly") {
        const month = new Date(now);
        month.setMonth(now.getMonth() - 1);
        return date >= month && date <= now;
      }
      return true;
    });
  })();

  useEffect(() => {
    document.title = "Admin Dashboard | MahaProperties";

    async function fetchData() {
      try {
        const [statsRes, leadsRes] = await Promise.all([
          fetch("/api/admin/dashboard"),
          fetch("/api/admin/leads"),
        ]);

        let statsData = { leadsCount: 0, dealsCount: 0, tasksCount: 0, featureCards: [] };
        let leadsData = { leads: [] };

        if (statsRes.ok) {
          try { statsData = await statsRes.json(); } catch (e) { console.warn("stats non-json", e); }
        }

        if (leadsRes.ok) {
          try { leadsData = await leadsRes.json(); } catch (e) { console.warn("leads non-json", e); }
        }

        setStats({
          leads: statsData.leadsCount ?? 0,
          deals: statsData.dealsCount ?? 0,
          tasks: statsData.tasksCount ?? 0,
          featureCards: statsData.featureCards ?? [],
        });

        setLeads(leadsData.leads ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">Analytics</h1>
        <div className="grid gap-4 md:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    );
  }

  const conversionRate = stats.leads > 0 ? Math.round((stats.deals / stats.leads) * 100) : 0;

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Premium insights for leads, deals, and team activity.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Date Filter</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value as typeof dateOptions[number])}
            className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
          >
            {dateOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {selected === "custom" && (
            <div className="flex gap-2">
              <input
                type="date"
                value={range.from}
                onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
                className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-600"
              />
              <input
                type="date"
                value={range.to}
                onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
                className="rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-600"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { name: "Total Leads", value: stats.leads, delta: "+12.4%", accent: "from-indigo-500 to-blue-500", url: "/x-admin/leads" },
          { name: "Active Deals", value: stats.deals, delta: "+8.1%", accent: "from-emerald-500 to-teal-500", url: "/x-admin/deals" },
          { name: "Tasks Due", value: stats.tasks, delta: "-1.6%", accent: "from-amber-500 to-orange-500", url: "/x-admin/tasks" },
          { name: "Conversion", value: `${conversionRate}%`, delta: "+2.3%", accent: "from-slate-700 to-slate-900", url: "/x-admin/deals" },
        ].map((card) => (
          <div key={card.name} className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{card.name}</p>
              <span className={`rounded-full bg-gradient-to-r ${card.accent} px-2 py-1 text-xs font-semibold text-white`}>{card.delta}</span>
            </div>
            <div className="mt-4 text-3xl font-bold text-slate-900">{card.value}</div>
            <a href={card.url} className="mt-2 inline-flex text-xs font-semibold text-slate-500 hover:text-slate-900">View details →</a>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2 rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Revenue & Lead Flow</h2>
            <span className="text-xs font-semibold text-slate-400">Last 12 months</span>
          </div>
          <div className="mt-6 h-64 rounded-2xl bg-[linear-gradient(120deg,rgba(15,23,42,0.05)_0%,rgba(59,130,246,0.15)_45%,rgba(99,102,241,0.2)_100%)] p-6">
            <div className="h-full rounded-2xl border border-white/70 bg-white/70 p-4 text-sm text-slate-500">
              Chart placeholder (plug in chart library).
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
          <h2 className="text-lg font-semibold text-slate-900">Active Users</h2>
          <p className="text-sm text-slate-500">Realtime activity by channel</p>
          <div className="mt-6 space-y-4">
            {[
              { label: "Website", value: 64 },
              { label: "WhatsApp", value: 21 },
              { label: "Calls", value: 14 },
              { label: "Walk-ins", value: 8 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-700" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Top Acquisition Sources</h2>
            <span className="text-xs font-semibold text-slate-400">This week</span>
          </div>
          <div className="mt-5 space-y-4">
            {[
              { name: "Google Ads", value: 42 },
              { name: "Organic Search", value: 28 },
              { name: "Referrals", value: 18 },
              { name: "Walk-ins", value: 12 },
            ].map((source) => (
              <div key={source.name} className="flex items-center justify-between rounded-2xl border border-slate-100/70 bg-slate-50/80 px-4 py-3">
                <p className="text-sm font-medium text-slate-600">{source.name}</p>
                <span className="text-sm font-semibold text-slate-900">{source.value}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
          <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
          <p className="text-sm text-slate-500">Filtered by selected date range</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Source</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="border-t border-slate-100/70">
                    <td className="p-2 font-semibold text-slate-700">{lead._id.slice(-6)}</td>
                    <td className="p-2 text-slate-600">{lead.source}</td>
                    <td className="p-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{lead.status}</span>
                    </td>
                    <td className="p-2 text-slate-500">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLeads.length === 0 && (
              <p className="mt-4 text-sm text-slate-500">No leads found for the selected range.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
