'use client'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import CreateAnnouncement from '@/actions/Insert/CreateAnnouncement'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import announcementInfo from '@/sorse/announcementInfo'
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
  power: number | null
  price: number | null
  text: string | null
  volume: number | null
  year: number | null
}
interface FullInfo {
  brand: { label: string, value: string }[]
  color: { label: string, value: string }[]
  drive: { label: string, value: string }[]
  fuel: { label: string, value: string }[]
  placeOfProduction: { label: string, value: string }[]
  transmission: { label: string, value: string }[]
  typeOfEquipment: { label: string, value: string }[]
}
interface OneInfo {
  label: string, value: string
}
export default function Page() {
  const router = useRouter()
  const [isError, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const [access, setAccess] = useState(false)
  const [info, setInfo] = useState<FullInfo>({
    brand: [{ label: '', value: '' }],
    color: [{ label: '', value: '' }],
    drive: [{ label: '', value: '' }],
    fuel: [{ label: '', value: '' }],
    placeOfProduction: [{ label: '', value: '' }],
    transmission: [{ label: '', value: '' }],
    typeOfEquipment: [{ label: '', value: '' }]
  })
  const [isBrand, setBrand] = useState<OneInfo>({ label: '', value: '' })
  const [isColor, setColor] = useState<OneInfo>({ label: '', value: '' })
  const [isDrive, setDrive] = useState<OneInfo>({ label: '', value: '' })
  const [isFuel, setFuel] = useState<OneInfo>({ label: '', value: '' })
  const [isPlaceOfProduction, setPlaceOfProduction] = useState<OneInfo>({ label: '', value: '' })
  const [isTransmission, setTransmission] = useState<OneInfo>({ label: '', value: '' })
  const [isTypeOfEquipment, setTypeOfEquipment] = useState<OneInfo>({ label: '', value: '' })
  const types = [
    { label: 'Машина', value: 'car' },
    { label: 'Мотоцикл', value: 'motorcycle' },
    { label: 'Грузовик', value: 'truck' }
  ]
  const [isType, setType] = useState<Select>(types[0])
  useEffect(() => {
    async function getEffectInfo() {
      const sortInfo = await announcementInfo(isType.value)
      const resultInfo = Object.entries(sortInfo).reduce((result, [key, value]) => {
        result[key] = value.map((element) => ({ label: element, value: element }))

        return result
      }, {} as FullInfo)
      setInfo(resultInfo)
      setBrand(resultInfo.brand[0])
      setColor(resultInfo.color[0])
      setDrive(resultInfo.drive[0])
      setFuel(resultInfo.fuel[0])
      setPlaceOfProduction(resultInfo.placeOfProduction[0])
      setTransmission(resultInfo.transmission[0])
      setTypeOfEquipment(resultInfo.typeOfEquipment[0])
    }
    getEffectInfo()
  }, [isType])
  const [announcement, setAnnouncement] = useState<Announcement>(
    {
      mileage: null,
      modelName: null,
      power: null,
      price: null,
      text: null,
      volume: null,
      year: null
    }
  )
  const callback = useDebouncedCallback(
    () => {
      const announcementVector = Object.values(announcement)
      const haveNull = announcementVector.some((element) => element === null || element === '')
      setAccess(!haveNull)
    }
    , 500
  )
  useEffect(() => {
    callback()
  }, [announcement])
  useEffect(() => {
    setMounted(true)
  }, [])
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
    const err = await CreateAnnouncement(formData.getAll('photo'), isBrand.value, {
      color: isColor.value,
      drive: isDrive.value,
      fuel: isFuel.value,
      placeOfProduction: isPlaceOfProduction.value,
      transmission: isTransmission.value,
      typeOfEquipment: isTypeOfEquipment.value,
      ...announcement
    })
    if (err) {
      setError(err.error)
    } else {
      router.push('/user')
    }
  })

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Создание объявления</h1>
      <form action={formAction} className={styles.form}>
        <label className={styles.brand}>
          <p>Бренд</p>
          {mounted ? (
            <CustomSelect
              isChange={isBrand}
              options={info.brand}
              setChange={setBrand}
            />
          ) : null}
        </label>
        <label className={styles.modelName}>
          <p>Модель</p>
          <input type="text" value={announcement.modelName} placeholder="Модель" onChange={(event) => handleChange('modelName', event)} />
        </label>
        <label className={styles.price}>
          <p>Стоимость, $</p>
          <input type="number" value={announcement.price} placeholder="Стоимость" min="0" step="1" onChange={(event) => handleChange('price', event)} />
        </label>
        <label className={styles.year}>
          <p>Год</p>
          <input type="number" value={announcement.year} placeholder="Год" min="1935" step="1" onChange={(event) => handleChange('year', event)} />

        </label>
        <label className={styles.volume}>
          <p>Объем, л</p>
          <input type="number" value={announcement.volume} placeholder="Объем" min="0" step="0.1" onChange={(event) => handleChange('volume', event)} />

        </label>
        <label className={styles.color}>
          <p>Цвет</p>
          {mounted ? (
            <CustomSelect
              isChange={isColor}
              options={info.color}
              setChange={setColor}
            />
          ) : null}
        </label>
        <label className={styles.type}>
          <p>Тип ТС</p>
          {mounted ? (
            <CustomSelect
              isChange={isType}
              options={types}
              setChange={setType}
            />
          ) : null}
        </label>
        <label className={styles.mileage}>
          <p>Пробег, км</p>
          <input type="number" value={announcement.mileage} placeholder="Пробег" min="0" step="1" onChange={(event) => handleChange('mileage', event)} />

        </label>
        <label className={styles.drive}>
          <p>Привод</p>
          {mounted ? (
            <CustomSelect
              isChange={isDrive}
              options={info.drive}
              setChange={setDrive}
            />
          ) : null}
        </label>
        <label className={styles.fuel}>
          <p>Топливо</p>
          {mounted ? (
            <CustomSelect
              isChange={isFuel}
              options={info.fuel}
              setChange={setFuel}
            />
          ) : null}
        </label>
        <label className={styles.transmission}>
          <p>КПП</p>
          {mounted
            ? (
                <CustomSelect
                  isChange={isTransmission}
                  options={info.transmission}
                  setChange={setTransmission}
                />
              )
            : null}
        </label>
        <label className={styles.placeOfProduction}>
          <p>Страна-производитель</p>
          {mounted ? (
            <CustomSelect
              isChange={isPlaceOfProduction}
              options={info.placeOfProduction}
              setChange={setPlaceOfProduction}
            />
          ) : null}
        </label>
        <label className={styles.power}>
          <p>Мощность, л.с.</p>
          <input type="number" value={announcement.power} placeholder="Мощность" min="0" step="0.1" onChange={(event) => handleChange('power', event)} />

        </label>
        <label className={styles.typeOfEquipment}>
          <p>Кузов</p>
          {mounted ? (
            <CustomSelect
              isChange={isTypeOfEquipment}
              options={info.typeOfEquipment}
              setChange={setTypeOfEquipment}
            />
          ) : null}
        </label>
        <label className={styles.photo}>
          <p>Фотографии</p>
          <input type="file" name="photo" id="photo" className={styles.photo} placeholder="Фотографии" multiple />
        </label>
        <textarea name="comment" className={styles.text} value={announcement.text} placeholder="Текст объявления" wrap="soft" onChange={(event) => handleChange('text', event)} />
        <div className={styles.formDiv}>
          {isError && (<p>{isError}</p>)}
          <button
            type="submit"
            className={access && !isPending
              ? styles.enterSuccess
              : styles.enterFailure}
            disabled={!access || isPending}
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  )
}
