import React, { useMemo } from 'react';
import { Button, Avatar } from 'components';
import { BUTTON_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { useTimerLevelsActiveInterval } from 'helpers/hooks/useTimerLevelsActiveInterval';
import { Timer } from 'features/main/ProfileBanner/Profile/Timer';

export const UplineView = ({ uplineId, avatar, username, sectionStyle, onClickRegistration, isLoading }) => {
  const { t } = useTranslation('common');
  const { notActiveLevels } = useTimerLevelsActiveInterval();

  const avatarRender = useMemo(() => {
    if (avatar) {
      return (
        <>
          <Avatar photo={avatar} />
        </>
      );
    }
    return null;
  }, [avatar]);

  const renderUplineInfo = useMemo(() => {
    if (username) {
      return (
        <div className="flex flex-col">
          <span className="text-white font-medium text-5xl text-white sm:text-3xl">{username}</span>
          <span className="text-white font-medium text-3xl text-light-yellow-700 sm:text-2xl ">ID {uplineId}</span>
        </div>
      );
    }
    return <span className="text-white font-medium text-5xl text-light-yellow-700 sm:text-xl">ID {uplineId}</span>;
  }, [username, uplineId]);

  return (
    <section className={`mb-72 ${sectionStyle} sm:mb-36`}>
      <div className="flex items-start max-w-desktop-invite w-full pt-48 px-5">
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center space-x-7.5 mb-8 z-10 rtl:space-x-reverse">
            {avatarRender}
            {renderUplineInfo}
          </div>
          <div className="flex flex-col text-white mb-10 z-10 sm:mb-7.5">
            <span className="text-40px font-light leading-48px sm:text-2xl sm:mb-2">{t('invitesYou')}</span>
            <span className="uppercase font-bold text-64px leading-72px sm:text-3xl">{t('toSmartGamePro')}</span>
          </div>
          {notActiveLevels ? (
            <Button type={BUTTON_TYPES?.WHITE_100} disabled>
              <Timer isButton />
            </Button>
          ) : (
            <Button
              type={BUTTON_TYPES?.GRADIENT_ORANGE_PINK}
              onClick={onClickRegistration}
              className="z-10 max-w-250px w-full sm:max-w-full"
              disabled={isLoading}
            >
              <span>{t('playNow')}</span>
            </Button>
          )}
        </div>
        <div className="z-three sm:hidden">
          <img src="/img/invite/coins.png" alt="" />
        </div>
      </div>
      <img className="absolute top-0 left-0" src="/img/invite/blur_1.png" alt="blur1" />
      <img className="absolute top-0 right-0 sm:hidden" src="/img/invite/blur_3.png" alt="blur2" />
    </section>
  );
};
