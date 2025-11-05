import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { parseCookies, readJsonBody } from '../lib/http'
import { json, badRequest, unauthorized, serverError } from '../lib/api'
import { hashPassword } from '../lib/password'
import { logger } from '../lib/logger'
import type { AuthenticatedRequest, AuthenticatedResponse } from '../lib/auth'

const schema = z.object({
  token: z.string().uuid(),
  password: z.string().min(8),
})

export default async function handler(req: AuthenticatedRequest, res: AuthenticatedResponse) {
  if (req.method !== 'POST') {
    return badRequest(res, 'Only POST allowed')
  }

  try {
    req.cookies = parseCookies(req.headers.cookie)
    const body = await readJsonBody<unknown>(req)
    const payload = schema.parse(body)

    const record = await prisma.passwordResetToken.findUnique({ where: { token: payload.token } })
    if (!record || record.expiresAt < new Date() || record.usedAt) {
      return unauthorized(res, 'Token inválido o expirado')
    }

    const passwordHash = await hashPassword(payload.password)

    await prisma.$transaction([
      prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      prisma.passwordResetToken.update({
        where: { token: payload.token },
        data: { usedAt: new Date() },
      }),
      prisma.refreshToken.updateMany({ where: { userId: record.userId }, data: { revokedAt: new Date() } }),
    ])

    logger.info({ event: 'auth.reset-password', userId: record.userId }, 'password reset success')

    return json(res, 200, { success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return badRequest(res, error.errors.map((e) => e.message).join(', '))
    }
    return serverError(res, error)
  }
}
