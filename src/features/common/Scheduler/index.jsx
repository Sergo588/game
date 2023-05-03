import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTimerLevelsActiveInterval } from 'helpers/hooks/useTimerLevelsActiveInterval';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import { format } from 'date-fns';
import { PROGRAM_NAMES, PROGRAMS_PRICES } from 'helpers/constants';
import _chunk from 'lodash/chunk';
import { Table } from './Table';
import { Card } from './Card';

export const Scheduler = ({ title = '' }) => {
  const [activeLevel, setActiveLevel] = useState(null);
  const { activeLevels } = useTimerLevelsActiveInterval();
  const { getLevelTime, getNearLevelTime } = useGetLevelTime();

  const { level } = useMemo(() => getNearLevelTime(), [activeLevels]);
  const tableData = useMemo(() => {
    return Object.keys(activeLevels)
      .map((level) => ({
        date: format(getLevelTime(level), 'dd.MM.yyyy'),
        isAvailable: activeLevels[level],
        level,
        amount: PROGRAMS_PRICES[PROGRAM_NAMES.GAME][level],
      }))
      ?.sort((a, b) => b.level - a.level);
  }, [activeLevels]);

  const [round1, round2] = _chunk(tableData, 18);
  const sortedTableData = [...round1, ...round2.sort((a, b) => a.level - b.level)];

  useEffect(() => {
    if (!activeLevel) {
      setActiveLevel(level || '1');
    }
  }, [level]);

  const onClickLevel = useCallback(
    (level) => {
      setActiveLevel(level);
    },
    [activeLevel, setActiveLevel],
  );

  return (
    <div className="flex flex-col w-full">
      <div className="sm:px-5 mb-7.5 sm:mb-5">
        <span className="text-white text-2xl font-medium mb-7.5">{title}</span>
      </div>
      <div className="flex justify-between items-center w-full bg-gray-850 rounded-small space-x-5 sm:space-x-0 rtl:flex-row-reverse">
        <div className="sm:hidden max-w-381px w-full h-full">
          <Card activeLevel={activeLevel} />
        </div>
        <Table onClickLevel={onClickLevel} activeLevel={activeLevel} tableData={sortedTableData} />
      </div>
    </div>
  );
};
