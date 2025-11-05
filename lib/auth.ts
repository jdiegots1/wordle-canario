import jwt from 'jsonwebtoken'
import type { IncomingMessage, ServerResponse } from 'http'
import { randomUUID } from 'crypto'
import { prisma } from './prisma'
import { logger } from './logger'

type JwtPayload = { sub: string; email: string; jti: string }

const ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_EXPIRES_IN ?? '15m'
const REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_EXPIRES_IN ?? '30d'

const ACCESS_TOKEN_COOKIE = 'access_token'
const REFRESH_TOKEN_COOKIE = 'refresh_token'

const ACCESS_SECRET = process.env.JWT_SECRET ?? 'change-me'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? ACCESS_SECRET

export interface AuthenticatedRequest extends IncomingMessage {
  body?: unknown
  cookies: Record<string, string>
  user?: { id: string; email: string }
}

export type AuthenticatedResponse = ServerResponse & {
  setHeader(name: string, value: number | string | string[]): this
}

export const createAccessToken = (userId: string, email: string) => {
  return jwt.sign({ sub: userId, email }, ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
    jwtid: randomUUID(),
  })
}

export const createRefreshToken = (userId: string, email: string) => {
  const jti = randomUUID()
  const token = jwt.sign({ sub: userId, email }, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL,
    jwtid: jti,
  })
  return { token, jti }
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload
}

export const setAuthCookies = (res: AuthenticatedResponse, access: string, refresh: string) => {
  const cookies = [
    serializeCookie(ACCESS_TOKEN_COOKIE, access, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: parseExpiry(ACCESS_TOKEN_TTL),
    }),
    serializeCookie(REFRESH_TOKEN_COOKIE, refresh, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: parseExpiry(REFRESH_TOKEN_TTL),
    }),
  ]
  res.setHeader('Set-Cookie', cookies)
}

export const clearAuthCookies = (res: AuthenticatedResponse) => {
  const cookies = [
    serializeCookie(ACCESS_TOKEN_COOKIE, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    }),
    serializeCookie(REFRESH_TOKEN_COOKIE, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    }),
  ]
  res.setHeader('Set-Cookie', cookies)
}

export const authenticateRequest = async (req: AuthenticatedRequest, res: AuthenticatedResponse) => {
  try {
    const token = req.cookies?.[ACCESS_TOKEN_COOKIE]
    if (!token) {
      return false
    }
    const payload = verifyAccessToken(token)
    req.user = { id: payload.sub, email: payload.email }
    return true
  } catch (error) {
    logger.warn({ error }, 'access token verification failed')
    clearAuthCookies(res)
    return false
  }
}

export const rotateRefreshToken = async (
  userId: string,
  email: string,
  oldTokenId?: string,
  metadata?: { userAgent?: string; ipAddress?: string }
) => {
  const { token, jti } = createRefreshToken(userId, email)
  const expiresAt = new Date(Date.now() + parseExpiry(REFRESH_TOKEN_TTL) * 1000)
  await prisma.refreshToken.create({
    data: {
      token,
      jti,
      userId,
      expiresAt,
      userAgent: metadata?.userAgent,
      ipAddress: metadata?.ipAddress,
      ...(oldTokenId
        ? {
            replacedBy: jti,
          }
        : {}),
    },
  })

  if (oldTokenId) {
    await prisma.refreshToken.updateMany({
      where: { jti: oldTokenId },
      data: { revokedAt: new Date(), replacedBy: jti },
    })
  }

  return { token, jti, expiresAt }
}

export const revokeRefreshToken = async (token: string) => {
  try {
    const payload = verifyRefreshToken(token)
    await prisma.refreshToken.updateMany({
      where: { token, userId: payload.sub },
      data: { revokedAt: new Date() },
    })
  } catch (error) {
    logger.warn({ error }, 'failed to revoke refresh token')
  }
}

const serializeCookie = (
  name: string,
  value: string,
  options: {
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'lax' | 'strict' | 'none'
    path?: string
    maxAge?: number
  }
) => {
  const segments = [`${name}=${encodeURIComponent(value)}`]
  if (options.maxAge !== undefined) {
    segments.push(`Max-Age=${options.maxAge}`)
  }
  if (options.httpOnly) segments.push('HttpOnly')
  if (options.secure) segments.push('Secure')
  if (options.sameSite) segments.push(`SameSite=${options.sameSite}`)
  segments.push(`Path=${options.path ?? '/'}`)
  return segments.join('; ')
}

const parseExpiry = (ttl: string) => {
  if (/^\d+$/.test(ttl)) {
    return Number(ttl)
  }
  const match = ttl.match(/^(\d+)([smhd])$/)
  if (!match) {
    return 0
  }
  const value = Number(match[1])
  const unit = match[2]
  switch (unit) {
    case 's':
      return value
    case 'm':
      return value * 60
    case 'h':
      return value * 60 * 60
    case 'd':
      return value * 60 * 60 * 24
    default:
      return value
  }
}
