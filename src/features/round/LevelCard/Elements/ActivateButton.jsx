import React, { memo, useMemo, useCallback } from 'react';
import { Button } from 'components';
import { TimerLevelButton } from 'features/dashboard/Levels';
import { removePreviewAccount } from 'store/userSlice';
import { useAuth } from 'helpers/hooks/useAuth';
import { useRouter } from 'next/router';
import { useTimerLevelsActiveInterval } from 'helpers/hooks/useTimerLevelsActiveInterval';
import { MAX_ACTIVATES_COUNT } from 'helpers/constants';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';

export const ActivateButton = memo(
  ({
    clones,
    account,
    isLevelPage,
    isAvailableActivation,
    level,
    isCompleted,
    active,
    isPreview,
    isAllowButton,
    mainStyle,
    onOpen,
    isMobile,
  }) => {
    const { t } = useTranslation('common');
    const authAccount = useAuth();
    const { push } = useRouter();
    const dispatch = useDispatch();
    const { activeClonesLevels } = useTimerLevelsActiveInterval();

    const isMaxPlacesActive = useMemo(() => {
      return clones?.length >= MAX_ACTIVATES_COUNT && !activeClonesLevels[level];
    }, [activeClonesLevels, level]);

    const onClickButtonWrapper = useCallback((e) => {
      e.stopPropagation();
      e.preventDefault();
    }, []);

    const isAllowAction = (action) => {
      if (!isAllowButton) return;
      return action;
    };

    const loginToYourAccountHandler = useCallback(async () => {
      if (authAccount?.id) {
        await push('/dashboard');
        dispatch(removePreviewAccount());
      } else if (account) {
        await authAccount();
      } else {
        push('/');
      }
    }, [account, authAccount]);

    const renderButton = useMemo(() => {
      if (isMaxPlacesActive && !isPreview) {
        const maxStyleText = isLevelPage ? '' : 'sm:!text-10px';
        return (
          <Button className={`!bg-white-100 flex !cursor-not-allowed ${maxStyleText} ${mainStyle?.buttonStyle}`}>
            <span className="mr-1">{isMobile ? t('moreIn', { lng: 'en' }) : t('activateMore', { lng: 'en' })}: </span>
            <TimerLevelButton level={level} />
          </Button>
        );
      }

      if (isAvailableActivation && !isPreview) {
        return (
          <Button className={mainStyle?.buttonStyle} onClick={isAllowAction(onOpen)} type="gradient-orange-yellow">
            <span>
              {capitalize(t('activate'))} {active ? '+1' : ''}
            </span>
          </Button>
        );
      }

      if (isCompleted && active && isPreview) {
        return (
          <Button
            className={mainStyle?.buttonStyle}
            onClick={isAllowAction(loginToYourAccountHandler)}
            type="gradient-orange-yellow"
          >
            <span> {capitalize(t('login'))}</span>
          </Button>
        );
      }

      return null;
    }, [isAvailableActivation, isMaxPlacesActive, level, isCompleted, active, isPreview]);

    return (
      <div
        onClick={onClickButtonWrapper}
        className={`mt-1.5 ${(isCompleted || isPreview) && 'z-10'} m:max-w-142px sm:min-w-142px ml-auto mr-auto w-full`}
      >
        {renderButton}
      </div>
    );
  },
);
