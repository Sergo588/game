import React, { useState, useEffect } from 'react';
import { BreadCrumbs, Table } from 'components';
import { FiltersButton } from 'components/Table/Filters';
import { checkAuth } from 'helpers/auth';
import { DefaultLayout } from 'layouts';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { useGetPartners } from 'helpers/hooks/useGetPartners';
import { FiltersContent } from 'features/partners/FilterContent';
import { LOAD_MORE_TYPES } from 'helpers/constants';

const Partners = () => {
  const { t } = useTranslation('common');
  const [filterValues, setFilterValues] = useState({});
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const userId = previewAccount.id || authProfile?.id;
  const [selectedPartnerBonus, setSelectedPartnerBonus] = useState({});
  const [selectedIdOrWallet, setSelectedIdOrWallet] = useState('');
  const { actualData, isLoading, loadData, call, contrainerRef, isNeedHideButton, setIsNeedHideButton, resetData } =
    useGetPartners(userId);

  useEffect(() => {
    if (!actualData?.limit) {
      call();
    }
  }, [actualData]);

  useEffect(() => {
    loadData({ filterValues, type: LOAD_MORE_TYPES.FILTER });
  }, [filterValues]);

  const breadCrumbsProps = {
    title: capitalize(t('partners')),
  };
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const onClickFilters = () => {
    setIsOpenFilters((prev) => !prev);
  };

  const columns = [
    {
      renderTitle: () => <span>{capitalize(t('date'))}</span>,
      key: 'created_at',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('wallet'))}</span>,
      key: 'address',
      rowStyle: 'text-left text-white font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('id'))}</span>,
      key: 'id',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span>{t('partnerDepth')}</span>,
      key: 'depth',
      rowStyle: 'text-center text-white font-medium text-xs',
      colsStyle: 'text-center',
    },
    {
      renderTitle: () => <span>{capitalize(t('amount'))}</span>,
      key: 'total_ref_bonus',
      rowStyle: 'text-right text-yellow font-medium text-sm',
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
          loadData={loadData}
          call={call}
          setIsNeedHideButton={setIsNeedHideButton}
          selectedPartnerBonus={selectedPartnerBonus}
          setSelectedPartnerBonus={setSelectedPartnerBonus}
          selectedIdOrWallet={selectedIdOrWallet}
          setSelectedIdOrWallet={setSelectedIdOrWallet}
          resetData={resetData}
        />
      )}
      <Table
        contrainerRef={contrainerRef}
        isLoading={isLoading}
        partnersList={actualData?.partners}
        hideBtn={isNeedHideButton}
        addItems={loadData}
        columns={columns}
        isPartners
      />
    </DefaultLayout>
  );
};

Partners.storeInitial = async ({ ctx }) => {
  checkAuth(ctx);

  return {};
};

Partners.Layout = ({ children }) => {
  return children;
};

export default Partners;
