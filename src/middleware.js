import { NextResponse } from "next/server";
import {
  ACCEPTED_COUNTRY_CODES,
  ACCEPTED_LANGUAGES,
  EXCLUDED_LANGUAGES_AND_COUNTRIES,
} from "./constant";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname === "/apple-app-site-association" ||
    pathname === "/storage/index.html"
  ) {
    const response = NextResponse.next();

    return response;
  }

  const [language, countryCode] = pathname?.split("/")?.[1]?.split("-");

  if (countryCode && language) {
    const isValidCountryCode = ACCEPTED_COUNTRY_CODES?.find((val) => {
      if (val?.code?.toLowerCase() === countryCode?.toLowerCase()) return true;
    });
    const isValidLangauge = ACCEPTED_LANGUAGES?.find((val) => {
      if (val?.code?.toLowerCase() === language?.toLowerCase()) return true;
    });

    const isExcluded = EXCLUDED_LANGUAGES_AND_COUNTRIES?.includes(
      `${language}-${countryCode}`?.toLowerCase()
    );

    if (!isValidCountryCode || !isValidLangauge || isExcluded) {
      request.nextUrl.pathname = `/##-##${request.nextUrl.pathname?.toLowerCase()}`;
      return NextResponse.rewrite(request.nextUrl);
    }
  } else {
    request.nextUrl.pathname = `/##-##${request.nextUrl.pathname?.toLowerCase()}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  request.nextUrl.pathname = request.nextUrl.pathname?.toLowerCase();
  return NextResponse.rewrite(request.nextUrl);
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
