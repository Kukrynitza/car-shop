'use server'
import { cookies } from 'next/headers'
import verifyJwt from '@/sorse/verifyJwt'

export default async function payloadGet() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return verifyJwt(token)
  }
}
