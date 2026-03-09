// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Define routes that require authentication
const protectedRoutes = ["/profile", "/admin"]

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role;
    const { pathname } = req.nextUrl;

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        if (pathname.startsWith("/admin")) {
            // Must be logged in AND have ADMIN role. Allow access to the admin login page itself.
            if (pathname !== "/admin/login" && (!isLoggedIn || userRole !== "ADMIN")) {
                const loginUrl = new URL("/admin/login", req.nextUrl);
                loginUrl.searchParams.set("callbackUrl", pathname);
                return NextResponse.redirect(loginUrl);
            }
        } else if (pathname.startsWith("/profile")) {
            // Must be logged in
            if (!isLoggedIn) {
                const loginUrl = new URL("/login", req.nextUrl);
                loginUrl.searchParams.set("callbackUrl", pathname);
                return NextResponse.redirect(loginUrl);
            }
        }
    }

    return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}