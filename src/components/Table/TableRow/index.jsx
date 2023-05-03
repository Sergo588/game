import React, { useMemo } from 'react';
import { TableIcons } from 'components';
import { Revenue, TableDate, UserId, Wallet } from 'components/Table/ItemTypes';
import { ROUND_1, ROUND_2 } from 'helpers/constants';

export const TableRow = ({ colParams, data, isPartners }) => {
  const ROUNDS_MAPPER = {
    [ROUND_1]: 'Primary',
    [ROUND_2]: 'Main',
  };

  const typeMapper = useMemo(() => {
    const allData =
      !isPartners || (isPartners && (colParams.key === 'total_ref_bonus' || colParams.key === 'depth'))
        ? data
        : data?.user;
    const content = allData?.[colParams?.key];

    switch (colParams?.key) {
      case 'level':
      case 'depth': {
        return content;
      }
      case 'total_ref_bonus': {
        return `${parseFloat(content.toFixed(4))} BNB`;
      }
      case 'interacting_user_id':
      case 'id': {
        return <UserId value={content} {...allData} />;
      }
      case 'interacting_user_address':
      case 'user_address':
      case 'address': {
        return <Wallet address={content} {...allData} />;
      }
      case 'date':
      case 'created_at': {
        return <TableDate value={content} />;
      }
      case 'type': {
        return <TableIcons type={content} />;
      }
      case 'program': {
        return ROUNDS_MAPPER[content];
      }
      case 'amount': {
        return <Revenue data={content} {...allData} />;
      }
      default: {
        return null;
      }
    }
  }, [data, colParams, isPartners, ROUNDS_MAPPER]);

  return <td className={`p-6 xl:p-4 lg:p-6 whitespace-nowrap rtl:!text-right ${colParams.rowStyle}`}>{typeMapper}</td>;
};
