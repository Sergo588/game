import React from 'react';
import { BUTTON_TYPES } from 'helpers/constants';
import { Button } from 'components';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';

export const Error = ({ level = 1, tryAgain }) => {
  const { t } = useTranslation('common');

  return (
    <div className="w-full h-full flex flex-col items-start justify-center space-y-10 sm:items-center sm:mt-10">
      <div className="flex flex-col items-start space-y-1.5 sm:items-center">
        <span className="text-white text-[24px] leading-[28px]">{capitalize(t('sorry'))}!</span>
        <span className="text-white">
          {capitalize(t('level'))} {level} {t('isNotActivated')}
        </span>
      </div>
      <Button className="sm:max-w-full sm:w-full" onClick={() => tryAgain()} type={BUTTON_TYPES?.WHITE_100}>
        <span>{t('tryAgain')}</span>
      </Button>
    </div>
  );
};
