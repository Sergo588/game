import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserRepository } from 'connectors/repositories/user';
import { NotificationRepository } from 'connectors/repositories/notification';

export const getProfile = createAsyncThunk('profile/getProfile', async (account) => UserRepository.getAccount(account));

export const getCurrentProfileByID = createAsyncThunk('profile/getCurrentProfileByID', async (account) =>
  UserRepository.getAccount(account),
);

export const getPreviewProfileByID = createAsyncThunk('profile/getPreviewProfileByID', async (account) =>
  UserRepository.getAccount(account),
);

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  const { user } = await UserRepository.getCurrent();

  return user;
});

export const loadMoreNotifications = createAsyncThunk('user/loadMoreNotifications', async (payload, thunkApi) => {
  const currentNotifications = thunkApi.getState().profile.notifications.data.filter(({ id }) => !!id);

  const result = await NotificationRepository.getNotifications({
    from_id: currentNotifications[currentNotifications.length - 1]?.id,
    limit: 20,
  });

  return result;
});
