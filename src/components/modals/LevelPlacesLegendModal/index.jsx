import React from 'react';
import { Modal, Button } from 'components';
import { LevelCard } from 'features/round';
import { PROGRAM_NAMES, PROGRAMS_PRICES, BUTTON_TYPES } from 'helpers/constants';
import ActiveLevels from 'assets/icons/active_levels.svg';
import FreezeLevels from 'assets/icons/freeze_levels.svg';
import TotalLevels from 'assets/icons/summ_levels.svg';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';
import { useTranslation } from 'next-i18next';
import { PlaceItem } from 'features/dashboard/Level/PlacesStats/PlaceItem';
import { INFO_DATA_LEVELCARD, INFO_DATA_CLONE } from 'helpers/round';

export const LevelPlacesLegendModal = ({ openedModal, onClose }) => {
  const { t } = useTranslation('common');
  const { isMobile } = useDetectChangeWindow();
  const info = [
    {
      title: `Lvl ${INFO_DATA_LEVELCARD?.level}`,
      text: t('levelNumber'),
    },
    {
      title: PROGRAMS_PRICES[PROGRAM_NAMES.GAME][INFO_DATA_LEVELCARD?.level],
      text: t('levelActivationAmountInBNB'),
    },
    {
      text: t('progressBarOfTheCurrentLineFillWhereYouRecieveBasicLevelRewards'),
      img: '/img/modals/progressBar-legend.png',
    },
    {
      text: t('amountOfCurrentlyActivePlacesEligibleForReceivedBasicLevelRewards'),
      icon: ActiveLevels,
    },
    {
      text: t('amountOfCurrentlyFrozenPlaces'),
      icon: FreezeLevels,
    },
    {
      text: t('totalAmountOfActivatedPlacesOnTheLevel'),
      icon: TotalLevels,
    },

    {
      text: t('indexNumberOfTheActivatedPlace'),
      img: '/img/modals/number-legend.png',
    },
    {
      text: t('indicationOfTheLineFillProgressInWhichThePlaceParticipated'),
      img: '/img/modals/lineFill-legend.png',
    },
    {
      text: t('indicationOfTheReceivedBasicRewardsWithinTheLine'),
      img: '/img/modals/lineFillMoney-legend.png',
    },
    {
      text: t('indicationOfTheMissedBasicRewardWithinTheLine'),
      img: '/img/modals/lineFillMissed-legend.png',
    },
    {
      text: t('indicationOfTheLinesLeftToGoForTheActivatedPlace'),
      img: '/img/modals/lineNone-legend.png',
    },
  ];

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full h-full rounded-2xl bg-black-light p-10 sm:rounded-none sm:p-5 sm:!pb-12 overflow-auto space-y-2.5">
        <span className="text-white font-meduim text-3xl sm:text-2xl"> {t('marketingLegend')} </span>
        <div className="relative flex items-center justify-start w-full sm:justify-center">
          <LevelCard
            key="test"
            isMobile={isMobile}
            isShowMissed={false}
            {...INFO_DATA_LEVELCARD}
            isAllowButton={false}
          />
          <div className="absolute w-full scale-75 border_round_1 -bottom-10 -right-10 z-10 text-white-500 max-w-250px sm:max-w-158px sm:relative sm:right-auto sm:bottom-auto sm:-ml-12">
            <PlaceItem {...INFO_DATA_CLONE} className="!max-w-full" />
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-auto space-y-2.5">
          {info?.map((item, index) => {
            const Icon = item?.icon;

            return (
              <div className="flex justify-start items-start" key={index}>
                {Icon && <Icon className={`w-5 h-5 mr-2.5 mt-1 flex-shrink-0 ${item?.iconColor}`} />}
                {item?.img && <img className="max-w-5 max-h-7.5 mr-2.5" src={item?.img} />}
                <div className="text-white text-base sm:text-sm">
                  <span className="font-medium"> {item?.title} </span> -{' '}
                  <span className="text-white-500"> {item?.text} </span>
                </div>
              </div>
            );
          })}
        </div>
        <Button type={BUTTON_TYPES?.WHITE_100} onClick={onClose}>
          {' '}
          {t('closeTip')}{' '}
        </Button>
      </div>
    </Modal>
  );
};
