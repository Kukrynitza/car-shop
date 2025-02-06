'use client'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { minLength, pipe, safeParse, string, trim } from 'valibot'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import getSortInfo from '@/sorse/sortInfo'
import styles from './page.module.css'

interface insertBrand {
  country: string,
  name: string
}
interface Select {
  label: string
  value: string
}
interface Announcement {
  mileage: number | null
  modelName: string | null
  placeOfProduction: string | null
  power: number | null
  price: number | null
  text: string | null
  volume: number | null
  year: number | null
}
interface Info {
  brandCountry: { label: string, value: string }[]
  color: { label: string, value: string }[]
  drive: { label: string, value: string }[]
  fuel: { label: string, value: string }[]
  modelName: { label: string, value: string }[]
  placeOfProduction: { label: string, value: string }[]
  transmission: { label: string, value: string }[]
  typeOfEquipment: { label: string, value: string }[]
}
const countrySchema = pipe(string(), trim(), minLength(2, 'Минимальная длина страны - 2'))
export default function Page() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [access, setAccess] = useState(false)
  const [countryExist, setCountryExist] = useState(false)
  const [info, setInfo] = useState<Info>({
    brandCountry: [{ label: '', value: '' }],
    color: [{ label: '', value: '' }],
    drive: [{ label: '', value: '' }],
    fuel: [{ label: '', value: '' }],
    modelName: [{ label: '', value: '' }],
    placeOfProduction: [{ label: '', value: '' }],
    transmission: [{ label: '', value: '' }],
    typeOfEquipment: [{ label: '', value: '' }]
  })
  useEffect(() => {
    async function getEffectInfo() {
      const sortInfo = await getSortInfo(false, [])
      const resultInfo = Object
        .entries(sortInfo)
        .map(([key, value]) => ({
          [key]: value
            .map((element) => ({ label: element, value: element }))
        }))
      setInfo(resultInfo)
    }
    getEffectInfo()
  }, [])
  const [announcement, setAnnouncement] = useState<Announcement>(
    {
      mileage: null,
      modelName: null,
      placeOfProduction: null,
      power: null,
      price: null,
      text: null,
      volume: null,
      year: null
    }
  )
  const types = [
    { label: 'Машина', value: 'car' },
    { label: 'Мотоцикл', value: 'motorcycle' },
    { label: 'Грузовик', value: 'truck' }
  ]
  const [isType, setType] = useState<Select>(types[0])

  useEffect(() => {
    const countryParse = safeParse(countrySchema, announcement.placeOfProduction)
    setCountryExist(countryParse.success)
  }, [announcement.placeOfProduction])
  const callback = useDebouncedCallback(
    () => {
      const announcementVector = Object.values(announcement)
      const haveNull = announcementVector.some((element) => element === null || element === '')
      setAccess(!haveNull)
    }
    , 500
  )
  useEffect(() => {
    callback(), 500
  }, [announcement])
  useEffect(() => {
    setMounted(true)
  }, [])
  // const sortInfo = getSortInfo(false, [])
  function handleChange(name:string, event) {
    const { value } = event.target
    setAnnouncement((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const [message,
    formAction,
    isPending] = useActionState(async (_: unknown, formData: FormData) => {
    router.push('/user')
  })
  console.log(info)

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Создание объявления</h1>
      <form action={formAction} className={styles.form}>
        <div className={styles.brand}>
          {mounted ? (
            <CustomSelect
              isChange={isType}
              options={types}
              setChange={setType}
            />
          ) : null}
        </div>
        <label className={styles.modelName}>
          <p>Модель</p>
          <input type="text" value={announcement.modelName} placeholder="Модель" onChange={(event) => handleChange('modelName', event)} />
        </label>
        <label className={styles.price}>
          <p>Стоимость</p>
          <input type="number" value={announcement.price} placeholder="Стоимость" min="0" step="1" onChange={(event) => handleChange('price', event)} />
        </label>
        <label className={styles.year}>
          <p>Год</p>
          <input type="number" value={announcement.year} placeholder="Год" min="1935" step="1" onChange={(event) => handleChange('year', event)} />

        </label>
        <label className={styles.volume}>
          <p>Объем</p>
          <input type="number" value={announcement.volume} placeholder="Объем" min="0" step="0.1" onChange={(event) => handleChange('volume', event)} />

        </label>
        <div className={styles.color}>
          {mounted ? (
            <CustomSelect
              isChange={isType}
              options={types}
              setChange={setType}
            />
          ) : null}
        </div>
        <label className={styles.mileage}>
          <p>Пробег</p>
          <input type="number" value={announcement.mileage} placeholder="Пробег" min="0" step="1" onChange={(event) => handleChange('mileage', event)} />

        </label>
        <div className={styles.drive}>
          {mounted ? (
            <CustomSelect
              isChange={isType}
              options={types}
              setChange={setType}
            />
          ) : null}
        </div>
        <div className={styles.fuel}>
          {mounted ? (
            <CustomSelect
              isChange={isType}
              options={types}
              setChange={setType}
            />
          ) : null}
        </div>
        <div className={styles.transmission}>
          {mounted
            ? (
                <CustomSelect
                  isChange={isType}
                  options={types}
                  setChange={setType}
                />
              )
            : null}
        </div>
        <label className={countryExist
          ? styles.placeOfProductionTry
          : styles.placeOfProductionFalse}
        >
          <p>Страна-производитель</p>
          <input type="text" value={announcement.placeOfProduction} placeholder="Страна-производитель" onChange={(event) => handleChange('placeOfProduction', event)} />

        </label>
        <label className={styles.power}>
          <p>Мощность</p>
          <input type="number" value={announcement.power} placeholder="Мощность" min="0" step="0.1" onChange={(event) => handleChange('power', event)} />

        </label>
        <div className={styles.typeOfEquipment}>
          {mounted ? (
            <CustomSelect
              isChange={isType}
              options={types}
              setChange={setType}
            />
          ) : null}
        </div>
        <input type="file" className={styles.photo} placeholder="Фотографии" />
        <textarea name="comment" className={styles.text} value={announcement.text} placeholder="Текст объявления" wrap="soft" onChange={(event) => handleChange('text', event)} />
        <div className={styles.formDiv}>
          <button
            type="submit"
            className={access && countryExist
              ? styles.enterSuccess
              : styles.enterFailure}
            disabled={!access || !countryExist || isPending}
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  )
}
