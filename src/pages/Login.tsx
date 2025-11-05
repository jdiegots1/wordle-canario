import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'
import { useAlert } from '../context/AlertContext'

type FormValues = {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

export const LoginPage = () => {
  const { loginMutation } = useAuth()
  const { showError, showSuccess } = useAlert()
  const navigate = useNavigate()
  const location = useLocation()
  const from = useMemo(() => (location.state as { from?: Location })?.from?.pathname ?? '/', [location.state])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    const result = schema.safeParse(values)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field && typeof field === 'string') {
          setError(field as keyof FormValues, { message: issue.message })
        }
      })
      return
    }

    try {
      await loginMutation.mutateAsync(result.data)
      showSuccess('Sesión iniciada correctamente')
      navigate(from, { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo iniciar sesión'
      showError(message)
    }
  })

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-3xl font-bold text-center">Iniciar sesión</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded border border-slate-300 px-3 py-2"
            {...register('email')}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded border border-slate-300 px-3 py-2"
            {...register('password')}
            autoComplete="current-password"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {loginMutation.isLoading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        <Link to="/forgot-password" className="text-green-700 underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <p className="mt-6 text-center text-sm">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-green-700 underline">
          Regístrate
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
