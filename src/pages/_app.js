import React from 'react';
import 'src/styles/index.scss';
import 'react-placeholder/lib/reactPlaceholder.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { getOrCreateStore } from 'store';
import nextI18NextConfig from 'next-i18next.config';
import nookies from 'nookies';
import { DefaultLayout } from 'layouts/DefaultLayout';
import { ManageProvider } from 'layouts/ManageProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from 'helpers/getLibrary';
import { appWithTranslation } from 'next-i18next';
import { checkRedirect, redirect } from 'helpers/auth';
import { checkAuth } from 'store/userSlice/asyncActions';
import { instance } from 'connectors/api';
import { UserRepository } from 'connectors/repositories/user';
import { setPreviewAccount } from 'store/userSlice';
import { compareAddresses } from 'helpers/wallet';

function App({ Component, pageProps, initialReduxState }) {
  const Layout = Component.Layout || DefaultLayout;

  const store = getOrCreateStore(initialReduxState);

  return (
    <>
      <Head title="Forsage">
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ReduxProvider store={store}>
          <ManageProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ManageProvider>
        </ReduxProvider>
      </Web3ReactProvider>
      <ToastContainer />
    </>
  );
}

App.getInitialProps = async (appctx) => {
  const { Component } = appctx;
  const appProps = { showActions: false };
  const reduxStore = getOrCreateStore();
  const cookies = nookies.get(appctx.ctx);
  appctx.ctx.reduxStore = reduxStore;

  const previewAccount = reduxStore.getState().profile?.previewAccount;
  const userQuery = appctx.ctx.query.user;
  if (userQuery) {
    const trimmedInputValue = userQuery?.trim();
    const isAddress = !!trimmedInputValue.match(/^0x[a-f0-9]{40}$/i);
    const isUserId = !!trimmedInputValue.match(/^[0-9]+$/);

    if (
      (isUserId && Number(previewAccount?.id) !== Number(trimmedInputValue)) ||
      (isAddress && !compareAddresses(previewAccount?.address, trimmedInputValue))
    ) {
      try {
        const user = await UserRepository.getAccount(trimmedInputValue);

        reduxStore.dispatch(setPreviewAccount(user));
      } catch (e) {
        redirect('/', appctx.ctx);
      }
    } else {
      if (!reduxStore.getState().profile?.previewAccount?.id) {
        redirect('/', appctx.ctx);
      }
    }
  } else {
    reduxStore.dispatch(setPreviewAccount({}));
  }

  if (typeof window === 'undefined') {
    const excludedPathNames = ['/', '/s/[hash]', '/registration'];

    if (
      Object.values(reduxStore.getState().timer?.activeLevels).every((level) => !level) &&
      !excludedPathNames?.includes(appctx.ctx.pathname)
    ) {
      redirect('/', appctx.ctx);
    }

    if (cookies.apiToken) {
      instance.defaults.headers.Authorization = cookies.apiToken;
    }

    if (!reduxStore.getState().profile?.authUser?.id) {
      await reduxStore.dispatch(checkAuth());
    }

    if (!reduxStore.getState().profile?.authUser?.id && !excludedPathNames?.includes(appctx.ctx.pathname)) {
      checkRedirect(appctx.ctx);
    }
  }

  if (Component.storeInitial) {
    Object.assign(appProps, await Component.storeInitial(appctx));
  }

  return {
    pageProps: { ...appProps },
    initialReduxState: reduxStore.getState(),
  };
};

export default appWithTranslation(App, nextI18NextConfig);
