import React from 'react';
import { Button, CustomLink } from 'components';
import ModalSuccess from 'assets/icons/modal_success.svg';
import { BUTTON_TYPES, EVENTS_PUBSUB } from 'helpers/constants';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';
import { getPubSub } from 'helpers/pubsub';
import LinkSquare from 'assets/icons/link_square.svg';
import config from 'helpers/config';

export const SuccessProgramStep = ({ level, closeModal, upgradedData }) => {
  const { t } = useTranslation('common');

  const handleCloseModal = () => {
    getPubSub().emit(EVENTS_PUBSUB.CLOSE_SUCCES_BUY_NEW_LEVEL);
    closeModal();
  };

  return (
    <div className="p-10 flex z-10 relative flex-col justify-center items-center w-full bg-black-light rounded sm:bg-main-bg sm:rounded-none sm:p-5 sm:w-full sm:h-full ">
      <div className="flex flex-col justify-center items-center mb-13 sm:flex-1">
        <div className="flex justify-center items-center mb-6 sm:flex-col">
          <ModalSuccess className="w-28 h-28 sm:ml-0 sm:order-1" />
        </div>
        <span className="text-white text-2xl font-medium mb-5 sm:mb-2.5 sm:text-2xl">{capitalize(t('activated'))}</span>
        <div className="flex flex-col space-y-2.5">
          <span className="text-center text-white-500 text-base sm:text-sm">
            <span>{capitalize(t('congratulations'))}!</span>
            <span className="text-white">
              {capitalize(t('level'))} {level} {t('activated')}
            </span>
          </span>
          <CustomLink
            href={`${config?.scanNetwork}${upgradedData.hash}`}
            targetBlank
            className="flex items-center justify-center text-center text-white-500 text-base sm:text-sm space-x-2 rtl:space-x-reverse"
          >
            <span>{capitalize(t('transactionInBlockchain'))} </span> <LinkSquare className="w-6 h-6" />
          </CustomLink>
        </div>
      </div>
      <Button className="w-full" type={BUTTON_TYPES?.GRADIENT} onClick={handleCloseModal}>
        <span>{capitalize(t('okay'))}</span>
      </Button>
    </div>
  );
};
