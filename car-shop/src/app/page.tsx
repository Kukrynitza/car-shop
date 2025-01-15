'use server'
import database from '@/modules/database'

export default async function Page() {
  const carBrand = await database.selectFrom('carBrand').selectAll().execute()

  return (
    <div>еду еду еду я</div>
  )
}
