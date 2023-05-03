import React from 'react';
import { TRANSACTIONS_TYPES } from 'helpers/constants';
import { UserIdWrapper } from 'components';

export const UserId = ({ value, type }) => {
  switch (type) {
    case TRANSACTIONS_TYPES?.ACTIVATE_PROGRAM:
    case TRANSACTIONS_TYPES?.REGISTRATION:
    case TRANSACTIONS_TYPES?.UPGRADE:
    case TRANSACTIONS_TYPES?.FINISH_REWARD:
      return '';
    default:
      return <UserIdWrapper userId={value} />;
  }
};
