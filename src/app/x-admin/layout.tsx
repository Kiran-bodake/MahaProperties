import type { Metadata } from "next";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "x-admin | MahaProperties",
  description: "Admin panel for MahaProperties",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="x-admin-root min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminNavbar />
          <main className="flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
