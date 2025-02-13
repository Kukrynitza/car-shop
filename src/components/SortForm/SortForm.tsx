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
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  data: SortInfo | {};
  setActiveData: React.Dispatch<React.SetStateAction<ActiveSort | null>>
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  setData: (value: SortInfo | {}) => void;
}
export default function SortForm({
  activeData,
  category,
  data,
  setActiveData,
  setData
}: SortFormProps) {
  function isSortInfo(obj: unknown): obj is SortInfo {
    return typeof obj === 'object' && obj !== null
  }
  function clickOnUnactiveButton(categoryElement: string) {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    setData((prev: SortInfo | {}) => {
      if (isSortInfo(prev) && prev[category]) {
        return {
          ...prev,
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          [category]: prev[category].filter((element: string) => element !== categoryElement) || []
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
      } as ActiveSort
    })
  }
  function clickOnActiveButton(categoryElement: string) {
    setActiveData((prev: ActiveSort | null) => {
      if (prev?.[category]) {
        if (prev[category].length === 1) {
          // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-dynamic-delete
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

    setData((prev: SortInfo | null) => {
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
        {Array.isArray((data as SortInfo)[category]) && (data as SortInfo)[category]!
          .map((element: string) => (
            <button key={element} type="button" className={styles.buttonUnactive} onClick={() => clickOnUnactiveButton(element)}>
              {element}
            </button>
          ))}
      </ul>
    </ul>
  )
}
