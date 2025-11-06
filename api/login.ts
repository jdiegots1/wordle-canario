import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { verifyPassword } from '../lib/password'
import { json, badRequest, serverError, unauthorized } from '../lib/api'
import {
  createAccessToken,
  rotateRefreshToken,
  setAuthCookies,
  revokeRefreshToken,
} from '../lib/auth'
import { getClientIp, parseCookies, readJsonBody } from '../lib/http'
import { logger } from '../lib/logger'
import { checkRateLimit } from '../lib/rateLimiter'
import type { AuthenticatedRequest, AuthenticatedResponse } from '../lib/auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default async function handler(req: AuthenticatedRequest, res: AuthenticatedResponse) {
  if (req.method !== 'POST') {
    return badRequest(res, 'Only POST allowed')
  }

  try {
    const rate = await checkRateLimit(req, 'login')
    if (!rate.success) {
      res.setHeader('Retry-After', String(rate.reset))
      return json(res, 429, { error: 'Demasiadas solicitudes, inténtalo más tarde.' })
    }

    req.cookies = parseCookies(req.headers.cookie)
    const body = await readJsonBody<unknown>(req)
    const payload = loginSchema.parse(body)

    const user = await prisma.user.findUnique({ where: { email: payload.email.toLowerCase() } })
    if (!user) {
      logger.warn({ event: 'auth.login', email: payload.email }, 'user not found')
      return unauthorized(res, 'Credenciales inválidas')
    }

    const validPassword = await verifyPassword(user.passwordHash, payload.password)
    if (!validPassword) {
      logger.warn({ event: 'auth.login', userId: user.id }, 'invalid password')
      return unauthorized(res, 'Credenciales inválidas')
    }

    // TODO: Integrar verificación MFA (TOTP) cuando esté disponible.

    if (req.cookies?.refresh_token) {
      await revokeRefreshToken(req.cookies.refresh_token)
    }

    const accessToken = createAccessToken(user.id, user.email)
    const refresh = await rotateRefreshToken(user.id, user.email, undefined, {
      userAgent: req.headers['user-agent'],
      ipAddress: getClientIp(req),
    })

    setAuthCookies(res, accessToken, refresh.token)

    logger.info({ event: 'auth.login', userId: user.id }, 'login success')

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
