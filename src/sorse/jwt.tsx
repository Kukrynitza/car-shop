import { jwtVerify, SignJWT } from 'jose'

const secretKey = process.env.JWT_SECRET_KEY
if (!secretKey) {
  throw new Error('JWT_SECRET_KEY is not set')
}

const key = new TextEncoder().encode(secretKey)

export async function sign(payload: any): Promise<string> {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 2 * 24 * 60 * 60

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(key)
}
