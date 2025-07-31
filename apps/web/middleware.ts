// apps/web/middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for API routes and static files
  if (path.startsWith('/api/') || path.startsWith('/_next/') || path.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  // Tambahkan pengecekan ini untuk debugging di Vercel
  if (!process.env.AUTH_SECRET) {
    console.error("Kesalahan Kritis: AUTH_SECRET tidak diatur. Middleware tidak dapat memvalidasi JWT.");
    // Redirect ke halaman login dengan pesan error untuk menghindari loop tanpa akhir
    return NextResponse.redirect(new URL("/login?error=MiddlewareConfiguration", request.url));
  }

  try {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    console.log('Web Middleware token for path:', path, 'token exists:', !!token, 'role:', token?.role);

    // If user is not logged in, redirect to login page
    if (!token) {
      console.log('Web Middleware - User not authenticated, redirecting to login');
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    // For authenticated users, allow access to protected routes
    console.log('Web Middleware - User authenticated, allowing access to:', path);
    return NextResponse.next();
  } catch (error) {
    console.error('Error di dalam web middleware:', error);
    // On error, redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    loginUrl.searchParams.set('error', 'MiddlewareError');
    return NextResponse.redirect(loginUrl);
  }
}

// Protect specific routes
export const config = {
  matcher: [
    '/profile/:path*',
    '/settings/:path*',
    '/kirim-tulisan/:path*',

  ],
};
