import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const useRequest = (callback, args = [], mapper, isObserved = false, setIsObserved, inView = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState();
  const [isMount, setMount] = useState(true);

  const resetData = useCallback(() => {
    setData(undefined);
    setIsError(false);
    setIsDone(false);
    setIsLoading(false);
  }, []);

  const getData = useCallback(
    async (params) => {
      if (!isMount) {
        return;
      }

      setIsDone(false);
      setIsLoading(true);
      setIsError(false);
      try {
        const totalParams = params || args;

        const data = await callback(...totalParams);
        setIsLoading(false);

        setIsDone(true);

        if (mapper) {
          return setData((prev) => mapper(data, prev));
        }

        setData(data);

        return data;
      } catch (error) {
        if (!axios.isCancel(error)) {
          setIsError(true);
          setErrorMessage(error.message);
          setIsLoading(false);
        }
        return undefined;
      }
    },
    [isMount, callback, mapper, args],
  );

  const call = async (params) => {
    if (!isLoading && !isObserved) {
      return await getData(params);
    }

    if (!isLoading && isObserved && inView) {
      const result = await getData(params);
      if (typeof setIsObserved === 'function') {
        setIsObserved(false);
      }

      return result;
    }

    return undefined;
  };

  useEffect(() => {
    setMount(true);

    return () => {
      setMount(false);
    };
  }, [isMount]);

  return {
    data,
    call,
    isDone,
    isError,
    resetData,
    isLoading,
    errorMessage,
  };
};
