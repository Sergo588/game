import React, { useState } from 'react';
import { Button, Input, CustomLink } from 'components';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useCheckInputPreview } from 'helpers/hooks/useCheckInputPreview';
import { linkWithQuery } from 'helpers/links';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { BUTTON_TYPES } from 'helpers/constants';

export const PreviewAccount = () => {
  const [inputValue, setInputValue] = useState('');
  const { checkInput, isLoadingCheck } = useCheckInputPreview();
  const { t } = useTranslation('common');

  const randomListLeaders = [
    2597, 1454, 1192, 4882, 20387, 2700, 267, 18376, 468, 4728, 601, 448, 2669, 2359, 20785, 7366, 7, 18,
  ];

  const randomLeader = randomListLeaders[Math.floor(Math.random() * randomListLeaders.length)];

  const handleOnClick = () => {
    checkInput(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleOnClick();
    }
  };

  return (
    <div className="flex flex-col mb-15 w-full sm:mb-10 ">
      <div className="flex flex-col">
        <div className="flex flex-col sm:px-5">
          <span className="text-white text-3xl font-bold sm:text-2xl">{t('previewMode')}</span>
          <span className="text-white-500 text-base mt-1 mb-7.5 sm:text-sm sm:mb-5">
            {t('enterIdOrBnbAddressToPreview')}
          </span>
        </div>
        <div className="flex space-x-5 sm:space-x-0 sm:flex-col rtl:space-x-reverse">
          <div className="flex flex-col flex-1 sm:w-full bg-preview-yellow rounded sm:rounded-none p-7.5 sm:p-5 sm:mb-5">
            <span className="text-dark-grey mb-3 ml-0.5">{t('enterIdOrBnbWallet')}</span>
            <div className="flex space-x-5 sm:space-x-0 sm:flex-col rtl:space-x-reverse ">
              <Input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setInputValue('')}
                value={inputValue}
                className="flex-1 sm:mb-3.5 py-2 bg-black-100 text-dark-grey focus:border-dark-grey !placeholder-dark-grey-700 focus:!bg-black-100 active:!bg-black-100"
                type="text"
                placeholder={`${capitalize(t('example'))}: 87381`}
              />
              <Button
                onClick={handleOnClick}
                disabled={isLoadingCheck}
                type={BUTTON_TYPES?.BLACK}
                className="rounded-mini"
              >
                {isLoadingCheck ? <PuffLoadingIcon className="w-6 h-6" /> : capitalize(t('preview'))}
              </Button>
            </div>
          </div>
          <div className="w-1/3 min-w-320px sm:w-full sm:px-5">
            <div className="flex flex-col w-full rounded bg-black-light h-full p-7.5 relative rtl:items-end">
              <span className="text-white mb-3 ml-0.5">{t('dontKnowAnyID')}?</span>
              <CustomLink className="w-max" href={linkWithQuery('/dashboard', { user: randomLeader })}>
                <Button type={BUTTON_TYPES?.WHITE_100} className="rounded-mini w-max">
                  {t('checkDemo')}
                </Button>
              </CustomLink>
              <img src="/img/main/previewId.png" className="absolute right-0 bottom-0 rtl:left-0" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
