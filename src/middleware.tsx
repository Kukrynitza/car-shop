'use server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
// import database from './modules/database'
import verifyJwt from './sorse/verifyJwt'

const adminPages = ['/admin']
const userPages = ['/user', '/user/announcement', '/user/announcement/create']
export async function middleware(request: NextRequest) {
  // await database
  //   .selectFrom('users')
  //   .select('id')
  //   .execute()
  const { pathname } = request.nextUrl
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token && userPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  if (token) {
    const payload = await verifyJwt(token)
    // console.log(payload)
    if (adminPages.includes(pathname) && payload.role === 0) {
      return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    return NextResponse.next()
  }
}
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
