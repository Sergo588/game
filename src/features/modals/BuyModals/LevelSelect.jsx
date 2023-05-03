import React, { useCallback, useMemo } from 'react';
import { Select } from 'components';
import { PROGRAM_NAMES, PROGRAMS_PRICES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { useTimerLevelsActiveInterval } from 'helpers/hooks/useTimerLevelsActiveInterval';

export const LevelSelect = ({ onSelect, level, withLabel = true, className }) => {
  const { t } = useTranslation('common');
  const { activeLevels } = useTimerLevelsActiveInterval();

  const setSelectedLevel = useCallback(
    (value) => {
      onSelect(value);
    },
    [onSelect],
  );

  const options = useMemo(() => {
    return Object.keys(activeLevels)
      .sort((a, b) => (a >= 18 ? b - a : a - b))
      .reduce((total, level) => {
        if (activeLevels[level]) {
          return [
            ...total,
            {
              title: `${capitalize(t('level'))} ${level} (${PROGRAMS_PRICES[PROGRAM_NAMES.GAME][level]} BNB)`,
              value: level,
            },
          ];
        }

        return total;
      }, []);
  }, [activeLevels]);

  return (
    <div className={`flex flex-col items-start justify-center ${className}`}>
      {withLabel && <label className="mb-2.5 text-white sm:text-sm">{t('chooseGameLevel')}</label>}
      <Select
        className="w-full bg-white-100"
        data={options}
        backNumber={false}
        value={level}
        onChange={setSelectedLevel}
      />
    </div>
  );
};
