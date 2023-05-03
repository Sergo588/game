import React from 'react';
import ArrowUpFull from 'assets/icons/arrow_up_full.svg';
import clsx from 'clsx';

const InfoBlockComp = ({ new: newCount, className, title, total, withIcon, withMarginGap }) => {
  return (
    <div
      className={clsx(
        className,
        'flex flex-col p-5 bg-black-light rounded-small desktop-infoblock-base sm:mobile-infoblock-base',
      )}
    >
      <div className="flex items-center">
        <span className="text-white-500 text-base sm:text-sm sm:whitespace-nowrap">{title}</span>
      </div>

      <span className={`text-white text-2xl font-bold sm:text-xl ${withMarginGap && 'mt-5 sm:mt-2.5'}`}>{total}</span>
      <div className="flex text-yellow text-base items-baseline sm:text-sm">
        {withIcon && <ArrowUpFull className="mr-1.5 " />}
        {newCount}
      </div>
    </div>
  );
};

InfoBlockComp.defaultProps = {
  total: '-',
  new: '-',
  withIcon: true,
  withMarginGap: true,
};

export const InfoBlock = InfoBlockComp;
