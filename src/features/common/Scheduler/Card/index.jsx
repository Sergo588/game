import React, { useCallback, useMemo } from 'react';
import BNBIcon from 'assets/tokens/BNB.svg';
import BNBBgIcon from 'assets/tokens/BNB_withoutBG_gray.svg';
import { PROGRAMS_PRICES, PROGRAM_NAMES, PROGRAM_PERCENT, MAX_PERCENT_ROUND } from 'helpers/constants';
import Countdown from 'react-countdown';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import config from 'helpers/config';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { getRoundByLevel } from 'helpers/round';

export const Card = ({ activeLevel }) => {
  const { t } = useTranslation('common');
  const currentRound = getRoundByLevel(activeLevel);
  const { direct_partner, second_partner, third_partner, fourth_partner, fifth_partner } =
    PROGRAM_PERCENT[currentRound];

  const partnersPercents = [direct_partner, second_partner, third_partner, fourth_partner, fifth_partner];
  const styleBNBbg = 'absolute fill-current text-white-50 opacity-10';
  const { getLevelTime } = useGetLevelTime();
  const price =
    config.stand === 'dev'
      ? PROGRAMS_PRICES[PROGRAM_NAMES.GAME][activeLevel]?.toFixed(2)
      : PROGRAMS_PRICES[PROGRAM_NAMES.GAME][activeLevel];

  const totalPotentialProfit = useMemo(() => {
    return parseFloat(((MAX_PERCENT_ROUND[currentRound] / 100) * price).toFixed(5));
  }, [price, currentRound]);

  const renderer = useCallback(
    ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return <span className="text-green"> {capitalize(t('available'))} </span>;
      } else {
        if (days >= 2) {
          return (
            <span className="font-bold">
              {days} {t('days')}
            </span>
          );
        }

        const totalHours = hours + days * 24;
        const result = [totalHours, minutes, seconds]
          ?.map((item) => (String(item).length === 1 ? `0${item}` : item))
          .join(':');

        return <span className="font-bold">{result}</span>;
      }
    },
    [t],
  );

  const percentList = useMemo(
    () => (
      <div className="relative flex flex-col items-center justify-between max-w-100px scheduler_percent-line w-full space-y-1.5 sm:flex-row sm:max-w-full sm:space-y-0 sm:space-x-2.5">
        {partnersPercents.map((item, index) => {
          const bg = `scheduler_card__gradient_${index + 1}`;
          const percentReward = parseFloat(((item / 100) * price).toFixed(5));

          return (
            <div
              className={`relative flex-1 flex flex-col justify-center items-center px-2.5 pt-1 rounded-5px text-dark-grey font-medium bg-yellow z-10 w-full pb-0.5 sm:!py-1.5 ${bg}`}
              key={item}
            >
              <span className="absolute top-1 right-1 flex justify-center items-center text-sup-xs font-light leading-9px bg-white-200 rounded-full h-3 w-3 sm:hidden">
                <span className="scheduler_number__gradient">{index + 1}</span>
              </span>
              <span className="text-15px leading-17px mb-0.5">{item}%</span>
              <span className="text-10px leading-11px sm:hidden">{percentReward} BNB</span>
            </div>
          );
        })}
      </div>
    ),
    [price, partnersPercents],
  );

  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-between w-full h-full bg-dark-grey border border-yellow rounded-small px-7.5 py-3 pb-7.5 sm:max-w-full sm:px-3 space-y-5 sm:space-y-1.5">
      <div className="flex items-center justify-between w-full text-xl">
        <span className="text-white">Lvl {activeLevel}</span>
        <div className="ml-2 border border-yellow-200 py-1.5 px-1.5 rounded-mini text-yellow max-w-116px w-full flex justify-center items-center">
          {activeLevel && <Countdown renderer={renderer} autoStart date={getLevelTime(activeLevel)} overtime />}
        </div>
        <div className="text-white flex items-center justify-end">
          <BNBIcon className="w-5 h-5 mr-1.5 rtl:mr-0 rtl:ml-1.5" />
          {price}
        </div>
      </div>
      <div className="flex flex-1 flex-col sm:flex-row sm:justify-between sm:items-center w-full h-full">
        <div className="flex flex-col items-center w-full h-full sm:items-start sm:text-12px">
          <span className="uppercase font-bold scheduler_card_basic__gradient mb-2">
            {capitalize(t('basicLevelRewards'))}
          </span>
          <div className="mb-5 text-white font-bold flex items-center sm:mb-1.5">
            <span>{t('upTo')}</span>
            <div className="px-2.5 py-1 flex min-w-100px flex-col items-center justify-center mx-2.5 rounded-mini scheduler_card_percent__gradient sm:px-1.5 sm:py-1">
              {MAX_PERCENT_ROUND[currentRound]}%<span className="text-mini">{totalPotentialProfit} BNB</span>
            </div>
            <span>{t('perPlace')}</span>
          </div>
          <div className="flex flex-1 justify-between w-full">
            <div className="flex flex-col items-start ">
              <div className="flex flex-col items-start flex-1">
                <span className="uppercase font-bold scheduler_card_partner__gradient max-w-171px sm:max-w-full">
                  {t('partnerRewards')}:
                </span>
                <span className="text-white-700 mb-5 sm:max-w-full sm:mb-1">5-{t('levelAffiliateProgram')}</span>
              </div>
              <span className="text-8rem leading-8rem font-medium scheduler_card_number__gradient -mb-3.5 sm:hidden">
                {activeLevel}
                <span className="text-2xl">Lvl</span>
              </span>
            </div>
            <div className="sm:hidden max-w-100px w-full flex items-start">{percentList}</div>
          </div>
        </div>
        <span className="self-end text-8xl font-medium scheduler_card_number__gradient hidden sm:block sm:text-80px">
          <span className="text-base">Lvl</span>
          {activeLevel}
        </span>
      </div>
      <div className="w-full h-full hidden sm:flex">{percentList}</div>
      <BNBBgIcon className={`${styleBNBbg} h-180px -top-7.5 -right-16 sm:h-158px sm:-right-7.5 sm:-top-7.5`} />
      <BNBBgIcon className={`${styleBNBbg} h-220px bottom-5 -left-18 sm:hidden`} />
    </div>
  );
};
