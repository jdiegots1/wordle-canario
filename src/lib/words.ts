import { WORDS, DEFINITIONS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import GraphemeSplitter from 'grapheme-splitter'

const splitter = new GraphemeSplitter()

export const isWordInWordList = (word: string) => {
  const w = localeAwareLowerCase(word)
  return WORDS.includes(w) || VALID_GUESSES.includes(w)
}

export const isWinningWord = (word: string) => {
  return solution === localeAwareUpperCase(word)
}

export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) return false

  const lettersLeftArray: string[] = []
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  for (const letter of splitWord) {
    const n = lettersLeftArray.indexOf(letter)
    if (n !== -1) lettersLeftArray.splice(n, 1)
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return splitter.splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordOfDay = () => {
  const epochMs = new Date('February 6, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  const idx = index % WORDS.length
  const solution = localeAwareUpperCase(WORDS[idx])
  const definition = DEFINITIONS[idx] ?? ''

  return {
    solution,
    definition,
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, definition, solutionIndex, tomorrow } = getWordOfDay()
