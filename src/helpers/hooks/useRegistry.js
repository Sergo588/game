import { useCallback, useState } from 'react';
import { callNotification } from 'helpers/notification';
import config from 'helpers/config';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { CONTRACT_NAMES, MAX_VALUE } from 'helpers/constants';
import { useWeb3React } from '@web3-react/core';
import { useGameContract } from 'helpers/hooks/useGameContract';
import { useRouterContract } from 'helpers/hooks/useRouterContract';
import { parseErrorToUserReadableMessage } from 'helpers/error';

export const useRegistry = () => {
  const { fastRegistrySmartGamePro } = useRouterContract();
  const { buyNewLevel } = useGameContract();
  const { getContract } = useGetContract();
  const { account } = useWeb3React();
  const [isLoadingFastRegistry, setIsLoadingFastRegistry] = useState(false);

  const checkApproveDev = useCallback(async () => {
    const MIN_BALANCE = parseInt(MAX_VALUE, 16);

    const tokenContract = await getContract(CONTRACT_NAMES.BUSD_TOKEN);

    try {
      const approveBalance = await tokenContract.allowance(account, config.contractXBase);

      if (approveBalance < MIN_BALANCE) {
        const { wait: waitApprove } = await tokenContract.approve(config.contractXBase, MAX_VALUE);

        await waitApprove();
      }
    } catch (e) {
      const { wait: waitApprove } = await tokenContract.approve(config.contractXBase, MAX_VALUE);

      await waitApprove();
    }
  }, [getContract, config, MAX_VALUE]);

  const devFastRegistry = useCallback(
    async (level, address) => {
      const xbaseContract = await getContract(CONTRACT_NAMES.XBASE);

      await checkApproveDev();

      const { wait: waitRegBase } = await xbaseContract.registrationExt(address, {
        gasLimit: 10000000,
      });

      await waitRegBase();

      return await buyNewLevel(level);
    },
    [account],
  );

  const onFastRegistry = useCallback(async (level, address) => {
    const isDev = config.stand === 'dev';

    if (!isLoadingFastRegistry) {
      setIsLoadingFastRegistry(true);
      try {
        if (isDev) {
          return await devFastRegistry(level, address);
        } else {
          return await fastRegistrySmartGamePro(address, level);
        }
      } catch (e) {
        if (e?.data?.message || e?.message) {
          callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
        }
      }

      setIsLoadingFastRegistry(false);
    }
  }, []);

  return {
    onFastRegistry,
    isLoadingFastRegistry,
  };
};
