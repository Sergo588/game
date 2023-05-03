import React, { useEffect, useMemo, useState } from 'react';
import { LevelCard } from 'features/round';
import { useTranslation } from 'next-i18next';
import { capitalize, isNil } from 'lodash';
import { useSelector } from 'react-redux';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import { BUTTON_TYPES, ROUND_1, ROUND_2, ROUND_NAMES } from 'helpers/constants';
import { ROUND_STYLES } from 'helpers/round';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';
import CloseIcon from 'assets/icons/close.svg';
import WarningIcon from 'assets/icons/warning.svg';
import { Switcher, Button, AnimatedNumber } from 'components';
import QuestionIcon from 'assets/icons/question.svg';
import { useModal } from 'helpers/hooks/useModal';
import { LevelCardLegendModal } from 'components/modals';
import { useShadowLevelsApi } from 'helpers/hooks/useShadowLevelsApi';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';
import { useUpdateDashboardProfile } from 'helpers/hooks/useUpdateDashboardProfile';
import { PlaceholderLevelCard } from '../LevelCard/Placeholder';

const getTabBackgroundStyle = (round, isActive) => {
  if (isActive && round === 1) {
    return 'round1_big_tab';
  }
  if (isActive && round === 2) {
    return 'round2_big_tab';
  }

  return 'bg-dark-950';
};

