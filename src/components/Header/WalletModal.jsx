import React from 'react';
import { Button, Modal } from 'components';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from 'helpers/format';
import { copy } from 'helpers/text';
import BNBIcon from 'assets/tokens/BNB.svg';
import { useDeactivationWallet } from 'helpers/hooks/useDeactivationWallet';
import WalletIcon from 'assets/icons/wallet.svg';
import { NETWORK_NAMES, BUTTON_TYPES } from 'helpers/constants';
import BSCIcon from 'assets/networks/BSC.svg';
import ErrorCheckIcon from 'assets/icons/error_check.svg';
import { TextRow } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';
import { getAccountBalance } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';

const BalancePlaceHolder = (
  <div className="flex w-20 h-2 mb-2">
    <TextRow color="rgba(0,0,0, 0.4)" className="!m-0 rounded-mini" />
  </div>
);

export const WalletModal = ({ openedModal, handleCloseModal }) => {
  const { t } = useTranslation('common');
  const { account, chainId } = useWeb3React();
  const isAllowedChainId = useCheckAllowedChain();
  const { balanceBnb, isFirstLoaded } = useSelector(getAccountBalance);
  const { deactivationWallet } = useDeactivationWallet();

  const onDisconnectClick = async () => {
    deactivationWallet();
    handleCloseModal();
  };

  return (
    <Modal isOpened={openedModal} onClose={handleCloseModal}>
      <div className="flex flex-col w-full bg-black-light rounded p-10 sm:bg-main-bg sm:h-screen sm:w-screen sm:rounded-none sm:px-0 sm:pt-20 sm:pb-0">
        <div className="flex items-center justify-between mb-7.5 sm:px-5">
          <span className="text-3xl text-white font-medium sm:text-2xl">{capitalize(t('wallet'))}</span>
          <Button
            type={BUTTON_TYPES?.TRANSPARENT}
            className="text-main-blue font-normal !text-base text-yellow"
            onClick={onDisconnectClick}
          >
            {capitalize(t('disconnect'))}
          </Button>
        </div>
        <div className="flex flex-col flex-1 justify-start overflow-auto">
          <div className="flex flex-col p-5 bg-white-100 rounded mb-5 sm:rounded-none sm:mb-0 sm:overflow-auto">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center space-x-5 rtl:space-x-reverse">
                <div className="w-7.5 h-7.5 flex justify-center items-center">
                  <WalletIcon className="stroke-current fill-current text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white sm:text-xl">
                  {account && shortenAddress(account, 4)}
                </span>
              </div>
              <Button
                type={BUTTON_TYPES?.DARK_GREY_ROUNDED}
                className="px-2.5 "
                onClick={() => {
                  copy(account);
                }}
              >
                {capitalize(t('copy'))}
              </Button>
            </div>
            <div className="flex justify-between items-center mb-5">
              {chainId && (
                <div className="flex items-center space-x-5 rtl:space-x-reverse">
                  {isAllowedChainId ? <BSCIcon className="w-7.5 h-7.5" /> : <ErrorCheckIcon className="w-6 h-6" />}
                  {!!NETWORK_NAMES[chainId] && <span className="text-base text-white">{NETWORK_NAMES[chainId]}</span>}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-white-500 text-base mb-3.5 sm:text-sm">{t('currentWalletBalance')}</span>
              <div className="flex flex-col space-y-3.5 space-x-5 rtl:space-x-reverse">
                <div className="flex items-center justify-start space-x-5 rtl:space-x-reverse">
                  <BNBIcon className="h-7.5 h-7.5" />
                  <ReactPlaceholder
                    ready={isFirstLoaded || isAllowedChainId}
                    showLoadingAnimation
                    customPlaceholder={BalancePlaceHolder}
                  >
                    <span className="text-white text-base sm:text-sm">{balanceBnb} BNB</span>
                  </ReactPlaceholder>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
