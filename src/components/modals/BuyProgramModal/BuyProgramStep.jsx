import React, { useEffect, useMemo, useState } from 'react';
import { useChecks } from 'helpers/hooks/useChecks';
import { Button } from 'components';
import BNBIcon from 'assets/tokens/BNB.svg';
import { useWeb3React } from '@web3-react/core';
import { useGetContract } from 'helpers/hooks/useGetContract';
// eslint-disable-next-line no-unused-vars
import { checkBalance, checkBalanceBNB, checkNetwork } from 'helpers/checks';
import { PROGRAM_NAMES, PROGRAMS_PRICES, PROGRAM_PERCENT, BUTTON_TYPES, MAX_REWARDS_ROUND } from 'helpers/constants';
import { callNotification } from 'helpers/notification';
import { useGameContract } from 'helpers/hooks/useGameContract';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { getRoundByLevel } from 'helpers/round';
import { Checks } from 'features/modals/BuyModals';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { parseErrorToUserReadableMessage } from 'helpers/error';

const getChecksCallbacks = (web3Props, getContract, name, level) => {
  const contractType = name;
  const funcProps = { getContract, ...web3Props, contractType };

  const balanceProps = {
    func: checkBalanceBNB,
    funcProps: {
      ...funcProps,
      bnbMinPrice: PROGRAMS_PRICES[name][level],
    },
  };

  const callbacks = [
    {
      func: checkNetwork,
      key: 'checkNetwork',
      funcProps,
    },
    {
      func: checkBalance,
      key: 'checkBalance',
      ...balanceProps,
    },
  ];

  return {
    name: contractType,
    getContract,
    callbacks,
  };
};

