import React from 'react';
import { CustomLink } from 'components';
import { linkWithQuery } from 'helpers/links';
import ArrowRight from 'assets/icons/arrow_right.svg';
import { useRouter } from 'next/router';

export const MenuItem = ({ title, icon, activeIcon, onClick, link, mobileOnly, submenu, disabled, changeActive }) => {
  const { query, pathname } = useRouter();
  const isActive = link === pathname;
  const Icon = isActive ? activeIcon : icon;
  const customStyles = `
    ${disabled ? 'cursor-not-allowed' : 'hover:bg-white-100 lg:hover:bg-transparent'}
    ${isActive && 'bg-white-100 lg:bg-transparent'} `;

  return (
    <CustomLink
      className={mobileOnly && 'hidden lg:block'}
      href={linkWithQuery(link, { user: query.user })}
      withLink={!disabled && !onClick}
    >
      <button
        onClick={onClick || changeActive}
        disabled={disabled}
        className={`relative w-full flex items-center px-2.5 py-2 rounded-xl cursor-pointer ${customStyles} lg:border-b lg:border-white-300 lg:rounded-none lg:pl-0 lg:pr-5 lg:py-5 lg:justify-between`}
      >
        <div className="flex items-center text-left space-x-2.5 rtl:space-x-reverse">
          <Icon className="w-6 h-6 stroke-current text-white-500 lg:w-5 lg:h-5" />
          <span className={`text-white-500 text-base ${isActive && 'text-white-900'}`}>{title}</span>
        </div>
        {!!submenu && <ArrowRight className="stroke-current text-white-500 hidden lg:flex" />}
      </button>
    </CustomLink>
  );
};
