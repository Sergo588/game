import { useGetContract } from 'helpers/hooks/useGetContract';
import { CONTRACT_NAMES, DEFAULT_GAS_LIMIT, TRANSACTION_BASE_GWEI } from 'helpers/constants';
import { formatEther } from '@ethersproject/units';
import { useCallback } from 'react';
import { increaseByPercent, toWei } from 'helpers/numbers';

export const useGameContract = () => {
  const { getContract } = useGetContract();
  // const { active } = useWeb3React();

  const buyNewLevel = async (level = 1) => {
    const contract = await getContract(CONTRACT_NAMES.GAME);
    const price = await contract.levelPrice(level);

    let gas = null;
    try {
      gas = await contract.estimateGas.buyNewLevel(level, {
        value: price,
        gasPrice: toWei(TRANSACTION_BASE_GWEI),
      });
    } catch (e) {
      //
    }

    return await contract.buyNewLevel(level, {
      value: price,
      gasPrice: toWei(TRANSACTION_BASE_GWEI),
      gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
    });
  };

  const buyLevelForAddress = async (address, level) => {
    const contract = await getContract(CONTRACT_NAMES.GAME);
    const price = await contract.levelPrice(level);

    let gas = null;
    try {
      gas = await contract.estimateGas.buyNewLevelFor(address, level, {
        value: price,
        gasPrice: toWei(TRANSACTION_BASE_GWEI),
      });
    } catch (e) {
      //
    }

    return await contract.buyNewLevelFor(address, level, {
      value: price,
      gasPrice: toWei(TRANSACTION_BASE_GWEI),
      gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
    });
  };

  const getLineFill = useCallback(async () => {
    const contract = await getContract(CONTRACT_NAMES.GAME);
    const fill = await contract.getLineFill();
    return fill?.map(formatEther) || [];
  }, [getContract]);

  //  сохранил, ибо каждый раз одно и то же спрашивают
  // useEffect(async () => {
  //   if (active) {
  //     const contract = await getContract(CONTRACT_NAMES.GAME);
  //     console.log(contract);
  //     console.log(
  //       await Promise.all(
  //         new Array(await contract.MAX_LEVEL()).fill(null).map(async (_, index) => ({
  //           // level: index + 1,
  //           [index + 1]: parseInt(await contract.levelActivationTime(index + 1)),
  //           // price: formatEther(await contract.levelPrice(index + 1)),
  //         })),
  //       ),
  //     );
  // console.log(
  //   await Promise.all(
  //     new Array(await contract.MAX_LEVEL()).fill(null).map(async (_, index) => ({
  //       level: index + 1,
  //       time: parseInt(await contract.levelActivationTime(index + 1)),
  //       // price: formatEther(await contract.levelPrice(index + 1)),
  //     })),
  //   ),
  // );
  //   }
  // }, [active]);

  return {
    buyNewLevel,
    getLineFill,
    buyLevelForAddress,
  };
};
