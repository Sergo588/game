import React, { useEffect, useState, useMemo } from 'react';
import { Button, UserIdWrapper } from 'components';
import { BUTTON_TYPES, TRANSACTION_INITIAL_STATE } from 'helpers/constants';
import { parseCookies } from 'nookies';
import InfoIcon from 'assets/icons/information_circle.svg';
import PencilIcon from 'assets/icons/pencil.svg';
import { InputForm } from 'components/Forms';
import { useXBaseContract } from 'helpers/hooks/useXBaseContract';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useWeb3React } from '@web3-react/core';
import { LevelSelect } from 'features/modals/BuyModals';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import { checkBalanceBnbWithLevelReg, checkNetwork, getTotalPriceFastRegistry } from 'helpers/checks';
import { useChecks } from 'helpers/hooks/useChecks';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { useRegistry } from 'helpers/hooks/useRegistry';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/error';
import { Pending, Success, Error } from 'features/registration/states';
import { useTranslation } from 'next-i18next';
import { Alert } from '../Alert';
import { LevelRegistrationMockCard } from '../LevelRegistrationMockCard';

const getChecksCallbacks = (web3Props, getContract, selectedLevel) => {
  const funcProps = { getContract, ...web3Props };

  const balanceProps = {
    func: checkBalanceBnbWithLevelReg,
    funcProps: {
      ...funcProps,
      level: selectedLevel,
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

export const ActivateGameFast = () => {
  const { t } = useTranslation('common');
  const web3Props = useWeb3React();
  const { getContract } = useGetContract();
  const { active, account, chainId } = web3Props;
  const { getLastStartedLevel } = useGetLevelTime();
  const lastLevel = getLastStartedLevel();
  const { onFastRegistry, isLoadingFastRegistry } = useRegistry();
  const [transactionState, setTransactionState] = useState(TRANSACTION_INITIAL_STATE);

  const isAllowedChainId = useCheckAllowedChain();

  const [priceState, setPriceState] = useState({
    price: 0,
    isLoading: false,
  });

  const [states, setStates] = useState({
    isLoading: false,
    isError: false,
  });

  const [level, setLevel] = useState(lastLevel?.level);

  const { statuses, callChecks, isLoadingChecks, isAnyError } = useChecks(
    getChecksCallbacks(web3Props, getContract, level),
  );

  const [userId, setUserId] = useState(parseCookies().upline_binance || '1');
  const { getAddressByValue } = useXBaseContract();

  const [inputValue, setInputValue] = useState(userId);
  const [isOpenedChangeUpline, setIsOpenedChangeUpline] = useState(false);

  const onChangeInputUpline = ({ target }) => {
    setInputValue(target?.value?.replace(/\D/g, '') || '');
  };

  const fetchBaseTotalPrice = async () => {
    setPriceState((prev) => ({ ...prev, isLoading: true }));

    const price = await getTotalPriceFastRegistry({ getContract, level });

    setPriceState((prev) => ({ ...prev, isLoading: false, price }));
  };

  const checkAddress = async (addressOrId) => {
    if (!states.isLoading) {
      setStates((prev) => ({ ...prev, isLoading: true, isError: false }));

      try {
        const currentValue = String(addressOrId)?.trim();
        const address = await getAddressByValue(currentValue);

        if (!address) {
          throw Error();
        }

        setUserId(currentValue);
        setIsOpenedChangeUpline(false);
      } catch (e) {
        setStates((prev) => ({ ...prev, isError: true }));
      }

      setStates((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    if (active) {
      checkAddress(userId);
    }
  }, [active]);

  useEffect(() => {
    if (active) {
      callChecks();
      fetchBaseTotalPrice();
    }
  }, [level, active, account, chainId]);

  const onClickFastRegistry = async () => {
    if (isAnyError) {
      return callChecks();
    }

    if (!transactionState.isLoading) {
      setTransactionState((prev) => ({ ...prev, isLoading: true, isError: false, isSuccess: false }));

      try {
        const address = await getAddressByValue(userId);

        const result = await onFastRegistry(level, address);
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

  const renderError = useMemo(() => {
    if (isAnyError) {
      if (statuses.checkBalance === 'error') {
        return <Alert text={t('notEnoughBalance')} />;
      }

      return <Alert text={t('incorrectNetworkChangeNetworkToBNBMainnet')} />;
    }

    if (states.isError) {
      return <Alert text={t('thisUplineDoesntExist')} />;
    }

    return null;
  }, [isAnyError, states]);

  const renderActionButton = useMemo(() => {
    if (
      isLoadingChecks ||
      priceState.isLoading ||
      states.isLoading ||
      isLoadingFastRegistry ||
      transactionState.isLoading
    ) {
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
  }, [
    isAnyError,
    isLoadingChecks,
    priceState.isLoading,
    states.isLoading,
    isLoadingFastRegistry,
    transactionState.isLoading,
  ]);

  const tryAgainHandler = () => {
    setTransactionState(TRANSACTION_INITIAL_STATE);
  };

  const renderContent = useMemo(() => {
    if (transactionState.isLoading) {
      return <Pending level={level} hash={transactionState.hash} />;
    }

    if (transactionState.isSuccess) {
      return <Success />;
    }

    if (transactionState.isError) {
      return <Error level={level} hash={transactionState.hash} tryAgain={tryAgainHandler} />;
    }

    return (
      <div className="w-full h-full min-h-[425px] sm:mt-5">
        <div className="w-full flex flex-col justify-between items-center py-[30px] sm:py-5 border-b border-white-100">
          <div className="flex justify-between w-full">
            <div className="w-full flex items-center justify-start space-x-2.5">
              <span className="text-[25px] leading-[20px] text-white sm:text-[18px] sm:leading-[22px]">
                {t('yourUpline')}
              </span>
              <Button type={BUTTON_TYPES?.TRANSPARENT}>
                <InfoIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-end space-x-2.5">
              <UserIdWrapper userId={userId} />
              {isAllowedChainId && (
                <Button
                  onClick={() => setIsOpenedChangeUpline(!isOpenedChangeUpline)}
                  type={BUTTON_TYPES?.WHITE_100_CIRCLE}
                >
                  <PencilIcon className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          {isOpenedChangeUpline && (
            <div className="flex mt-4 items-center w-full">
              <InputForm
                className="flex-grow-0 w-full "
                inputStyles={`py-[8px] px-[15px] ${states.isError && 'border-red'}`}
                type="text"
                onChange={onChangeInputUpline}
                placeholder={t('upline')}
                value={inputValue || ''}
              />
              <Button
                className="h-[44px] ml-2.5"
                disabled={states.isLoading}
                type={BUTTON_TYPES?.GRADIENT_ORANGE_YELLOW}
                onClick={() => checkAddress(inputValue)}
              >
                <span className="whitespace-nowrap">
                  {states.isLoading ? (
                    <div className="flex flex-shrink-0">
                      {t('loading')} <PuffLoadingIcon className="w-6 h-6 ml-5" />
                    </div>
                  ) : (
                    <>{t('saveUpline')}</>
                  )}
                </span>
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start py-[30px] space-y-5 w-full sm:py-5">
          <span className="text-[25px] leading-[20px] text-white sm:text-[18px] sm:leading-[22px]">Choose level</span>
          <LevelSelect className="w-full" onSelect={setLevel} level={level} withLabel={false} />
          {!priceState.isLoading && isAllowedChainId && (
            <span className="text-yellow">
              {t('youNeed')} <span className="font-bold">{priceState.price} BNB</span> {t('forActivateThisLevel')}
            </span>
          )}
          {renderError}
          <Button
            disabled={
              isLoadingChecks ||
              priceState.isLoading ||
              states.isLoading ||
              isLoadingFastRegistry ||
              transactionState.isLoading
            }
            className="w-full"
            type={BUTTON_TYPES?.GRADIENT_ORANGE_YELLOW}
            onClick={onClickFastRegistry}
          >
            {renderActionButton}
          </Button>
        </div>
      </div>
    );
  }, [
    states,
    level,
    priceState,
    isLoadingChecks,
    transactionState,
    isAllowedChainId,
    renderActionButton,
    isOpenedChangeUpline,
    isLoadingFastRegistry,
  ]);

  return (
    <div className="flex space-x-28 sm:flex-col sm:space-x-0 sm:items-center">
      <div className="flex flex-col w-[380px] sm:order-2 sm:w-full">{renderContent}</div>
      <LevelRegistrationMockCard level={level} />
    </div>
  );
};
