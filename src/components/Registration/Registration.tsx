'use client'
import { useActionState, useCallback, useContext, useState } from 'react'
import { minLength, parse, pipe, regex, string, trim, unknown } from 'valibot'
import RegistrationContext from '@/contexts/RegistrationContext'
import styles from './Registration.module.css'

interface RegistrationForm {
  email?: string
  login?: string
  password?: string
}
interface RegistrationContextType {
  registration: boolean;
  setRegistration: (value: boolean) => void;
}

const numberShema = pipe(string(), regex(/^\+?[1-9]{1}[0-9]{3,14}$/, 'Некорректный номер телефона'), minLength(9, 'Минимальная длина адреса номера - 9'), trim())
const loginSchema = pipe(string(), minLength(5, 'Минимальная длина логина - 5'), trim())
const passwordSchema = pipe(string(), minLength(6, 'Минимальная длина пароля - 6'), trim())

export default function Registration() {
  const { registration, setRegistration }:RegistrationContextType = useContext(RegistrationContext)
  const [record, setRecord] = useState([false, false, false])
  const [isError, setIsError] = useState<string[]>(['', ''])
  const [status, setStatus] = useState<boolean>(true)
  const [message, formAction, isPending] = useActionState((message, formData) => {
    setIsError(['', ''])
    try {
      parse(numberShema, formData.get('number'))
    } catch (error) {
      setIsError([error.message, '0'])
      setRecord(record.map((element, index) => (index === 0 ? false : element)))
    }
    try {
      parse(passwordSchema, formData.get('password'))
    } catch (error) {
      setIsError([error.message, '1'])
      setRecord(record.map((element, index) => (index === 1 ? false : element)))
    }
    try {
      parse(loginSchema, formData.get('login'))
    } catch (error) {
      setIsError([error.message, '2'])
      setRecord(record.map((element, index) => (index === 2 ? false : element)))
    }

    return {
      login: formData.get('login'),
      number: formData.get('number'),
      password: formData.get('password')
    }
  }, {
    login: '',
    number: '+375',
    password: ''
  })

  return (
    <section className={registration ? styles.modalVisible : styles.modalUnvisible}>
      <div className={styles.space} onClick={() => setRegistration(false)}><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 256 256" fill="#ffe7b3"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208ZM80,128a8,8,0,0,1,8-8h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88A8,8,0,0,1,80,128Z" /></svg></div>
      <article className={styles.registration}>
        <h1 className={styles.h1}>
          {status ? 'Вход'
            : 'Регистрация'}
        </h1>
        <form action={formAction} className={styles.form}>
          <label htmlFor="number" className={styles.error}>
            {isError[1] === '0' && !record[0] ? isError[0] : '\u00A0'}
            <input type="text" name="number" id="number" className={record[0] ? styles.numberSuccess : styles.numberFailure} defaultValue={message.number} placeholder="Мобильный номер" onChange={() => setRecord(record.map((element, index) => (index === 0 ? true : element)))} />
          </label>
          <label htmlFor="password" className={styles.error}>
            {isError[1] === '1' && !record[1] ? isError[0] : '\u00A0'}
            <input type="password" name="password" id="password" className={record[1] ? styles.passwordSuccess : styles.passwordFailure} defaultValue={message.password} placeholder="Пароль" onChange={() => setRecord(record.map((element, index) => (index === 1 ? true : element)))} />
          </label>
          <label htmlFor="login" className={styles.error}>
            {isError[1] === '2' && !record[2] ? isError[0] : '\u00A0'}
            <input type="text" name="login" id="login" className={record[2] ? styles.loginSuccess : styles.loginFailure} defaultValue={message.login} placeholder="Логин" onChange={() => setRecord(record.map((element, index) => (index === 2 ? true : element)))} />
          </label>
          <button
            className={!record[0] || !record[1] || !record[2]
              ? styles.enterFailure
              : styles.enterSuccess}
            disabled={!record[0] || !record[1] || !record[2] || isPending}
          >
            Войти
          </button>
        </form>
        <div className={styles.registrationDiv}>
          {status
            ? (
                <>
                  <button
                    className={styles.registrationButton}
                    onClick={() => setStatus((stat) => !stat)}
                  >
                    Зарегестрироваться
                  </button>
                  <p className={styles.p}> Для тех кто в первый раз на сайте</p>
                </>
              )
            : (
                <button
                  className={styles.registrationButton}
                  onClick={() => setStatus((stat) => !stat)}
                >
                  Войти
                </button>
              )}
        </div>

      </article>
    </section>
  )
}
