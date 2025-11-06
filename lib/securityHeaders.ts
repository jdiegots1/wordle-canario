import type { ServerResponse } from 'http'
import helmet from 'helmet'

const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
})

export const applySecurityHeaders = (res: ServerResponse) => {
  const fakeReq = {} as Parameters<typeof helmetMiddleware>[0]
  helmetMiddleware(fakeReq, res as never, () => undefined)
}
