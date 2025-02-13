'use server'
import database from '@/modules/database'

export default async function selectModelAndPlace(
  modelActive:boolean,
  brands: [] | number[],
  type:string
) {
  // if (brands.length > 0 && brands.some((brand) => typeof brand !== 'number')) {
  //   throw new Error('All items in brands array must be numbers')
  // }
  const ModelAndPlace = modelActive
    ? await database
      .selectFrom('announcements')
      .innerJoin('brand', 'announcements.brandId', 'brand.id')
      .select(['placeOfProduction', 'modelName'])
      .where('announcements.brandId', 'in', brands)
      .where('brand.type', '=', type)
      .groupBy(['placeOfProduction', 'modelName'])
      .execute()
    : await database
      .selectFrom('announcements')
      .innerJoin('brand', 'announcements.brandId', 'brand.id')
      .select(['placeOfProduction', 'modelName'])
      .where('brand.type', '=', type)
      .groupBy(['placeOfProduction', 'modelName'])
      .execute()

  return ModelAndPlace.map((element) => ({
    model: element.modelName,
    place: element.placeOfProduction
  }))
}
