import { MAX_CHALLENGES } from '../constants/settings'
import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
): GameStats => {
  const stats: GameStats = {
    ...gameStats,
    winDistribution: [...gameStats.winDistribution],
  }

  stats.totalGames += 1

  if (count >= MAX_CHALLENGES) {
    stats.currentStreak = 0
    stats.gamesFailed += 1
  } else if (count >= 0) {
    stats.winDistribution[count] = (stats.winDistribution[count] ?? 0) + 1
    stats.currentStreak += 1
    if (stats.bestStreak < stats.currentStreak) stats.bestStreak = stats.currentStreak
  }

  stats.successRate = getSuccessRate(stats)
  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  winDistribution: Array.from({ length: MAX_CHALLENGES }, () => 0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
}

export const loadStats = (): GameStats => {
  const s = loadStatsFromLocalStorage()
  if (!s) return defaultStats
  const dist = Array.from({ length: MAX_CHALLENGES }, (_, i) => Number(s.winDistribution?.[i] ?? 0))
  return { ...s, winDistribution: dist }
}

const getSuccessRate = (gameStats: GameStats): number => {
  const { totalGames, gamesFailed } = gameStats
  return Math.round((100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1))
}
