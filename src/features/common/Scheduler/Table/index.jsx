import React, { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import ArrowDownIcon from 'assets/icons/arrow_down.svg';
import { TableItem } from 'features/common/Scheduler/Table/TableItem';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';

export const Table = memo((props) => {
  const tableRef = useRef(null);
  const { activeLevel, tableData, onClickLevel } = props;
  const { t } = useTranslation('common');

  const onClickScroll = useCallback(() => {
    const childHeight = tableRef.current?.childNodes?.[0]?.getBoundingClientRect?.()?.height || 0;

    tableRef.current?.scrollTo({
      top: tableRef.current?.scrollTop + childHeight * 2,
      behavior: 'smooth',
    });
  }, []);

  useComponentDidUpdate(
    (prevProps) => {
      if (!prevProps.activeLevel && activeLevel) {
        const activeLevelNode = tableRef.current.querySelector(`[data-level="${activeLevel}"]`);

        if (activeLevelNode) {
          const { height } = activeLevelNode.getBoundingClientRect();

          tableRef.current?.scrollTo({
            top: activeLevelNode.offsetTop - height,
          });
        }
      }
    },
    {
      activeLevel,
    },
  );

  return (
    <div className="flex w-full max-h-423px h-full relative sm:max-h-3/4">
      <div className="flex flex-col w-full h-full rounded-small bg-gray-850 text-white-500 sm:rounded-none">
        <div className="flex text-xs">
          <div className="flex flex-1 px-2.5 py-6 sm:py-4 sm:hidden">
            <span>{t('startDate')}</span>
          </div>
          <div className="flex flex-1 px-2.5 py-6 sm:py-4">
            <span>{capitalize(t('startsInTable'))}</span>
          </div>
          <div className="flex flex-1 px-2.5 py-6 sm:py-4">
            <span>{capitalize(t('level'))}</span>
          </div>
          <div className="flex flex-1 px-2.5 py-6 sm:py-4">
            <span>{t('activationAmount')}</span>
          </div>
        </div>
        <div className="overflow-auto custom_scroll" ref={tableRef}>
          {tableData?.map((el) => (
            <TableItem activeLevel={activeLevel} onClick={onClickLevel} key={el.level} {...el} />
          ))}
        </div>
      </div>
      <div
        onClick={onClickScroll}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 cursor-pointer flex justify-center items-center rounded-full bg-gray-800"
      >
        <ArrowDownIcon className="w-3.5" />
      </div>
    </div>
  );
});
