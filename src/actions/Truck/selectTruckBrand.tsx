'use server'
import database from '@/modules/database'

export default async function selectCarBrand() {
  return database.selectFrom('brand').select(['name', 'slug', 'type']).where('type', 'like', 'truck').execute()
}
