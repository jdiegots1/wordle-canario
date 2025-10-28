import { useState, useEffect, useMemo, useRef } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { AboutModal } from './components/modals/AboutModal'
import {
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  ABOUT_GAME_MESSAGE,
} from './constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  unicodeLength,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'

function App() {
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } = useAlert()

  // --- Core game state ---
  const [hydrated, setHydrated] = useState(false)
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [stats, setStats] = useState(() => loadStats())

  // --- UI gates / modals ---
  const [isWelcomeScreenOpen, setIsWelcomeScreenOpen] = useState(true)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [fromWelcomeScreen, setFromWelcomeScreen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [accessedFromBlock, setAccessedFromBlock] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)

  // --- Utils / refs ---
  const splitter = useMemo(() => new GraphemeSplitter(), [])
  const revealTimeoutRef = useRef<number | null>(null)
  const lostStatsTimeoutRef = useRef<number | null>(null)
  const infoTimeoutRef = useRef<number | null>(null)

  // --- Hydration from localStorage (safe: no setState during render) ---
  useEffect(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded && loaded.solution === solution) {
      setGuesses(loaded.guesses)

      const gameWasWon = loaded.guesses.includes(solution)
      if (gameWasWon) {
        setIsGameWon(true)
      } else if (loaded.guesses.length === MAX_CHALLENGES) {
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), { persist: true })
      }
    }
    setHydrated(true)
  }, [showErrorAlert])

  // --- First-visit HOW-TO modal (with cleanup) ---
  useEffect(() => {
    const hasState = !!loadGameStateFromLocalStorage()
    if (!hasState) {
      const id = window.setTimeout(() => setIsInfoModalOpen(true), WELCOME_INFO_MODAL_MS)
      infoTimeoutRef.current = id
      return () => {
        if (infoTimeoutRef.current) window.clearTimeout(infoTimeoutRef.current)
      }
    }
  }, [])

  // --- Facebook nudge (persisted) ---
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenFacebookModal')
    setIsQuestionModalOpen(hasSeen === 'true' ? false : true)
  }, [])

  // --- Persist game state ---
  useEffect(() => {
    if (!hydrated) return
    saveGameStateToLocalStorage({ guesses, solution })
  }, [hydrated, guesses, solution])

  // --- Win/Lose side-effects with cleanup ---
  useEffect(() => {
    if (isGameWon) {
      const winMessage = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }
  }, [isGameWon, showSuccessAlert])

  useEffect(() => {
    if (!isGameLost) return
    const id = window.setTimeout(() => setIsStatsModalOpen(true), GAME_LOST_INFO_DELAY)
    lostStatsTimeoutRef.current = id
    return () => {
      if (lostStatsTimeoutRef.current) window.clearTimeout(lostStatsTimeoutRef.current)
    }
  }, [isGameLost])

  // --- Cleanup on unmount (reveal timeout) ---
  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current)
      if (lostStatsTimeoutRef.current) window.clearTimeout(lostStatsTimeoutRef.current)
      if (infoTimeoutRef.current) window.clearTimeout(infoTimeoutRef.current)
    }
  }, [])

  const clearCurrentRowClass = () => setCurrentRowClass('')

  // --- Handlers ---
  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon &&
      !isGameLost
    ) {
      setCurrentGuess((prev) => `${prev}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess((prev) => splitter.splitGraphemes(prev).slice(0, -1).join(''))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) return

    if (unicodeLength(currentGuess) !== MAX_WORD_LENGTH) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, { onClose: clearCurrentRowClass })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, { onClose: clearCurrentRowClass })
    }

    setIsRevealing(true)
    if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current)
    revealTimeoutRef.current = window.setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH)

    const winning = isWinningWord(currentGuess)

    setGuesses((prev) => {
      const next = [...prev, currentGuess]

      if (winning) {
        setStats((s) => addStatsForCompletedGame(s, prev.length))
        setIsGameWon(true)
      } else if (prev.length === MAX_CHALLENGES - 1) {
        setStats((s) => addStatsForCompletedGame(s, prev.length + 1))
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        })
      }

      return next
    })

    setCurrentGuess('')
  }

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false)
    if (fromWelcomeScreen) {
      setIsWelcomeScreenOpen(true)
      setFromWelcomeScreen(false)
    }
  }

  const handleCloseStatsModal = () => {
    setIsStatsModalOpen(false)
    if (accessedFromBlock) {
      setIsWelcomeScreenOpen(true)
      setAccessedFromBlock(false)
    }
  }

  if (!hydrated) return null

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
      />

      {isWelcomeScreenOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-label="Pantalla de bienvenida"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-lg w-full sm:max-w-md sm:p-4">
            <div className="mb-4">
              <img
                src="/WORDLE_CANARIO_LOGO.png"
                alt="Logo de Wordle Canario"
                className="w-24 mx-auto"
              />
            </div>

            <p className="text-xs sm:text-sm font-medium mb-4">
              <strong>¡Bienvenido al Wordle Canario! 🌴</strong>
            </p>

            <p className="text-xs sm:text-sm font-medium mb-4">
              El juego inspirado en el famoso Wordle, pero con <strong>nuestro toque</strong>.
            </p>

            <p className="text-xs sm:text-sm font-medium mb-4">
              El juego está en constante mantenimiento para seguir mejorando tu experiencia.{' '}
              <strong>Estoy trabajando en nuevos juegos</strong> para que puedas disfrutar aún más, y lo
              mejor de todo es que <strong><u>puedes jugar sin publicidad</u></strong>.{' '}
              <strong>Tu apoyo es esencial</strong> para poder seguir ofreciendo juegos gratuitos y de calidad.
            </p>

            <p className="text-xs sm:text-sm font-medium mb-4">
              Así que, si te gusta el juego, ¡puedes apoyarme donando en{' '}
              <a
                href="https://www.paypal.me/wordlecanario"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500"
              >
                www.paypal.me/wordlecanario
              </a>
              !
            </p>

            <div className="grid grid-cols-3 gap-4 items-center">
              <button
                type="button"
                onClick={() => {
                  setIsInfoModalOpen(true)
                  setIsWelcomeScreenOpen(false)
                  setFromWelcomeScreen(true)
                }}
                className="flex flex-col items-center cursor-pointer text-indigo-600 hover:text-indigo-700"
                aria-label="Cómo jugar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm mt-2">Cómo jugar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAccessedFromBlock(true)
                  setIsStatsModalOpen(true)
                  setIsWelcomeScreenOpen(false)
                }}
                className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-700"
                aria-label="Mis estadísticas"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                </svg>
                <span className="text-sm mt-2">Mis estadísticas</span>
              </button>

              <button
                type="button"
                onClick={() => setIsWelcomeScreenOpen(false)}
                className="flex flex-col items-center cursor-pointer text-blue-600 hover:text-blue-700"
                aria-label="Jugar al Wordle Canario"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                  <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                </svg>
                <span className="text-sm mt-2">Jugar al Wordle Canario</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal nueva página de Facebook */}
      {isQuestionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-label="Nueva página de Facebook"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-lg w-full sm:max-w-md sm:p-4">
            <p className="text-lg font-bold">¡Tenemos una nueva página de Facebook! 📘🌟</p>
            <p className="text-md mt-4">
              📱 Ahora puedes contactar conmigo de forma más sencilla a través de nuestra página de Facebook.
            </p>
            <p className="text-md mt-2">
              ¡Síguenos para estar al tanto de las últimas novedades, actualizaciones y más!
            </p>

            <a
              href="https://www.facebook.com/profile.php?id=61572247307263"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 px-3 py-1.5 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300 text-sm"
            >
              Ir al Facebook
            </a>

            <button
              type="button"
              onClick={() => {
                setIsQuestionModalOpen(false)
                localStorage.setItem('hasSeenFacebookModal', 'true')
              }}
              className="block mx-auto mt-4 px-3 py-1.5 bg-gray-600 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300 text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="pt-1 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6">
          <Grid
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
          />
        </div>

        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          isRevealing={isRevealing}
        />

        <InfoModal isOpen={isInfoModalOpen} handleClose={handleCloseInfoModal} />

        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={handleCloseStatsModal}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
          isHardMode={false}
          isDarkMode={false}
          isHighContrastMode={false}
        />

        <AboutModal
          isOpen={isAboutModalOpen}
          handleClose={() => setIsAboutModalOpen(false)}
        />

        <div className="flex">
          <div className="w-1/4 p-0" />
          <div className="w-1/4 p-0">
            <button
              type="button"
              className="mx-auto mt-4 flex px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
              onClick={() => setIsAboutModalOpen(true)}
            >
              {ABOUT_GAME_MESSAGE}
            </button>
          </div>
          <div className="w-1/4 p-0" />
        </div>

        <AlertContainer />
      </div>
    </div>
  )
}

export default App
