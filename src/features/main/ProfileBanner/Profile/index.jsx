import React, { useMemo, useState } from 'react';
import { CustomLink } from 'components/CustomLink';
import { Button } from 'components/Button';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile, getAuthUser } from 'store/userSlice/selectors';
import { shortenAddress } from 'helpers/format';
import { ActivateModal } from 'components/Header/ActivateModal';
import { useAuth } from 'helpers/hooks/useAuth';
import { useRouter } from 'next/router';
import ReactPlaceholder from 'react-placeholder';
import { RoundShape, TextRow } from 'react-placeholder/lib/placeholders';
import { useTranslation } from 'next-i18next';
import { capitalize, upperCase } from 'lodash';
import { BUTTON_TYPES } from 'helpers/constants';
import { useCheckAllowedChain } from 'helpers/hooks/useCheckAllowedChain';
import { useTimerLevelsActiveInterval } from 'helpers/hooks/useTimerLevelsActiveInterval';
import { Timer } from './Timer';

const customPlaceHolderProfile = (
  <div className="flex w-full h-full justify-between overflow-hidden h-170px sm:h-auto">
    <div className="flex flex-col w-full w-full justify-between">
      <div className="flex sm:!mb-5 sm:items-center">
        <RoundShape color="#ffffff" className="relative !w-15 !h-15 rounded-full rounded-full mr-2.5 hidden sm:block" />
        <TextRow rows={1} color="#ffffff" className="!w-40 !rounded-mini !m-0 !h-15 sm:!h-5" />
      </div>
      <TextRow
        rows={2}
        color="#ffffff"
        className="hidden !w-300px sm:!mb-1.5 !rounded-mini !m-0 !h-6 sm:!h-4 sm:!block"
      />
      <TextRow rows={2} color="#ffffff" className="!w-300px sm:!mb-6 !rounded-mini !m-0 !h-6 sm:!h-4" />
      <TextRow rows={1} color="#ffffff" className="!w-180px !rounded-mini !m-0 !h-12 sm:!h-10 sm:!w-full" />
    </div>
    <div className="flex sm:hidden w-full justify-end items-end">
      <RoundShape color="#ffffff" className="!w-32 !m-0 !h-32 !mb-5" />
    </div>
  </div>
);

