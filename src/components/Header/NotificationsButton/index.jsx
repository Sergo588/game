import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from 'store/userSlice/selectors';
import { useClickOutside } from 'helpers/hooks/useClickOutside';
import BellIcon from 'assets/icons/bell.svg';
import { Button } from 'components';
import { NotificationsList } from 'components/Header/NotificationsButton/NotificationsList';
import { BUTTON_TYPES } from 'helpers/constants';
import { useRouter } from 'next/router';
import { setViewedNotifications } from 'store/userSlice';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';

export const NotificationsButton = () => {
  const dispatch = useDispatch();
  const { query, pathname } = useRouter();
  const [openedList, setOpenedList] = useState(false);
  const notifications = useSelector(getNotifications);
  const { isMobile } = useDetectChangeWindow();
  const someUnread = !!notifications.some(({ isNew }) => !!isNew);
  const containerButtonRef = useRef(null);

  const toggleOpened = useCallback(() => setOpenedList((prev) => !prev), []);

  useClickOutside(containerButtonRef, () => {
    setOpenedList(false);
  });

  useEffect(() => {
    setOpenedList(false);
  }, [query, pathname]);

  useEffect(() => {
    const header = document.getElementsByTagName('header')[0];

    if (openedList) {
      const currentPadding = window.innerWidth - document.body.clientWidth;

      dispatch(setViewedNotifications());

      document.body.style.overflow = 'hidden';
      if (!isMobile) {
        document.body.style.paddingRight = `${currentPadding}px`;
        header.style.paddingRight = `${currentPadding}px`;
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
      header.style.paddingRight = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
      header.style.paddingRight = 'unset';
    };
  }, [openedList, isMobile]);

  return (
    <div className="ml-5 relative sm:ml-2.5" ref={containerButtonRef}>
      <Button type={BUTTON_TYPES?.DARK_GREY_CIRCLE} className="relative" onClick={toggleOpened}>
        <BellIcon className="h-5 w-5" />
        {someUnread && <div className="w-2.5 h-2.5 absolute bg-red rounded-full bottom-full top-1 right-0 z-10 " />}
      </Button>
      {openedList && <NotificationsList onClose={toggleOpened} />}
    </div>
  );
};
