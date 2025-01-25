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
  setIsSettingsModalOpen,
}: Props) => {
  return (
    <div className="navbar">
  <div className="navbar-banner px-5 py-2 bg-slate-200">
    <p className="text-sm color-red bold mx-10 text-center">
      ¿Te gusta el Wordle Canario? ¡Puedes apoyarme para mantenerlo en marcha! 😊{' '}
      <a href="https://www.paypal.com/paypalme/wordlecanario" className="underline font-bold text-lg text-green-600">
        ¡Hazlo aquí!
      </a>
    </p>
  </div>
</div>
      <div className="navbar-content px-5">
        <div className="flex items-center cursor-pointer" onClick={() => setIsInfoModalOpen(true)}>
          <InformationCircleIcon
            className="h-6 w-6 mr-2 dark:stroke-white"
          />
        </div>

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
