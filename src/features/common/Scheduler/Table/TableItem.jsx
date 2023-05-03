import React, { memo, useCallback, useMemo } from 'react';
import Countdown from 'react-countdown';
import { capitalize } from 'lodash';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import { useTranslation } from 'next-i18next';
import BnbIcon from 'assets/tokens/BNB.svg';
import { Card } from '../Card';

export const TableItem = memo((props) => {
  const { t } = useTranslation('common');
  const { getLevelTime } = useGetLevelTime();
  const { activeLevel, level, date, isAvailable, amount, onClick } = props;
  const isActive = activeLevel === level;

  const getStyleWrap = useCallback((active) => {
    if (active) {
      return 'scheduler_active-line relative border border-yellow !bg-yellow-100';
    }

    return 'border border-transparent';
  }, []);

  const onClickLevel = useCallback(() => {
    onClick(level);
  }, [level, onClick]);

  const renderer = useCallback(({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null;
    } else {
      if (days >= 2) {
        return `${days} ${t('days')}`;
      }

      const totalHours = hours + days * 24;

      return [totalHours, minutes, seconds]?.map((item) => (String(item).length === 1 ? `0${item}` : item)).join(':');
    }
  }, []);

  const renderTime = useMemo(() => {
    if (isAvailable) {
      return capitalize(t('available'));
    }

    return <Countdown autoStart date={getLevelTime(level)} overtime renderer={renderer} />;
  }, [isActive, level, isAvailable, t]);

  return (
    <div
      data-level={level}
      className={`flex sm:flex-col cursor-pointer ${level} text-base odd:bg-white-50 ${getStyleWrap(isActive)}`}
      onClick={onClickLevel}
    >
      <div className="flex w-full">
        <div className="flex flex-1 px-2.5 py-6 sm:py-4 sm:hidden">
          <span>{date}</span>
        </div>
        <div className={`flex flex-1 px-2.5 py-6 sm:py-4 ${isAvailable ? 'text-green' : 'text-yellow'}`}>
          <span>{renderTime}</span>
        </div>
        <div className="flex flex-1 px-2.5 py-6 sm:py-4 text-white font-bold">
          <span>{level}</span>
        </div>
        <div className="flex items-center flex-1 px-2.5 py-6 sm:py-4 space-x-1.5 rtl:space-x-reverse">
          <BnbIcon className="w-2.5 h-2.5 mb-0.5" /> <span>{amount}</span>
        </div>
      </div>
      {isActive && (
        <div className="hidden sm:flex sm:p-5 sm:pt-0">
          <Card activeLevel={activeLevel} />
        </div>
      )}
    </div>
  );
});
