import React, { useState } from 'react';
import LogoIcon from 'assets/logo.svg';
import { Button, CustomLink } from 'components';
import { BUTTON_TYPES, DOCUMENTS_IN_GAME } from 'helpers/constants';
import WalletIcon from 'assets/icons/wallet.svg';
import InfoIcon from 'assets/icons/information_circle.svg';
import { ActivateModal } from 'components/Header/ActivateModal';
import { useTranslation } from 'next-i18next';

export const ConnectWallet = () => {
  const { t } = useTranslation('common');
  const [openedModal, setOpenedModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full space-y-10">
        <LogoIcon className="max-h-[150px]" />
        <span className="text-[26px] leading-[30px] text-white sm:text-[18px] sm:leading-[22px]">
          {t('startEarning')}
        </span>
        <div className="flex flex-col items-center space-y-5 w-full">
          <Button
            className="!max-w-[290px] w-full sm:!max-w-full"
            onClick={() => setOpenedModal(true)}
            type={BUTTON_TYPES?.GRADIENT_ORANGE_YELLOW}
          >
            <WalletIcon className="w-5 h-5 mr-2.5" />
            <span>{t('connectWallet')}</span>
          </Button>
          <CustomLink href={DOCUMENTS_IN_GAME.presEN} targetBlank>
            <Button type={BUTTON_TYPES?.TRANSPARENT}>
              <InfoIcon className="w-4 h-4 mr-2.5" />
              <span>{t('learnMore')}</span>
            </Button>
          </CustomLink>
        </div>
      </div>
      <ActivateModal handleCloseModal={() => setOpenedModal(false)} openedModal={openedModal} />
    </>
  );
};
