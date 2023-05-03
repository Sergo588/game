import React, { useCallback, useState, useEffect } from 'react';
import { RefUplineRepository } from 'connectors/repositories/ref';
import { InviteLayout } from 'layouts';
import { HowStart, Definition, UplineView, MainVideo, TelegramBanner } from 'features/invite';
import { setCookie } from 'nookies';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { useWeb3React } from '@web3-react/core';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { CONTRACT_NAMES } from 'helpers/constants';
import { FastRegistryModal } from 'components/modals';
import { useModal } from 'helpers/hooks/useModal';
import { useRouter } from 'next/router';

const SHash = ({ id, photo_url, refkey, username }) => {
  const sectionStyle = 'w-full h-full flex flex-col items-center z-three';
  const { push } = useRouter();
  const { account, chainId } = useWeb3React();
  const { getContract } = useGetContract();
  const isAllowedChainId = useCheckAllowedChain();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { openedModal, onOpen, onClose } = useModal();

  const fetchUserInfo = useCallback(async () => {
    try {
      if (account) {
        setIsLoadingUser(true);
        const contract = await getContract(CONTRACT_NAMES.XBASE);
        const isExist = await contract.isUserExists(account);

        if (isExist) {
          setIsRegistered(true);
        }
        setIsLoadingUser(false);
      } else {
        setIsRegistered(false);
        setIsLoadingUser(false);
      }
    } catch (e) {
      setIsLoadingUser(false);
    }
  }, [isRegistered, isLoadingUser, isAllowedChainId, getContract]);

  useEffect(() => {
    fetchUserInfo();
  }, [account, chainId]);

  const onClickRegistration = (e) => {
    e.preventDefault();

    if (isRegistered) {
      return onOpen();
    }
    return push('/');
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <UplineView
        uplineId={id}
        avatar={photo_url}
        username={username}
        sectionStyle={sectionStyle}
        onClickRegistration={onClickRegistration}
        isLoading={isLoadingUser}
      />
      <HowStart
        sectionStyle={sectionStyle}
        refkey={refkey}
        onClickRegistration={onClickRegistration}
        isLoading={isLoadingUser}
      />
      <Definition sectionStyle={sectionStyle} />
      <MainVideo sectionStyle={sectionStyle} />
      <TelegramBanner />
      {openedModal && <FastRegistryModal openedModal={openedModal} onClose={onClose} uplineId={id} fromInvite />}
    </div>
  );
};

SHash.storeInitial = async ({ ctx }) => {
  try {
    const result = await RefUplineRepository.getRefInfo(ctx.query.hash);

    setCookie(ctx, 'upline_binance', result.id, {
      path: '/',
    });

    return {
      ...result,
    };
  } catch (e) {
    redirect('/');
  }

  return {};
};

SHash.Layout = InviteLayout;

export default SHash;
