/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Select from 'react-select'

interface Option {
  label: string;
  value: string;
}
interface CustomSelectProps {
  isChange: Option;
  options: Option[];
  setChange: (value: Option) => void;
}
export default function CustomSelect({ isChange, options, setChange }: CustomSelectProps) {
  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    control: (provided: any, state: { isFocused: any }) => ({
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    dropdownIndicator: (provided: any) => ({
      ...provided,
      '&:hover': {
        color: '#f6eeb4'
      },
      'color': '#f6eeb4',
      'padding': '0 8px'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    input: (provided: any) => ({
      ...provided,
      color: '#f6eeb4'
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#381525',
      border: '2px solid #f6eeb4',
      borderRadius: '6px',
      marginTop: '4px',
      padding: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 9999
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    menuList: (provided: any) => ({
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    option: (provided: any, state: { isSelected: any }) => ({
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    singleValue: (provided: any) => ({
      ...provided,
      color: '#f6eeb4'
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    valueContainer: (provided: any) => ({
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
