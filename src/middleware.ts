import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken");

  const protectedPaths = ["/dashboard","/admin"];

  const { pathname } = request.nextUrl;
  if (pathname === "/login" && accessToken) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }


  if (protectedPaths.includes(pathname) && !accessToken) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};


