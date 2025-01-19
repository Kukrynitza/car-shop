'use client'
// import RegistrationContext from '@/contexts/RegistrationContext'
import { useContext, useState } from 'react'
import Registration from '../Registration/Registration'
import styles from './Header.module.css'

export default function Header() {
  const [registration, setRegistration] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <ul>
          <ul>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#F6EEB4" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z">
                </path>
              </svg>
            </li>
            <li>
              <h1 className={styles.logo}>MY_car</h1>
            </li>
            <li>
              <input className={styles.search} type="search" placeholder='Поиск' />
            </li>
          </ul>
          <li className={styles.serves}>
            <ul>
              <a href="https://av.by/news">Новости</a>
              <a href="https://av.by/company">Услуги</a>
            </ul>
          </li>
          <li className={styles.avatar}>
            <button className={styles.avatarButton} onClick={() => setRegistration(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#F6EEB4" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z">\
                </path></svg>
            </button>
          </li>
        </ul>
      </header>
      {registration && <Registration />}
      {/* <RegistrationContext value={registration}/> */}
    </>
  )
}
