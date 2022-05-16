import { ChartBarIcon, InformationCircleIcon, LightBulbIcon } from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
import WCLOGO from '../../assets/WORDLE_CANARIO_LOGO.png'
import twitter from '../../assets/twitter.png'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({ setIsInfoModalOpen, setIsStatsModalOpen }: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-banner px-5 py-2 bg-slate-200">
        <p className="text-sm color-red bold mx-10 text-center">
          CONSULTA LAS NOVEDADES DEL LUNES 16 DE MAYO{' '}<a href="CANARISMOS_DE_LA_SEMANA.png" className="underline font-bold">AQUÍ</a>.
        </p>
      </div>
      <div className="navbar-content px-5">
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />

        <div className="flex w-40 mx-auto items-center mb-5 mt-8">
        <img
          src={WCLOGO}
          alt=""
        />
        </div>
        <div className="right-icons">
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <div className="flex h-6 w-6 mx-auto">
            <a title="Twitter"
              href="https://twitter.com/wordlecanario"><img
              src={twitter}
              alt="" /></a></div>
            
          {/* <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          /> */}
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
