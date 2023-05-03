import { useCallback } from 'react';
import { fromUnixTime, isAfter } from 'date-fns';
import { GAME_ALLOW_CLONE_DATES, GAME_START_DATES } from 'helpers/constants';
import { isSameOrBefore } from 'helpers/date';

export const useGetLevelTime = () => {
  const getLevelTime = useCallback((level = 1) => {
    if (GAME_START_DATES[level - 1]) {
      const startTime = Object.values(GAME_START_DATES[level - 1])[0];
      return fromUnixTime(startTime);
    }

    return null;
  }, []);

  const getLevelTimeWithDelay = useCallback((level = 1, delay = 0) => {
    if (GAME_START_DATES[level - 1]) {
      const startTime = Object.values(GAME_START_DATES[level - 1])[0] + delay;
      return fromUnixTime(startTime);
    }

    return null;
  }, []);

  const getLastStartedLevel = useCallback(
    () =>
      [...GAME_START_DATES]
        ?.sort((a, b) => {
          const aLevel = Object.keys(a)[0];
          const bLevel = Object.keys(b)[0];

          return aLevel >= 18 ? bLevel - aLevel : aLevel - bLevel;
        })
        .reverse()
        .reduce(
          (result, obj) => {
            const timeStamp = Object.values(obj);

            if (result?.level) {
              return result;
            }

            if (isSameOrBefore(fromUnixTime(timeStamp))) {
              return {
                level: Object.keys(obj)[0],
                time: Object.values(obj)[0],
              };
            }
            return result;
          },
          {
            level: null,
            time: null,
          },
        ),
    [],
  );

  const getNearLevelTime = useCallback(
    () =>
      [...GAME_START_DATES]
        .reverse()
        ?.sort((a, b) => {
          const aLevel = Object.keys(a)[0];
          const bLevel = Object.keys(b)[0];

          return aLevel >= 18 ? bLevel - aLevel : aLevel - bLevel;
        })
        .reduce(
          (result, obj) => {
            const timeStamp = Object.values(obj)[0];
            if (result.level) {
              return result;
            }

            if (isAfter(fromUnixTime(timeStamp), new Date())) {
              return {
                level: Object.keys(obj)[0],
                time: Object.values(obj)[0],
              };
            }
            return result;
          },
          {
            level: null,
            time: null,
          },
        ),
    [],
  );

  const getStartLevelMaxPlaces = useCallback((level) => {
    const actualDateObj = GAME_ALLOW_CLONE_DATES?.find((item) => {
      return Number(Object.keys(item)[0]) === Number(level);
    });
    return Object.values(actualDateObj)[0];
  }, []);

  return {
    getLevelTime,
    getLevelTimeWithDelay,
    getNearLevelTime,
    getLastStartedLevel,
    getStartLevelMaxPlaces,
  };
};
