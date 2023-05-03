import React, { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { userAddressToId } from 'helpers/checks';
import { CONTRACT_NAMES } from 'helpers/constants';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { FastRegistryModal, BaseRegistryModal } from 'components/modals';
import { Profile } from './Profile';

export const ProfileBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isOpenedBaseRegistryModal, setIsOpenedBaseRegistryModal] = useState(false);
  const [openedFastRegistryModal, setOpenedFastRegistryModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isActivatedGame, setIsActivatedGame] = useState(false);

  const { account } = useWeb3React();
  const { getContract } = useGetContract();
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
      console.log(e);
      setIsLoading(false);
    }

    setIsLoading(false);

    if (!isLoading && !account) {
      setIsActivatedGame(false);
    }
  }, [isLoading, account, getContract]);

  useEffect(() => {
    if (isAllowedChainId) {
      fetchUserInfo();
      fetchContractData();
    }
  }, [account, isAllowedChainId]);

  const onSetFastReg = useCallback(() => {
    setOpenedFastRegistryModal(true);
  }, []);

  const onCloseFastReg = useCallback(() => {
    setOpenedFastRegistryModal(false);
    if (isAllowedChainId) {
      fetchUserInfo();
      fetchContractData();
    }
  }, [isAllowedChainId, openedFastRegistryModal, fetchUserInfo, fetchContractData]);

  const onCloseBaseReg = useCallback(() => {
    setIsOpenedBaseRegistryModal(false);

    if (isAllowedChainId) {
      fetchUserInfo();
      fetchContractData();
    }
  }, [isAllowedChainId, setIsOpenedBaseRegistryModal, fetchUserInfo, fetchContractData]);

  const onSetBaseReg = useCallback(() => {
    setIsOpenedBaseRegistryModal(true);
  }, []);

  return (
    <>
      <Profile
        isLoading={isLoading || isLoadingUser}
        isActivatedGame={isActivatedGame}
        setOpenedFastRegistryModal={onSetFastReg}
        setOpenedBaseRegistryModal={onSetBaseReg}
        userId={userId}
      />
      {openedFastRegistryModal && <FastRegistryModal openedModal={openedFastRegistryModal} onClose={onCloseFastReg} />}
      {isOpenedBaseRegistryModal && (
        <BaseRegistryModal
          openedModal={isOpenedBaseRegistryModal}
          onClose={onCloseBaseReg}
          isRegistered={isActivatedGame}
        />
      )}
    </>
  );
};
