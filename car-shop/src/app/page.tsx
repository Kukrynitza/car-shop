'use client'
import { useActionState, useEffect, useState } from 'react'
import selectAllCarBrand from '@/actions/CarBrand/selectAllCarBrand'
import selectFirstCarBrand from '@/actions/CarBrand/selectFirstCarBrand'
import styles from './page.module.css'

interface BrandForFilter {
  active: boolean
  count: number
  name: string
  slug: string
}
interface Brand {
  count: number
  name: string
  slug: string
  createdAt: Date;
}
export default function Page() {
  const [brandFilter, setBrandFilter] = useState<BrandForFilter[]>([])
  const [otherBrand, setOtherBrand] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const carBrand = (otherBrand) ? await selectAllCarBrand() : await selectFirstCarBrand()
      const car: BrandForFilter[] = carBrand.map(
        (element:Brand) => (
          { active: false, count: element.count, name: element.name, slug: element.slug }
        )
      )
      setBrandFilter(car)
    }
    // const [message, formAction, isPending] = useActionState((_, formData) => {

    // })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [otherBrand])
  function linkClicked(name:string): void {
    setBrandFilter((brandFilterOld) => brandFilterOld.map(
      (element:BrandForFilter) => (element.name === name
        ? { ...element, active: !element.active }
        : element)
    ))
  }

  return (
    <div>
      <ul className={styles.brand}>
        {brandFilter.map((element) => (
          <li key={element.name}>
            <button
              type="button"
              className={element.active ? styles.linkActive : styles.linkUnactive}
              onClick={() => linkClicked(element.name)}
            >
              <p>{element.name}</p>
              <p>({element.count})</p>
            </button>
          </li>
        ))}
        <button type="button" className={styles.linkActive} onClick={() => setOtherBrand((other) => !other)}>
          {otherBrand ? 'Свернуть' : 'Все марки'}
        </button>
      </ul>
      <form action="formAction" className={styles.form}>
        <button type="button">Модель</button>
        <button type="button">Привод</button>
        <button type="button">Страна</button>
        <button type="button">Страна-производитель</button>
        <button type="button">Топливо</button>
        <div className={styles.formDiv}>
          <input type="text" placeholder="Пробег от, км" />
          <input type="text" placeholder="до" />
        </div>
        <div className={styles.formDiv}>
          <input type="text" placeholder="Цена от, $" />
          <input type="text" placeholder="до" />
        </div>
        <div className={styles.formDiv}>
          <input type="text" placeholder="Год от" />
          <input type="text" placeholder="до" />
        </div>
        <div className={styles.formDiv}>
          <input type="text" placeholder="Мощность от, л.с." />
          <input type="text" placeholder="до" />
        </div>
        <div className={styles.formDiv}>
          <input type="text" placeholder="Объем от, л." />
          <input type="text" placeholder="до" />
        </div>
      </form>
    </div>
  )
}
