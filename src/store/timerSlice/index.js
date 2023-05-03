import { createSlice } from '@reduxjs/toolkit';
import { GAME_ALLOW_CLONE_DATES, GAME_START_DATES } from 'helpers/constants';
import { isSameOrBefore } from 'helpers/date';
import { fromUnixTime } from 'date-fns';

export const timerSlice = createSlice({
  name: 'router',
  initialState: {
    activeLevels: GAME_START_DATES.reduce((total, obj) => {
      const [level, time] = Object.entries(obj)[0];

      return {
        ...total,
        [level]: isSameOrBefore(fromUnixTime(time)),
      };
    }, {}),
    clonesLevelsActive: GAME_ALLOW_CLONE_DATES.reduce((total, obj) => {
      const [level, time] = Object.entries(obj)[0];

      return {
        ...total,
        [level]: isSameOrBefore(fromUnixTime(time)),
      };
    }, {}),
  },
  reducers: {
    setActiveLevels(state, action) {
      state.activeLevels = action.payload;
    },
    setClonesLevelsActive(state, action) {
      state.clonesLevelsActive = action.payload;
    },
  },
});

export const timerReducer = timerSlice.reducer;

export const { setActiveLevels, setClonesLevelsActive } = timerSlice.actions;
