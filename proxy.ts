import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isStudentRoute = createRouteMatcher([
  '/exam/:slug/take(.*)',
  '/en/exam/:slug/take(.*)',
  '/az/exam/:slug/take(.*)',
  '/profile(.*)',
  '/en/profile(.*)',
  '/az/profile(.*)',
  '/payment(.*)',
  '/en/payment(.*)',
  '/az/payment(.*)',
])

const intlMiddleware = createMiddleware(routing)

// 1 year — user's locale preference persists across browser sessions
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export default clerkMiddleware(async (auth, req) => {
  // API routes must pass through untouched — no locale redirect, no auth redirect
  // (Stripe webhooks and other API handlers handle their own auth)
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const reqHeaders = new Headers(req.headers)
  reqHeaders.set('x-pathname', req.nextUrl.pathname)

  // Protect student routes — must be logged in
  if (isStudentRoute(req)) {
    await auth.protect()
  }

  // Protect admin routes — must be logged in AND have admin role
  if (isAdminRoute(req)) {
    await auth.protect()

    const session = await auth()
    if (session.userId) {
      const client = await clerkClient()
      const user = await client.users.getUser(session.userId)
      const role = user.publicMetadata?.role as string | undefined
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
    return NextResponse.next({ request: { headers: reqHeaders } })
  }

  if (!req.nextUrl.pathname.startsWith('/admin')) {
    const hasLocaleCookie = req.cookies.has('NEXT_LOCALE')
    // x-vercel-ip-country is only present in Vercel production/preview deployments.
    // When absent (local dev) we skip geo-detection entirely so the team can
    // test the Azerbaijani version without being redirected.
    const country = req.headers.get('x-vercel-ip-country')

    if (!hasLocaleCookie && country) {
      const preferredLocale = country === 'AZ' ? 'az' : 'en'
      // EN locale lives at /en or /en/... — check precisely so a future
      // route like /enquiry or /enterprise doesn't get treated as EN locale
      const isOnEnPath = req.nextUrl.pathname === '/en' || req.nextUrl.pathname.startsWith('/en/')

      // Non-AZ visitor on an AZ-locale URL → redirect to the /en equivalent.
      // Applies to ALL paths, not just root, so direct links (e.g. /about, /blog/*)
      // also land in the correct language on the first visit.
      if (preferredLocale === 'en' && !isOnEnPath) {
        const enPath = req.nextUrl.pathname === '/'
          ? '/en'
          : `/en${req.nextUrl.pathname}`
        const res = NextResponse.redirect(new URL(enPath, req.url))
        res.cookies.set('NEXT_LOCALE', 'en', { maxAge: LOCALE_COOKIE_MAX_AGE, path: '/' })
        return res
      }

      // Visitor is already on the right locale path — record the preference and continue
      const res = intlMiddleware(req)
      res.headers.set('x-middleware-request-x-pathname', req.nextUrl.pathname)
      res.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
      res.cookies.set('NEXT_LOCALE', preferredLocale, { maxAge: LOCALE_COOKIE_MAX_AGE, path: '/' })
      return res
    }

    const res = intlMiddleware(req)
    res.headers.set('x-middleware-request-x-pathname', req.nextUrl.pathname)
    res.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    return res
  }
})

export const config = {
  matcher: [
    '/', '/(az|en)/:path*',
    // Skip Next.js internals, static files, sitemaps, robots.txt
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|xml|txt)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
