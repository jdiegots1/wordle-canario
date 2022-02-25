import { WORDS, DEFINITIONS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import { getGuessStatuses } from './statuses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)
    
    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
    }
  }
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 08:30:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  const solution = WORDS[index % WORDS.length].toUpperCase()
  const definition = DEFINITIONS[index % DEFINITIONS.length]

  return {
    solution: solution,
    definition: definition,
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, definition, solutionIndex, tomorrow } = getWordOfDay()
