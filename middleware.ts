/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoginPage = pathname.startsWith("/login");
  const isAuthRoute = pathname.startsWith("/api/auth");

  // Public routes
  if (isLoginPage || isAuthRoute) {
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Root: send to /dashboard if authed, else /login
  if (pathname === "/") {
    return NextResponse.redirect(new URL(token ? "/dashboard" : "/login", request.url));
  }

  // Protected app routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/agent-monitor")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Optional: enforce role-based access
    const allowedRoles = ["ADMIN", "SUPER_ADMIN", "MANAGEMENT"] as const;
    if (!token.role || !allowedRoles.includes(token.role as any)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  }

  // Everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/api/auth/:path*", "/dashboard/:path*", "/agent-monitor/:path*"],
};

