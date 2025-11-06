import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'
import { useAlert } from '../context/AlertContext'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

const schema = z
  .object({
    email: z.string().email('Correo inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const RegisterPage = () => {
  const { registerMutation } = useAuth()
  const { showError, showSuccess } = useAlert()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
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
      const { email, password } = result.data
      await registerMutation.mutateAsync({ email, password })
      showSuccess('Cuenta creada, ¡bienvenido!')
      navigate('/', { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo crear la cuenta'
      showError(message)
    }
  })

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-3xl font-bold text-center">Crear cuenta</h1>
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
            autoComplete="new-password"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded border border-slate-300 px-3 py-2"
            {...register('confirmPassword')}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={registerMutation.isLoading}
          className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {registerMutation.isLoading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-green-700 underline">
          Inicia sesión
        </Link>
      </p>

      <div className="mt-6 text-center">
        <p className="text-sm font-semibold">¿Prefieres probarlo sin registrarte?</p>
        <Link
          to="/play"
          className="mt-2 inline-flex w-full justify-center rounded border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
        >
          Jugar sin registrarse
        </Link>
        <p className="mt-2 text-xs text-slate-500">Tus partidas se guardarán en este dispositivo.</p>
      </div>
    </div>
  )
}

export default RegisterPage
