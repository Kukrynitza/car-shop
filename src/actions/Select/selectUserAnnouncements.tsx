'use server'

import database from '@/modules/database'
import payloadGet from '../Jwt/payloadGet'

export default async function selectUserAnnouncements() {
  const payload = await payloadGet() as { id: string; role: string }
  const selectAnnouncement = await database
    .selectFrom('announcements')
    .innerJoin('image', 'announcements.imageId', 'image.id')
    .innerJoin('brand', 'announcements.brandId', 'brand.id')
    .innerJoin('users', 'announcements.userId', 'users.id')
    .select(['announcements.id', 'announcements.year', 'announcements.volume', 'announcements.mileage', 'announcements.typeOfEquipment', 'announcements.fuel', 'announcements.power', 'announcements.transmission', 'image.path', 'brand.name', 'announcements.modelName', 'announcements.price', 'users.login', 'announcements.text'])
    .where('announcements.userId', '=', Number(payload.id))
    .orderBy('announcements.createdAt desc')
    .execute()

  // console.log(selectAnnouncement)

  return selectAnnouncement
}
