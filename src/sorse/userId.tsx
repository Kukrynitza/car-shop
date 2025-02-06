'use server'

import { cookies } from 'next/headers'
import verifyJwt from './verifyJwt'

export default async function userId() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const payload = await verifyJwt(token)

  return payload.id
}
