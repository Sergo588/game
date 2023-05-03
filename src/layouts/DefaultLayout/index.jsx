import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, PreviewHeader, LeftBar, FixedWidget } from 'components';
import { getIsLoadingRouter } from 'store/routerSlice/selectors';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { usePreviewMode } from 'helpers/hooks/usePreviewMode';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import _omit from 'lodash/omit';
import { clearAuthUser, setPreviewAccount } from 'store/userSlice';
import { destroyCookie } from 'nookies';
import { useUserSocketConnector } from 'helpers/hooks/useUserSocketConnector';
import { compareAddresses } from 'helpers/wallet';
import { useFetchNotifications } from 'helpers/hooks/useFetchNotifications';

export const DefaultLayout = ({ children, showLeftMenu = true, withPadding }) => {
  const { account } = useWeb3React();
  const isLoadingRouter = useSelector(getIsLoadingRouter);
  const isPreviewMode = usePreviewMode();
  const dispatch = useDispatch();
  const authStore = useSelector(getAuthUser);
  const { query, push } = useRouter();
  const [clickedSearch, setClickedSearch] = useState(false);
  const previewAccount = useSelector(getPreviewAccount);

  useUserSocketConnector();
  useFetchNotifications();

  const onClosedPreview = () => {
    dispatch(setPreviewAccount({}));
    if (authStore?.id && account) {
      push({
        pathname: '/dashboard',
        query: { ..._omit(query, ['user']) },
      });
    } else {
      push('/');
    }
    setClickedSearch(false);
  };

  useEffect(() => {
    if (account && authStore?.address && !compareAddresses(authStore?.address, account)) {
      destroyCookie(null, 'apiToken');
      dispatch(clearAuthUser());
      if (!previewAccount?.id) {
        push('/');
      }
    }
  }, [account, previewAccount]);

  useEffect(() => {
    if (!query.user && !clickedSearch) return;

    setClickedSearch(!query.user);
  }, [query.user]);

  const searchIsClicked = useCallback(() => {
    setClickedSearch(true);
  }, []);

  return (
    <div className="relative flex flex-col bg-main-bg items-center justify-center min-h-screen min-w-full overflow-hidden text-white-500">
      {previewAccount?.id || clickedSearch ? (
        <PreviewHeader onClosedPreview={onClosedPreview} searchIsClicked={clickedSearch} />
      ) : (
        <Header isAuthPage withExit withButtons onClickSearch={searchIsClicked} />
      )}
      <div className="flex w-full h-full justify-center max-w-desktop-full">
        {showLeftMenu && (
          <div className="relative w-full max-w-desktop-left-bar flex-shrink-0 border-r border-white-100 rtl:border-r-0 rtl:border-l lg:hidden">
            <div className={`fixed top-0 max-w-desktop-left-bar w-full flex h-screen z-10 ${isPreviewMode && 'pt-4'}`}>
              <LeftBar />
            </div>
          </div>
        )}
        <div
          className={`flex flex-shrink w-full flex-col items-center min-h-screen bg-main ${
            !isPreviewMode ? 'pt-16' : 'pt-20 sm:pt-14'
          }`}
        >
          <div className="flex relative flex-1 py-10 pt-8.5 flex-col justify-between w-full sm:pt-7.5">
            {isLoadingRouter && (
              <div className="flex absolute justify-center w-full h-full bg-gray opacity-75 z-999999 top-0 bottom-0 left-0 right-0">
                <div className="flex items-center justify-center w-screen h-screen">
                  <PuffLoadingIcon className="!w-80px h-80px" />
                </div>
              </div>
            )}
            <div
              className={withPadding ? 'flex-1 flex flex-col space-y-10 px-10 sm:px-0' : 'flex flex-col h-full w-full'}
            >
              {children}
            </div>
            <div className="px-10 sm:px-0">
              <Footer className="pb-0 lg:pb-0 z-10" />
            </div>
          </div>
        </div>
      </div>
      <FixedWidget />
    </div>
  );
};
