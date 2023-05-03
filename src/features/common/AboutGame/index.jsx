import React from 'react';
import { useTranslation } from 'next-i18next';

export const AboutGame = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex justify-between items-center space-x-8 sm:px-5 sm:flex-col sm:space-x-0 sm:space-y-5 rtl:space-x-reverse">
      <div className="flex flex-col flex-1">
        <span className="text-white font-medium text-2xl mb-3">{t('aboutSmartGamePro')}</span>
        <span className="text-white-500 sm:text-sm">
          {t('aboutSmartContractTitle')}
          <br /> - {t('basicLevelRewardsOf375%')} <br />- {t('5LevelPartnerProgramWithUnlimitedRewards')} <br />-{' '}
          {t('100%AutomaticContract')} <br />- {t('36LevelsWithScheduledLaunchAndSeparate')}
        </span>
      </div>
      <iframe
        className="flex flex-1 rounded-small w-full h-[323px] h-full sm:h-190px sm:flex-none"
        width="574"
        height="323"
        src="https://www.youtube.com/embed/pgwsP-sGKqI"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
