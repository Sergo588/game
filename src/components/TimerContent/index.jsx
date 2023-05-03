import React, { useCallback } from 'react';
import Countdown from 'react-countdown';
import { fromUnixTime } from 'date-fns';
import { getStartDateByLevel } from 'helpers/common';
import { useTranslation } from 'next-i18next';

export const TimerContent = ({ isLevelCard = false, level, onComplete, spanClass = 'text-white' }) => {
  const time = getStartDateByLevel(level);
  const { t } = useTranslation('common');

  const renderer = useCallback(
    ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return null;
      } else {
        if (days >= 2) {
          return (
            <span className={spanClass}>
              {days} {t('days')}
            </span>
          );
        }

        if (hours > 0 || days === 1) {
          const totalHours = hours + days * 24;

          return (
            <>
              <span className={`${spanClass} ${isLevelCard ? 'sm:hidden' : ''}`}>
                {totalHours} {t('hours')} {minutes} {t('minutes')}
              </span>
              <span className={`${spanClass} ${isLevelCard ? 'hidden sm:flex' : ''}`}>
                {totalHours}h {minutes}min
              </span>
            </>
          );
        }

        if (minutes > 0) {
          return (
            <span className={spanClass}>
              {minutes} {t('minutes')}
            </span>
          );
        }

        return (
          <span className={spanClass}>
            {seconds} {t('seconds')}
          </span>
        );
      }
    },
    [spanClass],
  );

  return <Countdown renderer={renderer} autoStart date={fromUnixTime(time)} onComplete={onComplete} overtime />;
};
