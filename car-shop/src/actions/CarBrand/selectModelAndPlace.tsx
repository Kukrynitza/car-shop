'use server'
import database from '@/modules/database'

export default async function selectModelAndPlace(modelActive:boolean, brands: number[]) {
  // if (brands.length > 0 && brands.some((brand) => typeof brand !== 'number')) {
  //   throw new Error('All items in brands array must be numbers')
  // }
  const ModelAndPlace = modelActive
    ? await database
      .selectFrom('announcements')
      .select(['place_of_production', 'model_name'])
      .where('brand_id', 'in', brands)
      .groupBy(['place_of_production', 'model_name'])
      .execute()
    : await database
      .selectFrom('announcements')
      .select(['place_of_production', 'model_name'])
      .groupBy(['place_of_production', 'model_name'])
      .execute()

  return ModelAndPlace.map((element) => ({
    model: element.modelName,
    place: element.placeOfProduction
  }))
}
