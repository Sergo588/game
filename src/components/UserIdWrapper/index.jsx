import React, { useMemo } from 'react';
import { CustomLink } from 'components';
import { linkWithQuery } from 'helpers/links';
import { useTranslation } from 'next-i18next';
import { upperCase } from 'lodash';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';

export const UserIdWrapper = ({ userId }) => {
  const { t } = useTranslation('common');
  const user = parseInt(userId, 10);

  const authProfileId = useSelector(getAuthUser)?.id;

  const customHref = useMemo(() => {
    if (authProfileId !== user) return linkWithQuery('/dashboard', { user });
    return '/dashboard';
  }, [authProfileId, user]);

  if (user > 0) {
    return (
      <CustomLink
        className="inline-flex items-center justify-center px-2.5 !leading-30px bg-yellow-100 text-yellow rounded-7px text-base hover:bg-yellow-200 sm:text-sm w-max"
        href={customHref}
      >
        {upperCase(t('id'))} {user}
      </CustomLink>
    );
  }
  return null;
};
