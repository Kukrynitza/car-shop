'use server'
import selectBrandCountry from '@/actions/CarBrand/selectBrandCountry'
import selectModelAndPlace from '@/actions/CarBrand/selectModelAndPlace'

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

export default async function getSortInfo(modelActive:boolean, brands: number[])
  : Promise<SortInfo> {
  const brandCountry = await selectBrandCountry()
  const modelAndPlace = await selectModelAndPlace(modelActive, brands)
  const modelName = modelAndPlace.map((element) => element.model)
  const placeOfProduction = modelAndPlace.map((element) => element.place)
  console.log(modelAndPlace)

  return {
    brandCountry,
    color: ['белый', 'черный', 'синий', 'красный', 'серый', 'зеленый', 'желтый', 'оранжевый', 'серебристый', 'бежевый'],
    drive: ['передний', 'задний', 'полный'],
    fuel: ['бензин', 'дизель', 'газ', 'гибрид', 'электро', 'бензин-газ'],
    modelName,
    placeOfProduction,
    transmission: ['механика', 'автомат', 'робот', 'вариатор'],
    typeOfEquipment: ['седан', 'хэтчбек', 'универсал', 'купе', 'кабриолет', 'внедорожник', 'минивен', 'пикап', 'микроавтобус', 'кроссовер']
  }
}
