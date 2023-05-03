import React from 'react';
import { Button, CustomLink } from 'components';
import TelegramIcon from 'assets/socials/telegram.svg';
import { LINKS_IN_GAME, BUTTON_TYPES } from 'helpers/constants';

export const FixedWidget = () => {
  return (
    <CustomLink href={LINKS_IN_GAME?.TELEGRAM_CHANNEL} targetBlank>
      <Button
        className="fixed right-5 bottom-6 z-30 py-1.5 px-2.5 drop-shadow-lg sm:py-2.5 sm:px-2.5 space-x-2 sm:space-x-1.5 rtl:space-x-reverse rtl:right-auto rtl:left-5"
        type={BUTTON_TYPES?.BLUE}
      >
        <TelegramIcon className="w-5 h-5" /> <span className="ml-2 font-semibold sm:text-sm sm:ml-1.5"> News </span>
      </Button>
    </CustomLink>
  );
};
