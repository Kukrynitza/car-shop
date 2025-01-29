'use server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const userPages = ['/user/announcement/create']
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  if (userPages.includes(pathname) && !session) {
    return NextResponse.redirect(new URL('/'), request.nextUrl)
  }

  return NextResponse.next()
}
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
