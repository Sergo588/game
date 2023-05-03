import React from 'react';
import { BUTTON_TYPES } from 'helpers/constants';
import { Button } from 'components';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';
import config from 'helpers/config';

export const Pending = ({ level = 1, hash }) => {
  const { t } = useTranslation('common');

  return (
    <div className="w-full h-full flex flex-col items-start justify-center space-y-10 sm:items-center sm:mt-10">
      <div className="flex flex-col items-start space-y-1.5 sm:items-center">
        <span className="text-white text-[24px] leading-[28px]">
          {' '}
          {capitalize(t('activating'))} {capitalize(t('level'))} {level}
        </span>
        <span>{t('yourTransactionInProgress')}</span>
      </div>
      <a href={`${config.scanNetwork}${hash}`} target="_blank" rel="noreferrer">
        <Button className="sm:max-w-full sm:w-full" type={BUTTON_TYPES?.WHITE_100}>
          {t('transactionInBlockchain')}
        </Button>
      </a>
    </div>
  );
};
