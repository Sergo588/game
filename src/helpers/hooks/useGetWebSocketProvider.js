import { useMemo } from 'react';
import { WebSocketProvider } from '@ethersproject/providers';
import config from 'helpers/config';

export const useGetWebSocketProvider = () => {
  return useMemo(() => {
    if (process.browser) {
      try {
        return new WebSocketProvider(config.wsURI);
      } catch (e) {
        return null;
      }
    }

    return null;
  }, []);
};
