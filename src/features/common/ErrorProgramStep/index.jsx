import React from 'react';
import { Button, CustomLink } from 'components';
import { ErrorCheckIcon } from 'assets/icons/error_check.svg';
import { BUTTON_TYPES } from 'helpers/constants';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';
import config from 'helpers/config';
import LinkSquare from 'assets/icons/link_square.svg';

export const ErrorProgramStep = ({ level, onTryAgain, upgradedData }) => {
  const { t } = useTranslation('common');

  return (
    <div className="p-10 flex z-10 relative flex-col justify-center items-center w-full bg-black-light sm:bg-main-bg rounded sm:rounded-none sm:p-5 sm:w-full sm:h-full ">
      <div className="flex flex-col justify-center items-center mb-10 sm:flex-1">
        <div className="flex justify-center items-center mb-5 sm:flex-col">
          <ErrorCheckIcon className="w-25 h-25 sm:mb-3 sm:order-1" />
        </div>
        <span className="text-white text-2xl font-medium sm:text-2xl sm:order-2">{capitalize(t('failed'))}</span>
        <span className="text-center text-white-500 text-base mb-2 sm:text-sm mt-4">
          <span>{capitalize(t('sorry'))}!</span>
          <span className="text-white">
            {capitalize(t('level'))} {level} {t('isNotActivated')}
          </span>
        </span>
        <CustomLink
          href={`${config?.scanNetwork}${upgradedData.hash}`}
          targetBlank
          className="flex items-center justify-center text-center text-white-500 text-base sm:text-sm space-x-2 rtl:space-x-reverse"
        >
          <span>{capitalize(t('transactionInBlockchain'))}</span> <LinkSquare className="w-6 h-6" />
        </CustomLink>
      </div>
      <Button className="w-full" type={BUTTON_TYPES?.GRADIENT} onClick={onTryAgain}>
        <span>{t('tryAgain')}</span>
      </Button>
    </div>
  );
};
