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
  brandId: number
  userId: number
  announcements: number
  color: string
  drive: string
  fuel: string
  mileage: number
  modelName: string
  password: string
  photoIds: number[]
  placeOfProduction: string
  price: number
  text: string
  transmission: string
  typeOfEquipment: string
  volume: number
  year: number
  createdAt: GeneratedAlways<Date>
}

export interface Database {
  announcements: AnnouncementTable
  brand: BrandTable
  users: UserTable
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
