import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = cookies().get("refreshToken");
  const accessToken = cookies().get("accessToken");

  const protectedPaths = ["/dashboard", "/admin", "/awe"];

  const { pathname } = request.nextUrl;
  if (protectedPaths.includes(pathname) && !accessToken && !refreshToken) {
    const url = new URL("/login", request.url);
    console.log(protectedPaths);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && (refreshToken || accessToken)) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
