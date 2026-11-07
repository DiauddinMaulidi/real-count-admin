import { requireAdmin } from "@/lib/authorization";
import AdminLayoutClient from "./AdminLayoutClient";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Memastikan pengguna memiliki role ADMIN
  await requireAdmin();

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
