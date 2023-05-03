import { useGetContract } from 'helpers/hooks/useGetContract';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { CONTRACT_NAMES } from 'helpers/constants';
import { formatEther } from 'ethers/lib/utils';

export const useGetUserData = () => {
  const [userData, setUserData] = useState({});

  const { account } = useWeb3React();
  const { getContract } = useGetContract();

  const callUserGameData = useCallback(async () => {
    const contract = await getContract(CONTRACT_NAMES.GAME);
    const { levels, _clonesCount, _reinvestCount } = await contract?.getUserData(account);

    setUserData({
      levels,
      clonesCount: _clonesCount.reduce((total, count, index) => ({ ...total, [index + 1]: parseInt(count) }), {}),
      totalClonesCount: _clonesCount.reduce((total, count, index) => {
        const currentLevel = index + 1;
        const isLevelActive = levels.includes(index + 1);
        const additionalNumber = isLevelActive ? 1 : 0;

        return { ...total, [currentLevel]: parseInt(count) + additionalNumber };
      }, {}),
      reinvestCount: _reinvestCount.reduce((total, count, index) => ({ ...total, [index + 1]: parseInt(count) }), {}),
    });
  }, [account, getContract, setUserData, userData]);

  useEffect(() => {
    if (account) {
      callUserGameData();
    }

    return () => {
      setUserData({});
    };
  }, [account]);

  return userData;
};
