import React, { memo, useCallback } from 'react';
import Countdown from 'react-countdown';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import { fromUnixTime } from 'date-fns';

export const TimerLevelButton = memo(({ level }) => {
  const { getStartLevelMaxPlaces } = useGetLevelTime();
  const actualDate = getStartLevelMaxPlaces(level);

  const renderer = useCallback(
    ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return null;
      } else {
        const result = [hours, minutes, seconds]
          ?.map((item) => (String(item).length === 1 ? `0${item}` : item))
          .join(':');
        return <span>{result}</span>;
      }
    },
    [level],
  );

  if (!level) {
    return null;
  }

  return <Countdown renderer={renderer} autoStart date={fromUnixTime(actualDate)} overtime />;
});
