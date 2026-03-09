import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/chat(.*)",
  "/dashboard(.*)",
  "/profile(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const response = NextResponse.next();
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;

  if (!cookieLocale) {
    const acceptLang = req.headers.get("accept-language") || "";
    let detectedLocale = "en";

    if (acceptLang.includes("ru")) detectedLocale = "ru";
    else if (acceptLang.includes("de")) detectedLocale = "de";

    response.cookies.set("NEXT_LOCALE", detectedLocale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
