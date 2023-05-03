import { ProgramRepository } from 'connectors/repositories/program';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useShadowLevelsApi = ({ user, program }) => {
  const [rounds, setRounds] = useState();
  const [queueUpdateState, setQueueUpdateState] = useState([]);
  const timeoutShadowFetch = useRef(null);
  const [isLoadingOnTabOrFirst, setIsLoadingOnTabOrFirst] = useState(false);

  const callProgramRounds = useCallback(async () => {
    if (!isLoadingOnTabOrFirst) {
      setIsLoadingOnTabOrFirst(true);
      try {
        const result = await ProgramRepository.getProgram({ user_id: user });

        setRounds(result);
      } catch (e) {
        setRounds(null);
      }

      setIsLoadingOnTabOrFirst(false);
    }
  }, [isLoadingOnTabOrFirst, user, program]);

  const onAddQueue = useCallback(
    (level) => {
      setQueueUpdateState((prev) => [...prev, level]);
    },
    [queueUpdateState],
  );

  const onShadowFetch = useCallback(async () => {
    if (!isLoadingOnTabOrFirst) {
      try {
        setQueueUpdateState([]);
        const result = await ProgramRepository.getProgram({ user_id: user });

        setRounds(result);
      } catch (e) {}
    }
  }, [rounds, queueUpdateState, setQueueUpdateState, isLoadingOnTabOrFirst, user]);

  useEffect(() => {
    if (!!queueUpdateState.length) {
      clearTimeout(timeoutShadowFetch.current);
      timeoutShadowFetch.current = setTimeout(onShadowFetch, 3000);
    }

    return () => {
      clearTimeout(timeoutShadowFetch.current);
    };
  }, [queueUpdateState]);

  const clearState = useCallback(() => {
    setRounds(null);
  }, []);

  return {
    isLoadingOnTabOrFirst,
    rounds,
    callProgramRounds,
    onAddQueue,
    clearState,
    onShadowFetch,
  };
};
