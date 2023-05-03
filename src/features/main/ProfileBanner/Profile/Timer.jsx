import React, { memo, useCallback, useEffect, useState } from 'react';
import TimerIcon from 'assets/icons/timer.svg';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import Countdown from 'react-countdown';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';

export const Timer = memo(({ isButton = false }) => {
  const { t, i18n } = useTranslation('common');
  const { getNearLevelTime, getLevelTime } = useGetLevelTime();

  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    const level = getNearLevelTime()?.level;
    setCurrentLevel(level);
  }, []);

  const onComplete = useCallback(() => {
    setTimeout(() => {
      const nextLevel = getNearLevelTime().level;

      setCurrentLevel(!nextLevel ? null : nextLevel);
    }, 1000);
  }, [currentLevel, getNearLevelTime]);

  const renderer = useCallback(
    ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        const completeTitle = isButton
          ? `${capitalize(t('started', { lng: 'en' }))}!`
          : `${capitalize(t('level', { lng: 'en' }))} ${currentLevel} ${t('started', { lng: 'en' })}!`;

        return <span className="font-bold text-base leading-19px text-white">{completeTitle}</span>;
      } else {
        if (days >= 2) {
          const daysTitle = isButton
            ? `${capitalize(t('startIn', { lng: 'en' }))}: ${days} ${t('days', { lng: 'en' })}`
            : `${capitalize(t('level', { lng: 'en' }))}
             ${currentLevel} ${t('startsIn', { lng: 'en' })}: ${days} ${t('days', { lng: 'en' })}`;

          return <span className="font-bold text-base leading-19px text-white">{daysTitle}</span>;
        }

        const totalHours = hours + days * 24;
        const result = [totalHours, minutes, seconds]
          ?.map((item) => (String(item).length === 1 ? `0${item}` : item))
          .join(' : ');

        const resultTitle = isButton
          ? `${capitalize(t('startIn', { lng: 'en' }))}: ${result}`
          : `${capitalize(t('level', { lng: 'en' }))} ${currentLevel} ${t('startsIn', { lng: 'en' })} ${result}`;

        return <span className="font-bold text-base leading-19px text-white">{resultTitle}</span>;
      }
    },
    [currentLevel, isButton, i18n.language],
  );

  const wrapperStyle = isButton
    ? 'flex items-center'
    : 'flex items-center w-full max-w-90% h-45px rounded-b-small bg-gradient-to-r from-peach to-light-yellow px-12 py-3 sm:px-10';

  if (!currentLevel) {
    return null;
  }
  return (
    <div className={wrapperStyle}>
      <TimerIcon className="w-5 h-5" />
      <Countdown renderer={renderer} autoStart date={getLevelTime(currentLevel)} onComplete={onComplete} overtime />
    </div>
  );
});
