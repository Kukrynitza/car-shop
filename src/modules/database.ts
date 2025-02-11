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
  login: string
  number: string
  password: string
  role: number
  createdAt: GeneratedAlways<Date>
}

export interface UserSession {
  id: GeneratedAlways<number>
  userId: number
  token: string
  expiresAt: Date
  createdAt: GeneratedAlways<Date>
  updatedAt: Date
}

export interface AnnouncementTable {
  id: GeneratedAlways<number>
  brandId: number
  imageId: number
  userId: number
  announcements: number
  color: string
  drive: string
  fuel: string
  mileage: number
  modelName: string
  placeOfProduction: string
  power: number
  price: number
  text: string
  transmission: string
  typeOfEquipment: string
  volume: number
  year: number
  createdAt: GeneratedAlways<Date>
}
export interface ImageTable {
  id: GeneratedAlways<number>
  path: string[]
  createdAt: GeneratedAlways<Date>
}

export interface Database {
  announcements: AnnouncementTable
  brand: BrandTable
  image: ImageTable
  users: UserTable
  userSession: UserSession
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
