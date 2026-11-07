import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/id/signin");
  }

  if (user.role !== "ADMIN") {
    redirect("/id/signin");
  }

  return user;
}

export async function requirePetugas() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/id/signin");
  }

  if (user.role !== "PETUGAS_TPS") {
    redirect("/id/signin");
  }

  if (!user.tpsId) {
    redirect("/id/signin");
  }

  return user;
}
