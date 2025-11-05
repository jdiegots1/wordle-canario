import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { IncomingMessage } from 'http'

const redisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const redisRestToken = process.env.UPSTASH_REDIS_REST_TOKEN

let ratelimit: Ratelimit | undefined

if (redisRestUrl && redisRestToken) {
  const redis = new Redis({ url: redisRestUrl, token: redisRestToken })
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, '10 s'),
    analytics: true,
  })
}

export const checkRateLimit = async (req: IncomingMessage, identifier: string) => {
  if (!ratelimit) return { success: true }
  return ratelimit.limit(`${identifier}:${req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown'}`)
}
