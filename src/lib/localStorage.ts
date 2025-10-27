// src/lib/localStorage.ts
const NEW_NS = 'wc';
const GAME_STATE_KEY = `${NEW_NS}:gameState:v1`;
const GAME_STATS_KEY = `${NEW_NS}:gameStats:v1`;
const HIGH_CONTRAST_KEY = `${NEW_NS}:highContrast`;

const LEGACY_GAME_STATE_KEY = 'gameState';
const LEGACY_GAME_STATS_KEY = 'gameStats';
const LEGACY_HIGH_CONTRAST_KEY = 'highContrast';

type StoredGameState = {
  guesses: string[];
  solution: string;
};

export type GameStats = {
  winDistribution: number[];
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalGames: number;
  successRate: number;
};

const ls = (): Storage | null => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
};

const readJSON = <T,>(key: string): T | null => {
  const store = ls();
  if (!store) return null;
  try {
    const raw = store.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const writeJSON = (key: string, value: unknown): void => {
  const store = ls();
  if (!store) return;
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {}
};

const isValidGameState = (v: any): v is StoredGameState =>
  v && Array.isArray(v.guesses) && typeof v.solution === 'string';

const isValidGameStats = (v: any): v is GameStats =>
  v &&
  Array.isArray(v.winDistribution) &&
  typeof v.gamesFailed === 'number' &&
  typeof v.currentStreak === 'number' &&
  typeof v.bestStreak === 'number' &&
  typeof v.totalGames === 'number' &&
  typeof v.successRate === 'number';

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  writeJSON(GAME_STATE_KEY, gameState);
};

export const loadGameStateFromLocalStorage = (): StoredGameState | null => {
  const fresh = readJSON<StoredGameState>(GAME_STATE_KEY);
  if (isValidGameState(fresh)) return fresh;

  const legacy = readJSON<StoredGameState>(LEGACY_GAME_STATE_KEY);
  if (isValidGameState(legacy)) {
    writeJSON(GAME_STATE_KEY, legacy);
    return legacy;
  }
  return null;
};

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  writeJSON(GAME_STATS_KEY, gameStats);
};

export const loadStatsFromLocalStorage = (): GameStats | null => {
  const fresh = readJSON<GameStats>(GAME_STATS_KEY);
  if (isValidGameStats(fresh)) return fresh;

  const legacy = readJSON<GameStats>(LEGACY_GAME_STATS_KEY);
  if (isValidGameStats(legacy)) {
    writeJSON(GAME_STATS_KEY, legacy);
    return legacy;
  }
  return null;
};

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  const store = ls();
  if (!store) return;
  try {
    if (isHighContrast) {
      store.setItem(HIGH_CONTRAST_KEY, '1');
      store.removeItem(LEGACY_HIGH_CONTRAST_KEY);
    } else {
      store.removeItem(HIGH_CONTRAST_KEY);
      store.removeItem(LEGACY_HIGH_CONTRAST_KEY);
    }
  } catch {}
};

export const getStoredIsHighContrastMode = (): boolean => {
  const store = ls();
  if (!store) return false;
  try {
    const v = store.getItem(HIGH_CONTRAST_KEY);
    if (v != null) return v === '1';
    const legacy = store.getItem(LEGACY_HIGH_CONTRAST_KEY);
    return legacy === '1';
  } catch {
    return false;
  }
};
