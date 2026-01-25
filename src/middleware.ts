import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isLoginRoute = request.nextUrl.pathname === '/admin/login'
    const isLoggedIn = request.cookies.has('admin_session')

    if (isAdminRoute) {
        if (!isLoggedIn && !isLoginRoute) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        if (isLoggedIn && isLoginRoute) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
