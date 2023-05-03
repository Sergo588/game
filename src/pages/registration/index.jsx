import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ConnectWallet, ActivateGameFast } from 'features/registration';
import { RegistrationLayout } from 'layouts/RegistrationLayout';
import { useWeb3React } from '@web3-react/core';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { CONTRACT_NAMES } from 'helpers/constants';
import { userAddressToId } from 'helpers/checks';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { ActivateGameBase } from 'features/registration/ActivateGameBase';
import LogoIcon from 'assets/logo.svg';
import { LangSwitcher } from 'components';

export const Registration = () => {
  const { getContract } = useGetContract();
  const { account, active } = useWeb3React();
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isActivatedGame, setIsActivatedGame] = useState(false);
  const isAllowedChainId = useCheckAllowedChain();

  const fetchUserInfo = useCallback(async () => {
    try {
      if (account) {
        setIsLoadingUser(true);
        const contract = await getContract(CONTRACT_NAMES.XBASE);
        const isExist = await contract.isUserExists(account);
        let id = null;

        if (isExist) {
          id = await userAddressToId(account, contract);
          id = parseInt(id, 10);
        }
        setUserId(id);
        setIsLoadingUser(false);
      } else {
        setUserId(null);
        setIsLoadingUser(false);
      }
    } catch (e) {
      setIsLoadingUser(false);
    }
  }, [userId, isLoadingUser, isAllowedChainId, getContract]);

  const fetchContractData = useCallback(async () => {
    try {
      if (account && !isLoading) {
        setIsLoading(true);
        const contract = await getContract(CONTRACT_NAMES.GAME);
        const userData = await contract?.getUserData(account);
        const { levels } = userData;

        const isRegisteredGame = !!levels.length;

        setIsActivatedGame(isRegisteredGame);
      }
    } catch (e) {
      setIsLoading(false);
    }

    setIsLoading(false);

    if (!isLoading && !account) {
      setIsActivatedGame(false);
    }
  }, [isLoading, account, getContract]);

  const renderContent = useMemo(() => {
    if (!active) {
      return <ConnectWallet />;
    }

    if (!userId) {
      return <ActivateGameFast />;
    }

    return <ActivateGameBase />;
  }, [account, userId, isActivatedGame, active]);

  useEffect(() => {
    if (isAllowedChainId) {
      fetchUserInfo();
      fetchContractData();
    }
  }, [account, isAllowedChainId]);

  return (
    <div className="w-full flex justify-center">
      <div className="fixed top-0 w-screen flex justify-center items-center">
        <div className="max-w-desktop-full flex items-center justify-between w-full p-5">
          <LogoIcon className="max-h-[30px]" />
          <LangSwitcher mobileSelect />
        </div>
      </div>
      {renderContent}
    </div>
  );
};

Registration.Layout = RegistrationLayout;

export default Registration;
