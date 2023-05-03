import React from 'react';
import { Button, CustomLink } from 'components';
import { ROUND_STYLES } from 'helpers/round';
import RoundedArrowRightTopIcon from 'assets/icons/rounded_arrow_right_top.svg';
import { useRouter } from 'next/router';
import { linkWithQuery } from 'helpers/links';
import { useTimerLevelsActiveInterval } from 'helpers/hooks/useTimerLevelsActiveInterval';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';
import { Level } from './Level';

export const RoundItem = ({ levels, revenue, ref_bonus, index, program }) => {
  const { t } = useTranslation('common');

  const { activeLevels } = useTimerLevelsActiveInterval();
  const { query } = useRouter();
  const totalRewards = revenue + ref_bonus;
  const toProgramViewHref = linkWithQuery('/dashboard/game', { user: query.user, program });

  return (
    <div className="relative overflow-hidden w-full bg-white-50 rounded-mini p-7.5 sm:py-5">
      <div className="flex justify-between w-full sm:flex-col">
        <div className="flex flex-col justify-between items-start z-10">
          <span className="font-medium text-white text-2xl mb-7.5 sm:text-xl sm:mb-5">
            {t('smartGamePro')}{' '}
            <span className={`${ROUND_STYLES[program].dashboard.textColor}`}>
              {capitalize(t('round'))} {index}
            </span>{' '}
          </span>
          <div className="flex max-w-270px h-full flex-col items-start justify-end sm:w-full flex-wrap sm:mb-5">
            <div className="flex flex-wrap -m-1">
              {levels.map((item, itemIndex) => {
                const isLocked = !activeLevels[item.level];

                return <Level {...item} islocked={isLocked} program={program} key={itemIndex} />;
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end z-10 sm:items-start">
          <div className="flex flex-col justify-start items-end sm:items-start">
            <span className="text-2xl text-white font-bold mb-3 sm:order-2 sm:text-xl">
              {capitalize(t('totalRewards'))}: {totalRewards} BNB
            </span>
            <span className="text-sm text-white-500 font-bold sm:text-sm">
              {' '}
              {capitalize(t('partnerRewards'))}: {ref_bonus} BNB{' '}
            </span>
          </div>
          <CustomLink className="sm:w-full" withLink href={toProgramViewHref}>
            <Button className="sm:w-full" type={ROUND_STYLES[program].dashboard.buttonType}>
              <span>{t('toProgramView')}</span>
              <RoundedArrowRightTopIcon className="ml-2.5" />
            </Button>
          </CustomLink>
        </div>
      </div>
      <img
        className="h-full absolute bottom-0 right-0 z-0"
        src={`/img/round/dashboard_round_${index}.png`}
        alt="round1"
      />
    </div>
  );
};
