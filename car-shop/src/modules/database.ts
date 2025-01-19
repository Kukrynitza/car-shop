import { CamelCasePlugin, type GeneratedAlways, Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

export interface BrandTable {
  id: GeneratedAlways<number>
  country: string
  name: string
  slug: string
  type: string
  createdAt: GeneratedAlways<Date>
}

export interface UserTable {
  id: GeneratedAlways<number>
  announcements: number
  login: string
  number: string
  password: string
  role: boolean
  createdAt: GeneratedAlways<Date>
}

export interface AnnouncementTable {
  id: GeneratedAlways<number>
  announcements: number
  brand_id: number
  color: string
  drive: string
  fuel: string
  mileage: number
  model_name: string
  password: string
  photo_ids: number[]
  place_of_production: string
  price: number
  role: boolean
  text: string
  transmission: string
  type_of_equipment: string
  user_id: number
  volume: number
  year: number
  createdAt: GeneratedAlways<Date>
}

export interface Database {
  announcement: AnnouncementTable
  brand: BrandTable
  user: UserTable
}

const database = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_CONNECTION_STRING
    })
  }),
  plugins: [
    new CamelCasePlugin({
      maintainNestedObjectKeys: true
    })
  ]
})

export default database
