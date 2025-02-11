'use client'
import { useEffect, useState } from 'react'
import selectUserAnnouncements from '@/actions/Select/selectUserAnnouncements'
import AnnouncementItem from '@/components/AnnouncementItem/AnnouncementItem'
import styles from './page.module.css'

interface Announcement {
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
export default function Page() {
  const [isAnnouncement, setAnnouncement] = useState<Announcement[]>()
  useEffect(() => {
    async function selectAnnouncement() {
      const anns = await selectUserAnnouncements()
      setAnnouncement(anns)
    }
    selectAnnouncement()
  }, [])
  // console.log(isAnnouncement)

  return (
    <div>
      <h1 className={styles.h1}>Ваши объявления</h1>
      {isAnnouncement?.length > 0
        ? isAnnouncement.map(
            (element) => <AnnouncementItem key={element.id} announcement={element} />
          )
        : <p>Нет объявлений</p>}
    </div>
  )
}
