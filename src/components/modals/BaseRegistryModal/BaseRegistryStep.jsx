import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { checkBalanceBNB, checkNetwork } from 'helpers/checks';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { useWeb3React } from '@web3-react/core';
import { useChecks } from 'helpers/hooks/useChecks';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { Button } from 'components';
import { useGameContract } from 'helpers/hooks/useGameContract';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { Checks, LevelSelect } from 'features/modals/BuyModals';
import { PROGRAMS_PRICES, BUTTON_TYPES, MAX_ACTIVATES_COUNT } from 'helpers/constants';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import WarningRegistrationYellow from 'assets/icons/warning_registration_yellow.svg';
import { callNotification } from 'helpers/notification';
import { useTimerLevelsActiveInterval } from 'helpers/hooks/useTimerLevelsActiveInterval';
import { useGetUserData } from 'helpers/hooks/useGetUserData';
import { parseErrorToUserReadableMessage } from 'helpers/error';

const getChecksCallbacks = (web3Props, getContract, name, level) => {
  const funcProps = { getContract, ...web3Props };

  const balanceProps = {
    func: checkBalanceBNB,
    funcProps: {
      ...funcProps,
      bnbMinPrice: PROGRAMS_PRICES[name][level],
    },
  };

  return [
    {
      func: checkNetwork,
      key: 'checkNetwork',
      funcProps,
    },
    {
      key: 'checkBalance',
      ...balanceProps,
    },
  ];
};

