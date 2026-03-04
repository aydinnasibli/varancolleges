import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const session = await auth()

    // Type assertion to bypass TypeScript check on sessionClaims
    const metadata = (session.sessionClaims?.metadata as { role?: string }) || {}

    // Redirect unauthenticated users or those without the admin role to the home page
    if (!session.userId || metadata.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
