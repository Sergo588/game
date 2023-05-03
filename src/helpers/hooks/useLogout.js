import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AuthRepository } from 'connectors/repositories/auth';
import { destroyCookie } from 'nookies';
import { clearAuthUser } from 'store/userSlice';

export const useLogout = () => {
  const { push } = useRouter();
  const { account } = useWeb3React();
  const dispatch = useDispatch();

  return useCallback(async () => {
    try {
      await AuthRepository.logout();
    } catch (e) {
      console.log(e);
    }

    destroyCookie(null, 'apiToken', {
      path: '/',
    });
    dispatch(clearAuthUser());
    push('/');
  }, [account]);
};
