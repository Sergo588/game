import React from 'react';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';

export const FinishReward = ({ level, amount }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-start justify-start flex-col flex-wrap space-y-2.5">
      <span className="text-base leading-19px leading-4 text-white-500 space-y-1 space-x-0.5 rtl:space-x-reverse">
        <span className="text-yellow">+ {amount} BNB</span> {capitalize(t('completion', { lng: 'en' }))}{' '}
        {t('reward', { lng: 'en' })} <br />
        <div>
          {t('on')}{' '}
          <span className="text-white">
            {t('level')} {level}
          </span>
        </div>
      </span>
    </div>
  );
};
