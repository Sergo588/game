import React, { useMemo } from 'react';
import WarningIcon from 'assets/icons/warning.svg';
import { useTranslation } from 'next-i18next';
import { ROUND_1, ROUND_2 } from 'helpers/constants';

export const MissedBanner = ({ program, level, missed }) => {
  const { t } = useTranslation('common');

  const upgradeLevel = useMemo(() => {
    if (program === ROUND_1 && Number(level) !== 36) {
      return Number(level) + 1;
    }
    if (program === ROUND_2) {
      return Number(level) + 18;
    }
    return null;
  }, [program, level]);

  return (
    <div className="flex flex-col w-full items-center justify-center max-w-685px bg-dark-grey rounded z-10 p-8 lg:max-w-full">
      <div className="flex items-center text-red space-x-1.5 rtl:space-x-reverse">
        <WarningIcon className="w-4 h-4" />
        <span>{t('missedRewards')}:</span>
        <span className="font-bold">{missed} BNB</span>
      </div>
      <span className="space-x-1 text-center">
        <span> {t('tipMissedRewards')} </span>
        <span className="text-white font-semibold">{t('level')} </span>
        <span className="text-white font-semibold">{upgradeLevel}</span>
      </span>
    </div>
  );
};
