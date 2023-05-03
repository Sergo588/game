import React from 'react';
import { useTranslation } from 'next-i18next';
import { upperCase } from 'lodash';
import { useCheckInputPreview } from 'helpers/hooks/useCheckInputPreview';
import { ItemLayout } from '../ItemLayout';

export const Upgrade = ({ type, user_id, level, date, tx }) => {
  const { t } = useTranslation('common');
  const { checkInput } = useCheckInputPreview();

  const onGoClick = async (id) => {
    checkInput(id);
  };

  return (
    <ItemLayout type={type} date={date} tx={tx}>
      <div
        className="flex items-center justify-center px-2.5 !leading-30px bg-yellow-100 text-yellow rounded-7px text-base sm:text-sm w-max cursor-pointer"
        onClick={() => onGoClick(String(user_id))}
      >
        {upperCase(t('id'))} {user_id}
      </div>
      <span>
        {t('activated', { lng: 'en' })}
        <span className="ml-1.5 text-white">
          {t('level', { lng: 'en' })} {level}
        </span>
      </span>
    </ItemLayout>
  );
};
