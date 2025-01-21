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
interface ActiveButton {
  brandCountry: boolean;
  color: boolean;
  drive: boolean;
  fuel: boolean;
  modelName: boolean;
  placeOfProduction: boolean;
  transmission: boolean;
  typeOfEquipment: boolean;
}
interface SortFormProps {
  activeData: ActiveSort | null;
  category: string;
  data: string[];
  setActiveData: (value: ActiveSort | null) => void;
  setActiveSortButton: (value: ActiveButton) => void;
}
export default function SortForm({
  activeData,
  category,
  data,
  setActiveData,
  setActiveSortButton
}: SortFormProps) {
  function onMouseLeaveSortElement(activeCategory: string) {
    setActiveSortButton((prev) => ({ ...prev, [activeCategory]: false }))
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <ul className={styles.form} onMouseLeave={() => onMouseLeaveSortElement(category)}>
      {data.map((element:string) => (<li key={element}>{element}</li>))}
    </ul>
  )
}
