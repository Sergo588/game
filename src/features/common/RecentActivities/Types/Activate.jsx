import React from 'react';
import { useTranslation } from 'next-i18next';
import { upperCase } from 'lodash';
import { useCheckInputPreview } from 'helpers/hooks/useCheckInputPreview';
import { ItemLayout } from '../ItemLayout';

export const Activate = ({ type, user_id, date, level, tx }) => {
  const { t } = useTranslation('common');
  const { checkInput } = useCheckInputPreview();

  const onGoClick = async (id) => {
    checkInput(id);
  };

  return (
    <ItemLayout type={type} date={date} tx={tx}>
      <div
        className="flex items-center justify-center px-2.5 !leading-30px bg-yellow-100 text-yellow rounded-7px text-base sm:text-sm w-max cursor-pointer sm:order-2"
        onClick={() => onGoClick(String(user_id))}
      >
        {upperCase(t('id'))} {user_id}
      </div>
      <span className="sm:order-1">
        {t('joined', { lng: 'en' })}
        <span className="ml-1.5 text-white">
          {t('in', { lng: 'en' })} {t('level', { lng: 'en' })} {level}
        </span>
      </span>
    </ItemLayout>
  );
};
