'use server'
import selectBrandCountry from '@/actions/Select/selectBrandCountry'
import selectModelAndPlace from '@/actions/Select/selectModelAndPlace'

function cleanAndSortArray(arr: string[]): string[] {
  return Array.from(new Set(arr)).sort()
}

export default async function getSortInfo(modelActive:boolean, type:string, brands?: number[]) {
  const brandCountry = await selectBrandCountry(type)
  const modelAndPlace = await selectModelAndPlace(modelActive, brands ?? [], type)
  const modelName = cleanAndSortArray(modelAndPlace.map((element) => element.model))
  const placeOfProduction = cleanAndSortArray(modelAndPlace.map((element) => element.place))
  if (type === 'car') {
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
  if (type === 'motorcycle') {
    return {
      brandCountry,
      color: ['белый', 'черный', 'синий', 'красный', 'серый', 'зеленый', 'желтый', 'оранжевый', 'серебристый', 'бежевый'],
      drive: ['цепной', 'карданный', 'ременной'],
      fuel: ['бензин', 'электро', 'гибрид'],
      modelName,
      placeOfProduction,
      transmission: ['механика', 'автомат'],
      typeOfEquipment: ['спортивный', 'круизер', 'туристический', 'эндуро', 'кроссовый', 'чоппер', 'скутер', 'кастом', 'стрит', 'мопед']
    }
  }
  if (type === 'truck') {
    return {
      brandCountry,
      color: ['белый', 'черный', 'синий', 'красный', 'серый', 'зеленый', 'желтый', 'оранжевый', 'серебристый', 'бежевый'],
      drive: ['задний', 'передний', 'полный', '6x4', '6x6', '8x4', '8x8'],
      fuel: ['дизель', 'бензин', 'газ', 'электро', 'гибрид'],
      modelName,
      placeOfProduction,
      transmission: ['механика', 'автомат', 'робот'],
      typeOfEquipment: ['бортовой', 'самосвал', 'фургон', 'тягач', 'рефрижератор', 'цементовоз', 'автовоз', 'топливозаправщик', 'эвакуатор', 'лесовоз']
    }
  }
}
