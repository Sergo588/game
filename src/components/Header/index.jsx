import React, { useState, useEffect, useMemo } from 'react';
import LogoIcon from 'assets/logo.svg';
import { Button, CustomLink, Burger, LangSwitcher } from 'components';
import { useTranslation } from 'next-i18next';
import { useWeb3React } from '@web3-react/core';
import ExitIcon from 'assets/icons/exit.svg';
import MagnifierIcon from 'assets/icons/magnifier.svg';
import clsx from 'clsx';
import { useLogout } from 'helpers/hooks/useLogout';
import { useModal } from 'helpers/hooks/useModal';
import { NotificationsButton } from 'components/Header/NotificationsButton';
import { BUTTON_TYPES } from 'helpers/constants';
import { ActivateModal } from './ActivateModal';
import { WalletModule } from './WalletModule';

export const Header = ({
  onClickSearch,
  withExitMobile,
  className,
  withButtons = true,
  isAuthPage = false,
  customWidth,
}) => {
  const { openedModal, onOpen, onClose } = useModal();
  const [burgerActive, setBurgerActive] = useState(false);
  const [headerColor, setHeaderColor] = useState('bg-transparent');
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const logout = useLogout();

  const listenScrollEvent = () => {
    window.pageYOffset > 5 ? setHeaderColor('bg-main-bg') : setHeaderColor('bg-transparent');
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  const toggleBurgerActive = () => {
    setBurgerActive((prevActive) => !prevActive);
  };

  const headerStyle = useMemo(() => headerColor, [headerColor]);
  const finalWidth = customWidth || 'max-w-desktop-preview-bar';
  return (
    <header
      className={clsx(className, `fixed w-full z-20 top-0 left-1/2 -translate-x-1/2 w-full text-white ${headerStyle}`)}
    >
      <div className="flex pb-28 pb-2.5 pt-2.5 px-10 sm:px-5">
        <nav
          className={`z-10 flex items-center justify-between space-x-2.5 w-full m-auto rtl:space-x-reverse ${finalWidth}`}
        >
          <CustomLink withLink href="/" className="h-28px pl-2.5 lg:pl-0 lg:h-22px">
            <LogoIcon className="max-h-full h-full" />
          </CustomLink>
          <div className="flex items-center justify-end">
            {!isAuthPage && <LangSwitcher mobileSelect />}
            {withButtons && (
              <div className="flex justify-end items-center space-x-3 rtl:space-x-reverse">
                {account ? (
                  <>
                    <WalletModule />
                  </>
                ) : (
                  <>
                    <Button type={BUTTON_TYPES?.DARK_GREY_ROUNDED} onClick={onOpen}>
                      {t('connectWallet')}
                    </Button>
                  </>
                )}
                {isAuthPage && account && (
                  <>
                    <LangSwitcher />
                    <Button type={BUTTON_TYPES?.DARK_GREY_CIRCLE} className="ml-5 lg:hidden" onClick={onClickSearch}>
                      <MagnifierIcon className="w-5 h-5" />
                    </Button>
                    <NotificationsButton />
                    <Button
                      type={BUTTON_TYPES?.DARK_GREY_CIRCLE}
                      className="hidden lg:flex ml-5 sm:ml-2.5"
                      onClick={toggleBurgerActive}
                    >
                      <div className="w-5 h-5 flex flex-col items-center justify-center">
                        <span className="w-4 border-t border-white mb-2" />
                        <span className="w-4 border-t border-white" />
                      </div>
                    </Button>
                    <Button
                      type={BUTTON_TYPES?.DARK_GREY_CIRCLE}
                      className={`ml-5 ${!withExitMobile && 'lg:hidden'} sm:ml-2.5`}
                      onClick={logout}
                    >
                      <ExitIcon className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
      <Burger active={burgerActive} setActive={setBurgerActive} openSearch={onClickSearch} />
      <ActivateModal handleCloseModal={onClose} openedModal={openedModal} />
    </header>
  );
};
