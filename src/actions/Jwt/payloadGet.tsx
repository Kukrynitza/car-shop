'use server'
import { cookies } from 'next/headers'
import verifyJwt from '@/sorse/verifyJwt'

export default async function payloadGet() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  return verifyJwt(token)
}
