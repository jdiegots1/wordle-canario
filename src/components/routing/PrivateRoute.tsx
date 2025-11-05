import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

interface Props {
  children: ReactNode
}

export const PrivateRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuthContext()
  const location = useLocation()

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Cargando…</div>
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
