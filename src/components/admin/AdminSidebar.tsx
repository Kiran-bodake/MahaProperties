"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, Layers, ListChecks, Search, Users } from "lucide-react";

const items = [
  { href: "/x-admin/dashboard", label: "Analytics", icon: BarChart3 },
  { href: "/x-admin/leads", label: "Leads", icon: Users },
  { href: "/x-admin/deals", label: "Deals", icon: Layers },
  { href: "/x-admin/tasks", label: "Tasks", icon: ListChecks },
  { href: "/x-admin/properties", label: "Properties", icon: Home },
  { href: "/x-admin/search", label: "Global Search", icon: Search },
];

export function AdminSidebar() {
  const pathname = usePathname();

  if (pathname === "/x-admin/login") return null;

  return (
    <aside className="hidden h-screen w-[292px] shrink-0 border-r border-slate-200/70 bg-white/80 px-4 py-6 backdrop-blur-xl lg:block">
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white shadow-[0_10px_24px_rgba(15,23,42,0.25)]">
          MP
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">MahaProperties</p>
          <p className="text-xs text-slate-500">Command Center</p>
        </div>
      </div>

      <div className="mt-10 space-y-2 px-2">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Workspace</p>
        <nav className="space-y-1.5">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/x-admin/dashboard" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-[0_10px_24px_rgba(15,23,42,0.2)]"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-white"
                }`}>
                  <Icon size={18} />
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">AI Insights</p>
        <p className="mt-1 text-xs text-slate-500">Auto-generate daily performance briefs.</p>
        <button className="mt-4 w-full rounded-2xl bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(15,23,42,0.25)] transition hover:translate-y-[-1px] hover:bg-slate-800">
          Generate Report
        </button>
      </div>
    </aside>
  );
}
