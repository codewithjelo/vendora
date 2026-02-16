import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const path = request.nextUrl.pathname;

    if (path.startsWith("/shop") || path.startsWith("/products/")) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/shop/:path*", "/products/:path*"],
};
