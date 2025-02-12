'use server'
import database from '@/modules/database'

interface Brand {
  country: string,
  name: string,
  slug: string,
  type: string
}
export default async function insertBrand(brand:Brand) {
  await database
    .insertInto('brand')
    .values({
      country: brand.country,
      name: brand.name,
      slug: brand.slug,
      type: brand.type
    })
    .execute()

  return null
}
