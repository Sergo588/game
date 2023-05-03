import React, { useEffect } from 'react';
import { Button } from 'components';
import config from 'helpers/config';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';
import { BUTTON_TYPES, ROUND_1 } from 'helpers/constants';
import Lottie from 'react-lottie';
import LinkSquare from 'assets/icons/link_square.svg';
import { loadingCircleSecond, loadingModalCircle } from 'helpers/lottieAnimations';
import { getRoundByLevel } from 'helpers/round';

export const LoadingProgramStep = ({ onNextStep, upgradedData, handleErrorStep, level }) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (upgradedData.wait) {
      upgradedData.wait().then(({ status }) => {
        if (status === 0) {
          handleErrorStep();
        } else {
          setTimeout(() => {
            onNextStep();
          }, 1000);
        }
      });
    }
  }, [upgradedData]);

  return (
    <div className="p-10 flex z-10 relative flex-col justify-center items-center w-full bg-black-light rounded sm:bg-main-bg sm:rounded-none sm:p-5 sm:w-full sm:h-full ">
      <div className="flex flex-col justify-center items-center sm:flex-1">
        <div className="flex flex-col justify-center items-center sm:mb-5">
          <div className="flex justify-center items-center mb-2.5 sm:flex-col">
            <span className="text-white text-2xl font-medium sm:text-2xl sm:order-2">
              {capitalize(t('activating'))} {capitalize(t('level'))} {level}
            </span>
          </div>
          <span className="text-white-500 text-base sm:text-sm">{t('yourTransactionInProgress')}</span>
        </div>
        <div className="rounded-50% bg-main-bg min-w-103px min-h-103px mt-1.5">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: getRoundByLevel(level) === ROUND_1 ? loadingModalCircle() : loadingCircleSecond(),
              rendererSettings: {
                progressiveLoad: true,
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
        </div>
      </div>
      <a href={`${config.scanNetwork}${upgradedData.hash}`} target="_blank" className="w-full mt-18px" rel="noreferrer">
        <Button className="w-full" type={BUTTON_TYPES?.WHITE_100}>
          <div className="flex jsutify-center items-center space-x-2 rtl:space-x-reverse">
            <span className="text-base font-bold sm:text-sm">{t('transactionInBlockchain')}</span>
            <LinkSquare className="w-6 h-6" />
          </div>
        </Button>
      </a>
    </div>
  );
};
