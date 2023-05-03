import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, CustomLink } from 'components';
import { BUTTON_TYPES } from 'helpers/constants';
import ReturnIcon from 'assets/icons/return.svg';
import { useTranslation } from 'next-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="h-full w-full flex flex-col h-full items-center justify-center lg:p-5 ">
      <Helmet>
        <title>404 | Forsage</title>
      </Helmet>
      <img src="/img/404/purple_blur.png" className="fixed right-0 top-0 bottom-0 h-full z-0 pointer-events-none " />
      <div className="w-full h-full flex flex-col justify-center items-center justify-center z-10">
        <img src="/img/404/main.png" className="max-w-600px w-full mb-15 z-10 sm:mb-10" />
        <div className="flex flex-col items-center space-y-4">
          <span className="text-white text-base z-10 sm:text-sm">{t('pageNotFound')}</span>
          <CustomLink href="/dashboard">
            <Button type={BUTTON_TYPES.GRADIENT_ORANGE_YELLOW}>
              <div className="flex items-baseline">
                <ReturnIcon className="mr-1.5" /> {t('returnToMainPage')}
              </div>
            </Button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
