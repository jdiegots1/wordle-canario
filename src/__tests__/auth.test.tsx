import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AlertProvider } from '../context/AlertContext'
import LoginPage from '../pages/Login'

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    loginMutation: {
      mutateAsync: vi.fn().mockResolvedValue(undefined),
      isLoading: false,
    },
  }),
}))

describe('LoginPage', () => {
  it('validates email and password inputs', async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </AlertProvider>
      </QueryClientProvider>
    )

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'invalid' },
    })
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'short' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }))

    expect(await screen.findByText(/Correo inválido/)).toBeInTheDocument()
    expect(
      await screen.findByText(/La contraseña debe tener al menos 8 caracteres/)
    ).toBeInTheDocument()
  })
})
