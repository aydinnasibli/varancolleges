import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

const intlMiddleware = createMiddleware(routing)

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Calling auth.protect() will redirect unauthenticated users to the Clerk sign-in page
    await auth.protect()

    const session = await auth()

    if (session.userId) {
      // Fetch the full user object from Clerk to access public metadata
      const client = await clerkClient()
      const user = await client.users.getUser(session.userId)

      const role = user.publicMetadata?.role as string | undefined

      // Redirect authenticated users without the admin role to the home page
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
    return NextResponse.next()
  }

  // Only apply next-intl middleware for non-admin routes
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    // Provide default Vercel IP-based redirection on the root path
    // ONLY if the request isn't already asking for a specific locale in cookies
    if (req.nextUrl.pathname === '/') {
      const hasLocaleCookie = req.cookies.has('NEXT_LOCALE');

      if (!hasLocaleCookie) {
        const country = req.headers.get('x-vercel-ip-country');
        const preferredLocale = country === 'AZ' ? 'az' : 'en';

        const targetUrl = new URL(`/${preferredLocale}`, req.url);
        const res = NextResponse.redirect(targetUrl);
        // Make sure cookie is set so future visits remember it!
        res.cookies.set('NEXT_LOCALE', preferredLocale);
        return res;
      }
    }

    return intlMiddleware(req);
  }
})

export const config = {
  matcher: [
    '/', '/(az|en)/:path*',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
