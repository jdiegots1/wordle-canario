import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { getClientIp, parseCookies, readJsonBody } from '../lib/http'
import {
  createAccessToken,
  rotateRefreshToken,
  setAuthCookies,
  verifyRefreshToken,
  clearAuthCookies,
} from '../lib/auth'
import { json, badRequest, unauthorized, serverError } from '../lib/api'
import { logger } from '../lib/logger'
import type { AuthenticatedRequest, AuthenticatedResponse } from '../lib/auth'

const bodySchema = z.object({ refreshToken: z.string().optional() }).optional()

export default async function handler(req: AuthenticatedRequest, res: AuthenticatedResponse) {
  if (req.method !== 'POST') {
    return badRequest(res, 'Only POST allowed')
  }

  try {
    req.cookies = parseCookies(req.headers.cookie)
    const body = await readJsonBody<unknown>(req)
    const parsed = bodySchema.parse(body)
    const token = parsed?.refreshToken ?? req.cookies?.refresh_token

    if (!token) {
      return unauthorized(res, 'Refresh token requerido')
    }

    const payload = verifyRefreshToken(token)

    const stored = await prisma.refreshToken.findUnique({ where: { token } })
    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      clearAuthCookies(res)
      return unauthorized(res, 'Token inválido')
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user) {
      clearAuthCookies(res)
      return unauthorized(res, 'Usuario no encontrado')
    }

    const accessToken = createAccessToken(user.id, user.email)
    const refresh = await rotateRefreshToken(user.id, user.email, stored.jti, {
      userAgent: req.headers['user-agent'],
      ipAddress: getClientIp(req),
    })

    setAuthCookies(res, accessToken, refresh.token)
    logger.info({ event: 'auth.refresh', userId: user.id }, 'tokens refreshed')

    return json(res, 200, {
      user: { id: user.id, email: user.email },
      accessToken,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return badRequest(res, error.errors.map((e) => e.message).join(', '))
    }
    return serverError(res, error)
  }
}
