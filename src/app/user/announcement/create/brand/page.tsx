'use client'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { minLength, pipe, safeParse, string, trim } from 'valibot'
import insertBrand from '@/actions/Insert/InsertBrand'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
// import getSortInfo from '@/sorse/sortInfo'
import styles from './page.module.css'

interface insertBrand {
  country: string,
  name: string
}
interface Select {
  label: string
  value: string
}
const nameSchema = pipe(string(), trim(), minLength(2, 'Минимальная длина названия - 2'))
const countrySchema = pipe(string(), trim(), minLength(2, 'Минимальная длина страны - 2'))
export default function Page() {
  const router = useRouter()
  const [record, setRecord] = useState([false, false])
  const [isError, setIsError] = useState<string[]>(['', ''])
  const [mounted, setMounted] = useState(false)
  const types = [
    { label: 'Машина', value: 'car' },
    { label: 'Мотоцикл', value: 'motorcycle' },
    { label: 'Грузовик', value: 'truck' }
  ]
  const [isType, setType] = useState<Select>(types[0])
  useEffect(() => {
    setMounted(true)
  }, [])
  // const sortInfo = getSortInfo(false, [])
  const [
    message, formAction, isPending
  ] = useActionState(async (_: unknown, formData: FormData) => {
    setIsError(['', ''])
    const nameError = safeParse(nameSchema, formData.get('name'))
    if (nameError.success) {
      const countryError = safeParse(countrySchema, formData.get('country'))
      if (countryError.success) {
        const name = nameError.output
        const slug = name.toLowerCase().replace(' ', '-')
        const country = countryError.output
        await insertBrand({ country, name, slug, type: isType.value })
        router.push('/user')
      } else {
        setIsError([countryError.issues[0].message, '1'])
        setRecord(record.map((element, index) => (index === 1 ? false : element)))
      }
    } else {
      setIsError([nameError.issues[0].message, '0'])
      setRecord(record.map((element, index) => (index === 0 ? false : element)))
    }

    return {
      country: formData.get('country'),
      name: formData.get('name')
    }
  }, {
    country: '',
    name: ''
  })

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Создание бренда</h1>
      <form action={formAction} className={styles.form}>
        <label htmlFor="password" className={styles.error}>
          {isError[1] === '0' && !record[0] ? isError[0] : '\u00A0'}
          <input type="text" name="name" id="name" className={record[0] ? styles.nameSuccess : styles.nameFailure} defaultValue={typeof message.name === 'string' ? message.name : ''} placeholder="Название" onChange={() => setRecord(record.map((element, index) => (index === 0 ? true : element)))} />
        </label>
        <label htmlFor="password" className={styles.error}>
          {isError[1] === '1' && !record[1] ? isError[0] : '\u00A0'}
          <input type="text" name="country" id="country" className={record[1] ? styles.countrySuccess : styles.countryFailure} defaultValue={typeof message.country === 'string' ? message.country : ''} placeholder="Страна" onChange={() => setRecord(record.map((element, index) => (index === 1 ? true : element)))} />
        </label>
        <div className={styles.selectDiv}>
          {mounted ? (
            <CustomSelect
              isChange={isType}
              options={types}
              setChange={setType}
            />
          ) : null}
        </div>
        <button
          type="submit"
          className={!record[0] || !record[1]
            ? styles.enterFailure
            : styles.enterSuccess}
          disabled={!record[0] || !record[1] || isPending}
        >
          Создать
        </button>
      </form>
    </div>
  )
}
