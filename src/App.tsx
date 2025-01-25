import { useState, useEffect } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { AboutModal } from './components/modals/AboutModal'
import { AnterioresModal } from './components/modals/AnterioresModal'
import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'

function MainPage({ onStartGame, onShowStats, onShowHowToPlay }: any) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">¡Bienvenido al Wordle Canario!</h1>
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://www.paypal.com/paypalme/wordlecanario"
          target="_blank"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Invítame a un café ☕
        </a>
        <button
          onClick={onStartGame}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Entrar al juego
        </button>
        <button
          onClick={onShowStats}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Ver mis estadísticas
        </button>
        <button
          onClick={onShowHowToPlay}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Cómo jugar
        </button>
      </div>
    </div>
  )
}

function App() {
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } = useAlert()
  const [isMainPageVisible, setIsMainPageVisible] = useState(true)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)

  const onStartGame = () => setIsMainPageVisible(false)
  const onShowStats = () => setIsStatsModalOpen(true)
  const onShowHowToPlay = () => setIsInfoModalOpen(true)

  return (
    <div className="h-screen flex flex-col">
      {isMainPageVisible ? (
        <MainPage
          onStartGame={onStartGame}
          onShowStats={onShowStats}
          onShowHowToPlay={onShowHowToPlay}
        />
      ) : (
        <>
          <Navbar
            setIsInfoModalOpen={setIsInfoModalOpen}
            setIsStatsModalOpen={setIsStatsModalOpen}
          />
          <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
            <Grid /* props aquí */ />
            <Keyboard /* props aquí */ />
          </div>
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
          />
          <AboutModal
            isOpen={isAboutModalOpen}
            handleClose={() => setIsAboutModalOpen(false)}
          />
        </>
      )}
    </div>
  )
}

export default App
