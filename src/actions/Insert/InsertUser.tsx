'use server'

import { hash } from '@node-rs/bcrypt'
import database from '@/modules/database'

interface InsertUser {
  login: string
  number: string
  password: string
}
export default async function InsertUser(user: InsertUser) {
  const result = await database
    .insertInto('users')
    .values({
      login: user.login,
      number: user.number,
      password: await hash(user.password)
    })
    .returningAll()
    .executeTakeFirst()
  console.log(result)
}
