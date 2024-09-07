import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { useWhoAmIQuery } from "@/services/auth";

export function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken");

  console.log(accessToken);
  const protectedPaths = ["/dashboard","/admin"];

  const { pathname } = request.nextUrl;
  console.log(pathname);
  if (pathname === "/login" && accessToken) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  // const { data, error, isLoading } = useWhoAmIQuery();
  // if (data?.role === "ADMIN") {
  //   const url = new URL("/admin", request.url);
  //   return NextResponse.redirect(url);
  // }else{
  //   console.log("shit")
  // }

  if (protectedPaths.includes(pathname) && !accessToken) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};


