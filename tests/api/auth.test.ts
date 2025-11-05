import register from '../../api/register'
import type { AuthenticatedRequest } from '../../lib/auth'

jest.mock('../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

jest.mock('../../lib/password', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed'),
}))

jest.mock('../../lib/auth', () => ({
  createAccessToken: jest.fn().mockReturnValue('access-token'),
  rotateRefreshToken: jest.fn().mockResolvedValue({ token: 'refresh-token' }),
  setAuthCookies: jest.fn(),
}))

const { prisma } = jest.requireMock('../../lib/prisma') as {
  prisma: {
    user: {
      findUnique: jest.Mock
      create: jest.Mock
    }
  }
}

const { setAuthCookies } = jest.requireMock('../../lib/auth') as {
  setAuthCookies: jest.Mock
}

const createRequest = (body: unknown, method = 'POST') => {
  const req: Partial<AuthenticatedRequest> & AsyncIterable<Buffer> = {
    method,
    headers: { cookie: '' },
    cookies: {},
    [Symbol.asyncIterator]: async function* () {
      yield Buffer.from(JSON.stringify(body))
    },
  }
  return req as AuthenticatedRequest
}

const createResponse = () => {
  const res: any = {
    statusCode: 200,
    headers: {} as Record<string, unknown>,
    body: '',
    setHeader(name: string, value: unknown) {
      this.headers[name] = value
      return this
    },
    end(payload?: unknown) {
      this.body = typeof payload === 'string' ? payload : JSON.stringify(payload)
      return this
    },
  }
  return res
}

describe('register handler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('rejects non-POST methods', async () => {
    const req = createRequest({}, 'GET')
    const res = createResponse()

    await register(req, res)

    expect(res.statusCode).toBe(400)
    expect(JSON.parse(res.body).error).toBeDefined()
  })

  it('creates a new user and returns tokens', async () => {
    prisma.user.findUnique.mockResolvedValue(null)
    prisma.user.create.mockResolvedValue({ id: 'user-1', email: 'test@example.com' })

    const req = createRequest({ email: 'test@example.com', password: 'Password123' })
    const res = createResponse()

    await register(req, res)

    expect(res.statusCode).toBe(201)
    const payload = JSON.parse(res.body)
    expect(payload.user.email).toBe('test@example.com')
    expect(payload.accessToken).toBe('access-token')
    expect(setAuthCookies).toHaveBeenCalled()
  })
})
