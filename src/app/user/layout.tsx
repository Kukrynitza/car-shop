'use client'
import 'the-new-css-reset'
import { useState } from 'react'
import Header from '@/components/Header/Header'
import Registration from '@/components/Registration/Registration'
import SignIn from '@/components/SignIn/SignIn'
import UserActions from '@/components/UserActions/UserActions'
import RegistrationContext from '@/contexts/RegistrationContext'
import styles from './user.module.css'
// eslint-disable-next-line import-x/first
import '@fontsource/pt-sans'
// interface RegistrationContextType {
//   registration: boolean;
//   setRegistration: (value: boolean) => void;
// }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <main className={styles.user}>
      <UserActions />
      {children}
    </main>
  )
}
