import { useCallback } from 'react';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { CONTRACT_NAMES, DEFAULT_GAS_LIMIT, TRANSACTION_BASE_GWEI } from 'helpers/constants';
import { increaseByPercent, toWei } from 'helpers/numbers';
import { getTotalPriceFastRegistry } from 'helpers/checks';

export const useRouterContract = () => {
  const { getContract } = useGetContract();

  const fastRegistrySmartGamePro = useCallback(
    async (refAddr, level) => {
      const contract = await getContract(CONTRACT_NAMES.ROUTER);
      const totalPrice = await getTotalPriceFastRegistry({ getContract, level });

      let gas = null;
      try {
        gas = await contract.estimateGas.forsageExpressRegistration(refAddr, level, {
          value: toWei(totalPrice, 'ether'),
          gasPrice: toWei(TRANSACTION_BASE_GWEI),
        });
      } catch (e) {
        //
      }

      return await contract.forsageExpressRegistration(refAddr, level, {
        value: toWei(totalPrice, 'ether'),
        gasPrice: toWei(TRANSACTION_BASE_GWEI),
        gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
      });
    },
    [getContract],
  );

  return {
    fastRegistrySmartGamePro,
  };
};
