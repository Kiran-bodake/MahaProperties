import type { Metadata } from "next";
export const metadata: Metadata = { title: "Dashboard" };
export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
      <p className="text-gray-400">Stats, recent enquiries, AI logs...</p>
    </div>
  );
}