export const BuyProgramStep = ({ name = 'game', level, onNextStep }) => {
  const { t } = useTranslation('common');
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const web3Props = useWeb3React();
  const { account, active, chainId } = web3Props;
  const { getContract } = useGetContract();
  const activateTitle = capitalize(t('activate'));
  const { buyNewLevel } = useGameContract();

  const { statuses, callChecks, isSuccessAll, isLoadingChecks, isLoadingAny, isAnyError } = useChecks(
    getChecksCallbacks(web3Props, getContract, name, level).callbacks,
  );

  // TODO localization

  useEffect(() => {
    callChecks();
  }, [active, account, chainId]);

  const onClickUpgrade = async () => {
    try {
      if (isSuccessAll) {
        setIsLoadingBuy(true);
        const result = await buyNewLevel(level);

        onNextStep(result);
      } else if (isAnyError) {
        callChecks();
      }
    } catch (e) {
      if (e?.data?.message || e?.message) {
        callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
      }
    }
    setIsLoadingBuy(false);
  };

  const programInfo = useMemo(() => {
    const formatValue = (percent) => {
      const outputNum = parseFloat(((PROGRAMS_PRICES[name][level] * percent) / 100)?.toFixed(5));

      return `${outputNum} BNB`;
    };

    const currentRound = getRoundByLevel(level);
    const { profit, direct_partner, second_partner, third_partner, fourth_partner, fifth_partner } =
      PROGRAM_PERCENT[getRoundByLevel(level)];

    return [
      {
        title: `Basic Reward: up to ${profit}% x ${MAX_REWARDS_ROUND[currentRound]} cycles`,
        value: formatValue(profit * MAX_REWARDS_ROUND[currentRound]),
      },
      {
        title: `Complete Bonus: ${profit}%`,
        value: formatValue(profit),
      },
      {
        title: `Direct partners ${direct_partner}%`,
        value: formatValue(direct_partner),
      },
      {
        title: `2nd line partners ${second_partner}%`,
        value: formatValue(second_partner),
      },
      {
        title: `3rd line partners ${third_partner}%`,
        value: formatValue(third_partner),
      },
      {
        title: `4th line partners ${fourth_partner}%`,
        value: formatValue(fourth_partner),
      },
      {
        title: `5th line partners ${fifth_partner}%`,
        value: formatValue(fifth_partner),
      },
    ];
  }, [PROGRAMS_PRICES, level, name]);

  const renderActionButtonText = useMemo(() => {
    if (isLoadingBuy) {
      return (
        <>
          <span>Activating...</span> <PuffLoadingIcon className="h-6 w-6" />
        </>
      );
    } else if (isLoadingAny) {
      return `${capitalize(t('checking'))}...`;
    } else if (isSuccessAll) {
      return `${activateTitle} for ${PROGRAMS_PRICES[name][level]} BNB`;
    } else {
      return capitalize(t('checkAgain'));
    }
  }, [isLoadingAny, isSuccessAll, name, level, activateTitle, isAnyError, isLoadingBuy]);

  const renderActionButton = useMemo(() => {
    return (
      <Button
        type={BUTTON_TYPES?.GRADIENT}
        className="rounded-mini w-full space-x-2.5 rtl:space-x-reverse"
        onClick={onClickUpgrade}
        disabled={isLoadingAny || isLoadingBuy}
      >
        {renderActionButtonText}
      </Button>
    );
  }, [isLoadingAny, isSuccessAll, activateTitle, renderActionButtonText, isLoadingBuy]);

  const renderLevelCard = useMemo(() => {
    return (
      <div className="absolute overflow-hidden flex flex-col z-30 w-159px h-153px right-39px rtl:left-39px rtl:right-auto -top-45px bg-gray-950 level_card_buy_modal_gradient sm:scale-75 sm:top-10 sm:right-0">
        <span className="text-yellow text-34px ml-auto mr-auto leading-10 mt-36px">Level {level}</span>
        <div className="flex items-center mt-2 mb-36px ml-auto mr-auto space-x-2 rtl:space-x-reverse">
          <BNBIcon className="w-6.5 h-6.5" />
          <span className="text-26px text-white leading-30px">{PROGRAMS_PRICES[PROGRAM_NAMES.GAME][level]}</span>
        </div>
        <img className="absolute bottom-0 w-full" src="/img/modals/buyModal-waves.png" alt="" />
      </div>
    );
  }, [level]);

  return (
    <>
      {renderLevelCard}
      <div className="flex z-10 relative flex-col w-full bg-black-light rounded sm:rounded-none sm:w-full sm:h-full">
        <div className="flex z-10 flex-col w-full bg-black-light rounded sm:bg-main-bg sm:rounded-none sm:w-full sm:h-full">
          <div className="flex z-10 items-center w-full sm:items-start px-10 pt-10 sm:px-5 sm:pt-5 sm:pb-0 sm:mt-16">
            <div className="flex flex-col text-3xl text-white font-medium text-left sm:text-2xl">
              <span>{activateTitle}</span>
              <span>
                {capitalize(t('level'))} {level}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-start overflow-auto z-10 flex-1 mt-5 sm:mt-7.5">
            <div className="flex flex-col justify-center items-center flex-1 w-full px-10 sm:px-5">
              <div className="flex flex-1 justify-start items-start w-full pt-2.5">
                <div className="relative flex w-full flex-col">
                  <div className="h-133px sm:h-113px w-0 absolute border border-white opacity-10 left-0.5 rtl:right-0.5 rtl:left-auto top-40 sm:top-40" />
                  {programInfo?.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <>
                        {index === 0 && <span className="text-20px text-blue-space">{t('passiveIncome')}</span>}
                        <div
                          key={index}
                          className={`flex justify-between mt-2 items-center ${
                            index > 1 ? 'ml-15px rtl:ml-0 rtl:mr-15px subway-item' : ''
                          }`}
                        >
                          <span className="text-white-500 text-base leading-4 sm:text-sm">{item.title}</span>
                          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                            {item.value && (
                              <span className="text-white text-base whitespace-nowrap sm:text-sm">{item.value}</span>
                            )}
                            {Icon && <Icon className="w-5 h-5 sm:w-4 sm:h-4" />}
                          </div>
                        </div>
                        {index === 1 && <span className="text-20px text-pink-space mt-5">{t('activeIncome')}</span>}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex mt-10 z-10 sm:p-5 sm:mt-2.5 sm:p-0">{renderActionButton}</div>
            </div>
            <div className="flex items-center border mt-5 w-full right-0 border-l-0 border-white-100 sm:px-5" />
            <div className="flex flex-col px-10 pb-5 sm:pb-2.5 sm:px-5 sm:px-5">
              <Checks level={level} statuses={statuses} isLoadingChecks={isLoadingChecks} isSuccessAll={isSuccessAll} />
              <span className="mt-5 text-white-500 text-base sm:text-sm text-center">
                {t('doNotChangeTheGasPriceKeep5GweiOrItWillFail')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
