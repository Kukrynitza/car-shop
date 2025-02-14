/* eslint-disable no-param-reassign */
'use client'
import { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import createAnnouncement from '@/actions/Insert/CreateAnnouncement'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import announcementInfo from '@/sorse/announcementInfo'
import styles from './page.module.css'

// interface insertBrand {
//   country: string,
//   name: string
// }
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
  [key: string]: { label: string, value: string }[];
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
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
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
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isBrand, setBrand] = useState<OneInfo>({ label: 'Honda', value: 'Honda' })
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isColor, setColor] = useState<OneInfo>({ label: 'черный', value: 'черный' })
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isDrive, setDrive] = useState<OneInfo>({ label: 'полный', value: 'полный' })
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isFuel, setFuel] = useState<OneInfo>({ label: 'бензин', value: 'бензин' })
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isPlaceOfProduction, setPlaceOfProduction] = useState<OneInfo>({ label: 'Беларусь', value: 'Беларусь' })
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isTransmission, setTransmission] = useState<OneInfo>({ label: 'механика', value: 'механика' })
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isTypeOfEquipment, setTypeOfEquipment] = useState<OneInfo>({ label: 'седан', value: 'седан' })
  const types = [
    { label: 'Машина', value: 'car' },
    { label: 'Мотоцикл', value: 'motorcycle' },
    { label: 'Грузовик', value: 'truck' }
  ]
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isType, setType] = useState<Select>(types[0])
  useEffect(() => {
    async function getEffectInfo() {
      const sortInfo = await announcementInfo(isType.value)
      if (sortInfo) {
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
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getEffectInfo()
  }, [isType])
  const [announcement, setAnnouncement] = useState<Announcement>(
    {
      mileage: null,
      modelName: '',
      power: null,
      price: null,
      text: '',
      volume: null,
      year: null
    }
  )
  const callback = useDebouncedCallback(
    () => {
      const announcementVector = Object.values(announcement)
      const haveNull = announcementVector.some((element) => element === null || element === '')
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setAccess(!haveNull)
    }
    , 500
  )
  useEffect(() => {
    callback()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcement])
  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setMounted(true)
  }, [])
  function handleChange(
    name:string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const { value } = event.target
    setAnnouncement((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const files = (formData.getAll('photo')).filter(
        (entry): entry is File => entry instanceof File
      )
      const err = await createAnnouncement(files, isBrand.value, {
        color: isColor.value,
        drive: isDrive.value,
        fuel: isFuel.value,
        mileage: announcement.mileage,
        modelName: announcement.modelName ?? '',
        placeOfProduction: isPlaceOfProduction.value,
        power: announcement.power,
        price: announcement.price,
        text: announcement.text ?? '',
        transmission: isTransmission.value,
        typeOfEquipment: isTypeOfEquipment.value,
        volume: announcement.volume,
        year: announcement.year
      })
      if (err) {
        setError(err.error)
      } else {
        router.push('/user')
      }
    },
    // eslint-disable-next-line no-undefined
    undefined
  )

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
              setChange={(value) => {
                if (value) {
                  setBrand(value)
                }
              }}
            />
          ) : null}
        </label>
        <label className={styles.modelName}>
          <p>Модель</p>
          <input type="text" value={announcement.modelName ?? ''} placeholder="Модель" onChange={(event) => handleChange('modelName', event)} />
        </label>
        <label className={styles.price}>
          <p>Стоимость, $</p>
          <input type="number" value={announcement.price ?? ''} placeholder="Стоимость" max="9999999" min="0" step="1" onChange={(event) => handleChange('price', event)} />
        </label>
        <label className={styles.year}>
          <p>Год</p>
          <input type="number" value={announcement.year ?? ''} placeholder="Год" max="2100" min="1935" step="1" onChange={(event) => handleChange('year', event)} />

        </label>
        <label className={styles.volume}>
          <p>Объем, л</p>
          <input type="number" value={announcement.volume ?? ''} placeholder="Объем" max="99" min="0" step="0.1" onChange={(event) => handleChange('volume', event)} />

        </label>
        <label className={styles.color}>
          <p>Цвет</p>
          {mounted ? (
            <CustomSelect
              isChange={isColor}
              options={info.color}
              setChange={(value) => {
                if (value) {
                  setColor(value)
                }
              }}
            />
          ) : null}
        </label>
        <label className={styles.type}>
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
        </label>
        <label className={styles.mileage}>
          <p>Пробег, км</p>
          <input type="number" value={announcement.mileage ?? ''} placeholder="Пробег" max="9999999" min="0" step="1" onChange={(event) => handleChange('mileage', event)} />

        </label>
        <label className={styles.drive}>
          <p>Привод</p>
          {mounted ? (
            <CustomSelect
              isChange={isDrive}
              options={info.drive}
              setChange={(value) => {
                if (value) {
                  setDrive(value)
                }
              }}
            />
          ) : null}
        </label>
        <label className={styles.fuel}>
          <p>Топливо</p>
          {mounted ? (
            <CustomSelect
              isChange={isFuel}
              options={info.fuel}
              setChange={(value) => {
                if (value) {
                  setFuel(value)
                }
              }}
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
                  setChange={(value) => {
                    if (value) {
                      setTransmission(value)
                    }
                  }}
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
              setChange={(value) => {
                if (value) {
                  setPlaceOfProduction(value)
                }
              }}
            />
          ) : null}
        </label>
        <label className={styles.power}>
          <p>Мощность, л.с.</p>
          <input type="number" value={announcement.power ?? ''} placeholder="Мощность" max="9999" min="0" step="0.1" onChange={(event) => handleChange('power', event)} />

        </label>
        <label className={styles.typeOfEquipment}>
          <p>Кузов</p>
          {mounted ? (
            <CustomSelect
              isChange={isTypeOfEquipment}
              options={info.typeOfEquipment}
              setChange={(value) => {
                if (value) {
                  setTypeOfEquipment(value)
                }
              }}
            />
          ) : null}
        </label>
        <label className={styles.photo}>
          <p>Фотографии</p>
          <input type="file" name="photo" id="photo" className={styles.photo} placeholder="Фотографии" multiple />
        </label>
        <textarea name="comment" className={styles.text} value={announcement.text ?? ''} placeholder="Текст объявления" wrap="soft" onChange={(event) => handleChange('text', event)} />
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
