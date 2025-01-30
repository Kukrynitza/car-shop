/* eslint-disable no-nested-ternary */
/* eslint-disable @eslint-react/no-complex-conditional-rendering */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
// import RegistrationContext from '@/contexts/RegistrationContext'
import { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import RegistrationContext from '@/contexts/RegistrationContext'
import styles from './Header.module.css'
import headerModal from './HeaderModal'

export default function Header() {
  const [isUserModal, setUserModal] = useState(false)
  const [isUserSign, setUserSign] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const context = useContext(RegistrationContext)
  const setRegistration = context?.setRegistration
  useEffect(() => {
    async function getToken() {
      if (await headerModal()) {
        setUserSign(true)
      } else {
        setUserSign(false)
      }
    }
    getToken()
  }, [isUserModal])
  if (!setRegistration) {
    throw new Error('setRegistration не доступен в RegistrationContext.')
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserModal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
  }, [])
  console.log(isUserModal)

  return (
    <header className={styles.header}>
      <ul className={styles.ul}>
        <ul className={styles.ulUl}>
          <li className={styles.ulUlLi}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 256 256" fill="#F6EEB4">
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
            </svg>
          </li>
          <li className={styles.logos}>
            <h1 className={styles.logo}>MY_шина</h1>
          </li>
          <li>
            <input type="search" className={styles.search} placeholder="Поиск" />
          </li>
        </ul>
        <li className={styles.serves}>
          <ul>
            <a href="https://av.by/news">Новости</a>
            <a href="https://av.by/company">Услуги</a>
          </ul>
        </li>
        <li className={styles.avatar}>
          <div ref={menuRef} onMouseEnter={() => setUserModal(true)}>
            <button type="button" className={styles.button}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 256 256" fill={isUserSign ? '#F6EEB4' : '#E54D2E'}>
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z">
                  \
                </path>
              </svg>
            </button>
            {isUserModal
              ? isUserSign
                ? (
                    <ul className={styles.userModal}>
                      <li className={styles.mainModalLi}><Link href="/user">Все дейтсвия</Link></li>
                      <li><Link href="/user/announcement/create">Создать объявление</Link></li>
                      <li>Добавить бренд</li>
                      <li className={styles.mainModalLi}>Посмотреть объявления</li>
                      <li><button type="button" className={styles.button} onClick={() => setRegistration(2)}>Другой аккаунт</button></li>
                    </ul>
                  )
                : (
                    <ul className={styles.userModalUnFalse}>
                      <li><button type="button" className={styles.button} onClick={() => setRegistration(1)}>Зарегестрироваться</button></li>
                      <li><button type="button" className={styles.button} onClick={() => setRegistration(2)}>Войти</button></li>
                    </ul>
                  )
              : null}
          </div>
        </li>
      </ul>
    </header>
  )
}
