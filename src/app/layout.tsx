'use client'
import 'the-new-css-reset'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header/Header'
import Registration from '@/components/Registration/Registration'
import SignIn from '@/components/SignIn/SignIn'
import './global.css'
// eslint-disable-next-line import-x/first
import '@fontsource/pt-sans'
import RegistrationContext from '@/contexts/RegistrationContext'
// interface RegistrationContextType {
//   registration: boolean;
//   setRegistration: (value: boolean) => void;
// }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // const registration = useContext(RegistrationContext)
  const [registration, setRegistration] = useState(0)
  const pathname = usePathname()
  const userPathname = ['/user', '/user/announcement', '/user/announcement/create', '/user/announcement/create/brand']

  return (
    <html lang="ru">
      <body>
        <RegistrationContext value={{ registration, setRegistration }}>
          <Header />
          <Registration />
          <SignIn />
          {userPathname.includes(pathname)
            ? children
            : (
                <main>
                  <div />
                  {children}
                  <div />
                </main>
              )}
        </RegistrationContext>
      </body>
    </html>
  )
}
