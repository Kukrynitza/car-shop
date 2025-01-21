'use server'
import database from '@/modules/database'

export default async function selectBrandCountry() {
  const countries = await database
    .selectFrom('brand')
    .select('country')
    .where('brand.type', 'like', 'car')
    .groupBy('country')
    .orderBy('country', 'desc')
    .execute()

  return countries.map((country) => country.country)
}
