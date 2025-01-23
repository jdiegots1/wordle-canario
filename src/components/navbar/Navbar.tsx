import { ChartBarIcon, InformationCircleIcon, LightBulbIcon } from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
import WCLOGO from '../../assets/WORDLE_CANARIO_LOGO.png'
import twitter from '../../assets/x.png'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
};

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
