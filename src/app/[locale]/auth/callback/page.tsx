import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const user = await getCurrentUser();
  console.log("[callback] user:", user);
  // Akun Clerk belum terdaftar di PostgreSQL
  if (!user) {
    redirect("/en/signin");
  }

  // Pengalihan berdasarkan role
  if (user.role === "ADMIN") {
    redirect("/en/admin");
  }

  if (user.role === "PETUGAS_TPS") {
    redirect("/petugas");
  }

  redirect("/en/signin");
}
