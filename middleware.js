import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
    const res = NextResponse.next()

    const pathname = req.nextUrl.pathname;

    if (
        pathname.startsWith("/_next") || // exclude Next.js internals
        pathname.startsWith("/api") || //  exclude all API routes
        pathname.startsWith("/static") || // exclude static files
        pathname.startsWith("/login") ||
        pathname.startsWith("/auth") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return res;
    }

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired - required for Server Components
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
    }
    if (session?.aud === 'authenticated') {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/home`)
    }
    return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}