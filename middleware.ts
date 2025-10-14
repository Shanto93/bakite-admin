import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token to check authentication
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Define public routes that don't need authentication
  const isLoginPage = pathname.startsWith("/login");
  const isAuthRoute = pathname.startsWith("/api/auth");

  // Allow access to login and auth routes without authentication
  if (isLoginPage || isAuthRoute) {
    // If user is already authenticated and tries to access login, redirect to dashboard
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/agent-monitor") ||
    pathname.startsWith("/")
  ) {
    // If no token, redirect to login
    if (!token) {
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }

    // Check if user has the required ID (admin check)
    if (token.id === "1") {
      return NextResponse.next();
    }

    // If user doesn't have proper permissions, redirect to unauthorized page
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/",
    "/dashboard/:path*",
    "/agent-monitor/:path*"],
};
