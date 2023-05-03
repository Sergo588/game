import React from 'react';
import { format } from 'date-fns';

export const TableDate = ({ value }) => {
  return <span> {format(new Date(value), 'dd.MM.yyyy kk:mm')} </span>;
};
