import React from 'react';
import { WALLETS } from 'connectors/wallets';
import { useTryActivation } from 'helpers/hooks/useTryActivation';
import { useTranslation } from 'next-i18next';
import { Modal } from '../Modal';

export const ActivateModal = ({ openedModal, handleCloseModal }) => {
  const { tryActivation } = useTryActivation();
  const { t } = useTranslation('common');

  const onWalletClick = (wallet) => () => {
    tryActivation(wallet.connector);
    handleCloseModal();
  };

  return (
    <Modal isOpened={openedModal} onClose={handleCloseModal}>
      <div className="flex flex-col items-start justify-start w-full p-10 bg-black-light rounded sm:rounded-none sm:bg-main-bg sm:p-5 sm:pt-20">
        <span className="text-3xl text-white font-medium sm:text-2xl">{t('connectWallet')}</span>
        <div className="flex w-full flex-col overflow-auto my-7.5 space-y-5">
          {WALLETS?.map((wallet) => {
            const Icon = wallet.icon;

            return (
              <div
                className="flex w-full p-5 cursor-pointer items-center rounded-small bg-white-100 hover:bg-main-blue sm:text-sm sm:py-2.5"
                onClick={onWalletClick(wallet)}
                key={wallet.title}
              >
                {Icon && <Icon className="bg-white rounded-full flex-shrink-0 w-7.5 h-7.5" />}
                <div className="flex flex-col ml-5">
                  <span className="text-base text-white">{wallet.title}</span>
                  <span className="text-sm text-white-500">{wallet.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
