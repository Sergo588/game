import React from 'react';
import { Modal, Button, CustomLink } from 'components';
import { LINKS_IN_GAME, BUTTON_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';

export const UserSettingsModal = ({ openedModal, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full h-full rounded-2xl bg-black-light p-10 sm:rounded-none sm:p-5 sm:!pb-12 overflow-auto space-y-2.5">
        <div className="flex-1 flex flex-col">
          <span className="text-3xl font-medium text-white sm:!pt-14">{capitalize(t('profile'))}</span>
          <span className="text-white-500 my-2.5">{t('loginToForsageBUSDToEditYourProfile')}</span>
        </div>
        <CustomLink href={LINKS_IN_GAME?.FORSAGE_BUSD} targetBlank className="w-full">
          <Button className="w-full" type={BUTTON_TYPES?.BLUE}>
            {t('goToForsageBUSD')}
          </Button>
        </CustomLink>
      </div>
    </Modal>
  );
};
