import { redirect } from "next/navigation";

export default function XAdminRoot() {
  redirect("/x-admin/login");
}
