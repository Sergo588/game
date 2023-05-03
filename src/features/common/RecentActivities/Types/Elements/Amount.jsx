import React, { useMemo } from 'react';

export const Amount = ({ value }) => {
  const textSize = useMemo(() => {
    if (value < 0.22) {
      return 'text-12px';
    }
    if (value >= 0.22 && value <= 1.1) {
      return 'text-sm';
    }
    return 'text-base';
  }, [value]);

  return <span className={`${textSize} text-yellow font-bold`}>{value} BNB</span>;
};
