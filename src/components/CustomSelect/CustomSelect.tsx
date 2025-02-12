/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'
import Select from 'react-select'

// const DynamicSelect = dynamic(() => import('react-select'), { ssr: false })
export default function CustomSelect({ isChange, options, setChange }) {
  const customStyles = {

    control: (provided: any, state: { isFocused: any }) => ({
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

    dropdownIndicator: (provided: any) => ({
      ...provided,
      '&:hover': { color: '#f1d3e8' },
      'color': '#f6eeb4'
    }),
    // 🔹 Разделительная линия между текстом и стрелкой

    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: '#f6eeb4'
    }),

    input: (provided: any) => ({
      ...provided,
      color: '#f6eeb4'
    }),

    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1a1016',
      border: '3px solid #B0436E',
      borderRadius: '8px',
      width: '100%'
    }),

    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      '&:focus': { backgroundColor: '#5c1839', color: '#f6eeb4' },
      '&:hover': { backgroundColor: '#a84885' },
      'backgroundColor': state.isSelected ? '#5c1839' : '#201318',
      'borderBottom': '2px solid #B0436E',
      'color': '#f6eeb4'
    }),

    singleValue: (provided: unknown) => ({
      ...provided,
      color: '#f6eeb4'
    })
  }

  return (
    <Select
      value={isChange}
      options={options}
      styles={customStyles}
      onChange={setChange}
    />
  )
}
