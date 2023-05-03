import React from 'react';
import { Button, CustomLink, UserIdWrapper } from 'components';
import { linkWithQuery } from 'helpers/links';
import { useRouter } from 'next/router';
import { BUTTON_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize, pickBy } from 'lodash';

export const Upline = ({ upline }) => {
  const { query, pathname } = useRouter();
  const { t } = useTranslation('common');

  return (
    <CustomLink
      scroll={false}
      href={linkWithQuery(
        pathname,
        pickBy({
          level: query?.level,
          user: upline?.user_id,
        }),
      )}
      className="flex w-full items-center justify-center max-w-685px z-10 lg:max-w-full"
    >
      <Button
        type={BUTTON_TYPES?.DARK_GREY}
        className="!p-5 w-full sm:!p-4 rounded font-normal space-x-1.5 rtl:space-x-reverse border border-yellow"
      >
        <span className="text-base !leading-30px text-yellow sm:text-sm">{capitalize(t('upline'))}</span>
        <UserIdWrapper userId={upline?.user_id} />
        {upline?.active && <span className="text-white-500">{t('activatedThisLevel')}</span>}
      </Button>
    </CustomLink>
  );
};
