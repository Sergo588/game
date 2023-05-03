import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import React, { memo, useMemo } from 'react';
import NetworkIcon from 'assets/icons/network.svg';
import BnbIcon from 'assets/tokens/BNB.svg';
import { PROGRAM_NAMES, PROGRAMS_PRICES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import ArrowUpIcon from 'assets/icons/arrow_up.svg';

const ChecksComp = (props) => {
  const { t } = useTranslation('common');
  const { statuses, isLoadingChecks, level, isSuccessAll } = props;

  const programChecks = useMemo(() => {
    return [
      {
        title: 'Network check',
        key: 'checkNetwork',
        icon: NetworkIcon,
        error: 'Switch to Bnb Chain',
      },
      {
        title: 'Balance check',
        key: 'checkBalance',
        icon: BnbIcon,
        error: `${PROGRAMS_PRICES[PROGRAM_NAMES.GAME][level]} BNB ${t('toOpenThisLevel')}`,
      },
    ];
  }, [level]);

  return (
    <div className="w-full flex justify-center items-center mt-5">
      {isSuccessAll ? (
        <div className="w-full flex justify-evenly items-start§ h-44px">
          <span className="bg-transparent text-active-green text-sm leading-22px text-center max-w-270px">
            {t('checksReadyActivation')}
          </span>
        </div>
      ) : (
        programChecks?.map((check, index) => {
          const isError = statuses[check.key] === STATUSES_ENUM.ERROR;
          const Icon = check?.icon;

          if (isError) {
            return (
              <div
                className={`flex items-center justify-center rounded flex-1 w-full bg-transparent ${
                  isLoadingChecks ? '!text-white-500' : ''
                } ${isError ? 'text-red' : ''}`}
                key={index}
              >
                {isError && !isLoadingChecks && (
                  <div
                    className="flex items-center justify-center rounded flex-1 w-full bg-transparent text-red"
                    key={index}
                  >
                    <Icon className="w-5 h-5 mr-2.5" />
                    <span className="flex font-medium text-sm whitespace-nowrap text-base !leading-4 sm:text-sm">
                      {check.error}
                    </span>
                  </div>
                )}
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export const Checks = memo(ChecksComp);
