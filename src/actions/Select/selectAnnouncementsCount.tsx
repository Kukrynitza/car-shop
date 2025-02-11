'use server'

import database from '@/modules/database'

interface InputForm {
  coastMax: number | null,
  coastMin: number | null,
  mileageMax: number | null,
  mileageMin: number | null,
  powerMax: number | null,
  powerMin: number | null,
  volumeMax: number | null,
  volumeMin: number | null,
  yearMax: number | null,
  yearMin: number | null
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
export default async function selectAnnouncementsCount(
  type: string,
  info?: InputForm,
  selectInfo?:ActiveSort,
  brandFilter?:string[]
) {
  let selectAnnouncement = database
    .selectFrom('announcements')
    .innerJoin('image', 'announcements.imageId', 'image.id')
    .innerJoin('brand', 'announcements.brandId', 'brand.id')
    .select(({ fn }) => fn.count('announcements.id').as('count'))
    .where('brand.type', '=', type)
    .limit(4)
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
    if (selectInfo.brandCountry?.length > 0) {
      selectAnnouncement = selectAnnouncement.where('brand.country', 'in', selectInfo.brandCountry)
    }
    if (selectInfo.color?.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.color', 'in', selectInfo.color)
    }
    if (selectInfo.drive?.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.drive', 'in', selectInfo.drive)
    }
    if (selectInfo.fuel?.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.fuel', 'in', selectInfo.fuel)
    }
    if (selectInfo.modelName?.length > 0) {
      console.log('2')
      selectAnnouncement = selectAnnouncement.where('announcements.modelName', 'in', selectInfo.modelName)
    }
    if (selectInfo.placeOfProduction?.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.placeOfProduction', 'in', selectInfo.placeOfProduction)
    }
    if (selectInfo.transmission?.length > 0) {
      selectAnnouncement.where('announcements.transmission', 'in', selectInfo.transmission)
    }
    if (selectInfo.typeOfEquipment?.length > 0) {
      selectAnnouncement = selectAnnouncement.where('announcements.typeOfEquipment', 'in', selectInfo.typeOfEquipment)
    }
  }

  if (brandFilter !== undefined && brandFilter.length > 0) {
    console.log(brandFilter)
    selectAnnouncement = selectAnnouncement.where('brand.name', 'in', brandFilter)
  }

  return selectAnnouncement.execute()
}
