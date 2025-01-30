'use server'

import { hash } from '@node-rs/bcrypt'
// import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'
import database from '@/modules/database'
import jwt from '@/sorse/jwt'

interface InsertUser {
  login: string
  number: string
  password: string
}
interface Token {
  id: number
  role: number
}
export default async function InsertUser(user: InsertUser) {
  const fromUsers = await database
    .selectFrom('users')
    .select(['login', 'number'])
    .where((eb) => eb.or([
      eb('login', '=', user.login),
      eb('number', '=', user.number)
    ]))
    .execute()

  if (fromUsers.length > 0) {
    if (fromUsers[0].login === user.login) {
      return 'Такой логин уже существует'
    }

    return 'Такой номер уже существует'
  }
  const registration = await database
    .insertInto('users')
    .values({
      login: user.login,
      number: user.number,
      password: await hash(user.password),
      role: 0
    })
    .returning(['id', 'role'])
    .executeTakeFirstOrThrow()
  const token = await jwt({ id: registration.id, role: registration.role })
  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  await database
    .insertInto('userSession')
    .values({
      expiresAt,
      token,
      userId: registration.id
    })
    .executeTakeFirstOrThrow()
  const cookieStore = await cookies()

  cookieStore.set('session', token, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax'
  })
}
