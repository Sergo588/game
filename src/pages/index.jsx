import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { MainLayout, PreloaderLayout } from 'layouts';
import { ProfileBanner, PreviewAccount, TelegramBanner } from 'features/main';
import { Scheduler, AboutGame, StatBanner, BusdBanner, RecentActivities } from 'features/common';
import { removePreviewAccount } from 'store/userSlice';
import { useDispatch } from 'react-redux';
import { useTimerLevelsActiveInterval } from 'helpers/hooks/useTimerLevelsActiveInterval';

const Home = ({ renderFromServer }) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { notActiveLevels } = useTimerLevelsActiveInterval();

  useEffect(() => {
    dispatch(removePreviewAccount());
  }, []);

  return (
    <>
      <PreloaderLayout renderFromServer={renderFromServer} />
      <div className="flex flex-col justify-start items-center w-full">
        <div className="flex flex-col justify-start items-center max-w-main-page w-full space-y-20 mb-20 sm:space-y-10">
          <ProfileBanner />
          <div className="flex w-full lg:px-5 sm:px-0">
            <Scheduler title={t('SmartGameProLevelsSchedule')} />
          </div>
          <div className="flex flex-col lg:px-5 sm:px-0">
            {!notActiveLevels && <PreviewAccount />}
            <AboutGame />
          </div>
          <StatBanner />
        </div>
        <div className="w-full mb-20 max-w-main-page ">
          <BusdBanner />
        </div>
        <div className="flex flex-col justify-start items-center w-full max-w-main-page mb-20">
          <RecentActivities />
        </div>
        <div className="w-full">
          {/* recent activity */}
          <TelegramBanner />
        </div>
        {/* <Button onClick={onUpgradeClick} type="purple-gradient">
        {buttonContent}
      </Button> */}
        {/* <ActivateModal handleCloseModal={() => setOpenedModal(false)} openedModal={openedModal} /> */}
      </div>
    </>
  );
};

Home.storeInitial = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return {
      renderFromServer: true,
    };
  }

  return {};
};

Home.Layout = MainLayout;

export default Home;
