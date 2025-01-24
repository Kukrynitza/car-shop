'use server'

import { hash } from '@node-rs/bcrypt'
import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'
import database from '@/modules/database'

interface InsertUser {
  login: string
  number: string
  password: string
}
export default async function InsertUser(user: InsertUser) {
  const loginFromUsers = await database
    .selectFrom('users')
    .select(['login', 'number'])
    .where((eb) => eb.or([
      eb('login', '=', user.login),
      eb('number', '=', user.number)
    ]))
    .execute()

  if (loginFromUsers.length > 0) {
    console.log(loginFromUsers)
    if (loginFromUsers[0].login === user.login) {
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
      role: false
    })
    .returning('id')
    .executeTakeFirstOrThrow()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const token = randomUUID()
  await database
    .insertInto('userSession')
    .values({
      expiresAt,
      token,
      userId: registration.id
    })
    .executeTakeFirstOrThrow()
  // console.log(result)
  const cookieStore = await cookies()

  cookieStore.set('session', token, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax'
  })
}
