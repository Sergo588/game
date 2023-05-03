import React, { useEffect, useRef, useState } from 'react';
import { Button, Menu } from 'components';
import { useRouter } from 'next/router';
import CloseIcon from 'assets/icons/close.svg';
import { useTranslation } from 'next-i18next';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useCheckInputPreview } from 'helpers/hooks/useCheckInputPreview';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { useWeb3React } from '@web3-react/core';
import { capitalize } from 'lodash';
import { removePreviewAccount } from 'store/userSlice';
import { BUTTON_TYPES } from 'helpers/constants';

const PreviewHeader = ({ searchIsClicked, onClosedPreview }) => {
  const { active } = useWeb3React();
  const isMobileUser = window?.innerWidth <= 1121;
  const { push, query, pathname } = useRouter();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(query.user);
  const [isFocused, setIsFocused] = useState(isMobileUser);
  const { checkInput, isLoadingCheck } = useCheckInputPreview();
  const authUser = useSelector(getAuthUser);
  const { t } = useTranslation('common');

  const onGoClick = async () => {
    checkInput(inputValue);
  };

  const handleFocused = (value) => () => {
    setIsFocused(value);
  };

  const onClose = () => {
    handleFocused(false);
    onClosedPreview && onClosedPreview();
    dispatch(removePreviewAccount());
  };

  useEffect(() => {
    if (isFocused && isMobileUser) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFocused, isMobileUser]);

  const onLoginClick = () => {
    if (authUser?.id) {
      onClosedPreview();
      return push('/dashboard');
    }

    return push('/');
  };

  useEffect(() => {
    query.user && setIsFocused(false);

    setInputValue(query.user);
    if (!isMobileUser) {
      inputRef.current.blur();
    }
  }, [query.user]);

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onGoClick();
    }
  };

  useEffect(() => {
    if (!isMobileUser) {
      pathname && setIsFocused(false);
    }
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 flex justify-center w-full px-10 py-2.5 z-40 lg:p-0 lg:max-h-screen z-999999">
        <div
          className={`flex justify-between items-center rounded-mini max-w-desktop-preview-bar w-full bg-preview-yellow px-5 py-2 shadow-preview-bar lg:pl-10 sm:pl-5 lg:py-2.5 lg:rounded-none lg:rounded-b-mini lg:pr-0 ${
            isFocused &&
            'lg:!bg-main-bg lg:!pl-0 lg:flex-col lg:pb-5 lg:h-screen lg:max-h-screen lg:rounded-b-none lg:justify-start'
          }`}
        >
          <div
            className={`flex w-full overflow-hidden items-center justify-between space-x-2.5 rtl:space-x-reverse lg:items-start ${
              isFocused ? 'lg:order-2 lg:flex-col lg:pt-5 lg:items-start lg:space-y-7.5 lg:flex-1 lg:h-full' : ''
            }`}
          >
            <div className="w-full flex justify-start items-center space-x-5 rtl:space-x-reverse lg:flex-col lg:h-full lg:items-start lg:space-x-0">
              <div className={`flex flex-col w-full bg-preview-yellow ${isFocused && 'lg:py-6'} `}>
                <div
                  className={`flex items-center w-full space-x-5 lg:space-x-0 rtl:space-x-reverse ${
                    isFocused && 'lg:flex-col lg:items-start lg:pl-10 sm:pl-5'
                  } lg:w-full lg:pr-10 sm:pr-5`}
                >
                  <span
                    className={`text-base text-dark-grey whitespace-nowrap space-x-1.5 rtl:space-x-reverse ${
                      isFocused && 'lg:text-2xl lg:text-medium lg:mb-7.5'
                    }`}
                  >
                    <span>{t('previewID')}</span>
                    <span className="hidden lg:inline">{query.user}</span>
                  </span>
                  <div
                    className={`flex justify-between items-center space-x-2.5 lg:space-x-5 rtl:space-x-reverse lg:w-full ${
                      isFocused ? 'lg:flex' : 'lg:hidden'
                    }`}
                  >
                    <input
                      ref={inputRef}
                      onKeyPress={onEnter}
                      onFocus={handleFocused(true)}
                      className={`px-4 py-3 rounded-mini leading-5 bg-black-100 text-dark-grey text-base border border-transparent focus:border-dark-grey outline-none !placeholder-dark-grey-700 ${
                        isFocused && 'lg:w-full lg:flex-1'
                      }`}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button
                      onClick={onGoClick}
                      type={BUTTON_TYPES?.BLACK}
                      disabled={isLoadingCheck || query.user === inputValue}
                      className={`${isFocused && 'lg:px-10'} disabled:text-dark-grey`}
                    >
                      {isLoadingCheck ? <PuffLoadingIcon className="w-6 h-6" /> : capitalize(t('go'))}
                    </Button>
                  </div>
                </div>
                {isFocused && (
                  <>
                    <div className="w-full pr-5 lg:px-10 sm:px-5 lg:!mt-4">
                      <Button
                        type={BUTTON_TYPES?.DARK_GREY}
                        className="whitespace-nowrap hidden lg:flex w-full sm:whitespace-normal"
                        onClick={onLoginClick}
                      >
                        {t('ExitPreviewMode')}
                      </Button>
                    </div>
                  </>
                )}
              </div>
              {isFocused && (
                <div className="overflow-auto w-full hidden lg:pl-5 lg:flex">
                  <Menu changeActive={handleFocused(false)} openSearchPreview={!!searchIsClicked} />
                </div>
              )}
            </div>
            {!searchIsClicked && !authUser?.id && (
              <Button type={BUTTON_TYPES?.BLACK} className="whitespace-nowrap lg:hidden" onClick={onLoginClick}>
                {active ? 'Login to your account' : 'Connect wallet'}
              </Button>
            )}
          </div>
          <div className="flex lg:justify-end lg:ml-auto lg:pr-10 sm:pr-5">
            <Button
              type={BUTTON_TYPES?.WHITE_100_ROUNDED}
              className="rounded-full lg:hidden w-10 h-10 !px-0 !py-0 ml-5"
              onClick={onClose}
            >
              <CloseIcon className="w-5 h-5 cursor-pointer stroke-current text-main-bg" />
            </Button>
            <div className="">
              <Button
                type={BUTTON_TYPES?.WHITE_100_ROUNDED}
                className="flex-col rounded-full w-10 h-10 !p-0 hidden lg:flex"
                onClick={() => {
                  if (!!isFocused && isMobileUser && !query.user) {
                    onClosedPreview();
                  }

                  setIsFocused(!isFocused);
                }}
              >
                {isFocused ? (
                  <div className="">
                    <CloseIcon className="w-6 h-6 cursor-pointer" />
                  </div>
                ) : (
                  <>
                    <span className="w-4 border-t border-white mb-2" />
                    <span className="w-4 border-t border-white" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isFocused && searchIsClicked && (
        <div className="fixed w-screen h-screen bg-black-700 z-30 left-0 top-0 bottom-0 right-0" />
      )}
    </>
  );
};

export { PreviewHeader };
