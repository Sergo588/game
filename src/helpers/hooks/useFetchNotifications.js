import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, getNotifications, getPreviewAccount } from 'store/userSlice/selectors';
import { useCallback, useEffect } from 'react';
import { NotificationRepository } from 'connectors/repositories/notification';
import { setNotifications } from 'store/userSlice';

export const useFetchNotifications = () => {
  const notifications = useSelector(getNotifications);
  const previewAccount = useSelector(getPreviewAccount);
  const authProfile = useSelector(getAuthUser);
  const dispatch = useDispatch();

  const fetchNotifications = useCallback(async () => {
    try {
      const result = await NotificationRepository.getNotifications({ limit: 20, offset: 0 });

      dispatch(setNotifications(result));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (authProfile.id && !notifications.length && !previewAccount.id) {
      fetchNotifications();
    }

    return () => {
      dispatch(setNotifications([]));
    };
  }, []);
};
