import React from 'react';
import { BUTTON_TYPES } from 'helpers/constants';
import { Button } from 'components';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { useAuth } from 'helpers/hooks/useAuth';

export const Success = () => {
  const { t } = useTranslation('common');
  const authAccount = useAuth();
  const onClickLogin = (e) => {
    e.preventDefault();
    authAccount();
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-center space-y-10 sm:items-center sm:mt-10">
      <div className="flex flex-col items-start space-y-1.5 sm:items-center">
        <span className="text-white text-[24px] leading-[28px]">{capitalize(t('congratulations'))}!</span>
        <span className="">
          {t('smartGameProLevel')} {capitalize(t('activated'))}
        </span>
      </div>
      <Button
        onClickLogin={onClickLogin}
        className="sm:max-w-full sm:w-full"
        type={BUTTON_TYPES?.GRADIENT_ORANGE_YELLOW}
      >
        {capitalize(t('loginToDashboard'))}
      </Button>
    </div>
  );
};
