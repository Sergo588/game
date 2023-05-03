import React, { useEffect } from 'react';
import { useTransactions } from 'helpers/hooks/useTransactions';
import { ObserverWrapper, Table } from 'components';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';

export const EventsTable = ({ userId, program, level }) => {
  const { t } = useTranslation('common');
  const transactionProps = {
    userId,
    program,
    level,
  };
  const { actualData, isLoading, loadData, call, contrainerRef, isNeedHideButton } = useTransactions(transactionProps);

  useEffect(() => {
    call();
  }, [userId, program, level]);

  const columns = [
    {
      renderTitle: () => <span>{capitalize(t('type'))}</span>,
      key: 'type',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('date'))}</span>,
      key: 'date',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('level'))}</span>,
      key: 'level',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('id'))}</span>,
      key: 'interacting_user_id',
      subKey: 'type',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('wallet'))}</span>,
      key: 'interacting_user_address',
      subKey: 'tx',
      rowStyle: 'text-white text-left font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      renderTitle: () => <span>{capitalize(t('amount'))}</span>,
      key: 'amount',
      subKey: 'type',
      rowStyle: 'text-right text-white font-medium text-sm',
      colsStyle: 'text-right',
    },
  ];

  return (
    <ObserverWrapper callback={call} isNeedOneCall userId={userId}>
      <Table
        contrainerRef={contrainerRef}
        isLoading={isLoading}
        partnersList={actualData?.transactions}
        addItems={loadData}
        columns={columns}
        hideBtn={isNeedHideButton}
      />
    </ObserverWrapper>
  );
};
