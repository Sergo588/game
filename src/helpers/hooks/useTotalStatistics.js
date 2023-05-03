import { useRef } from 'react';
import { useRequest } from 'helpers/hooks/useRequest';
import { StatsRepository } from 'connectors/repositories/stats';

export const useTotalStatistics = () => {
  const contrainerRef = useRef(null);
  const { isLoading, call: statsCall, data } = useRequest(StatsRepository.getTotalStatistics);

  return {
    isLoading,
    data,
    statsCall,
    contrainerRef,
  };
};
