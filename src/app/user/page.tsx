/* eslint-disable @eslint-react/no-complex-conditional-rendering */
'use client'
import { useEffect, useState } from 'react'
import selectUserAnnouncements from '@/actions/Select/selectUserAnnouncements'
import AnnouncementItem from '@/components/AnnouncementItem/AnnouncementItem'
import styles from './page.module.css'

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
export default function Page() {
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [isAnnouncement, setAnnouncement] = useState<Announcement[]>()
  useEffect(() => {
    async function selectAnnouncement() {
      const anns = await selectUserAnnouncements()
      setAnnouncement(anns)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    selectAnnouncement()
  }, [])
  // console.log(isAnnouncement)

  return (
    <div>
      <h1 className={styles.h1}>Ваши объявления</h1>
      {isAnnouncement && isAnnouncement.length > 0
        ? isAnnouncement.map(
            (element) => <AnnouncementItem key={element.id} announcement={element} />
          )
        : <p className={styles.nonAnnouncement}>Нет объявлений</p>}
    </div>
  )
}
