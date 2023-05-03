import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameContract } from 'helpers/hooks/useGameContract';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { getIsOnPageTab } from 'store/userSlice/selectors';

export const useGetLineFillInterval = ({ isAvailable }) => {
  const { account, library } = useWeb3React();
  const [fill, setFill] = useState([]);
  const timeout = useRef(null);
  const isOnPageTab = useSelector(getIsOnPageTab);
  const { getLineFill } = useGameContract();

  const intervalCallback = useCallback(async () => {
    const result = await getLineFill();
    const resultArray = result.map((percent) => (percent * 100).toFixed(4));

    const haveDiff = resultArray.some((_, index) => resultArray[index] !== fill[index]);

    if (haveDiff) {
      setFill(resultArray);
    }

    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(intervalCallback, 1000);
  }, [setFill, getLineFill, library, fill]);

  useEffect(() => {
    library && intervalCallback();
  }, [library]);

  useEffect(() => {
    if (isAvailable && library && isOnPageTab) {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(intervalCallback, 1000);
    } else {
      timeout.current && clearTimeout(timeout.current);
    }

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [isAvailable, account, library, fill, isOnPageTab]);

  return {
    fill: isAvailable ? fill : [],
  };
};
