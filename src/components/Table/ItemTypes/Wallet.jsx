import React, { useMemo } from 'react';
import { copy } from 'helpers/text';
import { shortenAddress } from 'helpers/format';
import CopyIcon from 'assets/icons/copy_white.svg';
import { CustomLink } from 'components';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { TRANSACTIONS_TYPES } from 'helpers/constants';
import config from 'helpers/config';
import { useTranslation } from 'next-i18next';

export const Wallet = ({ address, tx, type }) => {
  const { t } = useTranslation('common');
  const customTx = tx ? config.scanNetwork + tx : config?.scanNetworkAddress + address;
  const renderContent = useMemo(() => {
    switch (type) {
      case TRANSACTIONS_TYPES?.ACTIVATE_PROGRAM:
      case TRANSACTIONS_TYPES?.REGISTRATION:
      case TRANSACTIONS_TYPES?.UPGRADE:
      case TRANSACTIONS_TYPES?.FINISH_REWARD:
        return (
          <CustomLink targetBlank href={customTx}>
            {t('openTransaction')}
          </CustomLink>
        );
      default:
        return (
          <>
            <span>{shortenAddress(address, 5)}</span>
            <button
              onClick={() => {
                copy(address);
              }}
            >
              <CopyIcon className="h-18px w-18px" />
            </button>
          </>
        );
    }
  });

  return (
    <div className="flex text-white text-sm space-x-5 sm:space-x-3 rtl:space-x-reverse">
      {renderContent}
      <CustomLink targetBlank href={customTx}>
        <LinkSquareIcon className="w-18px h-18px" />
      </CustomLink>
    </div>
  );
};
