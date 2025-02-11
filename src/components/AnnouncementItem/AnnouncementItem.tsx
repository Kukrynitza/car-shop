'use client'
import { useEffect, useState } from 'react'
import generateSrc from '@/sorse/generateSrc'
import styles from './AnnouncementItem.module.css'

interface AnnouncementItem {
  id: number
  fuel: string
  mileage: number
  modelName: string
  name: string
  path: string[]
  power: number
  text: string
  transmission: string
  typeOfEquipment: string
  volume: number
  year: number
}

export default function AnnouncementItem(props: { announcement: AnnouncementItem }) {
  const [isPathes, setPathes] = useState<string[]>([])
  useEffect(() => {
    function getPath() {
      announcement.path.forEach(async (element) => {
        const p = await generateSrc(element)
        setPathes((preElement) => [...preElement, p])
      })
    }
    getPath()
  }, [announcement.path])
  const { announcement } = props

  // Расчет цены (пример)
  const priceInUSD = Math.round(announcement.power * 100)

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        {/* Секция с изображением */}
        <div className={styles.imageSection}>
          {isPathes
          && (
            <img
              src={isPathes[0]}
              alt={`${announcement.name} ${announcement.modelName}`}
              className={styles.image}
            />
          )}
        </div>
        {/* Секция с информацией */}
        <div className={styles.content}>
          {/* Заголовок и цена */}
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h2 className={styles.title}>
                {announcement.name} {announcement.modelName}
              </h2>
              <div className={styles.vinBadge}>VIN</div>
            </div>
            <div className={styles.priceSection}>
              <div className={styles.price}>{priceInUSD} $</div>
            </div>
          </div>
          {/* Характеристики */}
          <div className={styles.specs}>
            <div className={styles.specsList}>
              <span>{announcement.year} г.</span>
              <span className={styles.dot}>•</span>
              <span>{announcement.transmission}</span>
              <span className={styles.dot}>•</span>
              <span>{announcement.volume}л</span>
              <span className={styles.dot}>•</span>
              <span>{announcement.fuel}</span>
              <span className={styles.dot}>•</span>
              <span>{announcement.typeOfEquipment}</span>
            </div>
            <div className={styles.mileage}>{announcement.mileage.toLocaleString()} км</div>
          </div>
          {/* Описание */}
          <p className={styles.description}>{announcement.text}</p>
        </div>
      </div>
    </div>
  )
}
