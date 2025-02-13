/* eslint-disable @eslint-react/no-complex-conditional-rendering */
'use client'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { minLength, pipe, safeParse, string, trim } from 'valibot'
import insertBrand from '@/actions/Insert/InsertBrand'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import countries from '@/sorse/countries'
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
const nameSchema = pipe(string(), trim(), minLength(3, 'Минимальная длина названия - 3'))
export default function Page() {
  const router = useRouter()
  const [record, setRecord] = useState(false)
  const [isError, setIsError] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const types = [
    { label: 'Машина', value: 'car' },
    { label: 'Мотоцикл', value: 'motorcycle' },
    { label: 'Грузовик', value: 'truck' }
  ]
  const selectCountries = countries.map((element) => ({ label: element, value: element }))
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isCountry, setCountry] = useState<Select>(selectCountries[0])
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isType, setType] = useState<Select>(types[0])
  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setMounted(true)
  }, [])
  // const sortInfo = getSortInfo(false, [])
  const [
    message, formAction, isPending
  ] = useActionState(async (_: unknown, formData: FormData) => {
    setIsError('')
    const nameError = safeParse(nameSchema, formData.get('name'))
    if (nameError.success) {
      const name = nameError.output
      const slug = name.toLowerCase().replace(' ', '-')
      await insertBrand({ country: isCountry.value, name, slug, type: isType.value })
      router.push('/user')
    } else {
      setIsError(nameError.issues[0].message)
      setRecord(false)
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
          {isError && !record ? isError : '\u00A0'}
          <input type="text" name="name" id="name" className={record ? styles.nameSuccess : styles.nameFailure} defaultValue={typeof message.name === 'string' ? message.name : ''} placeholder="Название" onChange={() => setRecord(true)} />
        </label>
        <div className={styles.selectDiv}>
          <p>Страна</p>
          {mounted ? (
            <CustomSelect
              isChange={isCountry}
              options={selectCountries}
              setChange={(value) => {
                if (value) {
                  setCountry(value)
                }
              }}
            />
          ) : null}
        </div>
        <div className={styles.selectDiv}>
          <p>Тип ТС</p>
          {mounted ? (
            <CustomSelect
              isChange={isType}
              options={types}
              setChange={(value) => {
                if (value) {
                  setType(value)
                }
              }}
            />
          ) : null}
        </div>
        <button
          type="submit"
          className={record
            ? styles.enterSuccess
            : styles.enterFailure}
          disabled={!record || isPending}
        >
          Создать
        </button>
      </form>
    </div>
  )
}
