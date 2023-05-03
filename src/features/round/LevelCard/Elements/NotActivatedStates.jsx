import React, { memo, useMemo } from 'react';
import ClockIcon from 'assets/icons/clock.svg';
import { TimerContent } from 'components';
import AlertIcon from 'assets/icons/alert_levels.svg';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import { format } from 'date-fns';

export const NotActivatedStates = memo(
  ({ isCompleted, onComplete, active, level, total_missed_revenue, isLevelPage, isPreview, areThereAnyMissed }) => {
    const { t, i18n } = useTranslation('common');
    const { getLevelTime } = useGetLevelTime();
    const isHindi = i18n.language === 'hi';

    const startDate = useMemo(() => {
      return format(getLevelTime(level), 'dd.MM.yyyy');
    }, [level]);

    if (!isCompleted) {
      return (
        <div className="absolute h-full w-full flex flex-col justify-center items-center text-center z-three">
          <ClockIcon className={isLevelPage ? 'w-80px h-80px' : 'w-10 h-10'} />
          <div className={`flex flex-col ${isLevelPage ? 'mt-4' : 'mt-1'}`}>
            <span className={`${isLevelPage ? '' : 'text-sm'}`}>
              {t('unlocksIn')}: <br />
            </span>
            <span className="text-white">
              <TimerContent isLevelCard level={level} onComplete={onComplete} />
            </span>
          </div>
          <div
            className={`w-full pt-1 mt-1 -mb-5 border-t border-white-100 sm:-mb-4 sm:pt-1.5 sm:mt-1 ${
              isLevelPage ? 'text-sm' : 'text-xs'
            } `}
          >
            {startDate}
          </div>
        </div>
      );
    }

    if (isCompleted && !active) {
      return (
        <div className="absolute h-full w-full flex flex-col justify-center items-center text-center z-three">
          <div className={`flex flex-col text-white ${isLevelPage ? 'text-2xl' : ''}`}>
            {isPreview ? (
              <span>
                {capitalize(t('level'))} <br /> {t('notActivated')}
              </span>
            ) : (
              <div className="flex flex-col items-center text-center">
                {isHindi ? (
                  <>
                    <span>{t('forActivation')}</span>
                    <span>{capitalize(t('available'))}</span>
                  </>
                ) : (
                  <>
                    <span>{capitalize(t('available'))}</span>
                    <span>{t('forActivation')}</span>
                  </>
                )}
              </div>
            )}
          </div>
          {areThereAnyMissed && (
            <div className={`flex text-red  items-start items-center ${isLevelPage ? 'text-2xl mt-3' : 'text-12px'}`}>
              {isLevelPage ? (
                <>
                  <AlertIcon className="mr-2 w-6 h-6" />
                  <span className="font-bold">{total_missed_revenue} BNB</span> &nbsp;{t('inTotalMissed')}
                </>
              ) : (
                <span>
                  <span className="font-bold">{total_missed_revenue} BNB</span>
                  <br />
                  &nbsp;{t('inTotalMissed')}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }

    return null;
  },
);
