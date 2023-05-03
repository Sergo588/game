import { useCallback, useEffect, useRef } from 'react';
import { useListener } from 'helpers/hooks/useListener';
import { useAutoConnect } from 'helpers/hooks/useAutoConnect';
import { useWeb3React } from '@web3-react/core';
import config from 'helpers/config';
import { ADD_CHAIN_ETHS_PARAMS, GAME_ALLOW_CLONE_DATES, GAME_START_DATES } from 'helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'store/userSlice/asyncActions';
import { setIsOnPageTab, updateCurrentUser } from 'store/userSlice';
import { useWebSockets } from 'helpers/hooks/useWebSockets';
import { isSameOrBefore } from 'helpers/date';
import { fromUnixTime } from 'date-fns';
import { setActiveLevels, setClonesLevelsActive } from 'store/timerSlice';
import { getActiveLevels, getClonesActiveLevels } from 'store/timerSlice/selectors';

export const ManageProvider = ({ children }) => {
  const { account, library, chainId } = useWeb3React();
  const { connected } = useAutoConnect();
  const activeLevelsInterval = useRef(null);
  const activeLevels = useSelector(getActiveLevels);
  const activeClonesLevels = useSelector(getClonesActiveLevels);
  const dispatch = useDispatch();

  const activeLevelsIntervalCallback = useCallback(async () => {
    const timesObj = GAME_START_DATES.reduce((total, obj) => {
      const [level, time] = Object.entries(obj)[0];

      return {
        ...total,
        [level]: isSameOrBefore(fromUnixTime(time)),
      };
    }, {});

    const clonesTimesObj = GAME_ALLOW_CLONE_DATES.reduce((total, obj) => {
      const [level, time] = Object.entries(obj)[0];

      return {
        ...total,
        [level]: isSameOrBefore(fromUnixTime(time)),
      };
    }, {});

    const isSomeDiff = Object.keys(timesObj).some((keyLevel) => activeLevels[keyLevel] !== timesObj[keyLevel]);
    const isSomeClonesDiff = Object.keys(clonesTimesObj).some(
      (keyLevel) => activeClonesLevels[keyLevel] !== clonesTimesObj[keyLevel],
    );

    if (isSomeDiff) {
      dispatch(setActiveLevels(timesObj));
    }

    if (isSomeClonesDiff) {
      dispatch(setClonesLevelsActive(clonesTimesObj));
    }
  }, [activeLevels, setActiveLevels, activeClonesLevels, setClonesLevelsActive]);

  useEffect(() => {
    activeLevelsIntervalCallback();
  }, []);

  useEffect(() => {
    activeLevelsInterval.current && clearInterval(activeLevelsInterval.current);
    activeLevelsInterval.current = setInterval(activeLevelsIntervalCallback, 1000);

    return () => {
      activeLevelsInterval.current && clearInterval(activeLevelsInterval.current);
    };
  }, [activeLevels, activeClonesLevels]);

  useEffect(() => {
    if (account) {
      dispatch(getProfile(account));
    } else {
      dispatch(updateCurrentUser({}));
    }
  }, [account]);

  useEffect(async () => {
    if (chainId !== config.allowedChainId && !!account) {
      try {
        await library?.send('wallet_switchEthereumChain', [
          { chainId: ADD_CHAIN_ETHS_PARAMS[config.allowedChainId].chainId },
          account,
        ]);
      } catch (e) {
        if (e.code === 4902) {
          library?.send('wallet_addEthereumChain', [
            {
              ...ADD_CHAIN_ETHS_PARAMS[config.allowedChainId],
            },
          ]);
        }
      }
    }
  }, [library, chainId, account]);

  useEffect(() => {
    const handleVisibilityState = () => {
      dispatch(setIsOnPageTab(document.visibilityState === 'visible'));
    };

    window.addEventListener('visibilitychange', handleVisibilityState, false);
  }, []);

  useListener();
  useWebSockets();

  if (connected) {
    return children;
  }

  return null;
};
