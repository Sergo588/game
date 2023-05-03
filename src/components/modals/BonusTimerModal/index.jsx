import React, { useMemo, useCallback, useEffect } from 'react';
import { Modal, Button } from 'components';
import { BUTTON_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import Countdown from 'react-countdown';
import { useTimerOver } from 'helpers/hooks/useTimerOver';
import { isBefore } from 'date-fns';

export const BonusTimerModal = ({
  currentTimeLevel,
  isAvailableLevel = false,
  isAvailableBonus = false,
  level = 1,
  openedModal,
  onClose,
}) => {
  const { t } = useTranslation('common');
  const { isCompleted, onComplete } = useTimerOver(currentTimeLevel);
  const isBeforeTimer = isBefore(new Date(), currentTimeLevel);
  useEffect(() => {
    onClose();
  }, [isCompleted]);

  const renderer = useCallback(({ minutes, seconds, completed }) => {
    if (completed) {
      return null;
    } else {
      if (minutes > 0) {
        return (
          <div className="inline space-x-1">
            <span>
              {minutes} {t('minutes')}
            </span>
            <span>
              {seconds} {t('seconds')}
            </span>
          </div>
        );
      }

      return (
        <span>
          {seconds} {t('seconds')}
        </span>
      );
    }
  }, []);
  const renderText = useMemo(() => {
    if (isAvailableBonus) {
      return (
        <>
          <span>{t('activateThisLevelToPreventMissingPartnerBonuses')}.</span>
          {!isCompleted && isBeforeTimer && (
            <div className="inline space-x-1.5">
              <span>{t('remaining')}:</span>
              <span className="text-white">
                <Countdown renderer={renderer} autoStart date={currentTimeLevel} onComplete={onComplete} overtime />
              </span>
            </div>
          )}
        </>
      );
    }
    return (
      <>
        <span>{t('toPreventOvertakingAndMissingReferralBonuses')},</span>
        <span className="text-white font-semibold">{t('ActivateLevel').toLowerCase()}</span>
        <span className="text-white font-semibold">{level + 18}</span>
      </>
    );
  }, [isCompleted, isAvailableBonus, isAvailableLevel, level, currentTimeLevel, isBeforeTimer]);

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full rounded-2xl bg-black-light space-y-7.5 max-h-[75vh] sm:max-h-full sm:space-y-5 sm:rounded-none py-10 sm:py-5 sm:!pt-14">
        <div className="flex items-center justify-between px-10 sm:px-5">
          <span className="text-white text-3xl font-medium sm:text-2xl"> {t('saveReferralBonus')}</span>
        </div>
        <div className="custom_scroll flex-1 overflow-auto text-white-500 px-10 sm:px-5">
          <div className="space-x-1">{renderText}</div>
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
