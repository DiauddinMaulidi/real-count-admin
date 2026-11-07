import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        path={`/${locale}/signin`}
        routing="path"
        signUpUrl={`/${locale}/signup`}
        forceRedirectUrl="/auth/callback"
      />
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
