import { requireAdmin } from "@/lib/authorization";
import React from "react";
import PetugasLayoutClient from "./PetugasLayoutClient";

export default async function PetugasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Memastikan pengguna memiliki role ADMIN
  await requireAdmin();

  return <PetugasLayoutClient>{children}</PetugasLayoutClient>;
}
