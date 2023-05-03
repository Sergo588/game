import React, { useCallback, useMemo } from 'react';
import { Button, UserIdWrapper, Avatar } from 'components';
import { useSelector } from 'react-redux';
import { getCurrentUserProfile, getPreviewAccount } from 'store/userSlice/selectors';
import SettingIcon from 'assets/icons/settings.svg';
import CopyIcon from 'assets/icons/copy_white.svg';
import { shortenAddress } from 'helpers/format';
import { copy } from 'helpers/text';
import { format, parseISO } from 'date-fns';
import { BUTTON_TYPES } from 'helpers/constants';
import { useModal } from 'helpers/hooks/useModal';
import { UserSettingsModal } from 'components/modals';

export const UserInfo = () => {
  const { openedModal, onOpen, onClose } = useModal();
  const user = useSelector(getCurrentUserProfile);
  const previewUser = useSelector(getPreviewAccount);
  const actualUser = previewUser?.id ? previewUser : user;

  const onCopyAddress = useCallback(() => {
    return copy(actualUser?.address);
  }, [actualUser]);

  const date = useMemo(() => {
    try {
      return format(new Date(parseISO(actualUser?.created_at)), 'dd.MM.yyyy');
    } catch (e) {
      return '';
    }
  }, [actualUser]);

  const userIdRender = useMemo(() => {
    if (actualUser?.username) {
      return (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-white font-medium text-3xl sm:text-xl">{actualUser?.username}</span>
          <UserIdWrapper userId={actualUser?.id} />
        </div>
      );
    }
    return <span className="text-white font-medium text-3xl sm:text-xl">ID {actualUser?.id}</span>;
  }, [actualUser]);

  return (
    <div className="flex items-center flex-1 space-x-4 rtl:space-x-reverse">
      <Avatar photo={actualUser?.photo_url} />
      <div className="flex flex-col w-full space-y-1.5 sm:space-y-1 ">
        <div className="flex items-center space-x-5 sm:space-x-1 rtl:space-x-reverse sm:flex-wrap">
          {userIdRender}
          {!previewUser?.id && (
            <Button type={BUTTON_TYPES?.DARK_GREY_CIRCLE} className="sm:bg-transparent" onClick={onOpen}>
              <SettingIcon className="w-5 h-5" />
            </Button>
          )}
        </div>
        <div className="flex space-x-2.5 rtl:space-x-reverse">
          <span className="text-white font-bold sm:text-sm">{shortenAddress(actualUser?.address)}</span>
          <Button type={BUTTON_TYPES?.TRANSPARENT} onClick={onCopyAddress}>
            <CopyIcon className="w-5 h-5" />
          </Button>
        </div>
        {actualUser?.pid > 0 && (
          <div className="w-full space-x-1.5 rtl:space-x-reverse">
            <span className="sm:text-sm">invited {date} by upline</span>
            <UserIdWrapper userId={actualUser?.pid} />
          </div>
        )}
      </div>
      <UserSettingsModal onClose={onClose} openedModal={openedModal} />
    </div>
  );
};
