import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, getIsOnPageTab, getPreviewAccount } from 'store/userSlice/selectors';
import { getCurrentProfileByID, getPreviewProfileByID } from 'store/userSlice/asyncActions';
import { GAME_START_DATES } from 'helpers/constants';
import { differenceInMinutes, fromUnixTime } from 'date-fns';

const HIGHLOAD_INTERVAL_MINUTES = 10;

export function useUpdateDashboardProfile(additionalCallback) {
  const timeout = useRef(null);
  const dispatch = useDispatch();
  const isOnPageTab = useSelector(getIsOnPageTab);
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const isPreview = !!previewAccount?.id;
  const currentAccount = isPreview ? previewAccount : authProfile;
  const dispatchAction = isPreview ? getPreviewProfileByID : getCurrentProfileByID;

  const onInterval = () => {
    const nearHighLoad = GAME_START_DATES.some((date) => {
      const [_, value] = Object.entries(date)[0];

      const diff = differenceInMinutes(fromUnixTime(value), new Date());

      return diff >= -HIGHLOAD_INTERVAL_MINUTES && diff <= HIGHLOAD_INTERVAL_MINUTES;
    });

    if (!nearHighLoad) {
      dispatch(dispatchAction(currentAccount?.id));
      additionalCallback?.();
    }

    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(onInterval, 20000);
  };

  useEffect(() => {
    if (isOnPageTab) {
      dispatch(dispatchAction(currentAccount?.id));
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(onInterval, 20000);
    }

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [currentAccount?.id, isOnPageTab]);
}
