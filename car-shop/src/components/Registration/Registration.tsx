'use client'
import { useActionState, useState } from 'react'
import { minLength, parse, pipe, regex, string, trim, unknown } from 'valibot'
import styles from './Registration.module.css'

interface RegistrationForm {
  email?: string
  login?: string
  password?: string
}

const numberShema = pipe(string(), regex(/^\+?[1-9]{1}[0-9]{3,14}$/, 'Некорректный номер телефона'), minLength(9, 'Минимальная длина адреса номера - 9'), trim())
const loginSchema = pipe(string(), minLength(5, 'Минимальная длина логина - 5'), trim())
const passwordSchema = pipe(string(), minLength(6, 'Минимальная длина пароля - 6'), trim())

export default function Registration() {
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
    <section className={styles.modal}>
      <div className={styles.space}></div>
      <article className={styles.registration}>
        <h1 className={styles.h1}>{ status ? 'Вход'
          : 'Регистрация'}</h1>
        <form action={formAction} className={styles.form}>
          <label htmlFor="number" className={styles.error}>{isError[1] === '0' && !record[0] && isError[0] }
            <input onChange={() => setRecord(record.map((element, index) => (index === 0 ? true : element)))} className={ record[0] ? styles.numberSuccess : styles.numberFailure} id="number" name="number" type="text" defaultValue={message.number} placeholder="Мобильный номер" /></label>
          <label htmlFor="password" className={styles.error}>{isError[1] === '1' && !record[1] && isError[0] }
            <input onChange={() => setRecord(record.map((element, index) => (index === 1 ? true : element)))} className={ record[1] ? styles.passwordSuccess : styles.passwordFailure} id="password" name="password" type="password" defaultValue={message.password} placeholder="Пароль" /></label>
          <label htmlFor="login" className={styles.error}>{isError[1] === '2' && !record[2] && isError[0] }
            <input onChange={() => setRecord(record.map((element, index) => (index === 2 ? true : element)))} className={record[2] ? styles.loginSuccess : styles.loginFailure} id="login" name="login" type='text' defaultValue={message.login} placeholder='Логин'/></label>
          <button disabled={!record[0] || !record[1] || !record[2] || isPending} className={
            !record[0] || !record[1] || !record[2]
              ? styles.enterFailure
              : styles.enterSuccess}>Войти</button>
        </form>
        <div className={styles.registrationDiv}>
          {status
            ? (<><button className={styles.registrationButton}
                onClick={() => setStatus((stat) => !stat)}>
              Зарегестрироваться
              </button>
              <p className={styles.p}> Для тех кто в первый раз на сайте</p></>)
            : <button className={styles.registrationButton}
                onClick={() => setStatus((stat) => !stat)}>
              Войти
              </button>}
        </div>

      </article>
    </section>
  )
}
