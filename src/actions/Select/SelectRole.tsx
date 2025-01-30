'use server'
import database from '@/modules/database'

export default async function SelectRole(id:number) {
  const result = database.selectFrom('users').select('role').where('id', '=', id).limit(1)
    .execute()
  console.log('result', result)
  if (result[0] > 0) {
    return true
  }

  return false
}

// export default async function selectCarBrand() {
//   return database.selectFrom('brand').select(['name', 'slug', 'type']).where('type', 'like', 'motorcycle').execute()
// }
