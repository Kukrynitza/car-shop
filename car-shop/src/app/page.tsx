'use client'
import { useActionState, useEffect, useState } from 'react'
import selectAllCarBrand from '@/actions/CarBrand/selectAllCarBrand'
import selectFirstCarBrand from '@/actions/CarBrand/selectFirstCarBrand'
import SortForm from '@/components/SortForm/SortForm'
import sortInfo from '@/sorse/sortInfo'
import styles from './page.module.css'

interface BrandForFilter {
  id: number
  active: boolean
  count: number
  name: string
  slug: string
}
// interface Brand {
//   id: number
//   count: number
//   name: string
// }
interface SortInfo {
  brandCountry: string[]
  color: string[]
  drive: string[]
  fuel: string[]
  modelName?: string[]
  placeOfProduction?: string[]
  transmission: string[]
  typeOfEquipment: string[]
}
interface ActiveSort {
  brandCountry?: string[]
  color?: string[]
  drive?: string[]
  fuel?: string[]
  modelName?: string[]
  placeOfProduction?: string[]
  transmission?: string[]
  typeOfEquipment?: string[]
}
interface ActiveButton {
  brandCountry: boolean
  color: boolean
  drive: boolean
  fuel: boolean
  modelName: boolean
  placeOfProduction: boolean
  transmission: boolean
  typeOfEquipment: boolean
}
export default function Page() {
  const [brandFilter, setBrandFilter] = useState<BrandForFilter[]>([])
  const [otherBrand, setOtherBrand] = useState(false)
  const [largeSort, setLargeSort] = useState(false)
  const [sortInfoData, setSortInfoData] = useState<SortInfo | null>(null)
  const [activeSortData, setActiveSortData] = useState<ActiveSort | null>(null)
  const [activeSortButton, setActiveSortButton] = useState<ActiveButton>(
    {
      brandCountry: false,
      color: false,
      drive: false,
      fuel: false,
      modelName: false,
      placeOfProduction: false,
      transmission: false,
      typeOfEquipment: false
    }
  )
  useEffect(() => {
    async function fetchData() {
      const ids = brandFilter
        .filter((element) => element.active)
        .map((element) => element.id)
      const modelActive = ids.length !== 0
      console.log(ids, modelActive)
      const data = await sortInfo(modelActive, ids)
      setSortInfoData(data)
    }
    fetchData()
  }, [brandFilter])
  console.log(sortInfoData)
  useEffect(() => {
    const fetchData = async () => {
      const carBrand = (otherBrand) ? await selectAllCarBrand() : await selectFirstCarBrand()
      const car: BrandForFilter[] = carBrand.map(
        (element) => (
          {
            active: false,
            count: element.count,
            id: element.id,
            name: element.name
          }
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
  function clickInSortElement(type: string) : void {
    setActiveSortButton((prevState) => ({ ...prevState, [type]: true }))
  }
  function onMouseLeaveSortElement(type: string) : void {
    setActiveSortButton((prevState) => ({ ...prevState, [type]: false }))
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
      <form action="formAction" className={largeSort ? styles.formLarge : styles.formSmall}>
        {/* onMouseLeave={() => onMouseLeaveSortElement('modelName')} */}
        <button type="button" className={styles.model} onClick={() => clickInSortElement('modelName')}> Модель<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg></button>
        {activeSortButton.modelName && (
          <SortForm
            activeData={activeSortData ?? []}
            data={sortInfoData?.modelName ?? []}
            setActiveData={setActiveSortData}
          />
        )}
        <button type="button" className={styles.typeOfEquipment}>Кузов<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg></button>
        {activeSortButton.typeOfEquipment && (
          <SortForm
            activeData={activeSortData ?? []}
            data={sortInfoData?.typeOfEquipment ?? []}
            setActiveData={setActiveSortData}
          />
        )}
        <button type="button" className={styles.brandCountry}>Страна бренда<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg></button>
        {activeSortButton.brandCountry && (
          <SortForm
            activeData={activeSortData ?? []}
            data={sortInfoData?.brandCountry ?? []}
            setActiveData={setActiveSortData}
          />
        )}
        <div className={styles.coast}>
          <input type="text" placeholder="Цена от, $" />
          <input type="text" placeholder="до" />
        </div>
        <button type="button" className={styles.transmission}>КПП<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg></button>
        {activeSortButton.transmission && (
          <SortForm
            activeData={activeSortData ?? []}
            data={sortInfoData?.transmission ?? []}
            setActiveData={setActiveSortData}
          />
        )}
        <div className={styles.volume}>
          <input type="text" placeholder="Объем от, л." />
          <input type="text" placeholder="до" />
        </div>
        <div className={styles.mileage}>
          <input type="text" placeholder="Пробег от, км" />
          <input type="text" placeholder="до" />
        </div>
        <button type="button" className={styles.placeOfProduction}>Страна-производитель<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg></button>
        {activeSortButton.placeOfProduction && (
          <SortForm
            activeData={activeSortData ?? []}
            data={sortInfoData?.placeOfProduction ?? []}
            setActiveData={setActiveSortData}
          />
        )}
        <div className={styles.year}>
          <input type="text" placeholder="Год от" />
          <input type="text" placeholder="до" />
        </div>
        <button type="button" className={styles.color}>Цвет <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg></button>
        {activeSortButton.color && (
          <SortForm
            activeData={activeSortData ?? []}
            data={sortInfoData?.color ?? []}
            setActiveData={setActiveSortData}
          />
        )}
        <button type="button" className={styles.advancedSearch} onClick={() => setLargeSort((sort) => !sort)}>
          {largeSort
            ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z" /></svg>
                  Обычный поиск
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z" /></svg>
                </>
              )
            : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
                  Расширенный поиск
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
                </>
              )}
        </button>
        {largeSort
        && (
          <>
            <div className={styles.power}>
              <input type="text" placeholder="Мощность от" />
              <input type="text" placeholder="до, л.с." />
            </div>
            <button type="button" className={styles.fuel}>Топливо<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg></button>
            {activeSortButton.fuel && (
              <SortForm
                activeData={activeSortData ?? []}
                data={sortInfoData?.fuel ?? []}
                setActiveData={setActiveSortData}
              />
            )}
            <button type="button" className={styles.drive}>Привод<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg></button>
            {activeSortButton.drive && (
              <SortForm
                activeData={activeSortData ?? []}
                data={sortInfoData?.drive ?? []}
                setActiveData={setActiveSortData}
              />
            )}
          </>
        )}
      </form>
    </div>
  )
}
