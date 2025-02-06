'use server'
import selectCarBrand from '@/actions/CarBrand/selectBrand'
import selectMotorcycleBrand from '@/actions/Motorcycle/selectBrand'
import selectTruckBrand from '@/actions/Truck/selectBrand'
import countries from './countries'

interface SortInfo {
  brand: string[]
  color: string[]
  drive: string[]
  fuel: string[]
  modelName: string[]
  placeOfProduction: string[]
  transmission: string[]
  typeOfEquipment: string[]
}

export default async function announcementInfo(type:string) {
  if (type === 'car') {
    const dataBrands = await selectCarBrand()
    const brand = dataBrands.map(({ name }) => name)

    return {
      brand,
      color: ['белый', 'черный', 'синий', 'красный', 'серый', 'зеленый', 'желтый', 'оранжевый', 'серебристый', 'бежевый'],
      drive: ['передний', 'задний', 'полный'],
      fuel: ['бензин', 'дизель', 'газ', 'гибрид', 'электро', 'бензин-газ'],
      placeOfProduction: countries,
      transmission: ['механика', 'автомат', 'робот', 'вариатор'],
      typeOfEquipment: ['седан', 'хэтчбек', 'универсал', 'купе', 'кабриолет', 'внедорожник', 'минивен', 'пикап', 'микроавтобус', 'кроссовер']
    }
  }
  if (type === 'motorcycle') {
    const dataBrands = await selectMotorcycleBrand()
    const brand = dataBrands.map(({ name }) => name)

    return {
      brand,
      color: ['белый', 'черный', 'синий', 'красный', 'серый', 'зеленый', 'желтый', 'оранжевый', 'серебристый', 'бежевый'],
      drive: ['цепной', 'карданный', 'ременной'],
      fuel: ['бензин', 'электро', 'гибрид'],
      placeOfProduction: countries,
      transmission: ['механика', 'автомат'],
      typeOfEquipment: ['спортивный', 'круизер', 'туристический', 'эндуро', 'кроссовый', 'чоппер', 'скутер', 'кастом', 'стрит', 'мопед']
    }
  }
  if (type === 'truck') {
    const dataBrands = await selectTruckBrand()
    const brand = dataBrands.map(({ name }) => name)

    return {
      brand,
      color: ['белый', 'черный', 'синий', 'красный', 'серый', 'зеленый', 'желтый', 'оранжевый', 'серебристый', 'бежевый'],
      drive: ['задний', 'передний', 'полный', '6x4', '6x6', '8x4', '8x8'],
      fuel: ['дизель', 'бензин', 'газ', 'электро', 'гибрид'],
      placeOfProduction: countries,
      transmission: ['механика', 'автомат', 'робот'],
      typeOfEquipment: ['бортовой', 'самосвал', 'фургон', 'тягач', 'рефрижератор', 'цементовоз', 'автовоз', 'топливозаправщик', 'эвакуатор', 'лесовоз']
    }
  }
}
