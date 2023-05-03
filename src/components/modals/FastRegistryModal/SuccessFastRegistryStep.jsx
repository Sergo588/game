import React from 'react';
import { Button, CustomLink } from 'components';
import { useAuth } from 'helpers/hooks/useAuth';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import ModalSuccess from 'assets/icons/modal_success.svg';
import CloseIcon from 'assets/icons/close.svg';
import { LINKS_IN_GAME, BUTTON_TYPES } from 'helpers/constants';

export const SuccessFastRegistryStep = ({ closeModal }) => {
  const { t } = useTranslation('common');
  const authAccount = useAuth();
  const onUpgradeClick = (e) => {
    e.preventDefault();
    authAccount();
  };

  return (
    <div className="p-10 flex z-10 relative flex-col justify-center items-center w-full bg-black-light sm:bg-main-bg rounded sm:rounded-none sm:p-5 sm:w-full sm:h-full ">
      <div className="flex flex-col justify-center items-center sm:flex-1">
        <div className="flex justify-center items-center flex-col">
          <ModalSuccess className="w-28 28" />
          <span className="text-white text-2xl mt-3 font-medium sm:text-2xl sm:order-2">
            {capitalize(t('activated'))}
          </span>
        </div>
        <span className="text-white-500 mt-7 text-base text-center sm:text-sm">
          {capitalize(t('congratulations'))}!{' '}
          <span className="text-white">
            {t('smartGameProLevel')} {capitalize(t('activated'))}
          </span>
        </span>
        <div className="border-t border-white-700 text-center flex flex-col items-center mt-3.5 pt-3.5 pb-5 space-y-3.5 text-white-500">
          <span>
            {t('connectYourBnbAccount')} <span className="text-white">Telegram Bot</span>{' '}
            {t('toReceiveImmediateNotifications')}
          </span>
        </div>
      </div>
      <Button className="w-full mt-6" type={BUTTON_TYPES?.WHITE_300_BORDERED}>
        <CustomLink href={LINKS_IN_GAME.NOTIFIER} className="w-full flex items-center justify-center" targetBlank>
          {t('connectNotifierBot')}
        </CustomLink>
      </Button>
      <Button className="w-full mt-3.5" type={BUTTON_TYPES?.GRADIENT} onClick={onUpgradeClick}>
        {capitalize(t('loginToDashboard'))}
      </Button>
      <Button
        className="w-full text-white-500 font-medium mt-4 text-xs sm:text-base space-x-1 rtl:space-x-reverse"
        type={BUTTON_TYPES?.TRANSPARENT}
        onClick={closeModal}
      >
        <CloseIcon className="w-4 h-4 stroke-current text-white-500 sm:w-5 sm:h-5" />
        <span>{capitalize(t('close'))}</span>
      </Button>
    </div>
  );
};
