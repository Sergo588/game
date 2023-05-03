import { useCallback } from 'react';
import { setCookie } from 'nookies';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { UserRepository } from 'connectors/repositories/user';
import { useRouter } from 'next/router';
import { AuthRepository } from 'connectors/repositories/auth';
import { setAuthUser } from 'store/userSlice';

export const useAuth = () => {
  const { push } = useRouter();
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();

  return useCallback(async () => {
    const { nonce } = await UserRepository.getNonce(account);
    if (nonce) {
      try {
        const resultmessage = await library?.getSigner(account).signMessage(nonce);
        const { token, user } = await AuthRepository.login(account, resultmessage);
        setCookie(null, 'apiToken', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });

        await dispatch(setAuthUser(user));

        push('/dashboard');
      } catch (e) {
        console.log(e);
      }
    }
  }, [account]);
};
