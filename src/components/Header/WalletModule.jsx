import React, { useMemo, useState, Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import BNBIcon from 'assets/tokens/BNB.svg';
import { Button } from 'components';
import BSCIcon from 'assets/networks/BSC.svg';
import ErrorCheckIcon from 'assets/icons/error_check.svg';
import ReactPlaceholder from 'react-placeholder';
import { NETWORK_NAMES, BUTTON_TYPES } from 'helpers/constants';
import { TextRow } from 'react-placeholder/lib/placeholders';
import { useSelector } from 'react-redux';
import WalletIcon from 'assets/icons/wallet.svg';
import { shortenAddress } from 'helpers/format';
import { getAccountBalance } from 'store/userSlice/selectors';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { WalletModal } from './WalletModal';

const BalancePlaceHolder = (
  <div className="flex w-20 h-2 mb-2 ml-2.5">
    <TextRow color="rgba(0,0,0, 0.4)" className="!m-0 rounded-mini" />
  </div>
);

export const WalletModule = () => {
  const { account, chainId } = useWeb3React();
  const { balanceBnb, isFirstLoaded } = useSelector(getAccountBalance);
  const [openedWalletModal, setOpenedWalletModal] = useState(false);
  const isAllowedChainId = useCheckAllowedChain();

  const info = useMemo(() => {
    return [
      chainId && {
        info: 'balance',
        icon: BNBIcon,
        title: `${balanceBnb} BNB`,
        isLoading: !isFirstLoaded || !isAllowedChainId,
        color: 'text-white-500',
        mobile: 'lg:hidden',
      },
      {
        info: 'wallet_connection',
        icon: WalletIcon,
        title: account ? shortenAddress(account, 2) : 'Не подключен',
        color: 'text-white-500',
      },
    ]?.filter((item) => !!item);
  }, [balanceBnb, isFirstLoaded, isAllowedChainId]);

  return (
    <div className="flex justify-end space-x-5 sm:space-x-2.5 rtl:space-x-reverse">
      {/* <ProfileBar /> */}
      {chainId && (
        <div
          className={`flex py-2 px-2.5 ${
            !!NETWORK_NAMES[chainId] && 'pr-5'
          } !rounded-full items-center bg-black-light lg:hidden space-x-2.5 rtl:space-x-reverse`}
        >
          {isAllowedChainId ? <BSCIcon className="w-6 h-6" /> : <ErrorCheckIcon className="w-6 h-6" />}
          {!!NETWORK_NAMES[chainId] && <span className="text-base text-white-500">{NETWORK_NAMES[chainId]}</span>}
        </div>
      )}

      <Button
        type={BUTTON_TYPES?.DARK_GREY}
        className="px-2.5 py-2 p-2 !rounded-full font-normal pl-0 pr-2.5 sm:pl-2.5"
        onClick={() => setOpenedWalletModal(true)}
      >
        {info?.map((item) => {
          const Icon = item.icon;

          return (
            <Fragment key={item?.info}>
              <div
                className={`flex items-center space-x-2.5 rtl:space-x-reverse border-r rtl:border-r-0 border-white-100 px-2.5 last:border-r-0 last:rtl:border-r last:rtl:border-l-0 ${
                  item.mobile
                } ${item.onClick && 'cursor-pointer'} lg:px-0 lg:pl-2.5 sm:pl-0`}
                onClick={item.onClick}
              >
                <Icon className="w-6 h-6 sm:hidden" />
                <ReactPlaceholder ready={!item.isLoading} showLoadingAnimation customPlaceholder={BalancePlaceHolder}>
                  <span className={`text-base ${item.color}`}>{item.title}</span>
                </ReactPlaceholder>
              </div>
            </Fragment>
          );
        })}
      </Button>
      <WalletModal handleCloseModal={() => setOpenedWalletModal(false)} openedModal={openedWalletModal} />
    </div>
  );
};
