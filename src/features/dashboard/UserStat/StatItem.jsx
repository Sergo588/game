import React from 'react';
import ArrowUpIcon from 'assets/icons/arrow_up_stat.svg';
import { AnimatedNumber } from 'components';

export const StatItem = ({
  title,
  titleBusd,
  newCount = 0,
  totalCount = 0,
  newCountBusd = 0,
  totalCountBusd = 0,
  className,
  withoutBorderLG = false,
}) => {
  const item = (title, newCount, totalCount, isBusd) => {
    const textColor = isBusd ? '!text-white-500' : '';
    const titleStyle = isBusd ? `text-10px ${textColor}` : '';
    const countStyle = isBusd ? `!text-sm ${textColor}` : '';
    return (
      <div
        className={`flex items-center justify-between w-full border-b border-white-100 last:border-0 pb-1 last:pb-0 last:pt-1 lg:border-b-0 lg:last:border-b lg:pb-0 lg:last:pb-1 lg:!pt-0 ${
          withoutBorderLG && 'lg:!border-b-0'
        }`}
      >
        <span className={titleStyle}>{title}</span>
        <div className={`flex items-center justify-end space-x-1.5 ${isBusd && '!space-x-2.5 lg:!space-x-1.5'}`}>
          <AnimatedNumber className={`font-bold text-white text-2xl sm:text-lg ${countStyle}`} value={totalCount} />
          {Boolean(newCount) && (
            <div
              className={`inline-flex items-center justify-center px-2 !leading-30px text-yellow rounded-7px text-base sm:text-xs w-max ml-1.5 ${countStyle}`}
            >
              <ArrowUpIcon className={`stroke-current mr-1 text-yellow ${textColor}`} />
              <AnimatedNumber value={newCount} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full flex-1 flex flex-col items-center justify-between p-4 bg-black-light rounded-small space-x-1 lg:py-1.5 lg:bg-transparent ${className}`}
    >
      {item(title, newCount, totalCount, false)}
      {item(titleBusd, newCountBusd, totalCountBusd, true)}
    </div>
  );
};
