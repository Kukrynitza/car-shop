'use server'

import database from '@/modules/database'

interface InputForm {
  coastMax: number,
  coastMin: number,
  mileageMax: number,
  mileageMin: number,
  powerMax: number,
  powerMin: number,
  volumeMax: number,
  volumeMin: number,
  yearMax: number,
  yearMin: number
}
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
export default async function selectAnnouncements(
  type: string,
  sort:string,
  offset:number,
  info?: InputForm,
  selectInfo?:ActiveSort,
  brandFilter?:string[]
) {
  let selectAnnouncement = database
    .selectFrom('announcements')
    .innerJoin('image', 'announcements.imageId', 'image.id')
    .innerJoin('brand', 'announcements.brandId', 'brand.id')
    .innerJoin('users', 'announcements.userId', 'users.id')
    .select(['announcements.id', 'announcements.year', 'announcements.volume', 'announcements.mileage', 'announcements.typeOfEquipment', 'announcements.fuel', 'announcements.power', 'announcements.transmission', 'image.path', 'brand.name', 'announcements.modelName', 'announcements.price', 'users.login', 'announcements.text'])
    .where('brand.type', '=', type)
  if (info) {
    if (info.coastMax !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.price', '<=', info.coastMax)
    }
    if (info.coastMin !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.price', '>=', info.coastMin)
    }
    if (info.mileageMax !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.mileage', '<=', info.mileageMax)
    }
    if (info.mileageMin !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.mileage', '>=', info.mileageMin)
    }
    if (info.powerMax !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.power', '<=', info.powerMax)
    }
    if (info.powerMin !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.power', '>=', info.powerMin)
    }
    if (info.volumeMax !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.volume', '<=', info.volumeMax)
    }
    if (info.volumeMin !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.volume', '>=', info.volumeMin)
    }
    if (info.yearMax !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.year', '<=', info.yearMax)
    }
    if (info.yearMin !== 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.year', '>=', info.yearMin)
    }
  }

  if (selectInfo) {
    if (selectInfo.brandCountry && selectInfo.brandCountry.length > 0) {
      selectAnnouncement = selectAnnouncement.where('brand.country', 'in', selectInfo.brandCountry)
    }
    if (selectInfo.color && selectInfo.color.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.color', 'in', selectInfo.color)
    }
    if (selectInfo.drive && selectInfo.drive.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.drive', 'in', selectInfo.drive)
    }
    if (selectInfo.fuel && selectInfo.fuel.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.fuel', 'in', selectInfo.fuel)
    }
    if (selectInfo.modelName && selectInfo.modelName.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.modelName', 'in', selectInfo.modelName)
    }
    if (selectInfo.placeOfProduction && selectInfo.placeOfProduction.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.placeOfProduction', 'in', selectInfo.placeOfProduction)
    }
    if (selectInfo.transmission && selectInfo.transmission.length > 0) {
      selectAnnouncement.where('announcements.transmission', 'in', selectInfo.transmission)
    }
    if (selectInfo.typeOfEquipment && selectInfo.typeOfEquipment.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.typeOfEquipment', 'in', selectInfo.typeOfEquipment)
    }
  }

  if (brandFilter && brandFilter.length > 0) {
    selectAnnouncement = selectAnnouncement.where('brand.name', 'in', brandFilter)
  }
  if (sort === 'createdNew') {
    selectAnnouncement = selectAnnouncement.orderBy('announcements.createdAt desc')
  }
  if (sort === 'createdOld') {
    selectAnnouncement = selectAnnouncement.orderBy('announcements.createdAt asc')
  }
  if (sort === 'coastMin') {
    selectAnnouncement = selectAnnouncement.orderBy('announcements.price asc')
  }
  if (sort === 'coastMax') {
    selectAnnouncement = selectAnnouncement.orderBy('announcements.price desc')
  }
  if (sort === 'yearNew') {
    selectAnnouncement = selectAnnouncement.orderBy('announcements.year desc')
  }
  if (sort === 'yearOld') {
    selectAnnouncement = selectAnnouncement.orderBy('announcements.year asc')
  }
  if (sort === 'mileage') {
    selectAnnouncement = selectAnnouncement.orderBy('announcements.mileage asc')
  }
  if (sort === 'volume') {
    selectAnnouncement = selectAnnouncement.orderBy('announcements.volume desc')
  }

  return selectAnnouncement.limit(4)
    .offset(offset * 4 - 4).execute()
}
