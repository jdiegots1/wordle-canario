import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type User = {
  id: string
  email: string
}

type Credentials = {
  email: string
  password: string
}

type AuthContextValue = {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  login: (credentials: Credentials) => Promise<void>
  register: (payload: Credentials) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const parseResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  }
  return response.text()
}

const ensureOk = async (response: Response) => {
  if (!response.ok) {
    const data = await parseResponse(response)
    const message = typeof data === 'string' ? data : data?.error ?? 'Error desconocido'
    throw new Error(message)
  }
  return response
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const request = useCallback(async (url: string, options?: RequestInit) => {
    const response = await ensureOk(
      await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers ?? {}),
        },
        credentials: 'include',
      })
    )
    return parseResponse(response)
  }, [])

  const handleAuthSuccess = useCallback((data: { user: User; accessToken: string }) => {
    setUser(data.user)
    setAccessToken(data.accessToken)
  }, [])

  const login = useCallback(
    async (credentials: Credentials) => {
      const data = (await request('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })) as { user: User; accessToken: string }
      handleAuthSuccess(data)
    },
    [handleAuthSuccess, request]
  )

  const register = useCallback(
    async (payload: Credentials) => {
      const data = (await request('/api/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      })) as { user: User; accessToken: string }
      handleAuthSuccess(data)
    },
    [handleAuthSuccess, request]
  )

  const logout = useCallback(async () => {
    await request('/api/logout', { method: 'POST' })
    setUser(null)
    setAccessToken(null)
  }, [request])

  const refresh = useCallback(async () => {
    try {
      const data = (await request('/api/refresh', { method: 'POST' })) as
        | { user: User; accessToken: string }
        | undefined
      if (data) {
        handleAuthSuccess(data)
      }
    } catch (error) {
      setUser(null)
      setAccessToken(null)
    }
  }, [handleAuthSuccess, request])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        await refresh()
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    })()
    return () => {
      mounted = false
    }
  }, [refresh])

  const value = useMemo(
    () => ({ user, accessToken, isLoading, login, register, logout, refresh }),
    [user, accessToken, isLoading, login, register, logout, refresh]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}
