'use client'
import Select from 'react-select'

export default function CustomSelect({ isChange, options, setChange }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      '&:hover': {
        borderColor: '#f6eeb4'
      },
      'backgroundColor': '#381525',
      'border': `2px solid ${state.isFocused ? '#f6eeb4' : '#f6eeb4'}`,
      'borderRadius': '6px',
      'boxShadow': 'none',
      'color': '#f6eeb4',
      'minHeight': '40px',
      'outline': 'none',
      'width': '100%'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      '&:hover': {
        color: '#f6eeb4'
      },
      'color': '#f6eeb4',
      'padding': '0 8px'
    }),
    indicatorSeparator: () => ({
      display: 'none' // Убираем разделитель
    }),
    input: (provided) => ({
      ...provided,
      color: '#f6eeb4'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#381525',
      border: '2px solid #f6eeb4',
      borderRadius: '6px',
      marginTop: '4px',
      padding: 0,
      position: 'absolute', // Гарантируем, что меню не будет сдвигать другие элементы
      width: '100%',
      zIndex: 9999 // Поднимаем меню выше по z-index
    }),
    menuList: (provided) => ({
      ...provided,
      '::-webkit-scrollbar': {
        width: '8px'
      },
      '::-webkit-scrollbar-thumb': {
        background: '#f6eeb4',
        borderRadius: '4px'
      },
      '::-webkit-scrollbar-track': {
        background: '#381525'
      },
      'maxHeight': '150px',
      'padding': 0
    }),
    option: (provided, state) => ({
      ...provided,
      '&:hover': {
        backgroundColor: '#4a1c31'
      },
      'backgroundColor': state.isSelected ? '#4a1c31' : '#381525',
      'borderRadius': 0,
      'color': '#f6eeb4',
      'cursor': 'pointer',
      'padding': '8px 12px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#f6eeb4'
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '2px 8px'
    })
  }

  return (
    <Select
      value={isChange}
      components={{
        IndicatorSeparator: () => null
      }}
      isSearchable={false}
      options={options}
      styles={customStyles}
      onChange={setChange}
    />
  )
}
