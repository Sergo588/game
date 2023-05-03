import { GAME_START_DATES } from 'helpers/constants';

export const getStartDateByLevel = (level) => {
  return GAME_START_DATES[level - 1][level];
};
