'use server'
import database from '@/modules/database'

// eslint-disable-next-line @typescript-eslint/require-await
export default async function selectCarBrand(): Promise<
  { id: number; count: number; name: string; }[]
> {
  return database
    .selectFrom('brand')
    .leftJoin('announcements', 'brand.id', 'announcements.brand_id')
    .select(({ fn }) => [
      'brand.id',
      'brand.name',
      fn.count<number>('announcements.id').as('count')
    ])
    .where('brand.type', 'like', 'car')
    .groupBy(['brand.id', 'brand.name'])
    .orderBy('count', 'desc')
    .execute()
}
