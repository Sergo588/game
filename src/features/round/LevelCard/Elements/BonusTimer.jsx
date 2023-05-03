import React, { useMemo } from 'react';
import TimerIcon from 'assets/icons/clock_white.svg';
import { BonusTimerModal } from 'components/modals/BonusTimerModal';
import { useModal } from 'helpers/hooks/useModal';

export const BonusTimer = ({
  timeWithDelay,
  level,
  isLevelPage = false,
  isAvailableLevel = false,
  isAvailableBonus = false,
}) => {
  const { openedModal, onOpen, onClose } = useModal();

  const timerColor = useMemo(() => (isAvailableBonus ? 'green-650' : 'red'), [isAvailableBonus]);
  const customPadding = useMemo(() => {
    if (isLevelPage) {
      return 'top-2.5 right-2.5 sm:top-10';
    } else {
      return 'top-1.5 right-1.5 sm:top-3';
    }
  }, [isLevelPage]);

  const size = useMemo(() => {
    if (isLevelPage) {
      return {
        icon: 'w-6 h-6',
        wrapper: 'w-10 h-10',
      };
    }
    return {
      icon: 'w-4 h-4 mb-[1px]',
      wrapper: 'w-6 h-6',
    };
  }, [isLevelPage]);

  const openBonusModal = (e) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <div
      onClick={openBonusModal}
      className={`cursor-pointer absolute rounded-full flex justify-center items-center z-20 sm:bg-transparent sm:left-1/2 sm:-translate-x-1/2 bg-${timerColor} ${customPadding} ${size?.wrapper}`}
    >
      <TimerIcon className={`${size?.icon} sm:fill-current text-${timerColor}`} />
      <BonusTimerModal
        isAvailableLevel={isAvailableLevel}
        isAvailableBonus={isAvailableBonus}
        currentTimeLevel={timeWithDelay}
        level={level}
        openedModal={openedModal}
        onClose={onClose}
      />
    </div>
  );
};
