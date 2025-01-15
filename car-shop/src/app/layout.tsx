import 'the-new-css-reset'
// eslint-disable-next-line import-x/extensions
import Header from '@/components/Header/Header'
import type { ReactNode } from 'react'
import './global.css'
// eslint-disable-next-line import-x/first
import '@fontsource/pt-sans'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
