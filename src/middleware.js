import { NextResponse } from "next/server";
import { ACCEPTED_COUNTRY_CODES, ACCEPTED_LANGUAGES } from "./constant";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname === "/apple-app-site-association" ||
    pathname === "/storage/index.html" ||
    pathname === "/test-jsi"
  ) {
    const response = NextResponse.next();

    return response;
  }

  const [countryCode, language] = pathname?.split("/")?.[1]?.split("-");

  if (countryCode && language && !(countryCode === "to" && language === "do")) {
    const isValidCountryCode = ACCEPTED_COUNTRY_CODES?.find((val) => {
      if (val?.code?.toLowerCase() === countryCode?.toLowerCase()) return true;
    });
    const isValidLangauge = ACCEPTED_LANGUAGES?.find((val) => {
      if (val?.code?.toLowerCase() === language?.toLowerCase()) return true;
    });

    if (!isValidCountryCode || !isValidLangauge) {
      request.nextUrl.pathname = `${countryCode}-${language}/not-found`;
      return NextResponse.rewrite(request.nextUrl);
    }
  } else if (countryCode || language) {
    request.nextUrl.pathname = `/##-##${request.nextUrl.pathname}`;
    const response = NextResponse.rewrite(request.nextUrl);
    return response;
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
