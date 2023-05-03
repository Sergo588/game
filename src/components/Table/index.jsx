import React, { useMemo } from 'react';
import { Button } from 'components';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { BUTTON_TYPES, LOAD_MORE_TYPES } from 'helpers/constants';
import EyeIcon from 'assets/icons/eye.svg';
import { Placeholders } from './Placeholders';
import { TableRow } from './TableRow';

export const Table = ({
  contrainerRef,
  isLoading,
  partnersList,
  hideBtn = false,
  addItems,
  columns,
  isPartners = false,
}) => {
  const countColumns = columns?.length;
  const { t } = useTranslation('common');

  const renderContent = useMemo(() => {
    return partnersList?.map((row, index) => {
      return (
        <tr className="border-b border-yellow-200 whitespace-nowrap last:border-b-0" key={index}>
          {columns?.map((col, indexRow) => {
            return <TableRow colParams={col} data={row} isPartners={isPartners} key={indexRow} />;
          })}
        </tr>
      );
    });
  }, [isLoading, partnersList, columns]);

  const tableHead = useMemo(() => {
    return (
      <thead className="sticky top-0 bg-black-light z-three">
        <tr className="text-white-500 text-xs font-normal border-b border-yellow-200">
          {columns.map((item, index) => (
            <th className={`p-6 xl:p-4 lg:p-6 ${item.colsStyle} rtl:!text-right`} key={index}>
              {item.title ? item.title : item.renderTitle()}
            </th>
          ))}
        </tr>
      </thead>
    );
  }, [columns]);

  const buttonContent = useMemo(() => {
    if (!hideBtn || isLoading) {
      return (
        <div className="flex p-4 sm:p-2.5">
          <Button
            type={BUTTON_TYPES?.WHITE_100}
            className="w-full rounded-mini flex justify-center items-center"
            onClick={() => addItems({ type: LOAD_MORE_TYPES.LOAD_MORE })}
          >
            {isLoading ? (
              <PuffLoadingIcon className="w-6 h-6" />
            ) : (
              <>
                <EyeIcon className="mr-2.5" />
                <span>{capitalize(t('seeMore'))}</span>
              </>
            )}
          </Button>
        </div>
      );
    }
    return null;
  }, [hideBtn, isLoading]);

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="flex-1 max-h-500px sm:rounded-none z-10 flex flex-col w-full flex-col bg-black-light rounded overflow-hidden h-full min-h-90 sm:max-h-3/4">
        <div className="flex-1 overflow-auto custom_scroll" ref={contrainerRef}>
          <table className="min-w-max w-full table-auto border-white-100">
            {tableHead}
            <tbody className="text-gray-600 text-sm font-light">
              {isLoading && !partnersList?.length ? <Placeholders countColumns={countColumns} /> : renderContent}
            </tbody>
          </table>
        </div>
        {buttonContent}
      </div>
    </div>
  );
};
