import { useWeb3React } from '@web3-react/core';
import config from 'helpers/config';

export const useCheckAllowedChain = () => {
  const { chainId } = useWeb3React();
  const isAllowedChain = config.allowedChainId === chainId;

  return isAllowedChain;
};
