"use client";

import { useState } from "react";

export default function AdminSearchPage() {
  const [query] = useState(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("q") ?? "";
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Global Search</h1>
      <p className="text-slate-400">Showing results for <strong>{query}</strong></p>
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-100">
        <p>Feature under development: search across leads, deals, contacts, properties, bookings and customers.</p>
      </div>
    </div>
  );
}
