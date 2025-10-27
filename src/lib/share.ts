import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { MAX_CHALLENGES } from '../constants/settings'
import { UAParser } from 'ua-parser-js'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable', 'tablet']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

export const shareStatus = async (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShareToClipboard: () => void
) => {
  const textToShare =
    `🇮🇨 wordlecanario.com #${solutionIndex} ${lost ? 'X' : guesses.length}/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
    generateEmojiGrid(guesses, getEmojiTiles(isDarkMode, isHighContrastMode)) +
    '\n\n#WordleCanario'

  const shareData = { text: textToShare }
  const canUseWebShare = attemptShare(shareData)

  try {
    if (canUseWebShare) {
      await navigator.share(shareData as any)
      fetch('https://api.countapi.xyz/hit/wordlecanario.com/sharetotal')
      fetch('https://api.countapi.xyz/hit/wordlecanario.com/sharefancy')
      return
    }
  } catch {}

  try {
    await navigator.clipboard.writeText(textToShare)
  } catch {}
  handleShareToClipboard()
  fetch('https://api.countapi.xyz/hit/wordlecanario.com/sharetotal')
  fetch('https://api.countapi.xyz/hit/wordlecanario.com/shareclipboard')
}

export const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return tiles[0]
            case 'present':
              return tiles[1]
            default:
              return tiles[2]
          }
        })
        .join('')
    })
    .join('\n')
}

const attemptShare = (shareData: object) => {
  if (typeof navigator === 'undefined') return false
  const isFirefox = !!browser.name && browser.name.toUpperCase().includes('FIREFOX')
  const supportedDevice = webShareApiDeviceTypes.includes(device.type ?? '')
  const hasApi =
    typeof (navigator as any).canShare === 'function' &&
    (navigator as any).canShare(shareData) &&
    typeof (navigator as any).share === 'function'
  return !isFirefox && supportedDevice && hasApi
}

export const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  if (isHighContrastMode) return ['🟦', '🟧', isDarkMode ? '⬛' : '⬜']
  return ['🟩', '🟨', isDarkMode ? '⬛' : '⬜']
}
