import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

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
