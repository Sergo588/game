import React from 'react';
import { Button, CustomLink } from 'components';
import { useTranslation } from 'next-i18next';
import { FORSAGE_BUSD_URL, BUTTON_TYPES } from 'helpers/constants';

export const BusdBanner = ({ withPadding = true }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex justify-center items-start relative w-full sm:bg-white-50 sm:px-5">
      <div className={`flex justify-between items-center w-full pt-8 sm:py-5 ${withPadding && 'px-10 sm:px-0'}`}>
        <div className="flex flex-col justify-start items-start sm:w-full">
          <div className="flex justify-between w-full">
            <span className="text-white font-medium text-4xl mb-3 sm:text-2xl z-20">{t('goToForsageBusd')}</span>
            <img src="/img/logo/puma-gradient.png" className="hidden sm:block h-34px" />
          </div>
          <span className="text-white-700 text-base mb-5 sm:text-sm">
            {t('checkOutYourAccountInForsageBusd')}, <br /> {t('useTheSameWalletToLoginToBusd')}
          </span>
          <CustomLink href={FORSAGE_BUSD_URL} targetBlank>
            <Button className="sm:w-full" type={BUTTON_TYPES?.YELLOW_BORDERED}>
              {t('forsageBusdMainPage')}
            </Button>
          </CustomLink>
        </div>
        <img className="max-w-265px w-full h-full sm:hidden z-two" src="/img/main/rocket.png" alt="rocket" />
      </div>
      <img
        className="absolute top-0 left-0 right-0 max-w-screen w-full sm:hidden"
        src="/img/main/bgLogo.png"
        alt="bgLogo"
      />
    </div>
  );
};
