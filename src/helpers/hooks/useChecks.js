import { useCallback, useState, useMemo } from 'react';

export const STATUSES_ENUM = {
  SUCCESS: 'success',
  ERROR: 'error',
  WAIT: 'pending',
};

export const useChecks = (callbacks) => {
  const [isLoadingChecks, setIsLoadingChecks] = useState(false);
  const baseStatuses = callbacks?.reduce((total, current) => {
    return { ...total, [current.key]: '' };
  }, {});
  const [statuses, setStatuses] = useState(baseStatuses);
  const [statusMeta, setStatusMeta] = useState({});

  const setKeyStatus = useCallback((key, status) => {
    setStatuses((prev) => ({ ...prev, [key]: status }));
  }, []);

  const callNextPromise = useCallback(
    async (callback) => {
      setIsLoadingChecks(true);
      const index = callbacks.findIndex((currentCallback) => currentCallback.key === callback.key);
      const name = callback.key;

      try {
        setKeyStatus([name], STATUSES_ENUM.WAIT);
        await callback.func(callback.funcProps);
        setKeyStatus([name], STATUSES_ENUM.SUCCESS);

        if (callbacks[index + 1]) {
          await callNextPromise(callbacks[index + 1]);
        }
      } catch (e) {
        setStatusMeta((prev) => ({ ...prev, [name]: e }));
        setKeyStatus([name], STATUSES_ENUM.ERROR);
      }
      setIsLoadingChecks(false);
    },
    [callbacks],
  );

  const callChecks = useCallback(async () => {
    const [firstCallback] = callbacks;
    setStatusMeta({});
    setStatuses(baseStatuses);
    await callNextPromise(firstCallback);
  }, [callbacks, baseStatuses]);

  const isSuccessAll = useMemo(
    () => Object.values(statuses).every((status) => status === STATUSES_ENUM.SUCCESS),
    [statuses],
  );
  const isLoadingAny = useMemo(
    () => Object.values(statuses).some((status) => status === STATUSES_ENUM.WAIT),
    [statuses],
  );
  const isAnyError = useMemo(
    () => Object.values(statuses).some((status) => status === STATUSES_ENUM.ERROR),
    [statuses],
  );

  return {
    statuses,
    statusMeta,
    callChecks,
    isSuccessAll,
    isLoadingAny,
    isAnyError,
    isLoadingChecks,
  };
};
