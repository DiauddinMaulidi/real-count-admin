import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const user = await getCurrentUser();

  // Akun Clerk belum terdaftar di PostgreSQL
  if (!user) {
    redirect("/id/signin");
  }

  // Pengalihan berdasarkan role
  if (user.role === "ADMIN") {
    redirect("/id/admin");
  }

  if (user.role === "PETUGAS_TPS") {
    redirect("/petugas");
  }

  redirect("/id/signin");
}
