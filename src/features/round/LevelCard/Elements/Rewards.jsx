import React, { memo } from 'react';
import { AnimatedNumber } from 'components';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';

export const Rewards = memo(({ areThereAnyMissed, mainStyle, total_missed_revenue, revenue, ref_bonus }) => {
  const { t } = useTranslation('common');

  return (
    <div className={`flex flex-col w-full ${mainStyle?.textStyle?.rewards}`}>
      {areThereAnyMissed && (
        <div className="flex justify-between items-center text-red">
          <div className="inline-flex items-center">
            <span className={mainStyle?.textStyle?.rewardsTitle}>{t('missedRewards')}</span>
          </div>
          <div className="font-semibold">
            <AnimatedNumber value={total_missed_revenue} /> BNB
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-baseline justify-between">
        <div className={`flex flex-col justify-start text-white opacity-60 ${mainStyle?.textStyle?.rewardsTitle}`}>
          <span>{capitalize(t('gifts'))},</span>
          <span>{t('basicRewards')}</span>
        </div>
        <div className="text-white font-semibold">
          <AnimatedNumber value={revenue} /> BNB
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className={`text-white opacity-60 ${mainStyle?.textStyle?.rewardsTitle}`}>{t('partnerRewards')}</div>
        <div className="text-white font-semibold">
          <AnimatedNumber value={ref_bonus} /> BNB
        </div>
      </div>
    </div>
  );
});
