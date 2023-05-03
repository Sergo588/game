import React, { useEffect, useState } from 'react';
import { Menu, Button, CustomLink, Input } from 'components';
import BellIcon from 'assets/icons/bell.svg';
import LogoIcon from 'assets/logo.svg';
import { useTranslation } from 'next-i18next';
import { LINKS_IN_GAME, BUTTON_TYPES } from 'helpers/constants';
import { capitalize } from 'lodash';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';
import { useRouter } from 'next/router';
import { useCheckInputPreview } from 'helpers/hooks/useCheckInputPreview';

export const Burger = ({ active, setActive }) => {
  const [inputValue, setInputValue] = useState('');
  const { checkInput, isLoadingCheck } = useCheckInputPreview();
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const isPreviewMode = !!query.user;
  const { isMobile, isTablet } = useDetectChangeWindow();
  const clientHeightDoc = document.documentElement.clientHeight;
  const menuStyle = `hidden justify-start items-start bg-main-bg pb-5 pt-7.5 transition duration-500 ease-in-out bg-main-bg absolute top-0 left-0 z-20 inset-0 h-screen w-screen z-999999 lg:flex flex-col lg:py-2.5
    ${active ? 'translate-x-0' : '-translate-x-120%'}`;

  const changeMenu = () => {
    setActive(false);
  };

  const handleOnClick = () => {
    checkInput(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleOnClick();
    }
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [active]);

  return (
    <div className={menuStyle}>
      <div style={{ height: `${clientHeightDoc}px` }} className="w-full flex flex-col flex-1">
        <div className="flex justify-between items-center w-full px-10 sm:px-5">
          <CustomLink href="/">
            <LogoIcon className="block max-w-100px w-full ml-2.5 lg:ml-0" />
          </CustomLink>
          <Button type={BUTTON_TYPES?.DARK_GREY_CIRCLE} className="hidden lg:flex flex-col" onClick={changeMenu}>
            <div className="w-5 h-5 flex flex-col items-center justify-center">
              <span className="w-4 border-t border-white -mb-px rotate-45" />
              <span className="w-4 border-t border-white -rotate-45" />
            </div>
          </Button>
        </div>
        {(isMobile || isTablet) && !isPreviewMode && (
          <div className="h-147px bg-preview-yellow mt-4 w-full pt-6 pb-6 pl-5 pr-5">
            <span className="text-xl text-black-light font-medium">{t('previewID')}</span>
            <div className="flex mt-7.5">
              <Input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setInputValue('')}
                value={inputValue}
                className="flex-1 sm:mr-0 sm:mb-3.5 py-2 bg-black-100 text-dark-grey focus:border-dark-grey !placeholder-dark-grey-700 focus:!bg-black-100 active:!bg-black-100 max-w-217px max-h-40px"
                type="text"
                placeholder={`${capitalize(t('enterId'))}`}
              />
              <Button
                onClick={handleOnClick}
                disabled={isLoadingCheck}
                type={BUTTON_TYPES?.BLACK}
                className="rounded-mini max-w-98px max-h-40px ml-5"
              >
                {isLoadingCheck ? <PuffLoadingIcon className="w-6 h-6" /> : capitalize(t('go'))}
              </Button>
            </div>
          </div>
        )}
        <div className="w-full h-full pl-10 pr-7.5 lg:pr-0 lg:pl-10 sm:pl-5 overflow-auto">
          <Menu changeActive={changeMenu} />
        </div>
        <div className="w-full lg:px-5 lg:pb-7.5">
          <Button className="w-full" type={BUTTON_TYPES?.BLUE}>
            <CustomLink href={LINKS_IN_GAME.NOTIFIER} className="w-full flex items-center justify-center" targetBlank>
              <BellIcon className="w-5 h-5 mr-2.5" />
              {t('NotifierBot')}
            </CustomLink>
          </Button>
        </div>
      </div>
    </div>
  );
};
