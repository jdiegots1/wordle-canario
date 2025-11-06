import { z } from 'zod'
import { randomUUID } from 'crypto'
import { prisma } from '../lib/prisma'
import { parseCookies, readJsonBody } from '../lib/http'
import { json, badRequest, serverError } from '../lib/api'
import { logger } from '../lib/logger'
import { sendEmail } from '../lib/email'
import { renderTemplate } from '../lib/templates'
import type { AuthenticatedRequest, AuthenticatedResponse } from '../lib/auth'

const schema = z.object({
  email: z.string().email(),
})

const RESET_TTL_MS = Number(process.env.PASSWORD_RESET_TTL_MS ?? 30 * 60 * 1000)

export default async function handler(req: AuthenticatedRequest, res: AuthenticatedResponse) {
  if (req.method !== 'POST') {
    return badRequest(res, 'Only POST allowed')
  }

  try {
    req.cookies = parseCookies(req.headers.cookie)
    const body = await readJsonBody<unknown>(req)
    const payload = schema.parse(body)

    const user = await prisma.user.findUnique({ where: { email: payload.email.toLowerCase() } })
    if (!user) {
      logger.warn({ event: 'auth.forgot-password', email: payload.email }, 'user not found')
      return json(res, 200, { success: true })
    }

    const token = randomUUID()
    const expiresAt = new Date(Date.now() + RESET_TTL_MS)

    await prisma.passwordResetToken.upsert({
      where: { userId: user.id },
      update: { token, expiresAt, usedAt: null },
      create: { token, userId: user.id, expiresAt },
    })

    const appUrl = process.env.APP_URL ?? 'http://localhost:3000'
    const resetUrl = `${appUrl}/reset-password?token=${token}`
    const html = await renderTemplate('reset-password', {
      email: user.email,
      resetUrl,
    })

    await sendEmail({
      to: user.email,
      subject: 'Restablecer contraseña',
      html,
    })

    logger.info({ event: 'auth.forgot-password', userId: user.id }, 'password reset email sent')

    return json(res, 200, { success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return badRequest(res, error.errors.map((e) => e.message).join(', '))
    }
    return serverError(res, error)
  }
}
