import { formatEther } from '@ethersproject/units';
import { CONTRACT_NAMES, PROGRAM_NAMES } from './constants';
import config from './config';

export const nameToContractConfig = {
  [PROGRAM_NAMES.GAME]: 'contractGame',
};

export const userAddressToId = async (userAddress, contract) => {
  const response = await contract.users(userAddress);
  return response && response.id ? response.id : null;
};

export const checkNetwork = async ({ chainId }) => {
  if (chainId === config.allowedChainId) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};

export const checkBalanceBNB = async ({ account, library, bnbMinPrice = 10 }) => {
  try {
    if (!!account && !!library) {
      const resultBnb = await library.getBalance(account);
      const balanceBnb = (parseInt(resultBnb, 10) / 1e18).toFixed(4);

      if (Number(balanceBnb) >= Number(bnbMinPrice)) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }
  } catch (e) {
    return Promise.reject();
  }
};

export const checkBalance = async ({ account, getContract, library, busdMinPrice = 10, bnbMinPrice = 0.005 }) => {
  const isDev = !!(config?.stand && config?.stand === 'dev');

  try {
    const resultBnb = await library.getBalance(account);
    const balanceBnb = (parseInt(resultBnb, 10) / 1e18).toFixed(4);
    const contract = await getContract(ProgramNames.TOKEN);
    let balanceBusd = await contract.balanceOf(account);

    balanceBusd = parseInt(balanceBusd, 10) / 1e18;

    if (isDev || (Number(balanceBnb) >= Number(bnbMinPrice) && Number(balanceBusd) >= Number(busdMinPrice))) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};

export const getTotalPriceFastRegistry = async ({ getContract, level }) => {
  const isMainNet = config.allowedChainId === 56;

  try {
    const contractPancake = await getContract(CONTRACT_NAMES.PANCAKESWAP);
    const programContract = await getContract(CONTRACT_NAMES.GAME);

    const [reserve0, reserve1] = isMainNet ? await contractPancake.getReserves() : [];
    const contractLevelPrice = await programContract.levelPrice(Number(level));
    const bnbCurrency = isMainNet ? reserve1 / reserve0 : 240.67136299106204;

    return (parseFloat(10 / bnbCurrency) * 1.3 + parseFloat(contractLevelPrice / 1e18)).toFixed(5);
  } catch (e) {
    return 0;
  }
};

export const checkBalanceBnbWithLevelReg = async ({ account, library, level = 16, getContract }) => {
  const minPrice = await getTotalPriceFastRegistry({ getContract, level });

  try {
    if (!!account && !!library) {
      const resultBnb = await library.getBalance(account);
      const balanceBnb = parseFloat(formatEther(resultBnb)).toFixed(4);

      if (Number(balanceBnb) >= Number(minPrice)) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }
  } catch (e) {
    return Promise.reject();
  }
};
