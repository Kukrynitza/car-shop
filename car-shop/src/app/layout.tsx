'use client'
import 'the-new-css-reset'
// eslint-disable-next-line import-x/extensions
import Header from '@/components/Header/Header'
// import Registration from '@/components/Registration/Registration'
// import RegistrationContext from '@/contexts/RegistrationContext'
import { type ReactNode, useContext } from 'react'
import './global.css'
// eslint-disable-next-line import-x/first
import '@fontsource/pt-sans'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // const registration = useContext(RegistrationContext)

  return (
    <html lang="ru">
      <body>
        <Header />
        <main>
          <div></div>
          {children}
          <div></div>
        </main>
        {/* {registration && <Registration/>} */}
      </body>
    </html>
  )
}
