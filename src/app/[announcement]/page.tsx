'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import selectOneAnnouncement from '@/actions/Select/selectOneAnnouncement'
import generateSrc from '@/sorse/generateSrc'
import styles from './page.module.css'

interface Announcement {
  color: string,
  drive: string,
  fuel: string,
  login: string,
  mileage: number,
  modelName: string,
  name: string,
  number: string
  path: string[],
  placeOfProduction: string,
  power: number,
  price: number,
  text: string,
  transmission: string,
  type: string,
  typeOfEquipment: string,
  volume: number,
  year: number,
}
export default function Page() {
  const { announcement } = useParams()
  const [announcementInfo, setAnnouncementInfo] = useState<Announcement>()
  const carousel = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isPathes, setPathes] = useState<string[]>([])
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isExist, setExist] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  useEffect(() => {
    async function getAnnouncementInfo() {
      const anns = await selectOneAnnouncement(Number(announcement))
      setAnnouncementInfo(anns[0])
      setExist(true)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAnnouncementInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    async function getPath() {
      if (announcementInfo) {
        const paths = await Promise.all(
          announcementInfo.path.map(async (element) => generateSrc(element))
        )
        setPathes(paths)
      }
    }
    if (isExist) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getPath()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExist])
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

  return (
    <div className={styles.cardAndText}>
      <Link href="/" className={styles.link}>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 256 256" fill="#f1d3e8"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208ZM82.34,133.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168a8,8,0,0,1,0,16H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32Z" /></svg>
        <span className={styles.returnText}>Вернуться в меню</span>
      </Link>
      {announcementInfo
      && (
        <>
          <ul className={styles.card}>
            <li className={styles.photo}>
              <li className={styles.li}>
                {isPathes.length > 1
                && (
                  <>
                    <button type="button" className={styles.buttonLeft} onClick={() => scroll(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="57" height="37" viewBox="0 0 256 256" fill="#f6eeb4"><path d="M208,72H128V32a8,8,0,0,0-13.66-5.66l-96,96a8,8,0,0,0,0,11.32l96,96A8,8,0,0,0,128,224V184h80a16,16,0,0,0,16-16V88A16,16,0,0,0,208,72Zm0,96H120a8,8,0,0,0-8,8v28.69L35.31,128,112,51.31V80a8,8,0,0,0,8,8h88Z" /></svg>
                    </button>
                    <button type="button" className={styles.buttonRight} onClick={() => scroll(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 256 256" fill="#f6eeb4"><path d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H48A16,16,0,0,0,32,88v80a16,16,0,0,0,16,16h80v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H48V88h88a8,8,0,0,0,8-8V51.31L220.69,128Z" /></svg>
                    </button>
                  </>
                )}
                <div ref={carousel} className={styles.photo}>
                  {isPathes.map((element) => (
                    <span key={element}>
                      <img src={element} alt={announcementInfo.modelName} />
                    </span>
                  ))}
                </div>
              </li>
            </li>
            <ul className={styles.infoBlock}>
              <li className={styles.name}>
                <span>{announcementInfo.name}</span> <span>{announcementInfo.modelName}</span>
              </li>
              <div className={styles.div}>
                <div className={styles.key}>
                  <li>Стоимость:</li>
                  <li>Цвет:</li>
                  <li>Привод:</li>
                  <li>Топливо:</li>
                  <li>Объем:</li>
                  <li>Пробег:</li>
                  <li>Произведенено в:</li>
                  <li>Мощность:</li>
                  <li>Коробка передач</li>
                  <li>Кузов:</li>
                  <li>Год:</li>
                  <li>Логин:</li>
                  <li>Номер:</li>
                </div>
                <div className={styles.value}>
                  <li>{announcementInfo.price}$</li>
                  <li>{announcementInfo.color}</li>
                  <li>{announcementInfo.drive}</li>
                  <li>{announcementInfo.fuel}</li>
                  <li>{announcementInfo.volume}л.</li>
                  <li>{announcementInfo.mileage}км</li>
                  <li>{announcementInfo.placeOfProduction}</li>
                  <li>{announcementInfo.power}л.с.</li>
                  <li>{announcementInfo.transmission}</li>
                  <li>{announcementInfo.typeOfEquipment}</li>
                  <li>{announcementInfo.year}г.</li>
                  <li>{announcementInfo.login}</li>
                  <li>{announcementInfo.number}</li>
                </div>
              </div>
            </ul>
          </ul>
          <span className={styles.text}>{announcementInfo.text}</span>
        </>
      )}
    </div>
  )
}
