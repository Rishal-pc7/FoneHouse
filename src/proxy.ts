// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Define routes that require authentication
const protectedRoutes = ["/profile", "/admin"]

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname.startsWith(route)
  )
    
  // If the user is trying to access a protected route and is NOT logged in
  if (isProtectedRoute && !isLoggedIn) {
    // Redirect them to the login page, appending the page they tried to visit as a callback URL
    const loginUrl = new URL("/login", req.nextUrl)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}