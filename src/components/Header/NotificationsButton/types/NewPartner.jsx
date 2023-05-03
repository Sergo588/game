import React from 'react';
import { useTranslation } from 'next-i18next';

export const NewPartner = ({ level }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-start justify-start flex-col flex-wrap space-y-2.5">
      <span className="text-base leading-19px leading-4 text-white-500">
        {t('newPartnerJoinedOn')}{' '}
        <span className="text-white">
          {t('level')} {level}
        </span>
      </span>
    </div>
  );
};
