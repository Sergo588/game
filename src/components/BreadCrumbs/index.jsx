import React from 'react';
import { CustomLink, UserIdWrapper } from 'components';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import { ROUND_NAMES } from 'helpers/constants';

export const BreadCrumbs = ({ links = [], title, children, program = '' }) => {
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const user = previewAccount.id || authProfile?.id;
  const round = program && `${ROUND_NAMES[program]} Round`;
  const customTitle = round ? `${round} / ${title}` : title;

  return (
    <div className="flex flex-col flex-wrap w-full z-two sm:px-5">
      <Head>
        <title>{customTitle} | Forsage</title>
      </Head>
      <div className="flex items-center mb-1.5 sm:mb-2.5 space-x-1.5 rtl:space-x-reverse">
        {!!links.length && (
          <div className="flex">
            {links?.map((link, linkIndex) => (
              <CustomLink
                className="space-x-1 rtl:space-x-reverse text text-white-300 sm:text-sm"
                href={link.href}
                passHref
                key={link.href}
              >
                <span className="hover:text-white-500">
                  <span>{link.title}</span>
                  {linkIndex === 0 && !!user && <span className="ml-1">ID {user}</span>}
                </span>
                <span>/</span>
              </CustomLink>
            ))}
          </div>
        )}
        {!!links.length && <span className="text text-white whitespace-nowrap sm:text-sm">{title}</span>}
      </div>
      <div className="w-full flex justify-between items-center flex-wrap">
        <div className="flex flex-wrap items-center space-x-2 rtl:space-x-reverse">
          <span className="text-two-half text-white font-medium sm:text-2xl whitespace-nowrap">{customTitle}</span>
          {!links.length && <UserIdWrapper userId={user} />}
        </div>
        {children}
      </div>
    </div>
  );
};