export const Levels = ({ fill }) => {
  const [program, setProgram] = useState(ROUND_2);
  const { t } = useTranslation('common');
  const { isMobile } = useDetectChangeWindow();
  const [openedTotalMissed, setOpenedTotalMissed] = useState(true);
  const [activeSwitcher, setActiveSwitcher] = useState(true);
  const { openedModal, onOpen, onClose } = useModal();

  const roundStyles = ROUND_STYLES[program];
  const activeStyle = `rounded-3px font-medium cursor-pointer ${roundStyles.gradient}`;
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const user = previewAccount.id || authProfile?.id;

  const { rounds, isLoadingOnTabOrFirst, callProgramRounds, onAddQueue, clearState, onShadowFetch } =
    useShadowLevelsApi({
      user,
      program,
    });

  useUpdateDashboardProfile(onShadowFetch);

  const programInfo = useMemo(() => {
    return rounds?.programs?.find((programItem) => programItem.program === program) || {};
  }, [rounds, program]);

  const toggleSwitcher = async () => {
    setActiveSwitcher((prev) => !prev);
  };

  const onSwitchRound = (round) => () => {
    setProgram(round);
    callProgramRounds();
  };

  useEffect(() => {
    if (!isLoadingOnTabOrFirst) {
      callProgramRounds();
    }
  }, [program]);

  useComponentDidUpdate(
    (prev) => {
      if (prev.user !== user) {
        clearState();
        callProgramRounds();
      }
    },
    {
      user,
    },
  );

  const roundsList = [ROUND_1, ROUND_2];

  const renderContent = useMemo(() => {
    return programInfo?.levels?.map((item) => (
      <LevelCard
        key={`${item.level}_${user}`}
        onFetchLevels={callProgramRounds}
        program={program}
        percent={fill[item.level - 1]}
        isMobile={isMobile}
        isShowMissed={activeSwitcher}
        onNewLine={onAddQueue}
        className="m-2.5 sm:m-2"
        {...item}
      />
    ));
  });

  const renderPlaceholder = useMemo(() => {
    return Array.from(new Array(18)).map((item, index) => <PlaceholderLevelCard key={index} />);
  });

  const styleBg = {
    backgroundImage: `url('${roundStyles?.dashboard?.wrapperBlur}')`,
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
  };

  return (
    <div className="flex flex-col">
      {openedTotalMissed && !!rounds?.total_missed_revenue && (
        <div className="flex sm:px-5 w-full mb-10">
          <div className="flex w-full py-5 bg-black-light rounded-small relative items-center justify-center sm:px-4.5 sm:pt-9">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <WarningIcon className="h-6 w-6 flex-shrink-0" />
              <span className="text-red text-base leading-22px sm:text-sm">
                <b>{rounds.total_missed_revenue} BNB</b> {t('dashboardInTotalMissed')}
              </span>
            </div>
            <div
              onClick={() => setOpenedTotalMissed(false)}
              className="absolute bg-white-100 cursor-pointer rounded-full right-3 p-1.5 sm:top-2.5"
            >
              <CloseIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
      <span className="text-white font-medium text-4xl leading-36px sm:text-2xl sm:leading-7 sm:px-5">
        {t('smartGamePro')}
      </span>
      <div className="mt-5 flex w-full">
        {roundsList?.map((item, index) => {
          const currentRoundName = ROUND_NAMES[item];
          const currentRound = index + 1;
          const isActive = program === item;

          return (
            <div
              key={index}
              className={`${getTabBackgroundStyle(
                currentRound,
                isActive,
              )} leading-30px z-10 px-7.5 cursor-pointer w-50% h-70px rounded-t-small flex items-center font-medium justify-between sm:flex-col sm:items-start sm:justify-end sm:px-5`}
              onClick={onSwitchRound(item)}
            >
              <span className={`${isActive ? 'text-white' : 'text-gray-400'} text-3xl sm:text-18px`}>
                {currentRoundName} {capitalize(t('round', { lng: 'en' }))}
              </span>
              {!isNil(rounds?.total_revenue) && (
                <div
                  className={`${
                    isActive ? 'text-yellow' : 'text-yellow-250'
                  } text-quarter-2xl leading-36px text-right text-yellow font-normal lg:text-left sm:text-2xl sm:leading-7 sm:text-12px`}
                >
                  <AnimatedNumber value={rounds?.programs?.[index]?.total_revenue} fixedNums={4} /> BNB
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="relative bg-black-light rounded-b-small p-7.5 mt-0 w-full ml-auto overflow-hidden sm:p-5">
        <div className="mt-4 flex flex-wrap justify-center relative z-two -m-2.5 sm:-mx-2 sm:justify-around">
          {isLoadingOnTabOrFirst ? renderPlaceholder : renderContent}
        </div>
        <div className="flex justify-between mt-7 items-center w-full sm:flex-col sm:space-y-7.5">
          <div
            className={`relative z-two flex bg-gray-950 rounded-7px !sm:mr-auto space-x-2.5 rtl:space-x-reverse p-6px flex-shrink-0 mr-5 rtl:mr-0 rtl:ml-5 sm:rtl:ml-0 sm:mr-0 items-center ${roundStyles.switcher} sm:w-100%`}
          >
            {roundsList?.map((item, index) => {
              const currentRoundName = ROUND_NAMES[item];
              const isActive = program === item;

              return (
                <div
                  key={index}
                  className={`${isActive && activeStyle} ${
                    !index && 'mr-15px rtl:mr-0 rtl:ml-15px'
                  } leading-30px z-10 px-2.5 cursor-pointer text-white sm:w-100% sm:justify-center sm:flex`}
                  onClick={onSwitchRound(item)}
                >
                  {currentRoundName} {capitalize(t('round', { lng: 'en' }))}
                </div>
              );
            })}
          </div>
          <div className="z-two flex justify-between items-center space-x-3 w-75% sm:w-full">
            <Button
              type={BUTTON_TYPES?.WHITE_300}
              onClick={onOpen}
              className="py-0 px-2.5 rounded-5px !sm:mr-auto sm:!p-0 sm:w-130px space-x-2 sm:space-x-0 rtl:space-x-reverse"
            >
              <QuestionIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="leading-30px font-normal sm:text-12px">Level legend info</span>
            </Button>
            {(programInfo?.missed_ref_bonus > 0 || programInfo?.missed_revenue > 0) && (
              <div className="flex justify-end">
                <Switcher title={t('showMissed')} onChange={toggleSwitcher} checked={activeSwitcher} />
              </div>
            )}
          </div>
        </div>
        <div className="absolute w-full h-full inset-0 z-0" style={styleBg} />
      </div>
      <LevelCardLegendModal openedModal={openedModal} onClose={onClose} />
    </div>
  );
};
