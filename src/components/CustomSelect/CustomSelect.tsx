'use client'
import Select from 'react-select'

// const DynamicSelect = dynamic(() => import('react-select'), { ssr: false })
export default function CustomSelect({ isChange, options, setChange }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      '&:hover': { borderColor: '#FF92AD' },
      'backgroundColor': '#201318',
      'border': `3px solid ${state.isFocused ? '#B0436E' : '#B0436E'}`,
      'boxShadow': 'none',
      'color': '#f6eeb4',
      'outline': 'none',
      'width': '100%'
    }),
    // 🔹 Стрелка (Dropdown Indicator)
    dropdownIndicator: (provided, state) => ({
      ...provided,
      '&:hover': { color: '#f1d3e8' }, // Чуть ярче при наведении
      'color': '#f6eeb4' // Жёлтая стрелка
    }),
    // 🔹 Разделительная линия между текстом и стрелкой
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#f6eeb4' // Жёлтая линия
    }),
    input: (provided) => ({
      ...provided,
      color: '#f6eeb4' // Жёлтый текст при вводе
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1a1016',
      border: '3px solid #B0436E',
      borderRadius: '8px',
      width: '100%'
    }),
    option: (provided, state) => ({
      ...provided,
      '&:focus': { backgroundColor: '#5c1839', color: '#f6eeb4' },
      '&:hover': { backgroundColor: '#a84885' },
      'backgroundColor': state.isSelected ? '#5c1839' : '#201318',
      'borderBottom': '2px solid #B0436E', // Подчеркивание под каждым элементом
      'color': '#f6eeb4'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#f6eeb4'
    })
  }

  return (
    <Select
      defaultValue={isChange}
      options={options}
      styles={customStyles}
      onChange={setChange}
    />
  )
}
