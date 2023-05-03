import React, { useState, useMemo } from 'react';
import { Modal, Button, CustomLink } from 'components';
import TelegramIcon from 'assets/socials/telegram.svg';
import TwitterIcon from 'assets/socials/twitter.svg';
import { BUTTON_TYPES, LINKS_IN_GAME, REFLINK_TYPES } from 'helpers/constants';
import { useSelector } from 'react-redux';
import { getCurrentUserProfile, getPreviewAccount } from 'store/userSlice/selectors';

export const ShareLinkModal = ({ openedModal, onClose }) => {
  const telegramName = LINKS_IN_GAME?.TELEGRAM_CHANNEL.replace('https://t.me/', '@');
  const user = useSelector(getCurrentUserProfile);
  const previewUser = useSelector(getPreviewAccount);
  const actualUser = previewUser?.id ? previewUser : user;

  const reflink = useMemo(() => {
    return REFLINK_TYPES?.base + actualUser?.refkey;
  }, [actualUser]);

  // локализация не требуется

  const shareTexts = [
    `Why haven't I done it before? I made my dream come true with ${telegramName}, join the Game! Go for it! ${reflink}`,
    `Join my team ${reflink} and let's achieve our goals together with ${telegramName}`,
    `First ever non-working SmartGame Pro to earn BNB directly to your wallet! Let's do it! ${reflink}`,
    `SmartGame Pro ${telegramName} opens up equal potential for each participant! Start the game and make your dreams come true. ${reflink}`,
    `SmartGame Pro ${telegramName} is an opportunity to earn more money! Opportunity to make your dreams come true! Join the game and start action! ${reflink}`,
  ];

  const [randomNumber, setRandomNumber] = useState(0);

  const generateRandomNumber = async () => {
    const randomNumber = Math.floor(Math.random() * shareTexts.length);
    setRandomNumber(randomNumber);
  };

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full rounded-2xl bg-black-light p-10 sm:rounded-none sm:p-5 overflow-auto sm:!pt-20">
        <div className="flex items-center justify-between mb-7.5">
          <span className="text-white text-3xl font-medium sm:text-2xl">Share message</span>
          <Button className="!leading-30px" type={BUTTON_TYPES?.DARK_GREY_ROUNDED} onClick={generateRandomNumber}>
            Reload
          </Button>
        </div>
        <div className="flex flex-1 mb-10">
          <textarea
            name=""
            id=""
            className="resize-none flex flex-1 bg-white-100 rounded-mini text-base text-white font-normal p-15px outline-none h-240px sm:h-200px sm:text-sm"
            value={shareTexts[randomNumber]}
          />
        </div>
        <CustomLink
          href={`https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Ffiddle.jshell.net%2F_display%2F&text=${shareTexts[randomNumber]}`}
          targetBlank
        >
          <Button type={BUTTON_TYPES?.BLUE} className="w-full mt-4 rounded-mini space-x-2.5 rtl:space-x-reverse">
            <TwitterIcon className="w-4 h-4" />
            <span>Share to Twitter</span>
          </Button>
        </CustomLink>
        <CustomLink
          targetBlank
          href={`https://telegram.me/share/url?url=${shareTexts[randomNumber].replace(
            '@forsageofficial',
            '@forsageio_official',
          )}`}
        >
          <Button type={BUTTON_TYPES?.BLUE} className="w-full mt-4 rounded-mini space-x-2.5 rtl:space-x-reverse">
            <TelegramIcon className="w-4 h-4" />
            <span>Share to Telegram </span>
          </Button>
        </CustomLink>
      </div>
    </Modal>
  );
};
