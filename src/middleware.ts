import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "id"];
const PUBLIC_FILE = /\.(.*)$/;

const getLocale = (headers: Headers) => {
  const languages = new Negotiator({
    headers: { "accept-language": headers.get("accept-language") as string }
  }).languages();
  const defaultLocale = "id";

  return match(languages, locales, defaultLocale);
};

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  }

  const { pathname } = request.nextUrl;
  const locale = getLocale(request.headers);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathname === "/" && locale === "id") {
    return NextResponse.rewrite(new URL("/id", request.url));
  } else if (pathname === "/id" && locale === "id") {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (pathnameHasLocale) return;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: ["/((?!_next).*)", "/"]
};
