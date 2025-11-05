import { parseCookies } from '../lib/http'
import { badRequest, json, serverError } from '../lib/api'
import { clearAuthCookies, revokeRefreshToken, type AuthenticatedResponse } from '../lib/auth'
import type { AuthenticatedRequest } from '../lib/auth'

export default async function handler(req: AuthenticatedRequest, res: AuthenticatedResponse) {
  if (req.method !== 'POST') {
    return badRequest(res, 'Only POST allowed')
  }

  try {
    req.cookies = parseCookies(req.headers.cookie)
    const token = req.cookies?.refresh_token
    if (token) {
      await revokeRefreshToken(token)
    }
    clearAuthCookies(res)
    return json(res, 200, { success: true })
  } catch (error) {
    return serverError(res, error)
  }
}
