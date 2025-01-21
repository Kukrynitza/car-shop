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
interface SortFormProps {
  activeData: ActiveSort | null;
  data: string[];
  setActiveData: (value: ActiveSort | null) => void;
}

export default function SortForm({
  // activeData,
  data
  // setActiveData
}: SortFormProps) {
  return (
    <ul className={styles.form}>
      {data.map((element:string) => (<li key={element}>{element}</li>))}
    </ul>
  )
}
