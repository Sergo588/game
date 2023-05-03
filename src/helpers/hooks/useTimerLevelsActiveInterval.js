import { shallowEqual, useSelector } from 'react-redux';
import { getActiveLevels, getClonesActiveLevels } from 'store/timerSlice/selectors';

export const useTimerLevelsActiveInterval = () => {
  const activeLevels = useSelector(getActiveLevels, shallowEqual);
  const activeClonesLevels = useSelector(getClonesActiveLevels, shallowEqual);

  return {
    activeLevels,
    activeClonesLevels,
    notActiveLevels: Object.values(activeLevels).every((level) => !level),
  };
};
