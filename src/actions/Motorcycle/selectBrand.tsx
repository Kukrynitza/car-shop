'use server'
import database from '@/modules/database'

export default async function selectBrand() {
  return database.selectFrom('brand').select('name').where('type', 'like', 'motorcycle').execute()
}
