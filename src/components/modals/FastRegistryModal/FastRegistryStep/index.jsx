import React, { useEffect, useMemo, useState } from 'react';
import { useXBaseContract } from 'helpers/hooks/useXBaseContract';
// eslint-disable-next-line no-unused-vars
import { checkBalanceBnbWithLevelReg, checkNetwork, getTotalPriceFastRegistry } from 'helpers/checks';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { useWeb3React } from '@web3-react/core';
import { useChecks } from 'helpers/hooks/useChecks';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { Button } from 'components';
import { useRegistry } from 'helpers/hooks/useRegistry';
import { parseCookies } from 'nookies';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { Checks, LevelSelect } from 'features/modals/BuyModals';
import { BUTTON_TYPES } from 'helpers/constants';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/error';
import { Rules } from './Rules';
import { UplineInput } from './UplineInput';

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

export const FastRegistryStep = ({ handleNextStep }) => {
  const { t, i18n } = useTranslation('common');
  const web3Props = useWeb3React();
  const { getAddressByValue } = useXBaseContract();
  const { onFastRegistry, isLoadingFastRegistry } = useRegistry();
  const uplineBinance = parseCookies()?.['upline_binance'] || '1';
  const { getLastStartedLevel } = useGetLevelTime();
  const lastLevel = getLastStartedLevel();
  const isHindi = i18n.language === 'hi';

  const { getContract } = useGetContract();
  const [inputId, setInputId] = useState(uplineBinance);
  const [isError, setIsError] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isApprovedUser, setIsApprovedUser] = useState(false);
  const [address, setAddress] = useState(null);
  const [level, setLevel] = useState(lastLevel?.level);
  const [totalBnbPrice, setTotalBnbPrice] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const isAllowedChainId = useCheckAllowedChain();

  const { statuses, callChecks, isLoadingChecks, isLoadingAny, isSuccessAll, isAnyError } = useChecks(
    getChecksCallbacks(web3Props, getContract, level),
  );

  const onSetInput = (value) => {
    setInputId(value);
    setIsApprovedUser(false);
  };

  const fetchUserInfo = async () => {
    if (!isLoadingUser) {
      setIsLoadingUser(true);
      setAddress(null);
      setIsApprovedUser(false);

      try {
        const currentValue = String(inputId)?.trim();
        const address = await getAddressByValue(currentValue);

        if (!address) {
          throw Error();
        }

        setAddress(address);
        setInputId(currentValue);
        setIsError(false);
        setIsApprovedUser(true);
      } catch (e) {
        setIsError(true);
        setIsApprovedUser(false);
        setAddress(null);
      }

      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    callChecks();
  }, []);

  const fetchBaseTotalPrice = async () => {
    setIsLoadingPrice(true);
    setTotalBnbPrice(await getTotalPriceFastRegistry({ getContract, level }));
    setIsLoadingPrice(false);
  };

  useEffect(() => {
    if (level) {
      fetchBaseTotalPrice();
    }
  }, [level]);

  const onFastReg = async () => {
    try {
      const result = await onFastRegistry(level, address);
      if (result) {
        handleNextStep(result, level);
      }
    } catch (e) {
      if (e?.data?.message || e?.message) {
        callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
      }
    }
  };

  const renderActionButton = useMemo(() => {
    if (isLoadingAny || isLoadingPrice) {
      return (
        <Button
          type={BUTTON_TYPES?.GRADIENT_MODAL_LOADING}
          className="w-full py-5 sm:py-3 h-43px"
          disabled={isLoadingAny || isLoadingPrice}
        >
          <span>{capitalize(t('checking'))}...</span>
          <PuffLoadingIcon className="w-6 h-6 ml-5" />
        </Button>
      );
    }

    if (!isApprovedUser) {
      return (
        <Button
          type={BUTTON_TYPES?.GRADIENT_MODAL_LOADING}
          className="w-full py-5 sm:py-3 h-43px"
          disabled={!isApprovedUser}
        >
          <span>{t('needToApproveUpline')}</span>
        </Button>
      );
    }

    if (isAnyError) {
      return (
        <Button
          type={BUTTON_TYPES?.GRADIENT_MODAL_LOADING}
          className="w-full py-5 sm:py-3 h-43px"
          onClick={callChecks}
          disabled={isLoadingUser || isLoadingFastRegistry}
        >
          <span>{`${t('checkAgain')} ${totalBnbPrice ? `(${totalBnbPrice} BNB)` : ''}`}</span>
          {(isLoadingUser || isLoadingFastRegistry) && <PuffLoadingIcon className="w-6 h-6 ml-5" />}
        </Button>
      );
    }

    return (
      <Button
        type={BUTTON_TYPES?.GRADIENT_MODAL_SUCCESS}
        className="w-full py-5 !px-10 sm:py-3 h-60px"
        onClick={onFastReg}
        disabled={!!isError || isLoadingUser || !address || isLoadingFastRegistry || !isAllowedChainId || !level}
      >
        <span>
          {isLoadingFastRegistry
            ? `${capitalize(t('activating'))}...`
            : `${t('acceptRulesAndActivate')} ${totalBnbPrice ? `(${totalBnbPrice} BNB)` : ''}`}
        </span>
        {(isLoadingUser || isLoadingFastRegistry) && <PuffLoadingIcon className="w-6 h-6 ml-5" />}
      </Button>
    );
  }, [
    isLoadingAny,
    isSuccessAll,
    isAnyError,
    isLoadingFastRegistry,
    isLoadingPrice,
    isLoadingUser,
    isApprovedUser,
    isAllowedChainId,
    totalBnbPrice,
  ]);

  const renderTitle = useMemo(() => {
    if (isHindi) {
      return (
        <span className="text-3xl text-white font-medium text-left mb-2.5 sm:text-2xl">
          <span className="mx-1">{t('smartGamePro')}</span> {t('in')} <br /> {t('fastRegistration')}
        </span>
      );
    }

    return (
      <span className="text-3xl text-white font-medium text-left mb-2.5 sm:text-2xl">
        {t('fastRegistration')} <br /> {t('in')} <span className="mx-1">{t('smartGamePro')}</span>
      </span>
    );
  }, [t, isHindi]);

  return (
    <div className="relative flex z-10 relative flex-col p-10 justify-center w-full bg-black-light sm:bg-main-bg rounded overflow-auto sm:rounded-none sm:justify-start sm:w-full sm:p-5 sm:h-full">
      <div className="flex flex-col flex-1">
        <div className="flex flex-col z-10 justify-between items-start w-full sm:items-start mb-5 sm:mb-2.5 sm:pb-0 sm:mt-7.5">
          {renderTitle}
          <span className="text-base text-white-500 sm:text-sm">
            {capitalize(t('activate'))} <span className="mx-1">{t('smartGamePro')}</span> {t('inOneTransactionWithBNB')}
          </span>
        </div>
        <div className="mb-5 space-y-2.5">
          <div className="flex flex-col">
            <UplineInput
              address={address}
              isError={isError}
              isLoading={isLoadingUser}
              inputId={inputId}
              setInputId={onSetInput}
              onApprove={fetchUserInfo}
            />
            <span className="text-base mt-4 text-red">{isError ? t('userNotFoundEnterExistingUplineId') : ''}</span>
          </div>
          <LevelSelect onSelect={setLevel} level={level} />
        </div>
        <Rules />
      </div>
      <div className="flex flex-col w-full mt-2.5 sm:pb-2.5 sm:sticky sm:bottom-0 z-10">{renderActionButton}</div>
      <div className="flex flex-wrap">
        <Checks level={level} statuses={statuses} isLoadingChecks={isLoadingChecks} isSuccessAll={isSuccessAll} />
      </div>
    </div>
  );
};
