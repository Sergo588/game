import React from 'react';
import { Modal, Button } from 'components';
import { BUTTON_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';

export const DisclaimerModal = ({ openedModal, onClose }) => {
  const { t } = useTranslation('common');

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full rounded-2xl bg-black-light space-y-7.5 max-h-[75vh] sm:max-h-full sm:space-y-5 sm:rounded-none py-10 sm:py-5 sm:!pt-14">
        <div className="flex items-center justify-between px-10 sm:px-5">
          <span className="text-white text-3xl font-medium sm:text-2xl">{capitalize(t('disclaimer'))}</span>
        </div>
        <div className="custom_scroll flex-1 flex flex-col space-y-5 overflow-auto text-white-500 px-10 sm:px-5">
          <span>{t('disclaimerFirstText')}</span>
          <span>{t('disclaimerSecondText')}</span>
        </div>
        <div className="w-full px-10 sm:px-5">
          <Button className="w-full" onClick={onClose} type={BUTTON_TYPES?.WHITE_100}>
            {capitalize(t('close'))}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
