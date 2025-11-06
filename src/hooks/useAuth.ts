import { useMutation } from '@tanstack/react-query'
import { useAuthContext } from '../context/AuthContext'

type Credentials = {
  email: string
  password: string
}

type ResetPayload = {
  token: string
  password: string
}

type ForgotPayload = {
  email: string
}

export const useAuth = () => {
  const auth = useAuthContext()

  const loginMutation = useMutation<void, Error, Credentials>({
    mutationFn: auth.login,
  })

  const registerMutation = useMutation<void, Error, Credentials>({
    mutationFn: auth.register,
  })

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: auth.logout,
  })

  const refreshMutation = useMutation<void, Error, void>({
    mutationFn: auth.refresh,
  })

  const forgotPasswordMutation = useMutation<void, Error, ForgotPayload>({
    mutationFn: async ({ email }) => {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error ?? 'No se pudo enviar el correo')
      }
    },
  })

  const resetPasswordMutation = useMutation<void, Error, ResetPayload>({
    mutationFn: async ({ token, password }) => {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error ?? 'No se pudo restablecer la contraseña')
      }
    },
  })

  return {
    ...auth,
    loginMutation,
    registerMutation,
    logoutMutation,
    refreshMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
  }
}
