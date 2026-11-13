import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { isRtl } from "@/i18n/languages";
import { arSA, enUS, idID } from "@clerk/localizations";
import { type Locale, routing } from "@/i18n/routing";
import "flatpickr/dist/flatpickr.css";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import "simplebar-react/dist/simplebar.min.css";
import "swiper/css/bundle";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

const clerkLocalizations: Partial<Record<string, typeof enUS>> = {
  id: idID,
  en: enUS,
  ar: arSA,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <ClerkProvider
      localization={clerkLocalizations[locale]}
      signInUrl="signin"
      signInFallbackRedirectUrl={`/${locale}/`}
      signUpFallbackRedirectUrl={`/${locale}/`}
      afterSignOutUrl="signin"
    >
      <html lang={locale} dir={isRtl(locale as Locale) ? "rtl" : "ltr"}>
        <body className={`${outfit.className} dark:bg-gray-900`}>
          <NextIntlClientProvider>
            <ThemeProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
