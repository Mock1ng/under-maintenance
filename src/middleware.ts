import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "id"];

const getLocale = (headers: Headers) => {
  const languages = new Negotiator({
    headers: { "accept-language": headers.get("accept-language") as string }
  }).languages();
  const defaultLocale = "id";

  return match(languages, locales, defaultLocale);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocale(request.headers);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale && pathname !== `/id`) return;
  if (pathname === "/id") {
    return NextResponse.redirect(new URL(`/`, request.nextUrl));
  }
  if (locale === "id") {
    request.nextUrl.pathname = "/";
    return NextResponse.rewrite(new URL(`/id`, request.nextUrl));
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|icon.png).*)"]
};
