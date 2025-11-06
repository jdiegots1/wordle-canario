import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'
import { useAlert } from '../context/AlertContext'

type FormValues = {
  password: string
  confirmPassword: string
}

const schema = z
  .object({
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const ResetPasswordPage = () => {
  const { resetPasswordMutation } = useAuth()
  const { showError, showSuccess } = useAlert()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { password: '', confirmPassword: '' } })

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

    if (!token) {
      showError('Token inválido')
      return
    }

    try {
      await resetPasswordMutation.mutateAsync({ token, password: result.data.password })
      showSuccess('Contraseña actualizada correctamente')
      navigate('/login', { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo restablecer la contraseña'
      showError(message)
    }
  })

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-3xl font-bold text-center">Restablecer contraseña</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Nueva contraseña
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
          disabled={resetPasswordMutation.isLoading}
          className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {resetPasswordMutation.isLoading ? 'Actualizando…' : 'Actualizar contraseña'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        ¿Recuerdas tu contraseña?{' '}
        <Link to="/login" className="text-green-700 underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}

export default ResetPasswordPage
