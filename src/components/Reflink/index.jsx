import React, { useMemo, useState } from 'react';
import { Button, CustomLink } from 'components';
import { ShareLinkModal } from 'components/modals';
import CopyIcon from 'assets/icons/copy_white.svg';
import InclineArrowIcon from 'assets/icons/full_arrow_incline.svg';
import { copy } from 'helpers/text';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { REFLINK_TYPES, BUTTON_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';

export const Reflink = ({ refkeyType = 'base', onClick }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { t } = useTranslation('common');
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const user = previewAccount?.id ? previewAccount : authProfile;
  const isPreviewMode = !!previewAccount?.id;
  const isAuthProfile = !!useSelector(getAuthUser)?.id;
  const regToUpline = !!onClick && isPreviewMode && !isAuthProfile;

  const reflink = REFLINK_TYPES[refkeyType] + user?.refkey;
  const titleReflink = reflink.replace('https://', '');
  const blockTitle = useMemo(
    () => (isPreviewMode ? capitalize(t('personalLink')) : capitalize(t('myPersonalLink'))),
    [isPreviewMode, t],
  );

  const shareModalOpen = (e) => {
    e.preventDefault();

    setIsOpened(true);
  };

  return (
    <>
      <div className="relative flex flex-grow max-w-500px w-full h-full flex-col p-5 justify-between bg-white-50 rounded-small sm:max-w-full">
        <CustomLink
          href="/partners"
          className="w-5 h-5 absolute top-2 right-2 sm:top-1 sm:right-1 rtl:left-2 rtl:sm:left-1 rtl:right-auto"
        >
          <InclineArrowIcon />
        </CustomLink>
        <div className="flex items-center">
          <span className="text-white-500 text-base mb-1.5 sm:text-sm">{blockTitle}</span>
        </div>

        <div
          className={`flex flex-wrap justify-between items-center sm:items-start lg:items-start ${
            !regToUpline && 'lg:flex-col'
          }`}
        >
          <span className="text-white text-21px font-bold sm:text-xl lg:mb-1.5 sm:mb-1.5">{titleReflink}</span>
          <div className="flex space-x-2.5 rtl:space-x-reverse">
            <Button
              type={BUTTON_TYPES?.WHITE_300_BORDERED}
              className="!leading-30px !py-0 !rounded-5px"
              onClick={() => copy(reflink)}
            >
              {regToUpline ? <CopyIcon className="w-5 h-5 stroke-current text-white" /> : capitalize(t('copy'))}
            </Button>
            {!regToUpline && (
              <Button
                type={BUTTON_TYPES?.WHITE_300}
                className="!leading-30px !py-0 !rounded-5px"
                onClick={shareModalOpen}
              >
                {capitalize(t('Share'))}
              </Button>
            )}
          </div>
          {regToUpline && (
            <div className="flex justify-between items-center text-left border-t border-white-100 w-full mt-2.5 pt-2.5">
              <div className="flex flex-wrap text-white-500 mr-1.5">
                <div className="mr-1.5">{t('NotaMemberYet')}? </div>
                <div>
                  {t('SignUpWith')} <span className="whitespace-nowrap"> {t('thisUpline')}</span>
                </div>
              </div>
              <Button type={BUTTON_TYPES?.DARK_GREY_ROUNDED} className="w-max flex-shrink-0" onClick={onClick}>
                {t('SignUp')}
              </Button>
            </div>
          )}
        </div>
      </div>
      {isOpened && <ShareLinkModal reflink={reflink} onClose={() => setIsOpened(false)} />}
    </>
  );
};
