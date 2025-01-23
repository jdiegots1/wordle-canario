import { ChartBarIcon, InformationCircleIcon, LightBulbIcon } from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
import WCLOGO from '../../assets/WORDLE_CANARIO_LOGO.png'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

const Navbar = ({ setIsInfoModalOpen, setIsStatsModalOpen, setIsSettingsModalOpen }: Props) => {
  return (
    <div>
      <div className="flex w-40 mx-auto items-center mb-5 mt-8">
        <img src={WCLOGO} alt="" />
      </div>
      <div className="right-icons">
        <ChartBarIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        {/* <CogIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsSettingsModalOpen(true)}
        /> */}
      </div>
      <hr />
    </div>
  )
}

export default Navbar
