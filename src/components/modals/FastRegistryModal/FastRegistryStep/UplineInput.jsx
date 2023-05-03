import React, { useMemo } from 'react';
import { InputForm } from 'components/Forms';
import { Button } from 'components';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useTranslation } from 'next-i18next';
import { BUTTON_TYPES } from 'helpers/constants';

export const UplineInput = ({ inputId, setInputId, isError, onApprove, isLoading, address }) => {
  const { t } = useTranslation('common');
  const onChangeInputUpline = ({ target }) => {
    setInputId(target?.value?.replace(/\D/g, '') || '');
  };

  const renderTitle = useMemo(() => {
    return (
      <div className="flex items-center flex-wrap w-full">
        <span className="whitespace-nowrap">{t('youUplineAddressOrId')}</span>
        <span className="text-sm text-white-500 sm:text-xs h-4 leading-2">{address || ''}</span>
      </div>
    );
  }, [address]);

  return (
    <div className="flex space-x-2 items-end w-full rtl:space-x-reverse">
      <InputForm
        title={renderTitle}
        className="flex-grow-0 w-full max-w-50%"
        inputStyles={isError && 'border-red'}
        type="text"
        onChange={onChangeInputUpline}
        placeholder="Upline"
        value={inputId || ''}
      />
      <Button
        className="mt-4 h-52px flex-1"
        disabled={isLoading}
        type={BUTTON_TYPES?.GRADIENT_ORANGE_YELLOW}
        onClick={onApprove}
      >
        {isLoading ? (
          <>
            Loading... <PuffLoadingIcon className="w-6 h-6 ml-5" />
          </>
        ) : (
          t('approveUpline')
        )}
      </Button>
    </div>
  );
};
