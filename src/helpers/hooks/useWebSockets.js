import { useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useBalance } from 'helpers/hooks/useBalance';
import { useGetWebSocketProvider } from 'helpers/hooks/useGetWebSocketProvider';

export const useWebSockets = () => {
  const { account, active } = useWeb3React();
  const { fetchBalance } = useBalance();
  const socketProvider = useGetWebSocketProvider();

  useEffect(() => {
    fetchBalance();
    if (socketProvider) {
      if (account && active) {
        socketProvider?.on('block', fetchBalance);
      }

      return () => {
        socketProvider?.off('block', fetchBalance);
      };
    }
  }, [account, fetchBalance, active]);
};
