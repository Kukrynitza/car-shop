'use client'
import 'the-new-css-reset'
import { Suspense, useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header/Header'
import Registration from '@/components/Registration/Registration'
import SignIn from '@/components/SignIn/SignIn'
import RegistrationContext from '@/contexts/RegistrationContext'
import './global.css'
// eslint-disable-next-line import-x/first
import '@fontsource/pt-sans'
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
                  <Suspense fallback={<div>Loading...</div>}>
                    {children}
                  </Suspense>
                  <div />
                </main>
              )}
        </RegistrationContext>
      </body>
    </html>
  )
}
