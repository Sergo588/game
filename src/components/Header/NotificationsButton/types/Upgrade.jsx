import React from 'react';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';

export const Upgrade = ({ level }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-start justify-start flex-col flex-wrap space-y-2.5">
      <span className="text-base leading-19px leading-4 text-white-500">
        <span className="text-white">
          {capitalize(t('level'))} {level}
        </span>{' '}
        {t('activation')} {t('successful')}
      </span>
    </div>
  );
};
