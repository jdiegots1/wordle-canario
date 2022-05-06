export const GAME_TITLE = 'Wordle Canario'

export const WIN_MESSAGES = [
  '¡Te mereces una verbena como Dios manda!', 'De loquísimos 👌', '¡Naaa, eres un puntal!'] 

export const GAME_COPIED_MESSAGE = 'Copiado al portapapeles'
export const NOT_ENOUGH_LETTERS_MESSAGE =
  'No hay suficientes letras'
export const WORD_NOT_FOUND_MESSAGE = ['Métele mano a eso, hermano. Prueba con otra palabra', 'Esa palabra 1, Las Palmas 2. ¡Sigue intentándolo!']
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `¡El conejo te esriscó la perra! La palabra era ${solution}`
export const WRONG_SPOT_MESSAGE = (letter: string, pos: number) =>
  `Debes usar ${letter} en la posición ${pos}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `La palabra debe contener ${letter}`
export const ENTER_TEXT = 'Palante'
export const DELETE_TEXT = 'Eliminar'
export const STATISTICS_TITLE = 'Estadísticas individuales'
export const GUESS_DISTRIBUTION_TEXT = 'Distribución de aciertos'
export const NEW_WORD_TEXT = 'Próximo canarismo en'
export const SHARE_TEXT = 'Compartir'
export const TOTAL_TRIES_TEXT = 'Total de jugadas'
export const SUCCESS_RATE_TEXT = 'Aciertos'
export const CURRENT_STREAK_TEXT = 'Racha actual'
export const BEST_STREAK_TEXT = 'Mejor racha'
export const ABOUT_GAME_MESSAGE = 'Sobre el juego'
export const ANTERIORES_GAME_MESSAGE = 'Canarismos anteriores'
export const PARTICIPA_GAME_MESSAGE = 'Participa'
export const TRANSPARENCIA_GAME_MESSAGE = 'Transparencia'
