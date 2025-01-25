import { useState, useEffect } from 'react';
import { Grid } from './components/grid/Grid';
import { Keyboard } from './components/keyboard/Keyboard';
import { InfoModal } from './components/modals/InfoModal';
import { StatsModal } from './components/modals/StatsModal';
import { AboutModal } from './components/modals/AboutModal';
import { AnterioresModal } from './components/modals/AnterioresModal';
import { WIN_MESSAGES, GAME_COPIED_MESSAGE, NOT_ENOUGH_LETTERS_MESSAGE, WORD_NOT_FOUND_MESSAGE, CORRECT_WORD_MESSAGE, ABOUT_GAME_MESSAGE, ANTERIORES_GAME_MESSAGE } from './constants/strings';
import { MAX_WORD_LENGTH, MAX_CHALLENGES, REVEAL_TIME_MS, GAME_LOST_INFO_DELAY, WELCOME_INFO_MODAL_MS } from './constants/settings';
import { isWordInWordList, isWinningWord, solution, unicodeLength } from './lib/words';
import { addStatsForCompletedGame, loadStats } from './lib/stats';
import { loadGameStateFromLocalStorage, saveGameStateToLocalStorage } from './lib/localStorage';
import { default as GraphemeSplitter } from 'grapheme-splitter';

import './App.css';
import { AlertContainer } from './components/alerts/AlertContainer';
import { useAlert } from './context/AlertContext';
import { Navbar } from './components/navbar/Navbar';

function App() {
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } = useAlert();
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAnterioresModalOpen, setIsAnterioresModalOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.solution !== solution) {
      return [];
    }
    const gameWasWon = loaded.guesses.includes(solution);
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true);
      showErrorAlert(CORRECT_WORD_MESSAGE(solution), { persist: true });
    }
    return loaded.guesses;
  });

  const [stats, setStats] = useState(() => loadStats());
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  useEffect(() => {
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, WELCOME_INFO_MODAL_MS);
    }
  }, []);

  const clearCurrentRowClass = () => {
  // Eliminar cualquier clase de fila actual
  // Esta es la función que hemos definido
};

const onChar = (value: string) => {
  if (unicodeLength(`${currentGuess}${value}`) <= MAX_WORD_LENGTH && guesses.length < MAX_CHALLENGES && !isGameWon) {
    setCurrentGuess(`${currentGuess}${value}`);
  }
};

const onEnter = () => {
  if (isGameWon || isGameLost) {
    return;
  }

  if (!(unicodeLength(currentGuess) === MAX_WORD_LENGTH)) {
    clearCurrentRowClass(); // Usamos la función definida aquí
    return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
      onClose: clearCurrentRowClass,
    });
  }

  if (!isWordInWordList(currentGuess)) {
    clearCurrentRowClass(); // Usamos la función definida aquí
    return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
      onClose: clearCurrentRowClass,
    });
  }

  setIsRevealing(true);
  setTimeout(() => {
    setIsRevealing(false);
  }, REVEAL_TIME_MS * MAX_WORD_LENGTH);

  const winningWord = isWinningWord(currentGuess);

  if (unicodeLength(currentGuess) === MAX_WORD_LENGTH && guesses.length < MAX_CHALLENGES && !isGameWon) {
    setGuesses([...guesses, currentGuess]);
    setCurrentGuess('');

    if (winningWord) {
      setStats(addStatsForCompletedGame(stats, guesses.length));
      return setIsGameWon(true);
    }

    if (guesses.length === MAX_CHALLENGES - 1) {
      setStats(addStatsForCompletedGame(stats, guesses.length + 1));
      setIsGameLost(true);
      showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
        delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
      });
    }
  }
};

  const handleStartGame = () => {
    setIsWelcomeModalOpen(false);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={(value: boolean): void => {}}
      />

      {isWelcomeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-lg w-full sm:max-w-md sm:p-4">
            <p className="text-lg font-medium mb-4">
              ¡Hola! 🙌 Soy Diego Tejera, creador del Wordle Canario.<br /><br />
              Si te lo pasas bien jugando y te gustaría apoyar el proyecto de forma opcional...<br /><br />
              <a href="https://www.paypal.com/paypalme/wordlecanario" target="_blank" className="text-indigo-600 font-semibold">
                ¡Puedes invitarme a un cafecito ☕ haciendo clic aquí!
              </a>
              <br /><br />
              Gracias por formar parte de esta aventura. ¡Sigue disfrutando del Wordle Canario! 🌟
            </p>
            <button
              onClick={handleStartGame}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Continuar al juego
            </button>
            <button
              onClick={() => setIsStatsModalOpen(true)}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Mis Estadísticas
            </button>
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cómo jugar
            </button>
          </div>
        </div>
      )}

      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
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
        <StatsModal isOpen={isStatsModalOpen} handleClose={() => setIsStatsModalOpen(false)} stats={stats} />
        <AboutModal isOpen={isAboutModalOpen} handleClose={() => setIsAboutModalOpen(false)} />
        <AnterioresModal
          isOpen={isAnterioresModalOpen}
          handleClose={() => setIsAnterioresModalOpen(false)}
        />
        <AlertContainer />
      </div>
    </div>
  );
}

export default App;
