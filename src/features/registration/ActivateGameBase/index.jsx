import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'components';
import { BUTTON_TYPES, PROGRAM_NAMES, PROGRAMS_PRICES, TRANSACTION_INITIAL_STATE } from 'helpers/constants';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { LevelSelect } from 'features/modals/BuyModals';
import { LevelRegistrationMockCard } from 'features/registration/LevelRegistrationMockCard';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import { checkBalance, checkBalanceBNB, checkNetwork } from 'helpers/checks';
import { useWeb3React } from '@web3-react/core';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { useGameContract } from 'helpers/hooks/useGameContract';
import { useChecks } from 'helpers/hooks/useChecks';
import { Alert } from 'features/registration';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/error';
import { Pending, Success, Error } from 'features/registration/states';
import { useTranslation } from 'next-i18next';

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

export const ActivateGameBase = () => {
  const { t } = useTranslation('common');
  const { getLastStartedLevel } = useGetLevelTime();
  const lastLevel = getLastStartedLevel();
  const [level, setLevel] = useState(lastLevel?.level);
  const isAllowedChainId = useCheckAllowedChain();
  const [transactionState, setTransactionState] = useState(TRANSACTION_INITIAL_STATE);

  const web3Props = useWeb3React();
  const { account, active, chainId } = web3Props;
  const { getContract } = useGetContract();
  const { buyNewLevel } = useGameContract();

  const { statuses, callChecks, isLoadingChecks, isAnyError } = useChecks(
    getChecksCallbacks(web3Props, getContract, PROGRAM_NAMES.GAME, level).callbacks,
  );

  useEffect(() => {
    callChecks();
  }, [active, account, chainId]);

  const renderError = useMemo(() => {
    if (isAnyError) {
      if (statuses.checkBalance === 'error') {
        return <Alert text={t('notEnoughBalance')} />;
      }

      return <Alert text={t('incorrectNetworkChangeNetworkToBNBMainnet')} />;
    }

    return null;
  }, [isAnyError]);

  const renderActionButton = useMemo(() => {
    if (isLoadingChecks || transactionState.isLoading) {
      return (
        <div className="flex flex-shrink-0">
          {t('loading')} <PuffLoadingIcon className="w-6 h-6 ml-5" />
        </div>
      );
    }

    if (isAnyError) {
      return <>{t('checkAgain')}</>;
    }

    return <>{t('activate')}</>;
  }, [isAnyError, isLoadingChecks, transactionState]);

  const onClickAction = async () => {
    if (isAnyError) {
      return callChecks();
    }

    if (!transactionState.isLoading) {
      setTransactionState((prev) => ({ ...prev, isLoading: true, isError: false, isSuccess: false }));

      try {
        const result = await buyNewLevel(level);
        setTransactionState((prev) => ({ ...prev, isPending: true }));

        if (result) {
          const waitResult = await result.wait();
          setTransactionState((prev) => ({ ...prev, hash: waitResult.hash }));

          if (waitResult.status === 0) {
            setTransactionState((prev) => ({ ...prev, isError: true, isPending: false }));
          } else {
            setTransactionState((prev) => ({ ...prev, isSuccess: true, isPending: false }));
          }
        }
      } catch (e) {
        if (e?.data?.message || e?.message) {
          setTransactionState((prev) => ({ ...prev, isPending: false }));
          callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
        }
      }
      setTransactionState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const tryAgainHandler = () => {
    setTransactionState(TRANSACTION_INITIAL_STATE);
  };

  const renderContent = useMemo(() => {
    if (transactionState.isPending) {
      return <Pending level={level} hash={transactionState.hash} />;
    }

    if (transactionState.isSuccess) {
      return <Success />;
    }

    if (transactionState.isError) {
      return <Error level={level} hash={transactionState.hash} tryAgain={tryAgainHandler} />;
    }

    return (
      <div className="flex flex-col items-start py-[30px] space-y-5 w-full sm:py-5">
        <span className="text-[25px] leading-[20px] text-white sm:text-[18px] sm:leading-[22px]">
          {t('chooseLevel')}
        </span>
        <LevelSelect className="w-full" onSelect={setLevel} level={level} withLabel={false} />
        {isAllowedChainId && (
          <span className="text-yellow">
            {t('youNeed')} <span className="font-bold">{PROGRAMS_PRICES[PROGRAM_NAMES.GAME][level]} BNB</span>{' '}
            {t('forActivateThisLevel')}
          </span>
        )}
        {renderError}
        <Button
          disabled={isLoadingChecks || transactionState.isLoading}
          className="w-full"
          type={BUTTON_TYPES?.GRADIENT_ORANGE_YELLOW}
          onClick={onClickAction}
        >
          {renderActionButton}
        </Button>
      </div>
    );
  }, [renderActionButton, level, isAllowedChainId, renderError, isLoadingChecks, transactionState, renderActionButton]);

  return (
    <div className="flex space-x-28 items-center sm:flex-col sm:space-x-0">
      <div className="flex flex-col w-[380px] sm:order-2 sm:w-full">{renderContent}</div>
      <LevelRegistrationMockCard level={level} />
    </div>
  );
};
