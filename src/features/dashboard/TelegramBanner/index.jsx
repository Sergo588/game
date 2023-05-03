import { Button, CustomLink } from 'components';
import React from 'react';
import { useTranslation } from 'next-i18next';
import TelegramIcon from 'assets/socials/telegram.svg';
import { BUTTON_TYPES, LINKS_IN_GAME } from 'helpers/constants';

export const TelegramBanner = () => {
  const { t } = useTranslation('common');

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden py-28 sm:px-5">
      <div className="flex flex-col justify-center items-center max-w-desktop-main w-full">
        <TelegramIcon className="absolute w-170px fill-current text-white-50 top-7 right-7 lg:top-20 lg:right-12 sm:right-7 lg:w-70px" />
        <div className="flex flex-col justify-center items-center text-center w-full h-full z-10">
          <span className="text-white font-medium text-4xl mb-3 sm:text-2xl">
            {t('joinSmartGameProTelegramCommunity')}
          </span>
          <span className="text-white-500 text-base mb-7">
            {t('communicateWithOtherMembersAndLearnMoreAboutSmartGamePro')}
          </span>
          <CustomLink href={LINKS_IN_GAME?.TELEGRAM_CHANNEL} targetBlank>
            <Button type={BUTTON_TYPES?.BLUE}>
              {' '}
              <TelegramIcon className="w-5 h-5 mr-2.5" /> {t('joinSmartGameProTelegram')}
            </Button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
};
