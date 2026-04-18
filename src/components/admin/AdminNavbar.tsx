"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Search, Settings, UserCircle2 } from "lucide-react";

const crumbs = {
  "/x-admin": ["Dashboard"],
  "/x-admin/leads": ["Dashboard", "Leads"],
  "/x-admin/deals": ["Dashboard", "Deals"],
  "/x-admin/tasks": ["Dashboard", "Tasks"],
  "/x-admin/properties": ["Dashboard", "Properties"],
};

export function AdminNavbar() {
  const path = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const breadcrumb = useMemo(() => crumbs[path as keyof typeof crumbs] ?? ["Dashboard"], [path]);

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/x-admin/login");
  };

  useEffect(() => {
    if (path === "/x-admin/login") return;
    const checkAuth = async () => {
      const res = await fetch("/api/admin/auth/me");
      if (res.status === 401) {
        const refresh = await fetch("/api/admin/auth/refresh", { method: "POST" });
        if (!refresh.ok) {
          router.push("/x-admin/login");
        }
      }
    };

    checkAuth();
  }, [router, path]);

  if (path === "/x-admin/login") {
    return null;
  }

  const executeGlobalSearch = () => {
    const term = query.trim();
    if (!term) return;
    // redirect to a global search page /x-admin/search?query=...
    router.push(`/x-admin/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="admin-navbar sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 px-6 py-4 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800">Analytics</div>
          <nav className="text-xs text-slate-500">
            {breadcrumb.map((item, idx) => (
              <span key={item} className="inline-flex items-center gap-1">
                {idx > 0 && <span className="text-slate-400">›</span>}
                <span>{item}</span>
              </span>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="relative hidden w-full max-w-md md:block">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && executeGlobalSearch()}
              placeholder="Search leads, deals, customers..."
              className="h-11 w-full rounded-2xl border border-slate-200/70 bg-white px-10 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
            <button
              onClick={executeGlobalSearch}
              className="absolute inset-y-0 left-3 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </div>

          <button className="hidden items-center gap-2 rounded-2xl border border-slate-200/70 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 lg:flex">
            <Settings size={16} /> Preferences
          </button>

          <button className="relative rounded-2xl border border-slate-200/70 bg-white p-2 text-slate-600 shadow-sm transition hover:border-slate-300">
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
          </button>

          <div className="relative">
            <button
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-900 bg-gradient-to-r from-slate-900 to-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-[0_10px_18px_rgba(15,23,42,0.25)]"
              onClick={() => setOpen((v) => !v)}
            >
              <UserCircle2 size={20} /> <span>Admin</span>
            </button>
            {open && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 text-sm shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                <button className="w-full rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-slate-100">Profile</button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-slate-100">Settings</button>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-rose-600 hover:bg-rose-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
