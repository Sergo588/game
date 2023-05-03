import { Button, Footer, CustomLink } from 'components';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { BUTTON_TYPES, LINKS_IN_GAME } from 'helpers/constants';

export const TelegramBanner = () => {
  const { t } = useTranslation('common');

  const stylesProps = { backgroundImage: "url('/img/main/bgTelegram.png')", backgroundSize: 'cover' };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden pt-20"
      style={stylesProps}
    >
      <div className="flex flex-col justify-center items-center max-w-desktop-main w-full">
        <div className="flex flex-col justify-center items-center text-center w-full h-full z-10 mb-64">
          <span className="text-white font-medium text-4xl mb-3">{t('joinSmartGameProTelegramCommunity')}</span>
          <span className="text-white-500 text-base mb-7">
            {t('communicateWithOtherMembersAndLearnMoreAboutSmartGamePro')}
          </span>
          <CustomLink href={LINKS_IN_GAME?.TELEGRAM_CHANNEL} targetBlank>
            <Button type={BUTTON_TYPES?.BLUE}>{t('joinSmartGameProTelegram')}</Button>
          </CustomLink>
        </div>
        <Footer />
      </div>
    </div>
  );
};
