import { NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {i18n} from "./i18n-config";

// Get the preferred locale, similar to above or using a library
function getLocale(request) {
  const negotiatorHeaders = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return matchLocale(languages, i18n.locales, i18n.defaultLocale)
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|sitemap.xml|robots.txt).*)']
}