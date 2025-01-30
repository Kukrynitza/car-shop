'use server'

import { cookies } from 'next/headers'
import Link from 'next/link'
import styles from './Header.module.css'

export default async function headerModal() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (token) {
    return true
  }

  return false
}
