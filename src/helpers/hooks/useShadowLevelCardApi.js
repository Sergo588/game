import { ProgramRepository } from 'connectors/repositories/program';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useShadowLevelCardApi = ({ user, program, level }) => {
  const [levelData, setLevelData] = useState();
  const [queueUpdateState, setQueueUpdateState] = useState([]);
  const timeoutShadowFetch = useRef(null);
  const [isLoadingOnTabOrFirst, setIsLoadingOnTabOrFirst] = useState(false);

  const callProgramLevel = useCallback(async () => {
    if (!isLoadingOnTabOrFirst) {
      clearTimeout(timeoutShadowFetch.current);
      setQueueUpdateState([]);
      setIsLoadingOnTabOrFirst(true);
      try {
        const result = await ProgramRepository.getLevelByName(program, level, { user_id: user });

        setLevelData(result);
      } catch (e) {
        setLevelData(null);
      }
    }
    setIsLoadingOnTabOrFirst(false);
  }, [isLoadingOnTabOrFirst, user, program, level, levelData]);

  const onAddQueue = useCallback(
    (level) => {
      setQueueUpdateState((prev) => [...prev, level]);
    },
    [queueUpdateState],
  );

  const onShadowFetch = useCallback(async () => {
    try {
      setQueueUpdateState([]);
      const result = await ProgramRepository.getLevelByName(program, level, { user_id: user });

      setLevelData(result);
    } catch (e) {
      console.log(e);
    }
  }, [queueUpdateState]);

  useEffect(() => {
    if (queueUpdateState.length) {
      clearTimeout(timeoutShadowFetch.current);
      timeoutShadowFetch.current = setTimeout(onShadowFetch, 1000);
    }

    return () => {
      clearTimeout(timeoutShadowFetch.current);
    };
  }, [queueUpdateState]);

  return {
    isLoadingOnTabOrFirst,
    level: levelData,
    callProgramLevel,
    onAddQueue,
  };
};
