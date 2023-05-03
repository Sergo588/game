import React from 'react';
import { SocialButtons, Button } from 'components';
import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { BUTTON_TYPES } from 'helpers/constants';
import { useModal } from 'helpers/hooks/useModal';
import { DisclaimerModal } from 'components/modals';

export const Footer = ({ className }) => {
  const { t } = useTranslation('common');

  const { openedModal, onOpen, onClose } = useModal();

  return (
    <footer
      className={`flex lg:flex-col items-center mt-auto justify-between lg:justify-start lg:items-start py-10 w-full z-10 lg:p-5 lg:pb-9 ${className}`}
    >
      <div className="hidden lg:block mb-7.5">
        <SocialButtons />
      </div>
      <span className="text-white-500 text-xs font-normal lg:mb-2.5">
        © {format(new Date(), 'yyyy')} {t('allRightsReserved')}
      </span>
      <Button
        onClick={onOpen}
        type={BUTTON_TYPES?.TRANSPARENT}
        className="!text-white !hover:text-white-500 !font-normal !text-sm"
      >
        {capitalize(t('disclaimer'))}
      </Button>
      <DisclaimerModal openedModal={openedModal} onClose={onClose} />
    </footer>
  );
};
