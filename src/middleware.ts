import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  const wwwHostname = `www.${hostname.replace(/^www\./, '')}`
  
  // HTTP to HTTPS redirect
  if (process.env.NODE_ENV === 'production' && !request.headers.get('x-forwarded-proto')?.includes('https')) {
    return NextResponse.redirect(
      `https://${wwwHostname}${url.pathname}${url.search}`,
      301
    )
  }
  
  // non-www to www redirect
  if (process.env.NODE_ENV === 'production' && !hostname.startsWith('www.')) {
    return NextResponse.redirect(
      `https://${wwwHostname}${url.pathname}${url.search}`,
      301
    )
  }

  return NextResponse.next()
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 