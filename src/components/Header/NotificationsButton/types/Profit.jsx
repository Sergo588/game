import React from 'react';
import { useTranslation } from 'next-i18next';

export const Profit = ({ level, amount }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col ml-2.5 rtl:mr-2.5 rtl:ml-0 space-y-1.5">
      <div className="flex items-start justify-start flex-col flex-wrap space-y-2.5">
        <span className="text-base leading-19px leading-4 text-white-500">
          <span className="text-yellow">+ {amount} BNB</span> {t('on')}{' '}
          <span className="text-white">
            {t('level')} {level}
          </span>
        </span>
      </div>
    </div>
  );
};
