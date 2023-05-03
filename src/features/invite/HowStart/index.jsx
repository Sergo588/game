import React from 'react';
import { Button } from 'components';
import { BUTTON_TYPES, PROGRAMS_PRICES, PROGRAM_NAMES, REFLINK_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { copy } from 'helpers/text';
import CopyIcon from 'assets/icons/copy_white.svg';

export const HowStart = ({ sectionStyle, refkey, onClickRegistration, isLoading }) => {
  const { t } = useTranslation('common');
  const reflink = REFLINK_TYPES.base + refkey;
  const instruction = [
    {
      text: `${t('installABNBChainCompatibleCryptowallet')} (Metamask, TokenPocket, Trust)`,
    },
    {
      text:
        `${t('topUpYourWalletWithAtLeast')}` +
        ` ${PROGRAMS_PRICES[PROGRAM_NAMES.GAME][36]} BNB - ` +
        `${t('useCryptoexchangesLikeBinanceOrLocalExchangersToBuyCryptoCurrency')}`,
    },
    {
      text: `${t('connectYourWallet')} : ${t('openDappBrowserInYourCryptoWallet')}, ${t('inTokenPocket')} - ${t(
        'tab',
      )} "${t('discover')}". ${t('OrUseWalletConnect')}`,
    },
    {
      renderText: () => (
        <div className="space-x-2 rtl:space-x-reverse">
          <span className="inline">{t('copyAndPasteYourUplineLinkInTheWalletDappBrowser')}:</span>
          <div className="inline-flex space-x-2 rtl:space-x-reverse">
            <span className="font-bold">{reflink}</span>
            <Button type={BUTTON_TYPES?.TRANSPARENT} onClick={() => copy(reflink)}>
              <CopyIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      text: `${t('clickRegisterToProceedToActivationWindow')}.`,
      btn: {
        title: capitalize(t('register')),
        style: 'max-w-160px w-full sm:max-w-full',
        onclick: '',
      },
    },
  ];

  return (
    <section className={`mb-48 ${sectionStyle} sm:mb-36`}>
      <div className="w-full flex flex-col justify-start items-center max-w-desktop-invite w-full px-5">
        <span className="text-40px text-white leading-48px uppercase font-medium mb-18 sm:text-3xl sm:mb-10">
          {t('howToStartInSmartGamePRO')}
        </span>
        <div className="flex flex-col space-y-5 w-full">
          {instruction.map((item, itemIndex) => {
            return (
              <div
                className="bg-gray-700 p-6 w-full text-white flex justify-between items-center rounded space-x-4 rtl:space-x-reverse sm:p-3 sm:items-start sm:space-x-3"
                key={itemIndex}
              >
                <div className="flex justify-start items-center space-x-6 sm:space-x-3 sm:items-start rtl:space-x-reverse">
                  <div className="w-50px h-50px modal_btn__gradient_success rounded-full flex justify-center items-center flex-shrink-0 sm:w-7.5 sm:h-7.5 sm:text-sm">
                    <span>{itemIndex + 1}</span>
                  </div>
                </div>
                <div className="flex w-full justify-between items-center space-x-1.5 sm:space-x-0 rtl:space-x-reverse sm:space-y-2.5 sm:items-start sm:flex-col ">
                  <span>{item?.renderText ? item?.renderText() : item?.text}</span>
                  {item?.btn && (
                    <Button
                      type={BUTTON_TYPES?.GRADIENT_ORANGE_PINK}
                      onClick={onClickRegistration}
                      className={item?.btn?.style}
                      disabled={isLoading}
                    >
                      {item?.btn?.title}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
