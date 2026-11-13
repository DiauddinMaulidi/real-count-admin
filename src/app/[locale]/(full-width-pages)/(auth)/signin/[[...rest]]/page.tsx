import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default async function SignInPage() {
  // const { locale } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn forceRedirectUrl="/" />
    </div>
  );
}

// import SignInForm from "@/components/auth/SignInForm";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Signin Page TailAdmin Dashboard Template",
// };

// export default function SignIn() {
//   return <SignInForm />;
// }
