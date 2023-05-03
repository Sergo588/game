import { Button, CustomLink } from 'components';
import React from 'react';
import { useTranslation } from 'next-i18next';
import TelegramIcon from 'assets/socials/telegram.svg';
import { BUTTON_TYPES, LINKS_IN_GAME } from 'helpers/constants';

export const TelegramBanner = () => {
  const { t } = useTranslation('common');

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden py-28 px-5">
      <div className="flex flex-col justify-center items-center max-w-desktop-main w-full">
        <div className="flex flex-col justify-center items-center text-center w-full h-full z-10">
          <span className="text-white font-medium text-4xl mb-3 sm:text-2xl">{t('gotQuestionsOnHowToStart')}?</span>
          <span className="text-white-500 text-base mb-7">{t('GetQualifiedSupportFromOurExpertsViaOnlineChat')}</span>
          <CustomLink href={LINKS_IN_GAME?.TELEGRAM_CHANNEL} targetBlank>
            <Button type={BUTTON_TYPES?.BLUE} className="space-x-2.5 rtl:space-x-reverse">
              <TelegramIcon className="w-5 h-5" /> <span>{t('joinSmartGameProTelegram')}</span>
            </Button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
};
