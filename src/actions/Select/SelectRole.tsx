'use server'
import database from '@/modules/database'

export default async function selectRole(id:number) {
  const result = await database.selectFrom('users').select('role').where('id', '=', id).limit(1)
    .execute()
  if (result[0].role > 0) {
    return true
  }

  return false
}
