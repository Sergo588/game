import React, { memo } from 'react';
import { AnimatedNumber } from 'components';
import { useTranslation } from 'next-i18next';

export const LineCount = memo(
  ({
    current_line_received_rewards_count,
    current_line_total_rewards_count,
    missed_line_rewards_count,
    mainStyle,
    isLevelPage,
  }) => {
    const totalCount = current_line_total_rewards_count - missed_line_rewards_count;
    const totalCountStyle = missed_line_rewards_count ? 'text-red' : '';
    const { t } = useTranslation('common');

    return (
      <div
        className={`flex flex-wrap items-center justify-between border-b border-b-white-600 ${
          isLevelPage ? 'pb-2.5 mb-2.5' : 'pb-1 mb-1'
        } ${mainStyle?.textStyle?.rewards}`}
      >
        <div className={`text-white opacity-60 ${mainStyle?.textStyle?.rewardsTitle}`}> {t('currentLineRewards')}</div>
        <div className="text-white font-semibold">
          <AnimatedNumber value={current_line_received_rewards_count} fixedNums={0} duration={250} />
          <span className="text-white-600"> / </span>
          <span className={totalCountStyle}>{totalCount}</span>
        </div>
      </div>
    );
  },
);
