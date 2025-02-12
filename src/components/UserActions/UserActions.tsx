'use client'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import SelectRole from '@/actions/Select/SelectRole'
import RegistrationContext from '@/contexts/RegistrationContext'
import userId from '@/sorse/userId'
import styles from './UserActions.module.css'

export default function UserActions() {
  const context = useContext(RegistrationContext)
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [haveAccessRights, isHaveAccessRights] = useState(false)
  const setRegistration = context?.setRegistration
  const registration = context?.registration
  useEffect(() => {
    async function getToken() {
      const id = await userId()
      isHaveAccessRights(await SelectRole(id))
    }
    getToken()
  }, [registration])

  return (
    <article className={styles.userModal}>
      <span className={styles.returnToMain}>
        <Link href="/" className={styles.returnLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 256 256" fill="#f1d3e8"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208ZM82.34,133.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168a8,8,0,0,1,0,16H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32Z" /></svg>
          <span className={styles.returnText}>Вернуться в меню</span>
        </Link>
      </span>
      <div className={styles.div}>
        <p className={styles.p}><Link href="/user/">Все дейтсвия</Link></p>
        <ul className={styles.ul}>
          <li><Link href="/user/announcement/create">Создать объявление</Link></li>
          {haveAccessRights
            ? (<li><Link href="/user/announcement/create/brand">Создать бренд</Link></li>)
            : null}
          <li><Link href="/user/">Посмотреть объявления</Link></li>

        </ul>
      </div>
      <button type="button" className={styles.newAccount} onClick={() => setRegistration(2)}>Сменить аккаунт</button>
    </article>
  )
}
