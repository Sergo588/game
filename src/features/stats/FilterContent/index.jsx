import React, { useMemo } from 'react';
import { Select, Input, Button } from 'components';
import { useTranslation } from 'next-i18next';
import { capitalize, isEmpty } from 'lodash';
import { BUTTON_TYPES } from 'helpers/constants';

export const FiltersContent = ({
  onClickFilters,
  filterValues,
  setFilterValues,
  call,
  setIsNeedHideButton,
  selectedLevel,
  setSelectedLevel,
  selectedIdOrWallet,
  setSelectedIdOrWallet,
  resetData,
}) => {
  const { t } = useTranslation('common');

  const levelOptions = useMemo(() => {
    return Array.from(new Array(36))
      .fill({ title: 0, value: 0 })
      .map((item, index) => ({ title: index + 1, value: String(index + 1) }));
  }, []).reverse();

  const onChangeIdOrWalletInput = (event) => {
    setSelectedIdOrWallet(event.target.value);
  };

  const onCancelClick = () => {
    if (!isEmpty(filterValues)) {
      resetData?.();
      call();
      setIsNeedHideButton(false);
    }
    setSelectedLevel({});
    setSelectedIdOrWallet('');
    onClickFilters();
  };

  const onApplyClick = () => {
    resetData?.();
    setFilterValues({ level: selectedLevel, user_id: selectedIdOrWallet });
    onClickFilters();
  };

  return (
    <div className="flex sm:flex-col w-full bg-black-light rounded px-6 pt-5 pb-7.5 space-y-4 lg:bg-main-bg lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:bottom-0 lg:w-screen lg:h-screen lg:z-999999 lg:!mt-0 lg:rounded-none">
      <div className="flex-1 flex flex-col">
        <Button
          type={BUTTON_TYPES?.DARK_GREY_ROUNDED}
          className="ml-auto w-max hidden lg:flex flex-col mb-7.5"
          onClick={onClickFilters}
        >
          <div className="w-5 h-5 flex flex-col items-center justify-center">
            <span className="w-4 border-t border-white -mb-px rotate-45" />
            <span className="w-4 border-t border-white -rotate-45" />
          </div>
        </Button>
        <span className="text-2xl text-white !mt-0 mb-7.5 hidden lg:block"> {capitalize(t('filters'))} </span>
        <div className="flex items-center space-x-2.5 lg:flex-col lg:space-x-0 lg:space-y-5">
          <div className="flex-1 flex flex-col items-start space-y-2.5 min-w-290px sm:w-full">
            <span>{capitalize(t('level'))}</span>
            <Select data={levelOptions} value={selectedLevel} onChange={setSelectedLevel} />
          </div>
          <div className="flex-1 flex flex-col items-start space-y-2.5 min-w-290px sm:w-full">
            <span>{capitalize(t('search'))}</span>
            <Input placeholder="Enter id / wallet" onChange={onChangeIdOrWalletInput} value={selectedIdOrWallet} />
          </div>
          <div className="flex-1 sm:hidden" />
        </div>
      </div>
      <div className="flex items-center space-x-2.5 lg:flex-col lg:space-x-0 lg:space-y-5">
        <div className="flex-1 min-w-210px mt-4 sm:w-full">
          <Button type={BUTTON_TYPES?.GRADIENT} className="w-full" onClick={onApplyClick}>
            {t('applyFilters')}
          </Button>
        </div>
        <div className="flex-1 min-w-160px mt-4 sm:w-full">
          <Button type={BUTTON_TYPES?.WHITE_100} className="w-full" onClick={onCancelClick}>
            {t('resetFilters')}
          </Button>
        </div>
        <div className="flex-1 lg:w-full" />
      </div>
    </div>
  );
};
