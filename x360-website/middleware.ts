import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname.startsWith("/ar/") || pathname === "/ar") {
    response.headers.set("x-lang", "ar");
    response.headers.set("x-dir", "rtl");
  } else {
    response.headers.set("x-lang", "en");
    response.headers.set("x-dir", "ltr");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|apple-icon|icon|opengraph|cursor|sitemap|robots).*)",
  ],
};
