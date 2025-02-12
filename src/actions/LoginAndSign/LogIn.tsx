'use server'

import { verify } from '@node-rs/bcrypt'
import { cookies } from 'next/headers'
import database from '@/modules/database'
import jwt from '@/sorse/jwt'

interface InsertUser {
  login: string
  password: string
}
export default async function logIn(user: InsertUser) {
  const fromUser = await database
    .selectFrom('users')
    .select(['id', 'password', 'role'])
    .where('login', '=', user.login)
    .limit(1)
    .execute()

  if (!fromUser[0]) {
    return 'Такого логина нет'
  }
  if (!await verify(user.password, fromUser[0].password)) {
    return 'Неверный пароль'
  }

  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const token = await jwt({ id: fromUser[0].id, role: fromUser[0].role })
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
