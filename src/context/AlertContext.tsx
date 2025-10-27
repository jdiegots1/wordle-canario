import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ALERT_TIME_MS } from '../constants/settings'

type AlertStatus = 'success' | 'error' | undefined

type ShowOptions = {
  persist?: boolean
  delayMs?: number
  durationMs?: number
  onClose?: () => void
}

type AlertContextValue = {
  status: AlertStatus
  message: string | null
  isVisible: boolean
  showSuccess: (message: string, options?: ShowOptions) => void
  showError: (message: string, options?: ShowOptions) => void
}

export const AlertContext = createContext<AlertContextValue | null>(null)

export const useAlert = () => {
  const ctx = useContext(AlertContext)
  if (!ctx) throw new Error('useAlert must be used within AlertProvider')
  return ctx
}

type Props = { children?: ReactNode }

export const AlertProvider = ({ children }: Props) => {
  const [status, setStatus] = useState<AlertStatus>('success')
  const [message, setMessage] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const delayRef = useRef<number | null>(null)
  const hideRef = useRef<number | null>(null)

  const clearTimers = () => {
    if (delayRef.current) {
      clearTimeout(delayRef.current)
      delayRef.current = null
    }
    if (hideRef.current) {
      clearTimeout(hideRef.current)
      hideRef.current = null
    }
  }

  useEffect(() => () => clearTimers(), [])

  const show = useCallback(
    (showStatus: AlertStatus, newMessage: string, options?: ShowOptions) => {
      const { delayMs = 0, persist, onClose, durationMs = ALERT_TIME_MS } = options || {}
      clearTimers()

      const run = () => {
        setStatus(showStatus)
        setMessage(newMessage)
        setIsVisible(true)

        if (!persist) {
          hideRef.current = window.setTimeout(() => {
            setIsVisible(false)
            onClose?.()
          }, durationMs)
        }
      }

      if (delayMs > 0) {
        delayRef.current = window.setTimeout(run, delayMs)
      } else {
        run()
      }
    },
    []
  )

  const showError = useCallback(
    (newMessage: string, options?: ShowOptions) => show('error', newMessage, options),
    [show]
  )

  const showSuccess = useCallback(
    (newMessage: string, options?: ShowOptions) => show('success', newMessage, options),
    [show]
  )

  return (
    <AlertContext.Provider
      value={{ status, message, isVisible, showError, showSuccess }}
    >
      {children}
    </AlertContext.Provider>
  )
}