export const BaseRegistryStep = ({ handleNextStep, selectedLevel, name = 'game', isRegistered }) => {
  const { t, i18n } = useTranslation('common');
  const web3Props = useWeb3React();
  const { getContract } = useGetContract();
  const { buyNewLevel } = useGameContract();
  const { getLastStartedLevel } = useGetLevelTime();
  const { activeClonesLevels } = useTimerLevelsActiveInterval();
  const { totalClonesCount } = useGetUserData();

  const lastLevel = getLastStartedLevel();
  const isHindi = i18n.language === 'hi';

  const [level, setLevel] = useState(lastLevel?.level || selectedLevel || 36);

  const levelPrice = PROGRAMS_PRICES[name][level];
  const [isLoadingRegistry, setIsLoadingRegistry] = useState(false);

  const isAllowedChainId = useCheckAllowedChain();

  const { statuses, callChecks, isLoadingChecks, isLoadingAny, isSuccessAll, isAnyError } = useChecks(
    getChecksCallbacks(web3Props, getContract, name, level),
  );

  useEffect(() => {
    callChecks();
  }, [level]);

  const buyLevel = async () => {
    try {
      if (isSuccessAll) {
        setIsLoadingRegistry(true);
        const result = await buyNewLevel(level);

        handleNextStep(result, level);
      } else if (isAnyError) {
        callChecks();
      }
    } catch (e) {
      if (e?.data?.message || e?.message) {
        callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
      }
    } finally {
      setIsLoadingRegistry(false);
    }
  };

  const renderActionButton = useMemo(() => {
    if (isLoadingAny) {
      return (
        <Button
          type={BUTTON_TYPES?.GRADIENT_MODAL_LOADING}
          className="w-full py-5 !px-10 sm:py-3 h-43px"
          onClick={() => {}}
          disabled={isLoadingAny}
        >
          <span>{capitalize(t('checking'))}...</span>
          <PuffLoadingIcon className="w-6 h-6 ml-5" />
        </Button>
      );
    }

    if (isAnyError) {
      return (
        <Button
          type={BUTTON_TYPES?.GRADIENT_MODAL_SUCCESS}
          className="w-full py-5 !px-10 sm:py-3 h-43px"
          onClick={() => callChecks()}
        >
          <span>{`${t('checkAgain')} ${levelPrice ? `(${levelPrice} BNB)` : ''}`}</span>
        </Button>
      );
    }

    if (totalClonesCount?.[level] >= MAX_ACTIVATES_COUNT && !activeClonesLevels[level]) {
      return (
        <Button className="!bg-white-100 !cursor-not-allowed w-full py-5 !px-10 sm:py-3 h-43px text-white leading-12px h-full w-full">
          <span>{t('maxPlacesActive')}</span>
        </Button>
      );
    }

    return (
      <Button
        type={BUTTON_TYPES?.GRADIENT_MODAL_SUCCESS}
        className="w-full py-5 !px-10 sm:py-3 h-43px"
        onClick={buyLevel}
        disabled={isLoadingRegistry || !isAllowedChainId || !level}
      >
        {isLoadingRegistry
          ? `${capitalize(t('activating'))}...`
          : `${isRegistered ? t('ActivateLevel') : t('joinSmartGamePRO')} ${levelPrice ? `(${levelPrice} BNB)` : ''}`}
        {isLoadingRegistry && <PuffLoadingIcon className="w-6 h-6 ml-5" />}
      </Button>
    );
  }, [
    isLoadingAny,
    isSuccessAll,
    isAnyError,
    isLoadingRegistry,
    isAllowedChainId,
    level,
    isRegistered,
    activeClonesLevels,
    totalClonesCount,
  ]);

  const renderTexts = useMemo(() => {
    if (isRegistered) {
      return {
        renderTitle: () => {
          if (isHindi) {
            return (
              <span>
                <span className="mx-1">{t('smartGamePro')}</span> {t('in')}
                <br /> {t('levelActivation')}
              </span>
            );
          }

          return (
            <span>
              {t('levelActivation')} <br /> {t('in')} <span className="mx-1">{t('smartGamePro')}</span>
            </span>
          );
        },
        text: `${t('activateAnyAvailableLevelInSmartGamePro')}. ${t(
          'chooseTheLevelYouWishToActivateAndSignTheTransactionInYourWallet',
        )}`,
      };
    }

    return {
      renderTitle: () => {
        if (isHindi) {
          return (
            <span>
              <span className="mx-1">{t('smartGamePro')}</span> {t('in')} <br /> {capitalize(t('registration'))}
            </span>
          );
        }

        return (
          <span>
            {capitalize(t('registration'))} <br /> {t('in')} <span className="mx-1">{t('smartGamePro')}</span>
          </span>
        );
      },
      renderDescription: () => {
        if (isHindi) {
          return (
            <span className="text-base text-white-500 sm:text-sm">
              <span className="mx-1">{t('smartGamePro')}</span>
              {t('chooseGameLevel')}
            </span>
          );
        }

        return (
          <span className="text-base text-white-500 sm:text-sm">
            {t('chooseGameLevel')}
            <span className="mx-1">{t('smartGamePro')}</span>
          </span>
        );
      },
      text: `${t('joinSmartGamePROByActivatingAnyAvailableLevel')}. ${t(
        'chooseTheLevelYouWishToActivateAndSignTheTransactionInYourWallet',
      )}`,
    };
  }, [isRegistered, i18n, t]);

  return (
    <div className="relative flex z-10 relative flex-col p-10 justify-center w-full bg-black-light sm:bg-main-bg rounded overflow-auto sm:rounded-none sm:justify-start sm:w-full sm:p-5 sm:h-full">
      <div className="flex flex-col flex-1">
        <div className="flex flex-col z-10 justify-between items-start w-full sm:items-start mb-5 sm:mb-2.5 sm:pb-0 sm:mt-7.5">
          <span className="text-3xl text-white font-medium text-left mb-2.5 sm:text-2xl">
            {renderTexts?.renderTitle ? renderTexts?.renderTitle() : renderTexts?.title}
          </span>
          {renderTexts?.renderDescription?.()}
        </div>
        <div className="mb-5 space-y-2.5">
          <LevelSelect onSelect={setLevel} level={level} />
        </div>
        <div className="flex flex-col mb-5 space-y-5">
          <span className="text-base leading-22px font-normal text-white-500">{renderTexts?.text}</span>
          <div className="flex  items-center">
            <div className="flex justify-center w-full items-center">
              <WarningRegistrationYellow className="fill-current stroke-current text-yellow h-6 w-6 flex-shrink-0" />
              <span className="text-base leading-22px font-normal text-white-500 max-w-250px text-center">
                {t('doNotChangeTheGasPriceKeep5GweiOrItWillFail')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-2.5 sm:pb-2.5 sm:sticky sm:bottom-0 z-10">{renderActionButton}</div>
      <div className="flex flex-wrap min-h-64px">
        <Checks level={level} statuses={statuses} isLoadingChecks={isLoadingChecks} isSuccessAll={isSuccessAll} />
      </div>
    </div>
  );
};
