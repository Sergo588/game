import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import SuccessIcon from 'assets/icons/success_check.svg';
import { capitalize } from 'lodash';
import BnbIcon from 'assets/tokens/BNB.svg';
import { ProgressBar } from './ProgressBar';
import { Wrapper } from './Wrapper';

export const PlaceItem = ({
  missed_revenue = 0,
  revenue,
  revenues,
  number,
  activated_at,
  active,
  active_line_index,
  gray_line_index,
  className,
  activeLineFill,
  registration_percent,
  freeze,
  finish_reward,
}) => {
  const { t } = useTranslation('common');
  const rewardsRender = useMemo(() => {
    return (
      <div className="flex flex-col sm:!mt-6 sm:space-y-1">
        <div className="flex items-center justify-between sm:flex-col sm:items-start">
          <span className="sm:text-xs">{t('totalRewards')}, BNB</span>
          <span className="font-bold text-white sm:text-sm"> {revenue} </span>
        </div>
      </div>
    );
  }, [missed_revenue, revenue]);

  const freezeStyle = {
    wrapperBg: '!bg-dark-blue-900',
    numberBg: '!bg-lightBlue-200 !text-lightBlue',
  };

  const titleRender = useMemo(() => {
    const customDate = !!activated_at && format(new Date(activated_at), 'dd.MM.yyyy');
    const customTime = !!activated_at && format(new Date(activated_at), 'kk:mm');

    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          {!active && (
            <span className="hidden text-green text-sup-xs z-two sm:block ">{capitalize(t('completed'))}</span>
          )}
          <span className="sm:text-sup-xs">
            {customDate} {t('at')} {customTime}
          </span>
        </div>
        <div className="flex items-center justify-end space-x-1.5 rtl:space-x-reverse">
          {!active && <SuccessIcon className="hidden z-two sm:block w-4 h-4" />}
          <span
            className={`inline-flex items-center justify-center px-2.5 !leading-30px bg-yellow-100 text-yellow rounded-7px text-base sm:text-sm w-max sm:text-sup-xs sm:!leading-17px sm:px-1.5 rounded-3px z-two ${
              freeze && freezeStyle?.numberBg
            }`}
          >
            {number + 1}
          </span>
        </div>
      </div>
    );
  }, [active, freeze, activated_at, number]);

  const progressBarsRender = useMemo(() => {
    const isArray = Array.isArray(revenues);

    return (
      <div className="flex space-x-1.5 mt-1 sm:mt-2 rtl:space-x-reverse">
        {isArray &&
          revenues?.map((revenue, revenueIndex) => {
            return (
              <ProgressBar
                isActiveClone={active}
                revenue={revenue}
                activeLineIndex={active_line_index}
                grayLineIndex={gray_line_index}
                revenueIndex={revenueIndex}
                key={revenueIndex}
                activeLineFill={activeLineFill}
                registrationPercent={registration_percent}
              />
            );
          })}
      </div>
    );
  }, [revenues, active_line_index, gray_line_index, activeLineFill, registration_percent]);

  const renderCompletion = useMemo(() => {
    const isComeFinish = Boolean(finish_reward);
    if (isComeFinish) {
      return (
        <div className="absolute border border-green text-green h-5 border-t-0 -bottom-2 rounded-b-[5px] -left-2 -right-2 flex items-end z-two sm:-bottom-2">
          <div className="absolute text-[12px] leading-[12px] -bottom-1.5 w-full flex justify-center items-center sm:-bottom-5 sm:text-[11px] sm:leading-[13px]">
            <div className="flex items-center justify-center bg-gray-900 w-max h-max px-1.5 sm:flex-col sm:px-2">
              <div className="flex items-center mr-1 sm:mr-0">
                <BnbIcon className="w-2.5 h-2.5 mr-1 sm:mr-1.5" />
                <span>{capitalize(t('completion'))}</span>
              </div>
              <span>+{finish_reward}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }, [finish_reward]);

  const renderCompleteStatus = useMemo(() => {
    if (!active) {
      return (
        <div className="flex flex-col items-center justify-end text-green pr-3 sm:text-xs sm:justify-start z-two sm:hidden">
          <SuccessIcon className="w-7.5 h-7.5 sm:w-4 sm:h-4" />
          <span>{capitalize(t('completed'))}</span>
        </div>
      );
    }
    return null;
  }, [active]);

  return (
    <Wrapper className={`${className} relative overflow-hidden ${freeze && freezeStyle?.wrapperBg}`}>
      {titleRender}
      <div className="flex w-full justify-between items-center sm:items-start sm:flex-col">
        <div className="relative">
          {progressBarsRender}
          {renderCompletion}
        </div>
        {renderCompleteStatus}
      </div>
      {rewardsRender}
      {!active && <div className="bg-grey-900 absolute -top-2.5 left-0 w-full h-full" />}
      {freeze && (
        <div className="">
          <img
            src="/img/clone/freeze.png"
            className="absolute top-0 bottom-0 left-0 h-full max-h-full sm:hidden"
            alt=""
          />
          <img
            src="/img/clone/freeze-mobile.png"
            className="absolute top-0 bottom-0 left-0 h-full w-full hidden sm:block"
            alt=""
          />
        </div>
      )}
    </Wrapper>
  );
};
