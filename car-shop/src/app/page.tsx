'use client'
import selectCarBrand from '@/actions/selectCarBrand'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

interface BrandForFilter {
  active: boolean
  name: string
  slug: string
}
interface CarBrand {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
}
export default function Page() {
  const [brandFilter, setBrandFilter] = useState<BrandForFilter[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const carBrand = await selectCarBrand()
      const car: BrandForFilter[] = carBrand.map(
        (element:CarBrand) => (
          { active: false, name: element.name, slug: element.slug }
        )
      )
      setBrandFilter(car)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])
  function linkClicked(name:string): void {
    setBrandFilter((brandFilterOld) => brandFilterOld.map(
      (element:BrandForFilter) => (element.name === name
        ? { ...element, active: !element.active }
        : element)
    ))
  }

  return (
    <ul className={styles.brand}>
      {brandFilter.map((element) => (
        <li key={element.name}>
          <button className={
            element.active ? styles.linkActive : styles.linkUnactive
          } onClick={() => linkClicked(element.name)}>
            {element.name}
          </button>
        </li>))}
    </ul>
  )
}
