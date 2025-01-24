/* eslint-disable @eslint-react/no-complex-conditional-rendering */
'use client'
import { useActionState, useContext, useState } from 'react'
import { minLength, pipe, safeParse, string, trim } from 'valibot'
import InsertUser from '@/actions/Insert/InsertUser'
import RegistrationContext from '@/contexts/RegistrationContext'
import styles from './SignIn.module.css'

// interface RegistrationForm {
//   email?: string
//   login?: string
//   password?: string
// }
interface RegistrationContextType {
  registration: number;
  setRegistration: (value: number) => void;
}
interface InsertUser {
  login: string
  number: string
  password: string
}
const loginSchema = pipe(string(), minLength(5, 'Минимальная длина логина - 5'), trim())
const passwordSchema = pipe(string(), minLength(6, 'Минимальная длина пароля - 6'), trim())

export default function Registration() {
  const context = useContext<RegistrationContextType | null>(RegistrationContext)
  const registration = context?.registration
  const setRegistration = context?.setRegistration
  if (!setRegistration) {
    throw new Error('setRegistration не доступен в RegistrationContext.')
  }
  const [record, setRecord] = useState([false, false, false])
  const [isError, setIsError] = useState<string[]>(['', ''])
  const [
    message, formAction, isPending
  ] = useActionState((_: unknown, formData: FormData) => {
    setIsError(['', ''])
    const passwordError = safeParse(passwordSchema, formData.get('password'))
    if (passwordError.success) {
      const loginError = safeParse(loginSchema, formData.get('login'))
      if (loginError.success) {
        // const insertUser = {
        //   login: formData.get('login'),
        //   password: formData.get('password')
        // }
        // InsertUser(insertUser)
        setRegistration(0)
      } else {
        setIsError([loginError.issues[0].message, '2'])
        setRecord(record.map((element, index) => (index === 2 ? false : element)))
      }
    } else {
      setIsError([passwordError.issues[0].message, '1'])
      setRecord(record.map((element, index) => (index === 1 ? false : element)))
    }

    return {
      login: formData.get('login'),
      password: formData.get('password')
    }
  }, {
    login: '',
    password: ''
  })
  // console.log(isError)

  return (
    <section className={registration === 2 ? styles.modalVisible : styles.modalUnvisible}>
      <button type="button" className={styles.space} onClick={() => setRegistration(0)}><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 256 256" fill="#ffe7b3"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208ZM80,128a8,8,0,0,1,8-8h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88A8,8,0,0,1,80,128Z" /></svg></button>
      <article className={styles.registration}>
        <h1 className={styles.h1}>Вход</h1>
        <form action={formAction} className={styles.form}>
          <label htmlFor="password" className={styles.error}>
            {isError[1] === '1' && !record[1] ? isError[0] : '\u00A0'}
            <input type="password" name="password" id="password" className={record[1] ? styles.passwordSuccess : styles.passwordFailure} defaultValue={typeof message.password === 'string' ? message.password : ''} placeholder="Пароль" onChange={() => setRecord(record.map((element, index) => (index === 1 ? true : element)))} />
          </label>
          <label htmlFor="login" className={styles.error}>
            {isError[1] === '2' && !record[2] ? isError[0] : '\u00A0'}
            <input type="text" name="login" id="login" className={record[2] ? styles.loginSuccess : styles.loginFailure} defaultValue={typeof message.login === 'string' ? message.login : ''} placeholder="Логин" onChange={() => setRecord(record.map((element, index) => (index === 2 ? true : element)))} />
          </label>
          <button
            type="submit"
            className={!record[0] || !record[1] || !record[2]
              ? styles.enterFailure
              : styles.enterSuccess}
            disabled={!record[0] || !record[1] || !record[2] || isPending}
          >
            Войти
          </button>
        </form>
        <div className={styles.registrationDiv}>

          <button
            type="button"
            className={styles.registrationButton}
            onClick={() => setRegistration(1)}
          >
            Зарегестрироваться
          </button>
          <p className={styles.p}> Для тех кто в первый раз на сайте</p>
        </div>

      </article>
    </section>
  )
}
