import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { CONTRACT_NAMES } from 'helpers/constants';
import config from '../config';

export const useGetContract = () => {
  const { account, library } = useWeb3React();

  const types = {
    [CONTRACT_NAMES.XBASE]: [config.contractXBase, config.matrixXBaseAbi],
    [CONTRACT_NAMES.GAME]: [config.contractGame, config.gameAbi],
    [CONTRACT_NAMES.PANCAKESWAP]: [config.contractPancakeSwap, config.pancakeSwapAbi],
    [CONTRACT_NAMES.BUSD_TOKEN]: [config.contractBusd, config.busdTokenAbi],
    [CONTRACT_NAMES.ROUTER]: [config.contractRouter, config.routerAbi],
  };

  const getContract = (type) =>
    new Promise((resolve, rejected) => {
      if (types[type] && library) {
        const contract = new Contract(...types[type], library?.getSigner(account).connectUnchecked() || library);

        resolve(contract);
      } else {
        rejected(`error init contract: ${type}`);
      }
    });

  return {
    getContract,
  };
};
