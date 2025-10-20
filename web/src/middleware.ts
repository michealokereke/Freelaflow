import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("freelaflow_refresh")?.value;
  const accessToken = req.cookies.get("freelaflow_access")?.value;

  console.log(`ACCESS : ${accessToken}`);
  console.log(`REFRESH : ${refreshToken}`);

  const isAuthPage = [
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
  ].includes(req.nextUrl.pathname);

  if (isAuthPage && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isAuthPage && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
  ],
};
