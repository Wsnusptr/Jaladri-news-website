import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { Role } from "@repo/db";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Izinkan akses ke halaman login dan rute API otentikasi tanpa token
    if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
        return NextResponse.next()
    }

    try {
        const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })
        
        console.log('CMS Middleware - Path:', pathname, 'Token exists:', !!token, 'Role:', token?.role);

        // Jika tidak ada token atau role bukan ADMIN, redirect ke halaman login
        if (!token || token.role !== Role.ADMIN) {
            console.log('CMS Middleware - Access denied, redirecting to login');
            const loginUrl = new URL('/login', request.url)
            loginUrl.searchParams.set('callbackUrl', pathname)
            if (!token) {
                loginUrl.searchParams.set('error', 'Unauthenticated')
            } else {
                loginUrl.searchParams.set('error', 'AccessDenied')
            }
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Error di dalam CMS middleware:', error)
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('error', 'MiddlewareError')
        return NextResponse.redirect(loginUrl)
    }
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
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}