import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/i18n-config";

function getLocale(request: NextRequest): (typeof i18n.locales)[number] {
  const acceptLang = request.headers.get("accept-language");

  if (acceptLang?.toLowerCase().startsWith("ar")) {
    return "ar";
  }

  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname === "/en" ? "/" : pathname.slice(3) || "/";
    redirectUrl.search = search;
    return NextResponse.redirect(redirectUrl);
  }

  if (firstSegment === "ar") {
    return NextResponse.next();
  }

  if (!firstSegment || !i18n.locales.includes(firstSegment as (typeof i18n.locales)[number])) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    rewriteUrl.search = search;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|images|favicon.ico|.*\\..*).*)",
  ],
};