import React from 'react';
import { UserInfo, UserStat } from 'features/dashboard';
import { Reflink } from 'components';
import { TelegramBanner } from 'features/dashboard/TelegramBanner';
import { checkAuth } from 'helpers/auth';
import { useSelector } from 'react-redux';
import { getPreviewAccount } from 'store/userSlice/selectors';
import { useGetLineFillInterval } from 'helpers/hooks/useGetLineFillInterval';
import { Levels } from 'features/round';

const Dashboard = () => {
  const previewAccount = useSelector(getPreviewAccount);
  const { fill } = useGetLineFillInterval({ isAvailable: !previewAccount?.id });

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
        <Levels fill={fill} />
      </div>
      <div className="flex flex-col space-y-10 px-10 lg:px-0">
        <TelegramBanner />
      </div>
    </div>
  );
};

Dashboard.storeInitial = async ({ ctx }) => {
  checkAuth(ctx);

  return {};
};

export default Dashboard;
