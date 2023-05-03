import React, { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { useTransactions } from 'helpers/hooks/useTransactions';
import { Button, ObserverWrapper } from 'components';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { BUTTON_TYPES, LOAD_MORE_TYPES } from 'helpers/constants';
import { Gift, Upgrade, RefBonus, Reward, Activate, FinishReward } from './Types';
import { Placeholders } from './Placeholders';

export const RecentActivities = () => {
  const { t } = useTranslation('common');
  const transactionProps = {
    sort: 'recent_activities',
  };
  const { actualData, isLoading, loadData, call, contrainerRef, isNeedHideButton } = useTransactions(transactionProps);

  const mapper = (item) => {
    switch (item.type) {
      case 'gift_ref_bonus':
      case 'gift_reward':
        return <Gift {...item} />;
      case 'upgrade':
        return <Upgrade {...item} />;
      case 'ref_bonus':
        return <RefBonus {...item} />;
      case 'reward':
        return <Reward {...item} />;
      case 'registration':
        return <Activate {...item} />;
      case 'finish_reward':
        return <FinishReward {...item} />;
      default:
        return null;
    }
  };

  return (
    <ObserverWrapper callback={call} isNeedOneCall>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-start w-full">
          <div className="flex flex-col justify-center items-start lg:px-5">
            <span className="text-white font-medium text-4xl mb-3 sm:text-2xl sm:mb-2.5">
              {t('SmartGameProRecentActivity')}
            </span>
            <span className="text-white-700 text-base mb-5 sm:text-sm">
              {t('realTimeEventsFromTheContractWithLinksToTransactionsInTheBlockchain')}
            </span>
          </div>
          <div className="flex flex-col justify-start items-center bg-dark-grey rounded-mini w-full h-830px z-10 lg:rounded-none sm:max-h-3/4">
            <div
              ref={contrainerRef}
              className="flex flex-1 flex-col justify-start items-center w-full custom_scroll overflow-auto p-7.5 sm:p-5"
            >
              {isLoading && !actualData?.transactions?.length ? (
                <Placeholders />
              ) : (
                actualData?.transactions?.map((item, index) => (
                  <Fragment key={`${item.type}_${index}_${item.revenue}`}>{mapper(item)}</Fragment>
                ))
              )}
            </div>
            {!isNeedHideButton && (
              <div className="w-full p-7.5 sm:p-5">
                <Button
                  type={BUTTON_TYPES?.WHITE_100}
                  className="w-full"
                  onClick={() => loadData({ type: LOAD_MORE_TYPES.LOAD_MORE })}
                  disabled={isLoading}
                >
                  {isLoading ? <PuffLoadingIcon className="h-6 w-6" /> : t('loadMore')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ObserverWrapper>
  );
};
