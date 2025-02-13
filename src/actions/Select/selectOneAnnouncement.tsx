'use server'

import database from '@/modules/database'

export default async function selectOneAnnouncement(announcementId:number) {
  return database
    .selectFrom('announcements')
    .innerJoin('brand', 'announcements.brandId', 'brand.id')
    .innerJoin('image', 'announcements.imageId', 'image.id')
    .innerJoin('users', 'announcements.userId', 'users.id')
    .where('announcements.id', '=', announcementId)
    .select([
      'announcements.color',
      'announcements.drive',
      'announcements.fuel',
      'announcements.mileage',
      'announcements.modelName',
      'announcements.placeOfProduction',
      'announcements.power',
      'announcements.price',
      'announcements.text',
      'announcements.transmission',
      'announcements.typeOfEquipment',
      'announcements.volume',
      'announcements.year',
      'brand.name',
      'brand.type',
      'image.path',
      'users.login',
      'users.number'
    ])
    .execute()
}
