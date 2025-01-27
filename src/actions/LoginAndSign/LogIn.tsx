'use server'

import { verify } from '@node-rs/bcrypt'
import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'
import database from '@/modules/database'

interface InsertUser {
  login: string
  password: string
}
export default async function logIn(user: InsertUser) {
  const fromUser = await database
    .selectFrom('users')
    .select(['id', 'password'])
    .where('login', '=', user.login)
    .limit(1)
    .execute()

  if (!fromUser[0]) {
    return 'Такого логина нет'
  }
  if (!await verify(user.password, fromUser[0].password)) {
    return 'Неверный пароль'
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const token = randomUUID()
  await database
    .insertInto('userSession')
    .values({
      expiresAt,
      token,
      userId: fromUser[0].id
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
