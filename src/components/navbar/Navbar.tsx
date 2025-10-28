import { ChartBarIcon, InformationCircleIcon } from '@heroicons/react/outline'
import WCLOGO from '../../assets/WORDLE_CANARIO_LOGO.png'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
}: Props) => {
  return (
    <header className="w-full">
      <div className="px-3 py-0.5 bg-slate-200">
        <p className="text-xs md:text-sm text-center leading-tight">
          ¿Te gusta el Wordle Canario? ¡Puedes apoyarme!{' '}
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

      <div className="px-3 md:px-5 h-12 md:h-14 flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setIsInfoModalOpen(true)}
          className="p-1.5 shrink-0"
          aria-label="Información y cómo jugar"
          title="Información"
        >
          <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-900 dark:text-white" />
        </button>

        <div className="flex-1 flex items-center justify-center min-w-0 h-full">
          <img
            src={WCLOGO}
            alt="Wordle Canario"
            className="h-full w-auto select-none pointer-events-none"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsStatsModalOpen(true)}
            className="p-1.5"
            aria-label="Ver estadísticas"
            title="Estadísticas"
          >
            <ChartBarIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>
    </header>
  )
}
