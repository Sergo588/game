import React from 'react';
import { CustomLink } from 'components';
import { linkWithQuery } from 'helpers/links';
import { useTranslation } from 'next-i18next';

export const GiftPartnerBonus = ({ interacting_user_id, level, amount }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-start justify-start flex-col flex-wrap space-y-2.5">
      <span className="text-base leading-19px leading-4 text-white-500 space-y-1 space-x-0.5 rtl:space-x-reverse">
        <span className="text-yellow">+ {amount} BNB</span> {t('partnerBonusGiftFrom')} <br />
        <div>
          <CustomLink href={linkWithQuery('/dashboard', { user: interacting_user_id })}>
            <span className="px-2.5 py-1 bg-yellow-200 text-yellow leading-7 rounded-7px">
              ID {interacting_user_id}
            </span>
          </CustomLink>{' '}
          {t('on')}{' '}
          <span className="text-white">
            {t('level')} {level}
          </span>
        </div>
      </span>
    </div>
  );
};
