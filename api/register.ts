import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { hashPassword } from '../lib/password'
import { json, badRequest, serverError } from '../lib/api'
import {
  createAccessToken,
  rotateRefreshToken,
  setAuthCookies,
  type AuthenticatedResponse,
} from '../lib/auth'
import { getClientIp, parseCookies, readJsonBody } from '../lib/http'
import { logger } from '../lib/logger'
import type { AuthenticatedRequest, AuthenticatedResponse } from '../lib/auth'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default async function handler(req: AuthenticatedRequest, res: AuthenticatedResponse) {
  if (req.method !== 'POST') {
    return badRequest(res, 'Only POST allowed')
  }

  try {
    req.cookies = parseCookies(req.headers.cookie)
    const body = await readJsonBody<unknown>(req)
    const payload = registerSchema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email: payload.email.toLowerCase() } })
    if (existing) {
      return badRequest(res, 'Email ya registrado')
    }

    const passwordHash = await hashPassword(payload.password)
    const user = await prisma.user.create({
      data: {
        email: payload.email.toLowerCase(),
        passwordHash,
      },
    })

    const accessToken = createAccessToken(user.id, user.email)
    const refresh = await rotateRefreshToken(user.id, user.email, undefined, {
      userAgent: req.headers['user-agent'],
      ipAddress: getClientIp(req),
    })

    setAuthCookies(res as AuthenticatedResponse, accessToken, refresh.token)
    logger.info({ event: 'user.register', userId: user.id }, 'new user registered')

    return json(res, 201, {
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
