import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { AlertProvider } from './context/AlertContext'
import { AuthProvider } from './context/AuthContext'

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

const renderWithProviders = (
  ui: React.ReactElement,
  { initialEntries = ['/'] }: { initialEntries?: string[] } = {}
) => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <AuthProvider>
          <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
        </AuthProvider>
      </AlertProvider>
    </QueryClientProvider>
  )
}

test('renders login page by default', async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({ ok: false, json: async () => ({}) }) as unknown as typeof fetch

  renderWithProviders(<App />)

  await waitFor(() => {
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument()
  })
})

test('permits jugar sin registrarse en la ruta pública', async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({ ok: false, json: async () => ({}) }) as unknown as typeof fetch

  renderWithProviders(<App />, { initialEntries: ['/play'] })

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /Jugar al Wordle Canario/i })).toBeInTheDocument()
  })
})
