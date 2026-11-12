import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  "/signin/(.*)",
  "/:locale/signin(.*)",
]);

// Route yang tidak perlu diproses next-intl
const isNonIntlRoute = createRouteMatcher([
  "/api(.*)",
  "/trpc(.*)",
  "/__clerk(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isNonIntlRoute(req)) return NextResponse.next();
  if (isProtectedRoute(req)) await auth.protect();
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|\\.well-known|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for Clerk's auto-proxy path
    "/__clerk/:path*",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
