import React from 'react';
import { Button } from 'components';
import FilterIcon from 'assets/icons/filter.svg';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { BUTTON_TYPES } from 'helpers/constants';

export const FiltersButton = ({ onClickFilters }) => {
  const { t } = useTranslation('common');

  return (
    <Button
      type={BUTTON_TYPES?.WHITE_100}
      onClick={onClickFilters}
      className="!leading-30px !py-0 !px-2.5 font-normal space-x-1.5 rtl:space-x-reverse"
    >
      <FilterIcon className="w-4 h-4" />
      <span>{capitalize(t('filters'))}</span>
    </Button>
  );
};
