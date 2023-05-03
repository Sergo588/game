import React, { useMemo } from 'react';
import { CustomLink, TableIcons } from 'components';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { formatDistanceToNow, parseISO } from 'date-fns';
import config from 'helpers/config';

export const ItemLayout = ({ children, type, date, tx }) => {
  const customDate = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(parseISO(date))).replace('about ', '~ ');
    } catch (error) {
      return '';
    }
  });

  const txLink = config.scanNetwork + tx;

  return (
    <div className="flex justify-between items-center border-b border-yellow-200 w-full text-white-500 py-7.5 sm:py-5 first:pt-0 last:pb-0 last:border-none sm:text-sm sm:items-start">
      <div className="flex justify-start items-center space-x-5 sm:items-start rtl:space-x-reverse">
        <TableIcons type={type} />
        <div className="flex items-center space-x-2.5 sm:items-start sm:flex-col sm:space-x-0 sm:space-y-2.5 rtl:space-x-reverse">
          {children}
        </div>
      </div>
      <div className="flex justify-end items-center space-x-2.5 rtl:space-x-reverse">
        <CustomLink href={txLink} targetBlank>
          <LinkSquareIcon className="w-6 h-6" />
        </CustomLink>
        <div className="text-right">{customDate}</div>
      </div>
    </div>
  );
};
