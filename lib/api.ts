import type { ServerResponse } from 'http'
import { logger } from './logger'
import { applySecurityHeaders } from './securityHeaders'

export const json = (res: ServerResponse, statusCode: number, data: unknown) => {
  applySecurityHeaders(res)
  const payload = JSON.stringify(data)
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Content-Length', Buffer.byteLength(payload))
  res.end(payload)
}

export const badRequest = (res: ServerResponse, message: string) => {
  logger.warn({ message }, 'bad request')
  json(res, 400, { error: message })
}

export const unauthorized = (res: ServerResponse, message = 'Unauthorized') => {
  logger.warn({ message }, 'unauthorized access')
  json(res, 401, { error: message })
}

export const serverError = (res: ServerResponse, error: unknown) => {
  logger.error({ error }, 'unexpected error')
  json(res, 500, { error: 'Internal server error' })
}
