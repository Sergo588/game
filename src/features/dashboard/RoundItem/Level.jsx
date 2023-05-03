import React, { useMemo } from 'react';
import BnbIcon from 'assets/tokens/BNB_withoutBG_gray.svg';
import ClockGold from 'assets/icons/clock_gold.svg';
import ClockPurple from 'assets/icons/clock_purple.svg';
import SnowIcon from 'assets/icons/snowflake.svg';
import WarningIcon from 'assets/icons/warning.svg';
import { ROUND_1, ROUND_2 } from 'helpers/constants';

export const Level = ({ missed_ref_bonus, missed_revenue, active, isLocked, program, freeze, key }) => {
  const ClockIcon = program === ROUND_1 ? ClockPurple : ClockGold;
  const isMissed = !!missed_ref_bonus || !!missed_revenue;

  const bgColor = useMemo(() => {
    if (active) {
      if (program === ROUND_1) {
        return 'card-purple';
      }
      if (program === ROUND_2) {
        return 'card-gold';
      }
    } else {
      if (isMissed) {
        return 'bg-red';
      }
      return 'bg-white-100';
    }
  }, [active, program, isMissed]);

  const renderIcon = useMemo(() => {
    if (active) {
      if (freeze) {
        return <SnowIcon className="h-5 w-5 stroke-current text-white" />;
      }
      return <BnbIcon className="h-4 w-4" />;
    } else {
      if (isLocked) {
        return <ClockIcon className="w-5 h-5" />;
      }
      if (isMissed) {
        return <WarningIcon className="h-5 w-5 fill-current text-white" />;
      }
      return null;
    }
  }, [active, freeze, isLocked, missed_ref_bonus, missed_revenue]);

  return (
    <div className={`flex items-center justify-center m-1 w-7.5 h-7.5 rounded-md items-center ${bgColor}`} key={key}>
      {renderIcon}
    </div>
  );
};
