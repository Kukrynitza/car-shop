'use server'
import database from '@/modules/database'

export default async function selectAllMotorcycleBrand() {
  return database
    .selectFrom('brand')
    .leftJoin('announcements', 'brand.id', 'announcements.brandId')
    .select(({ fn }) => [
      'brand.id',
      'brand.name',
      fn.count<number>('announcements.id').as('count')
    ])
    .where('brand.type', 'like', 'motorcycle')
    .groupBy(['brand.id', 'brand.name'])
    .orderBy('count', 'desc')
    .execute()
}
