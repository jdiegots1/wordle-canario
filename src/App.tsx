import { Routes, Route, Navigate } from 'react-router-dom'
import GamePage from './pages/Game'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ForgotPasswordPage from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPassword'
import { PrivateRoute } from './components/routing/PrivateRoute'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAuth } from './hooks/useAuth'

const Logout = () => {
  const { logoutMutation } = useAuth()

  if (!logoutMutation.isLoading && !logoutMutation.isSuccess) {
    logoutMutation.mutate()
  }

  return <Navigate to="/login" replace />
}

const App = () => {
  return (
    <>
      <AlertContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <GamePage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
