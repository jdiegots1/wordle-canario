import { ChartBarIcon, InformationCircleIcon, LightBulbIcon } from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
import WCLOGO from '../../assets/WORDLE_CANARIO_LOGO.png'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,  // Asegúrate de que esto esté aquí
}: Props) => {
  return (
    <div className="navbar">
      {/* Eliminamos la sección de novedades del 16 de mayo */}
      <div className="navbar-banner px-5 py-2 bg-slate-200">
        <p className="text-sm color-red bold mx-10 text-center">
          Si te gusta este proyecto y quieres ayudarme a pagarme un café, puedes hacerlo{' '}
          <a href="https://buymeacoffee.com/wordlecanario" className="underline font-bold">
            AQUÍ
          </a>.
        </p>
      </div>
      <div className="navbar-content px-5">
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />

        <div className="flex w-40 mx-auto items-center mb-5 mt-8">
          <img src={WCLOGO} alt="Logo" />
        </div>
        
        <div className="right-icons">
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <LightBulbIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)} // Asegúrate de llamar esta función
          />
        </div>
      </div>
      <hr />
    </div>
  )
}
