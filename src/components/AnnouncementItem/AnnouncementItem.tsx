'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import generateSrc from '@/sorse/generateSrc'
import styles from './AnnouncementItem.module.css'

interface Announcement {
  id: number
  fuel: string
  login: string
  mileage: number
  modelName: string
  name: string
  path: string[]
  power: number
  price: number
  text: string
  transmission: string
  typeOfEquipment: string
  volume: number
  year: number

}

interface AnnouncementProps {
  announcement: Announcement
}

export default function AnnouncementItem({ announcement }: AnnouncementProps) {
  const carousel = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isPathes, setPathes] = useState<string[]>([])
  const [carouselIndex, setCarouselIndex] = useState(0)
  useEffect(() => {
    async function getPath() {
      const paths = await Promise.all(
        announcement.path.map(async (element) => generateSrc(element))
      )
      setPathes(paths)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getPath()
  }, [announcement.path])
  function scroll(action:boolean) {
    const elements = carousel.current?.children
    if (elements?.length) {
      if (action) {
        const nextCarouseIndex = carouselIndex === elements.length - 1
          ? 0
          : carouselIndex + 1
        setCarouselIndex(nextCarouseIndex)
        elements[nextCarouseIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        })
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      } else if (!action) {
        const nextCarouseIndex = carouselIndex === 0
          ? elements.length - 1
          : carouselIndex - 1
        setCarouselIndex(nextCarouseIndex)
        elements[nextCarouseIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        })
      }
    }
  }
  const volume = Math.round(announcement.volume * 100) / 100
  const power = Math.round(announcement.power)

  return (
    <ul className={styles.card}>
      <ul className={styles.mainInfo}>
        <li className={styles.li}>
          {isPathes.length > 1
          && (
            <>
              <button type="button" className={styles.buttonLeft} onClick={() => scroll(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 256 256" fill="#f6eeb4"><path d="M208,72H128V32a8,8,0,0,0-13.66-5.66l-96,96a8,8,0,0,0,0,11.32l96,96A8,8,0,0,0,128,224V184h80a16,16,0,0,0,16-16V88A16,16,0,0,0,208,72Zm0,96H120a8,8,0,0,0-8,8v28.69L35.31,128,112,51.31V80a8,8,0,0,0,8,8h88Z" /></svg>
              </button>
              <button type="button" className={styles.buttonRight} onClick={() => scroll(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 256 256" fill="#f6eeb4"><path d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H48A16,16,0,0,0,32,88v80a16,16,0,0,0,16,16h80v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H48V88h88a8,8,0,0,0,8-8V51.31L220.69,128Z" /></svg>
              </button>
            </>
          )}
          <div ref={carousel} className={styles.photo}>
            {isPathes.map((element) => (
              <span key={element}>
                <img src={element} alt={announcement.modelName} />
              </span>
            ))}
          </div>
        </li>
        <li className={styles.announcementName}>
          <Link href={`/${announcement.id}`} className={styles.link}>{announcement.name} {announcement.modelName}</Link>
        </li>
        <li className={styles.cartInfo}>
          <span>{announcement.year}</span>
          <span>
            <p>{announcement.transmission},</p>
            <p>{volume}л.({power} л.с.)</p>
            <p>{announcement.fuel}</p>

          </span>
          <span>
            {announcement.typeOfEquipment}
          </span>
          <span>
            {announcement.mileage}
          </span>
        </li>
        <li className={styles.price}>
          <p>{announcement.price}$</p>
        </li>
      </ul>
      <li className={styles.text}>{announcement.text}</li>
      <li className={styles.login}>{announcement.login}</li>
    </ul>

  )
}
