import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/chat(.*)",
  "/dashboard(.*)",
  "/profile(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes("/api")) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;

  if (cookieLocale) {
    return NextResponse.next();
  }

  const acceptLang = req.headers.get("accept-language") || "";
  let detectedLocale = "en";
  if (acceptLang.includes("ru")) detectedLocale = "ru";
  else if (acceptLang.includes("de")) detectedLocale = "de";

  const response = NextResponse.next();

  response.cookies.set("NEXT_LOCALE", detectedLocale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
    httpOnly: false,
  });

  return response;
});
