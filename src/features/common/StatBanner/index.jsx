import React, { useMemo } from 'react';
import { CustomLink, ObserverWrapper, Button } from 'components';
import CopyIcon from 'assets/icons/copy_white.svg';
import LinkIcon from 'assets/icons/link.svg';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { useTotalStatistics } from 'helpers/hooks/useTotalStatistics';
import config from 'helpers/config';
import { shortenAddress } from 'helpers/format';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { copy } from 'helpers/text';
import { BUTTON_TYPES } from 'helpers/constants';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';
import { Presentation } from './Presentation';

export const StatBanner = () => {
  const { t } = useTranslation('common');
  const { isLoading, data, statsCall, contrainerRef } = useTotalStatistics();
  const { isMobile } = useDetectChangeWindow();

  const statInfo = useMemo(
    () => [
      {
        title: t('membersTotal'),
        countAll: data?.users_count,
        countUp: data?.users_count_dynamic,
      },
      {
        title: capitalize(t('transactions')),
        countAll: data?.transactions_count,
        countUp: data?.transactions_dynamic_count,
      },
      {
        title: t('turnoverBnb'),
        countAll: data?.turnover,
        countUp: data?.turnover_dynamic,
      },
    ],
    [data],
  );

  const contractInfo = useMemo(
    () => [
      {
        title: t('smartGameProContract'),
        address: config?.contractGame,
      },
    ],
    [config, t],
  );

  const statItem = (title, countAll, countUp) => {
    return (
      <div className="flex flex-col flex-1 justify-center items-start space-y-2.5 sm:space-y-1.5" key={title}>
        <span className="text-white-500 text-base">{title}</span>
        <span className="text-white text-2xl font-bold lg:text-xl">{countAll}</span>
        <span className="text-yellow text-base">+ {countUp}</span>
      </div>
    );
  };

  const contractBlock = useMemo(() => {
    return (
      <div className="w-full flex flex-col mb-8 lg:mb-0 lg:flex-1">
        {contractInfo.map((item) => (
          <div
            className="flex justify-between items-center flex-wrap border-b border-white-100 py-2.5 lg:border-b-0"
            key={item.address}
          >
            {item.address && (
              <>
                <span className="text-white-500">{item?.title}</span>
                <div className="flex justify-end items-center space-x-5 rtl:space-x-reverse">
                  <span className="text-white">{shortenAddress(item?.address, 6)}</span>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button type={BUTTON_TYPES?.TRANSPARENT} onClick={() => copy(item.address)}>
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                    <CustomLink href={`${config?.scanNetworkAddress}${item?.address}`} targetBlank>
                      <LinkIcon className="w-4 h-4" />
                    </CustomLink>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }, [contractInfo]);

  return (
    <ObserverWrapper callback={statsCall} isNeedOneCall>
      <div
        className="flex justify-between w-full space-x-7 lg:flex-col lg:space-x-0 lg:space-y-5 sm:px-5 rtl:space-x-reverse"
        ref={contrainerRef}
      >
        <div className="h-full flex flex-1 flex-col justify-between bg-yellow-100 border border-yellow rounded-small py-6 px-9 lg:w-full">
          {isLoading ? (
            <div className="min-h-200px justify-center items-center flex left-0 right-0 z-20 bottom-0 top-0 lg:min-h-auto">
              <PuffLoadingIcon className="w-20 h-20 ml-auto mr-auto" />
            </div>
          ) : (
            <>
              <span className="text-white font-medium text-2xl lg:mb-5">{t('smartGameProInfo')}</span>
              <div className="lg:hidden">
                {contractBlock}
                <div className="flex justify-between items-center">
                  {statInfo.map((item) => statItem(item?.title, item?.countAll, item?.countUp))}
                </div>
              </div>
              <div className="hidden lg:flex flex-col">
                <div
                  className={`flex ${
                    isMobile && 'flex-col'
                  } items-start justify-between w-full border-b border-white-100 pb-4 mb-4`}
                >
                  {contractBlock}
                  {statItem(statInfo[0]?.title, statInfo[0]?.countAll, statInfo[0]?.countUp)}
                </div>
                <div className="flex justify-between items-center space-x-2.5">
                  {statInfo.slice(1).map((item) => statItem(item?.title, item?.countAll, item?.countUp))}
                </div>
              </div>
            </>
          )}
        </div>
        <Presentation />
      </div>
    </ObserverWrapper>
  );
};