export const Profile = ({
  isLoading,
  isActivatedGame,
  setOpenedFastRegistryModal,
  userId,
  setOpenedBaseRegistryModal,
}) => {
  const authAccount = useAuth();
  const { push } = useRouter();
  const [openedWalletModal, setOpenedWalletModal] = useState(false);
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const currentUser = useSelector(getCurrentUserProfile);
  const authUser = useSelector(getAuthUser);
  const { t, ready } = useTranslation('common');
  const isAllowedChainId = useCheckAllowedChain();
  const { notActiveLevels } = useTimerLevelsActiveInterval();

  const contentInfo = useMemo(() => {
    const allImgStyle =
      'absolute sm:static sm:max-w-full sm:max-h-250px sm:right-auto sm:top-auto sm:translate-y-0 sm:mb-2.5';

    if (!account) {
      return {
        title: t('smartGamePro'),
        description: (
          <span>
            {t('firstEventAutoScalingSmartGameOnBnb')} <br className="hidden sm:block" />
            {t('connectWalletToStart')}
          </span>
        ),
        firstBtn: {
          title: t('connectWallet'),
          onClick: () => setOpenedWalletModal(true),
        },
        secondBtn: {
          title: t('helpMe'),
          href: 'https://support.forsage.io/hc/categories/360003112100-FORSAGE-BUSD',
        },
        img: {
          src: '/img/loginCard/connect_wallet.png',
          style: `h-325px ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 ${allImgStyle}`,
          marginWrapper: 'ltr:mr-450px rtl:ml-450px',
        },
      };
    }

    if (notActiveLevels) {
      return {
        title: t('smartGamePro'),
        description: (
          <span>
            {t('firstEventAutoScalingSmartGameOnBnb')} <br className="hidden sm:block" />
            {t('comingSoon')}...
          </span>
        ),
        firstBtn: {
          title: <Timer isButton />,
          disabled: true,
          btnType: BUTTON_TYPES?.WHITE_100,
        },
        img: {
          src: '/img/loginCard/connect_wallet.png',
          style: `h-325px ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 ${allImgStyle}`,
          marginWrapper: 'ltr:mr-450px rtl:ml-450px',
        },
      };
    }

    if (!isAllowedChainId) {
      return {
        title: t('smartGamePro'),
        description: t('wrongNetworkSelectedConnectYourWalletWithBNBChain'),
        firstBtn: {
          title: t('wrongNetworkSwitchToBNBChain'),
        },
        img: {
          src: '/img/loginCard/wrong_network.png',
          style: `h-240px ltr:right-5 rtl:left-5 top-1/4 -translate-y-1/4 ${allImgStyle}`,
          marginWrapper: 'ltr:mr-400px rtl:ml-400px',
        },
      };
    }

    if (!isActivatedGame && userId) {
      return {
        title: t('joinSmartGamePRO'),
        description: `${capitalize(t('wallet'))} ${shortenAddress(account)} ${t(
          'isNotRegisteredInSmartGameProYouCanJoinNow',
        )}`,
        firstBtn: {
          title: t('joinNow'),
          onClick: setOpenedBaseRegistryModal,
        },
        img: {
          src: '/img/loginCard/new_user_game.png',
          style: `h-190px ltr:right-4 rtl:left-4 bottom-0 ${allImgStyle}`,
          marginWrapper: 'ltr:mr-450px rtl:ml-450px',
        },
      };
    }

    if (!isActivatedGame && !userId) {
      return {
        title: t('fastRegistrationInSmartGamePRO'),
        description: (
          <span>
            {capitalize(t('wallet'))} {shortenAddress(account)} {t('isNotRegistered')} <br span="hidden sm:block" />
            {t('joinNowWithFastRegistration')}
          </span>
        ),
        firstBtn: {
          renderTitle: () => <span>{t('fastRegistration')}</span>,
          onClick: setOpenedFastRegistryModal,
        },
        img: {
          src: '/img/loginCard/new_user_total.png',
          style: `h-375px bottom-0 ltr:-right-12 rtl:-left-12 ${allImgStyle}`,
          marginWrapper: 'ltr:mr-80 rtl:ml-80',
        },
      };
    }

    if (userId === authUser.id) {
      return {
        title: `${upperCase(t('id'))} ${userId}`,
        description: (
          <span>
            {t('youAreLoggedInSmartGamePRO')} <br className="hidden sm:block" /> {t('returnToYourDashboard')}
          </span>
        ),
        firstBtn: {
          title: t('returnToYourAccount'),
          onClick: () => push('/dashboard'),
        },
        secondBtn: {
          title: t('ActivateLevel'),
          onClick: setOpenedBaseRegistryModal,
        },
        img: {
          src: '/img/loginCard/logged_user.png',
          style: `h-260px ltr:right-0 rtl:left-0 top-3 ${allImgStyle}`,
          marginWrapper: 'ltr:mr-400px rtl:ml-400px',
        },
      };
    }

    return {
      title: `${upperCase(t('id'))} ${userId}`,
      description: t('welcomeBackLoginToYourAccountInSmartGamePRO'),
      firstBtn: {
        title: t('loginToYourAccount'),
        onClick: authAccount,
      },
      secondBtn: {
        title: t('ActivateLevel'),
        onClick: setOpenedBaseRegistryModal,
      },
      img: {
        src: '/img/loginCard/not_logged.png',
        style: `h-325px ltr:right-0 rtl:left-0 top-1/4 -translate-y-1/3 ${allImgStyle}`,
        marginWrapper: 'ltr:mr-400px rtl:ml-400px',
      },
    };
  }, [currentUser, account, dispatch, authUser, userId, isLoading, ready, isAllowedChainId, notActiveLevels]);

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="w-full relative flex items-center justify-between rounded-small lg:rounded-none gradient-main-card z-10 px-7.5 sm:px-5 py-7.5 sm:py-5">
          <ReactPlaceholder
            showLoadingAnimation
            ready={!isLoading && (!currentUser.isLoading || !currentUser.id)}
            customPlaceholder={customPlaceHolderProfile}
          >
            <div
              className={`w-full flex items-center justify-between sm:flex-col ${contentInfo.img.marginWrapper} sm:!mr-0 sm:!ml-0`}
            >
              <div className={`flex flex-col sm:w-full z-10 ${!account && 'flex-shrink-0'} sm:order-2`}>
                <div className="flex items-start sm:items-center mb-5 sm:mb-2.5">
                  <div className="flex items-center">
                    <span className="text-white font-medium text-two-half leading-48px sm:text-2xl">
                      {contentInfo.title}
                    </span>
                    {contentInfo.additionalTitle && (
                      <div className="flex bg-white-200 rounded-small px-2.5 text-white leading-8 ml-2.5 sm:mr-2.5 sm:ml-">
                        {contentInfo.additionalTitle}
                      </div>
                    )}
                  </div>
                </div>
                <span className="mb-7.5 text-white text-base sm:text-sm sm:mb-5 ">{contentInfo.description}</span>
                <div className="flex space-x-5 sm:space-y-3.5 rtl:space-x-reverse sm:space-x-0 sm:flex-col">
                  <CustomLink href={contentInfo.firstBtn?.href} withLink={!!contentInfo.firstBtn?.href} className="">
                    <Button
                      onClick={contentInfo.firstBtn?.onClick}
                      disabled={contentInfo.firstBtn?.disabled}
                      type={contentInfo?.firstBtn?.btnType || BUTTON_TYPES?.GRADIENT_ORANGE_PINK}
                      className="sm:w-full"
                    >
                      {contentInfo.firstBtn?.title ? contentInfo.firstBtn?.title : contentInfo.firstBtn?.renderTitle()}
                    </Button>
                  </CustomLink>
                  {contentInfo?.secondBtn && (
                    <CustomLink
                      href={contentInfo.secondBtn?.href}
                      withLink={!!contentInfo.secondBtn?.href}
                      className=""
                    >
                      <Button
                        onClick={contentInfo.secondBtn?.onClick}
                        disabled={contentInfo.secondBtn?.disabled}
                        type={BUTTON_TYPES?.WHITE_100}
                        className="sm:w-full"
                      >
                        {contentInfo.secondBtn?.title
                          ? contentInfo.secondBtn?.title
                          : contentInfo.secondBtn?.renderTitle()}
                      </Button>
                    </CustomLink>
                  )}
                </div>
              </div>
              <img className={`${contentInfo.img.style}`} src={contentInfo.img.src} alt="login" />
            </div>
          </ReactPlaceholder>
        </div>
        {!notActiveLevels && <Timer />}
      </div>
      <ActivateModal handleCloseModal={() => setOpenedWalletModal(false)} openedModal={openedWalletModal} />
    </>
  );
};
