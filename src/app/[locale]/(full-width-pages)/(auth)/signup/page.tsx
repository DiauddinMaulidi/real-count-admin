// import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Next.js SignUp Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
};

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        path={`/${locale}/signup`}
        routing="path"
        signInUrl={`/${locale}/signin`}
        forceRedirectUrl="/auth/callback"
      />
    </div>
  );
}

// export default function SignUp() {
//   return <SignUpForm />;
// }
