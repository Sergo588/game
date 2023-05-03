import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsInfo } from 'store/userSlice/selectors';
import { NOTIFICATIONS_TYPES, BUTTON_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import UpgradeIcon from 'assets/icons/upgrade.svg';
import NewUserIcon from 'assets/icons/new_user.svg';
import WalletIcon from 'assets/icons/wallet.svg';
import WarningIcon from 'assets/icons/warning.svg';
import GiftIcon from 'assets/icons/gift.svg';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import FreezeLevels from 'assets/icons/freeze_levels.svg';
import { PartnerBonus } from 'components/Header/NotificationsButton/types/PartnerBonus';
import { GiftPartnerBonus } from 'components/Header/NotificationsButton/types/GiftPartnerBonus';
import { PartnerBonusMissed } from 'components/Header/NotificationsButton/types/PartnerBonusMissed';
import { ProfitMissed } from 'components/Header/NotificationsButton/types/ProfitMissed';
import { useInView } from 'react-intersection-observer';
import { loadMoreNotifications } from 'store/userSlice/asyncActions';
import { Button } from 'components';
import { Upgrade } from './types/Upgrade';
import { NewPartner } from './types/NewPartner';
import { Profit } from './types/Profit';
import { FinishReward } from './types/FinishReward';

export const NotificationsList = ({ onClose }) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data: notifications, isLoading, isEnough } = useSelector(getNotificationsInfo);

  useEffect(() => {
    if (notifications?.length && inView && !isLoading && !isEnough) {
      dispatch(loadMoreNotifications());
    }
  }, [inView, isEnough]);

  const iconMapper = useCallback((type) => {
    const iconWrapperBaseStyle = 'flex items-center justify-center rounded-full w-11 h-11 flex-shrink-0';

    switch (type) {
      case NOTIFICATIONS_TYPES.UPGRADE:
        return (
          <div className={`${iconWrapperBaseStyle} bg-green-100`}>
            <UpgradeIcon className="h-6 w-6 fill-current text-green-light" />
          </div>
        );
      case NOTIFICATIONS_TYPES.NEW_PARTNER:
        return (
          <div className={`${iconWrapperBaseStyle} bg-white-100`}>
            <NewUserIcon className="h-5 w-5 fill-current text-white" />
          </div>
        );
      case NOTIFICATIONS_TYPES.PROFIT:
      case NOTIFICATIONS_TYPES.GIFT_PROFIT:
        return (
          <div className={`${iconWrapperBaseStyle} bg-green-200`}>
            <WalletIcon className="h-6 w-6 fill-current text-green" />
          </div>
        );
      case NOTIFICATIONS_TYPES.PARTNER_BONUS:
        return (
          <div className={`${iconWrapperBaseStyle} bg-light-blue-100`}>
            <GiftIcon className="h-6 w-6 fill-current text-light-blue" />
          </div>
        );
      case NOTIFICATIONS_TYPES.GIFT_PARTNER_BONUS:
        return (
          <div className={`${iconWrapperBaseStyle} bg-light-blue-100`}>
            <GiftIcon className="h-6 w-6 fill-current text-light-blue" />
          </div>
        );
      case NOTIFICATIONS_TYPES.PARTNER_BONUS_MISSED:
        return (
          <div className={`${iconWrapperBaseStyle} bg-red-200`}>
            <WarningIcon className="h-4.5 w-4.5 fill-current text-red" />
          </div>
        );
      case NOTIFICATIONS_TYPES.PROFIT_MISSED:
        return (
          <div className={`${iconWrapperBaseStyle}`}>
            <FreezeLevels />
          </div>
        );
      case NOTIFICATIONS_TYPES.FINISH_REWARD:
        return (
          <div className={`${iconWrapperBaseStyle} bg-green-200`}>
            <GiftIcon className="h-6 w-6 fill-current text-green" />
          </div>
        );
      default:
        return null;
    }
  }, []);

  const notificationMapper = useCallback((notification) => {
    switch (notification.type) {
      case NOTIFICATIONS_TYPES.UPGRADE:
        return <Upgrade {...notification} />;
      case NOTIFICATIONS_TYPES.NEW_PARTNER:
        return <NewPartner {...notification} />;
      case NOTIFICATIONS_TYPES.PROFIT:
      case NOTIFICATIONS_TYPES.GIFT_PROFIT:
        return <Profit {...notification} />;
      case NOTIFICATIONS_TYPES.PARTNER_BONUS:
        return <PartnerBonus {...notification} />;
      case NOTIFICATIONS_TYPES.GIFT_PARTNER_BONUS:
        return <GiftPartnerBonus {...notification} />;
      case NOTIFICATIONS_TYPES.PARTNER_BONUS_MISSED:
        return <PartnerBonusMissed {...notification} />;
      case NOTIFICATIONS_TYPES.PROFIT_MISSED:
        return <ProfitMissed {...notification} />;
      case NOTIFICATIONS_TYPES.FINISH_REWARD:
        return <FinishReward {...notification} />;
      default:
        return null;
    }
  }, []);

  return (
    <>
      <div className="flex z-20 mt-2.5 sm:mt-0 bg-dark-grey-900 flex-col -right-4 rtl:-left-4 rtl:right-auto sm:overflow-hidden absolute w-417px max-h-550px justify-start sm:rounded-none rounded-small items-start overflow-hidden top-full drop-shadow-xl sm:drop-shadow-none sm:fixed sm:right-0 sm:top-0 sm:left-0 sm:bottom-0 sm:w-full sm:h-screen sm:max-h-screen">
        <div className="flex p-3.5 items-center justify-between w-full sm:pt-10">
          <span className="text-xl font-bold m-2 text-white">{capitalize(t('notifications'))}</span>
          <Button type={BUTTON_TYPES?.WHITE_100_CIRCLE} onClick={onClose} className="sm:fixed sm:top-4 sm:right-5">
            <div className="w-5 h-5 flex flex-col items-center justify-center">
              <span className="w-4 border-t border-white -mb-px rotate-45" />
              <span className="w-4 border-t border-white -rotate-45" />
            </div>
          </Button>
        </div>
        <div className="flex h-full items-center overflow-auto custom_scroll notifications_list flex-col w-full sm:pb-10">
          <div className="flex w-full flex-col relative h-auto">
            {notifications?.length ? (
              notifications?.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full relative items-center space-x-4 rtl:space-x-reverse w-full py-5 px-4 w-full"
                >
                  <div className="flex items-center justify-center flex-shrink-0">{iconMapper(item.type)}</div>
                  {notificationMapper(item)}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center m-auto p-4 pb-15 pt-10">
                <img className="w-120px h-120px" src="/nothing_here_bell.png" alt="Nothing here" />
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center p-4 space-x-1.5 rtl:space-x-reverse">
                <span>Loading...</span> <PuffLoadingIcon className="w-6 h-6" />
              </div>
            )}
            <div ref={ref} className="absolute pointer-events-none bottom-0 h-180px w-full" />
          </div>
        </div>
      </div>
      <div className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 bg-black-870 sm:hidden" onClick={onClose} />
    </>
  );
};
