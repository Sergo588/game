import React from 'react';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { useSelector } from 'react-redux';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import { StatItem } from './StatItem';

export const UserStat = () => {
  const { t } = useTranslation();
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const actualUser = previewAccount?.id ? previewAccount : authProfile;

  return (
    <div className="flex w-full sm:px-5">
      <div className="flex flex-wrap w-full lg:flex-col lg:bg-black-light lg:rounded-small lg:py-2.5">
        <div className="flex-1 flex flex-wrap items-center lg:flex-col lg:w-full">
          <StatItem
            className="min-w-180px mr-4 mt-2 lg:mr-0 lg:mt-0 rtl:mr-0 rtl:ml-4 rtl:sm:ml-0"
            title={capitalize(t('partners'))}
            titleBusd="Forsage BUSD"
            totalCount={actualUser?.partners_count}
            newCount={actualUser?.partners_count_dynamic}
            totalCountBusd={actualUser?.busd_partners_count}
            newCountBusd={actualUser?.busd_partners_count_dynamic}
          />
          <StatItem
            className="min-w-180px mr-4 mt-2 lg:mr-0 lg:mt-0 rtl:mr-0 rtl:ml-4 rtl:sm:ml-0"
            title={capitalize(t('team'))}
            titleBusd={`Forsage BUSD ${capitalize(t('team'))} `}
            totalCount={actualUser?.team_size}
            newCount={actualUser?.team_size_dynamic}
            totalCountBusd={actualUser?.busd_team_size}
            newCountBusd={actualUser?.busd_team_size_dynamic}
          />
        </div>
        <div className="max-w-500px w-full flex-shrink flex lg:ml-0 lg:max-w-full">
          <StatItem
            withoutBorderLG
            className="mt-2 lg:mt-0"
            title={`${capitalize(t('totalRewards'))}, BNB`}
            titleBusd={`Forsage BUSD ${capitalize(t('rewards'))}, BUSD`}
            totalCount={actualUser?.total_profit}
            newCount={actualUser?.total_profit_dynamic}
            totalCountBusd={actualUser?.busd_total_profit}
            newCountBusd={actualUser?.busd_total_profit_dynamic}
          />
        </div>
      </div>
    </div>
  );
};
