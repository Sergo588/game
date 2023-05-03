import React, { useState, useEffect } from 'react';
import { BreadCrumbs, Table } from 'components';
import { checkAuth } from 'helpers/auth';
import { FiltersButton } from 'components/Table/Filters';
import { DefaultLayout } from 'layouts';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { useTransactions } from 'helpers/hooks/useTransactions';
import { LOAD_MORE_TYPES } from 'helpers/constants';
import { FiltersContent } from 'features/stats/FilterContent';
import { useSelector } from 'react-redux';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';

export const Stats = () => {
  const [filterValues, setFilterValues] = useState({});
  const [selectedLevel, setSelectedLevel] = useState({});
  const [selectedIdOrWallet, setSelectedIdOrWallet] = useState('');
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const userId = previewAccount.id || authProfile?.id;
  const { t } = useTranslation('common');
  const transactionProps = {
    userId,
  };
  const { actualData, isLoading, loadData, call, contrainerRef, isNeedHideButton, setIsNeedHideButton, resetData } =
    useTransactions(transactionProps);

  const breadCrumbsProps = {
    title: capitalize(t('stats')),
  };
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const onClickFilters = () => {
    setIsOpenFilters((prev) => !prev);
  };

  useEffect(() => {
    if (!actualData?.limit) {
      call();
    }
  }, [actualData]);

  useEffect(() => {
    loadData({ filterValues, type: LOAD_MORE_TYPES.FILTER });
  }, [filterValues]);

  const columns = [
    {
      renderTitle: () => <span>{capitalize(t('type'))}</span>,
      key: 'type',
      rowStyle: 'text-left text-white font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('date'))}</span>,
      key: 'date',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('id'))}</span>,
      key: 'interacting_user_id',
      subKey: 'type',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span>{capitalize(t('round'))}</span>,
      key: 'program',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span>{capitalize(t('level'))}</span>,
      key: 'level',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span>{capitalize(t('wallet'))}</span>,
      key: 'interacting_user_address',
      subKey: 'tx',
      rowStyle: 'text-left text-white font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('amount'))}</span>,
      key: 'amount',
      subKey: 'type',
      rowStyle: 'text-white text-right font-medium text-sm',
      colsStyle: 'text-right',
    },
  ];

  return (
    <DefaultLayout withPadding>
      <BreadCrumbs {...breadCrumbsProps}>
        <FiltersButton onClickFilters={onClickFilters} />
      </BreadCrumbs>
      {isOpenFilters && (
        <FiltersContent
          onClickFilters={onClickFilters}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          call={call}
          setIsNeedHideButton={setIsNeedHideButton}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedIdOrWallet={selectedIdOrWallet}
          setSelectedIdOrWallet={setSelectedIdOrWallet}
          resetData={resetData}
        />
      )}
      <Table
        contrainerRef={contrainerRef}
        isLoading={isLoading}
        partnersList={actualData?.transactions}
        hideBtn={isNeedHideButton}
        addItems={loadData}
        columns={columns}
      />
    </DefaultLayout>
  );
};

Stats.storeInitial = async ({ ctx }) => {
  checkAuth(ctx);

  return {};
};

Stats.Layout = ({ children }) => {
  return children;
};

export default Stats;
