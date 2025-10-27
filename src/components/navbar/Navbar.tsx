import { ChartBarIcon, InformationCircleIcon, LightBulbIcon } from '@heroicons/react/outline'
import WCLOGO from '../../assets/WORDLE_CANARIO_LOGO.png'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  return (
    <header className="w-full">
      <div className="px-5 py-2 bg-slate-200">
        <p className="text-sm text-center">
          ¿Te gusta el Wordle Canario? ¡Puedes apoyarme para mantenerlo en marcha! 😊{' '}
          <a
            href="https://www.paypal.com/paypalme/wordlecanario"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold text-green-600"
          >
            ¡Hazlo aquí!
          </a>
        </p>
      </div>

      <div className="px-5 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsInfoModalOpen(true)}
          className="p-1"
          aria-label="Información y cómo jugar"
          title="Información"
        >
          <InformationCircleIcon className="h-6 w-6 text-gray-900 dark:text-white" />
        </button>

        <div className="w-40 mx-auto flex items-center justify-center">
          <img src={WCLOGO} alt="Wordle Canario" className="block w-full h-auto" />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsStatsModalOpen(true)}
            className="p-1"
            aria-label="Ver estadísticas"
            title="Estadísticas"
          >
            <ChartBarIcon className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
          <button
            type="button"
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-1"
            aria-label="Ajustes"
            title="Ajustes"
          >
            <LightBulbIcon className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-700" />
    </header>
  )
}
