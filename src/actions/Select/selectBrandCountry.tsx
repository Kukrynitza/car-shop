'use server'
import database from '@/modules/database'

export default async function selectBrandCountry(type:string) {
  const countries = await database
    .selectFrom('brand')
    .select('country')
    .where('brand.type', '=', type)
    .groupBy('country')
    .orderBy('country', 'desc')
    .execute()

  return countries.map((country) => country.country)
}
