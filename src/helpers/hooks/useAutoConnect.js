import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { injectedConnector } from 'connectors/wallets';
import { isMobile } from 'react-device-detect';

export const useAutoConnect = () => {
  const { active, error, activate } = useWeb3React();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          activate(injectedConnector);
        } else if (isMobile && window.ethereum) {
          activate(injectedConnector, undefined, true).catch(() => {
            setConnected(true);
          });
        }
      })
      .finally(() => {
        setConnected(true);
      });
  }, [activate]);

  return {
    connected,
  };
};
