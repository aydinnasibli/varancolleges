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
    // Determine locale from Vercel header if present
    const country = req.headers.get('x-vercel-ip-country')
    const preferredLocale = country === 'AZ' ? 'az' : 'en'

    // For root path, explicitly redirect to the preferred locale
    if (req.nextUrl.pathname === '/') {
      const targetUrl = new URL(`/${preferredLocale}`, req.url);
      return NextResponse.redirect(targetUrl);
    }

    const response = intlMiddleware(req);
    return response;
  }
})

export const config = {
  matcher: [
    '/', '/(az|en)/:path*',
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
