import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");

  const protectedPaths = ["/dashboard", "/admin"];

  const { pathname } = request.nextUrl;
  if (pathname === "/login" && accessToken) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  if (protectedPaths.includes(pathname) && !refreshToken) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
