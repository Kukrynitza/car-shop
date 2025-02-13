'use client'
import 'the-new-css-reset'
import UserActions from '@/components/UserActions/UserActions'
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
      <div className={styles.userActionsWrapper}>
        <UserActions />
      </div>
      {children}
    </main>
  )
}
