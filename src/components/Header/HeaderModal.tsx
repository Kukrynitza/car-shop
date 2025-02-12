'use server'

import { cookies } from 'next/headers'

export default async function headerModal() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (token) {
    return true
  }

  return false
}
