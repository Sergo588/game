import { useRouter } from 'next/router';
import { UserRepository } from 'connectors/repositories/user';
import { callNotification } from 'helpers/notification';
import { linkWithQuery } from 'helpers/links';
import { useDispatch } from 'react-redux';
import { setPreviewAccount } from 'store/userSlice';
import { useRequest } from './useRequest';
import { useState } from 'react';

export const useCheckInputPreview = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const checkInput = async (inputValue) => {
    if (!isLoading) {
      setIsLoading(true);

      const trimmedInputValue = inputValue?.trim();
      const isAddress = !!trimmedInputValue.match(/^0x[a-f0-9]{40}$/i);
      const isUserId = !!trimmedInputValue.match(/^[0-9]+$/);

      if (isAddress || isUserId) {
        try {
          const user = await UserRepository.getAccount(trimmedInputValue);

          push(linkWithQuery('/dashboard', { user: user.id }));
          dispatch(setPreviewAccount(user));
        } catch (e) {
          if (e.response.status === 404) {
            callNotification({ type: 'error', message: 'User not found' });
          } else {
            callNotification({ type: 'error', message: 'Server error. Please, try again' });
          }
        }
      } else {
        callNotification({ type: 'error', message: 'Invalid ID or BUSD wallet' });
      }

      setIsLoading(false);
    }
  };

  return {
    isLoadingCheck: isLoading,
    checkInput,
  };
};
