'use client'
import styles from './SortForm.module.css'

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
interface SortFormProps {
  activeData: ActiveSort | null;
  category: keyof ActiveSort;
  data: ActiveSort;
  setActiveData: (value: ActiveSort | null) => void;
  setData: (value: SortInfo | null) => void;
}
export default function SortForm({
  activeData,
  category,
  data,
  setActiveData,
  setData
}: SortFormProps) {
  function clickOnUnactiveButton(categoryElement: string) {
    setData((prev: ActiveSort | null) => {
      if (prev) {
        return {
          ...prev,
          [category]: prev[category]?.filter((element) => element !== categoryElement) || []
        }
      }

      return prev
    })

    setActiveData((prev: ActiveSort | null) => {
      if (prev) {
        return {
          ...prev,
          [category]: Array.isArray(prev[category])
            ? [...prev[category], categoryElement]
            : [categoryElement]
        }
      }

      return {
        [category]: [categoryElement]
      } as unknown as SortInfo
    })
  }

  function clickOnActiveButton(categoryElement: string) {
    setActiveData((prev: ActiveSort | null) => {
      if (prev?.[category]) {
        if (prev[category].length === 1) {
          delete prev[category]

          return { ...prev }
        }

        return {
          ...prev,
          [category]: prev[category].filter((element) => element !== categoryElement)
        }
      }

      return prev
    })

    setData((prev: ActiveSort | null) => {
      const updatedCategory = Array.isArray(prev?.[category])
        ? [...prev[category], categoryElement]
        : [categoryElement]

      return {
        ...prev,
        [category]: updatedCategory
      }
    })
  }

  return (

    <ul className={styles.form}>
      <ul className={styles.active}>
        {Array.isArray(activeData?.[category]) && activeData[category].map((element: string) => (
          <button key={element} type="button" className={styles.buttonActive} onClick={() => clickOnActiveButton(element)}>
            {element}
          </button>
        ))}
      </ul>
      <ul className={styles.unactive}>
        {Array.isArray(data[category]) && data[category].map((element: string) => (
          <button key={element} type="button" className={styles.buttonUnactive} onClick={() => clickOnUnactiveButton(element)}>
            {element}
          </button>
        ))}
      </ul>
    </ul>
  )
}
