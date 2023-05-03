import React from 'react';
import { CustomLink, Button } from 'components';
import TelegramIcon from 'assets/socials/telegram.svg';
// import YoutubeIcon from 'assets/socials/youtube.svg';
// import FacebookIcon from 'assets/socials/facebook.svg';
// import TwitterIcon from 'assets/socials/twitter.svg';
import { BUTTON_TYPES, LINKS_IN_GAME } from 'helpers/constants';

export const SocialButtons = () => {
  const socials = [
    { id: 0, icon: TelegramIcon, link: LINKS_IN_GAME?.TELEGRAM_CHANNEL, desc: 'Channel' },
    // { id: 1, icon: YoutubeIcon, link: '' },
    // { id: 2, icon: FacebookIcon, link: '' },
    // { id: 3, icon: TwitterIcon, link: '' },
  ];
  return (
    <CustomLink className="w-full" href={socials[0]?.link} targetBlank>
      <Button
        className="w-full !justify-start !px-2.5 !py-2 !text-base space-x-2.5 rtl:space-x-reverse"
        type={BUTTON_TYPES?.WHITE_100_BORDERED}
      >
        <TelegramIcon className="w-5 h-5" />
        <span>{socials[0]?.desc}</span>
      </Button>
    </CustomLink>
  );
};
