import React from 'react';
import AlertIcon from 'assets/icons/cancel_circle.svg';
import { useTranslation } from 'next-i18next';

export const Alert = ({ text = '' }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-start border border-red text-red px-4 py-2.5 w-full rounded-[7px] flex-shrink-0">
      <AlertIcon className="w-5 h-5 mr-2.5" />
      <span className="leading-[22px]">
        {t('error')}! {text}
      </span>
    </div>
  );
};
