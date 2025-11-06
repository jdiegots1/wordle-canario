import type { IncomingMessage } from 'http'

export const parseCookies = (cookieHeader?: string) => {
  if (!cookieHeader) return {}
  return cookieHeader.split(';').reduce<Record<string, string>>((acc, pair) => {
    const [key, ...value] = pair.trim().split('=')
    acc[key] = decodeURIComponent(value.join('='))
    return acc
  }, {})
}

export const readJsonBody = async <T>(req: IncomingMessage): Promise<T> => {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) {
    return {} as T
  }
  return JSON.parse(raw) as T
}

export const getClientIp = (req: IncomingMessage) => {
  const forwarded = req.headers['x-forwarded-for']
  if (Array.isArray(forwarded)) {
    return forwarded[0]
  }
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0]?.trim() ?? ''
  }
  return req.socket?.remoteAddress ?? ''
}
