import React from 'react';
import { UserInfo, UserStat } from 'features/dashboard';
import { Reflink } from 'components';
import { useTranslation } from 'next-i18next';
import { StatBanner, AboutGame, BusdBanner, RecentActivities, Scheduler } from 'features/common';
import { TelegramBanner } from 'features/dashboard/TelegramBanner';
import { checkAuth } from 'helpers/auth';

const Activity = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col space-y-10 px-10 sm:px-0 sm:space-y-10">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between space-x-1.5 rtl:space-x-reverse sm:space-x-0 sm:flex-col sm:justify-start sm:items-start sm:px-5 sm:space-y-7.5">
            <UserInfo />
            <Reflink />
          </div>
          <UserStat />
        </div>
        <StatBanner />
        <Scheduler title={t('SmartGameProLevelsSchedule')} />
        <AboutGame />
      </div>
      <BusdBanner withPadding />
      <div className="flex flex-col space-y-10 px-10 lg:px-0">
        <RecentActivities />
        <TelegramBanner />
      </div>
    </div>
  );
};

Activity.storeInitial = async ({ ctx }) => {
  checkAuth(ctx);

  return {};
};

export default Activity;
