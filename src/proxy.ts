import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/api/auth/send-otp', '/api/auth/verify-otp', '/api/auth/logout', '/api/auth/session'];
// Define static paths to ignore in middleware
const publicPaths = ['/_next', '/favicon.ico', '/public'];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and api routes not related to auth or admin
  if (
    publicPaths.some(path => pathname.startsWith(path)) || 
    (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth') && !pathname.startsWith('/api/admin'))
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth_token')?.value;
  let payload: any = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload: jwtPayload } = await jose.jwtVerify(token, secret);
      payload = jwtPayload;
    } catch (error) {
      // Token is invalid or expired
      console.error('Invalid JWT token:', error);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  if (!payload && !isPublicRoute) {
    // Unauthenticated user trying to access protected route
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (payload) {
    if (isPublicRoute && pathname === '/login') {
      // Authenticated user trying to access login page
      return NextResponse.redirect(new URL(payload.role === 'admin' ? '/admin' : '/', request.url));
    }

    if (isAdminRoute && payload.role !== 'admin') {
      // Non-admin trying to access admin route
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
