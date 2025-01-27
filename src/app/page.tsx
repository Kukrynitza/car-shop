/* eslint-disable @typescript-eslint/no-unnecessary-condition */
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
}
// interface Brand {
//   id: number
//   count: number
//   name: string
// }
interface SortInfo {
  brandCountry?: string[]
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
interface InputForm {
  coastMax: number,
  coastMin: number,
  mileageMax: number,
  mileageMin: number,
  powerMax: number,
  powerMin: number,
  volumeMax: number,
  volumeMin: number,
  yearMax: number,
  yearMin: number
}
interface ActiveButton {
  active: boolean,
  category: string
}
export default function Page() {
  const [brandFilter, setBrandFilter] = useState<BrandForFilter[]>([])
  const [otherBrand, setOtherBrand] = useState(false)
  const [largeSort, setLargeSort] = useState(false)
  const [sortInfoData, setSortInfoData] = useState<SortInfo | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fullSortInfoData, setFullSortInfoData] = useState<SortInfo | null>(null)
  const [activeSortData, setActiveSortData] = useState<ActiveSort | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputSortInfo, setInputSortInfo] = useState<InputForm | null>(null)
  const [activeSortButton, setActiveSortButton] = useState<ActiveButton >(
    {
      active: false,
      category: ''
    }
  )
  useEffect(() => {
    async function fetchDataAndProcess() {
      const ids = brandFilter
        .filter((element) => element.active)
        .map((element) => element.id)
      const modelActive = ids.length !== 0
      const data = await sortInfo(modelActive, ids)
      setSortInfoData(data)
      setFullSortInfoData(data)

      if (activeSortData) {
        const updatedActiveSortData = { ...activeSortData }
        const updatedSortInfoData = { ...data }
        Object.keys(activeSortData).forEach((keyTyped) => {
          const key = keyTyped as keyof SortInfo
          if (data[key]) {
            updatedSortInfoData[key] = data[key]
              .filter((item) => updatedActiveSortData[key]
                && !updatedActiveSortData[key].includes(item))

            if (updatedSortInfoData[key] && activeSortData[key]) {
              updatedActiveSortData[key] = activeSortData[key]
                .filter((item) => data[key]?.includes(item))
            }
          } else {
            updatedActiveSortData[key] = []
          }
        })
        setActiveSortData(updatedActiveSortData)
        setSortInfoData(updatedSortInfoData)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchDataAndProcess()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandFilter])

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
    setActiveSortButton((prevState) => ({
      active: prevState.category === type ? !prevState.active : true,
      category: type
    }))
  }
  const [
    message, formAction
  ] = useActionState((_: unknown, formData: FormData) => {
    const coastMax = formData.get('coastMax')
    const coastMin = formData.get('coastMin')
    const mileageMax = formData.get('mileageMax')
    const mileageMin = formData.get('mileageMin')
    const powerMax = formData.get('powerMax')
    const powerMin = formData.get('powerMin')
    const volumeMax = formData.get('volumeMax')
    const volumeMin = formData.get('volumeMin')
    const yearMax = formData.get('yearMax')
    const yearMin = formData.get('yearMin')
    setInputSortInfo({
      coastMax: coastMax ? Number(coastMax) : 0,
      coastMin: coastMin ? Number(coastMin) : 0,
      mileageMax: mileageMax ? Number(mileageMax) : 0,
      mileageMin: mileageMin ? Number(mileageMin) : 0,
      powerMax: powerMax ? Number(powerMax) : 0,
      powerMin: powerMin ? Number(powerMin) : 0,
      volumeMax: volumeMax ? Number(volumeMax) : 0,
      volumeMin: volumeMin ? Number(volumeMin) : 0,
      yearMax: yearMax ? Number(yearMax) : 0,
      yearMin: yearMin ? Number(yearMin) : 0
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newInputSortInfo = {
      coastMax: coastMax ? Number(coastMax) : null,
      coastMin: coastMin ? Number(coastMin) : null,
      mileageMax: mileageMax ? Number(mileageMax) : null,
      mileageMin: mileageMin ? Number(mileageMin) : null,
      powerMax: powerMax ? Number(powerMax) : null,
      powerMin: powerMin ? Number(powerMin) : null,
      volumeMax: volumeMax ? Number(volumeMax) : null,
      volumeMin: volumeMin ? Number(volumeMin) : null,
      yearMax: yearMax ? Number(yearMax) : null,
      yearMin: yearMin ? Number(yearMin) : null
    }

    return {
      coastMax: coastMax ? Number(coastMax) : null,
      coastMin: coastMin ? Number(coastMin) : null,
      mileageMax: mileageMax ? Number(mileageMax) : null,
      mileageMin: mileageMin ? Number(mileageMin) : null,
      powerMax: powerMax ? Number(powerMax) : null,
      powerMin: powerMin ? Number(powerMin) : null,
      volumeMax: volumeMax ? Number(volumeMax) : null,
      volumeMin: volumeMin ? Number(volumeMin) : null,
      yearMax: yearMax ? Number(yearMax) : null,
      yearMin: yearMin ? Number(yearMin) : null
    }
  }, {
    coastMax: null,
    coastMin: null,
    mileageMax: null,
    mileageMin: null,
    powerMax: null,
    powerMin: null,
    volumeMax: null,
    volumeMin: null,
    yearMax: null,
    yearMin: null
  })

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
      <form action={formAction} className={largeSort ? styles.formLarge : styles.formSmall}>
        <div className={styles.model}>
          <button type="button" className={styles.button} onClick={() => clickInSortElement('modelName')}>
            <span>{activeSortData?.modelName ? activeSortData.modelName.join() : 'Модель'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
          </button>
          {activeSortButton.category === 'modelName' && activeSortButton.active && (
            <SortForm
              activeData={activeSortData ?? null}
              category="modelName"
              data={sortInfoData ?? {}}
              setActiveData={setActiveSortData}
              setActiveSortButton={setActiveSortButton}
              setData={setSortInfoData}
            />
          )}
        </div>
        <button type="submit" className={styles.conclusion}>Показать</button>
        <div className={styles.typeOfEquipment}>
          <button type="button" className={styles.button} onClick={() => clickInSortElement('typeOfEquipment')}>
            <span>{activeSortData?.typeOfEquipment ? activeSortData.typeOfEquipment.join() : 'Кузов'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
          </button>
          {activeSortButton.category === 'typeOfEquipment' && activeSortButton.active && (
            <SortForm
              activeData={activeSortData ?? null}
              category="typeOfEquipment"
              data={sortInfoData ?? {}}
              setActiveData={setActiveSortData}
              setActiveSortButton={setActiveSortButton}
              setData={setSortInfoData}
            />
          )}
        </div>
        <div className={styles.brandCountry}>
          <button type="button" className={styles.button} onClick={() => clickInSortElement('brandCountry')}>
            <span>{activeSortData?.brandCountry ? activeSortData.brandCountry.join() : 'Страна бренда'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
          </button>
          {activeSortButton.category === 'brandCountry' && activeSortButton.active && (
            <SortForm
              activeData={activeSortData ?? null}
              category="brandCountry"
              data={sortInfoData ?? {}}
              setActiveData={setActiveSortData}
              setActiveSortButton={setActiveSortButton}
              setData={setSortInfoData}
            />
          )}
        </div>
        <div className={styles.coast}>
          <input type="number" name="coastMin" id="coastMin" defaultValue={message.coastMin} placeholder="Цена от, $" min="0" />
          <input type="number" name="coastMax" id="coastMax" defaultValue={message.coastMax} placeholder="до" min="0" />
        </div>
        <div className={styles.transmission}>
          <button type="button" className={styles.button} onClick={() => clickInSortElement('transmission')}>
            <span>{activeSortData?.transmission ? activeSortData.transmission.join() : 'КПП'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
          </button>
          {activeSortButton.category === 'transmission' && activeSortButton.active && (
            <SortForm
              activeData={activeSortData ?? null}
              category="transmission"
              data={sortInfoData ?? {}}
              setActiveData={setActiveSortData}
              setActiveSortButton={setActiveSortButton}
              setData={setSortInfoData}
            />
          )}
        </div>
        <div className={styles.volume}>
          <input type="number" name="volumeMin" id="volumeMin" defaultValue={message.volumeMin} placeholder="Объем от, л." min="0" pattern="\d*" />
          <input type="number" name="volumeMax" id="volumeMax" defaultValue={message.volumeMax} placeholder="до" min="0" pattern="\d*" />
        </div>
        <div className={styles.mileage}>
          <input type="number" name="mileageMin" id="mileageMin" defaultValue={message.mileageMax} placeholder="Пробег от, км" min="0" pattern="\d*" />
          <input type="number" name="mileageMax" id="mileageMax" defaultValue={message.mileageMin} placeholder="до" min="0" pattern="\d*" />
        </div>
        <div className={styles.placeOfProduction}>
          <button type="button" className={styles.button} onClick={() => clickInSortElement('placeOfProduction')}>
            <span>{activeSortData?.placeOfProduction ? activeSortData.placeOfProduction.join() : 'Страна-производитель'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
          </button>
          {activeSortButton.category === 'placeOfProduction' && activeSortButton.active && (
            <SortForm
              activeData={activeSortData ?? null}
              category="placeOfProduction"
              data={sortInfoData ?? {}}
              setActiveData={setActiveSortData}
              setActiveSortButton={setActiveSortButton}
              setData={setSortInfoData}
            />
          )}
        </div>
        <div className={styles.year}>
          <input type="number" name="yearMin" id="yearMin" defaultValue={message.yearMin} placeholder="Год от" min="0" pattern="\d*" />
          <input type="number" name="yearMax" id="yearMax" defaultValue={message.yearMax} placeholder="до" min="0" pattern="\d*" />
        </div>
        <div className={styles.color}>
          <button type="button" className={styles.button} onClick={() => clickInSortElement('color')}>
            <span>{activeSortData?.color ? activeSortData.color.join() : 'Цвет'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
          </button>
          {activeSortButton.category === 'color' && activeSortButton.active && (
            <SortForm
              activeData={activeSortData ?? null}
              category="color"
              data={sortInfoData ?? {}}
              setActiveData={setActiveSortData}
              setActiveSortButton={setActiveSortButton}
              setData={setSortInfoData}
            />
          )}
        </div>
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
              <input type="number" name="powerMin" id="powerMin" defaultValue={message.powerMin} placeholder="Мощность от" min="0" pattern="\d*" />
              <input type="number" name="powerMax" id="powerMax" defaultValue={message.powerMax} placeholder="до, л.с." min="0" pattern="\d*" />
            </div>
            <div className={styles.fuel}>
              <button type="button" className={styles.button} onClick={() => clickInSortElement('fuel')}>
                <span>{activeSortData?.fuel ? activeSortData.fuel.join() : 'Топливо'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
              </button>
              {activeSortButton.category === 'fuel' && activeSortButton.active && (
                <SortForm
                  activeData={activeSortData ?? null}
                  category="fuel"
                  data={sortInfoData ?? {}}
                  setActiveData={setActiveSortData}
                  setActiveSortButton={setActiveSortButton}
                  setData={setSortInfoData}
                />
              )}
            </div>
            <div className={styles.drive}>
              <button type="button" className={styles.button} onClick={() => clickInSortElement('drive')}>
                <span>{activeSortData?.drive ? activeSortData.drive.join() : 'Привод'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="#fdd3e8"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" /></svg>
              </button>
              {activeSortButton.category === 'drive' && activeSortButton.active && (
                <SortForm
                  activeData={activeSortData ?? null}
                  category="drive"
                  data={sortInfoData ?? {}}
                  setActiveData={setActiveSortData}
                  setActiveSortButton={setActiveSortButton}
                  setData={setSortInfoData}
                />
              )}
            </div>
          </>
        )}
      </form>
    </div>
  )
}
