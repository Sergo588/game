import React, { useCallback, useEffect } from 'react';
import { useTransactions } from 'helpers/hooks/useTransactions';
import { ObserverWrapper, Table, TableIcons } from 'components';
import { Revenue, TableDate, UserId, Wallet } from 'components/Table/ItemTypes';
import { subscriptionCreator } from 'helpers/pubsub';
import { EVENTS_PUBSUB, LOAD_MORE_TYPES } from 'helpers/constants';

export const UserTable = ({ userId }) => {
  const transactionProps = {
    userId,
  };
  const { actualData, isLoading, loadData, call, contrainerRef, isNeedHideButton } = useTransactions(transactionProps);

  const onCloseSuccess = useCallback(() => {
    loadData({ type: LOAD_MORE_TYPES.RECALL });
  }, []);

  useEffect(() => {
    const unsub = subscriptionCreator({
      [EVENTS_PUBSUB.CLOSE_SUCCES_BUY_NEW_LEVEL]: onCloseSuccess,
    });

    return () => {
      unsub();
    };
  }, []);

  const columns = [
    {
      title: 'Type',
      key: 'type',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
      render: (value) => <TableIcons type={value} />,
    },
    {
      title: 'Date',
      key: 'date',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
      render: (value) => <TableDate value={value} />,
    },
    {
      title: 'ID',
      key: 'interacting_user_id',
      subKey: 'type',
      rowStyle: 'text-left text-white-500 font-medium text-xs',
      colsStyle: 'text-left',
      render: (value, type) => <UserId value={value} type={type} />,
    },
    {
      title: 'Level',
      key: 'level',
      rowStyle: 'text-left text-white font-medium text-xs',
      colsStyle: 'text-left',
    },
    {
      title: 'Wallet',
      key: 'interacting_user_address',
      subKey: 'tx',
      rowStyle: 'text-white text-left font-medium text-xs',
      colsStyle: 'text-left',
      render: (value, tx) => <Wallet address={value} tx={tx} />,
    },
    {
      title: 'BNB',
      key: 'amount',
      subKey: 'type',
      rowStyle: 'text-right text-white font-medium text-xs',
      colsStyle: 'text-right',
      render: (value, type) => <Revenue data={value} type={type} />,
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
