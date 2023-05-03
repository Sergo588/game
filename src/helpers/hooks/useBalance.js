import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from 'store/userSlice';
import { getAccountBalance } from 'store/userSlice/selectors';
import { formatEther } from '@ethersproject/units';
import { useCallback } from 'react';

export const useBalance = () => {
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();
  const { balanceBnb, isFirstLoaded } = useSelector(getAccountBalance);

  const fetchBalance = useCallback(async () => {
    if (library) {
      try {
        const resultBnb = await library.getBalance(account);
        const resultBalanceBnb = parseFloat(formatEther(resultBnb)).toFixed(3);

        if (resultBalanceBnb !== balanceBnb) {
          dispatch(
            setBalance({
              balanceBnb: resultBalanceBnb,
              isFirstLoaded: true,
            }),
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [balanceBnb, library, account, dispatch]);

  return {
    balanceBnb: balanceBnb || 0,
    isFirstLoaded,
    fetchBalance,
  };
};
