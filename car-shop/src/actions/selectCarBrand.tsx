'use server'
import database from '@/modules/database'

export default async function selectCarBrand() {
  return database.selectFrom('carMerke').selectAll().execute()
}
