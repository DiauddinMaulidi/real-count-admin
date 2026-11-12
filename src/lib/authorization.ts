import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/en/signin");
  }

  if (user.role !== "ADMIN") {
    redirect("/en/signin");
  }

  return user;
}

export async function requirePetugas() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/en/signin");
  }

  if (user.role !== "PETUGAS_TPS") {
    redirect("/en/signin");
  }

  if (!user.tpsId) {
    redirect("/en/signin");
  }

  return user;
}
