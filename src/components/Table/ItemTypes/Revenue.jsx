import React, { useMemo } from 'react';
import { TRANSACTIONS_TYPES, TRANSACTIONS_TYPES_COLORS } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';

export const Revenue = ({ data, type }) => {
  const { t } = useTranslation('common');

  const revenueText = useMemo(() => {
    switch (type) {
      case TRANSACTIONS_TYPES?.REGISTRATION:
        return capitalize(t('registration'));
      case TRANSACTIONS_TYPES?.ACTIVATE_PROGRAM:
        return capitalize(t('activation'));
      case TRANSACTIONS_TYPES?.UPGRADE:
        return capitalize(t('activation'));
      case TRANSACTIONS_TYPES?.GIFT_REG_BONUS:
        return `+ ${t('giftRefBonus')} ${data}`;
      case TRANSACTIONS_TYPES?.GIFT_REWARD:
        return `+ ${t('gift')} ${data}`;
      case TRANSACTIONS_TYPES?.MISSED_REF_BONUS:
        return `${t('missedPartnerBonus')} ${data} BNB`;
      case TRANSACTIONS_TYPES?.MISSED_GIFT_REF_BONUS:
        return `${t('missedPartnerGift')} ${data} BNB`;
      case TRANSACTIONS_TYPES?.MISSED_GIFT_REWARD:
        return `${t('missedGiftReward')} ${data} BNB`;
      case TRANSACTIONS_TYPES?.FINISH_REWARD:
        return `+ ${t('completion')} ${t('reward')} ${data} BNB`;
      default:
        return <span>{data} BNB</span>;
    }
  }, [type, data]);

  const revenueColor = useMemo(() => {
    if (TRANSACTIONS_TYPES_COLORS[type]) {
      return TRANSACTIONS_TYPES_COLORS[type];
    } else return 'text-yellow';
  }, [type]);

  return <span className={revenueColor}>{revenueText}</span>;
};
