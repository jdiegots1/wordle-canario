import { ChartBarIcon, InformationCircleIcon, LightBulbIcon } from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings';
import WCLOGO from '../../assets/WORDLE_CANARIO_LOGO.png';
import twitter from '../../assets/x.png';

type Props = {
  setIsInfoModalOpen: (value: boolean) => void;
  setIsStatsModalOpen: (value: boolean) => void;
  setIsSettingsModalOpen: (value: boolean) => void;
};

export const Navbar = ({ setIsInfoModalOpen, setIsStatsModalOpen }: Props) => {
  return (
    <div>
      {/* Logo Section */}
      <div className="flex w-40 mx-auto items-center mb-5 mt-8">
        <img src={WCLOGO} alt="Wordle Canario Logo" />
      </div>
      
      {/* Right Icons */}
      <div className="right-icons">
        <ChartBarIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <div className="flex h-6 w-6 mx-auto">
          <a
            title="Twitter"
            href="https://twitter.com/wordlecanario"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="Twitter" />
          </a>
        </div>

        {/* Uncomment if needed */}
        {/* <CogIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsSettingsModalOpen(true)}
        /> */}
      </div>
      
      <hr />
    </div>
  );
};
