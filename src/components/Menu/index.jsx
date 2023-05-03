import React from 'react';
import { useRouter } from 'next/router';
import { MENU_LINKS } from 'helpers/menu';
import { LangSwitcher } from 'components';
import { MenuItem } from './MenuItem';

export const Menu = ({ changeActive }) => {
  const { query } = useRouter();
  const isPreviewMode = !!query.user;

  return (
    <div className="flex flex-1 flex-col h-full w-full overflow-y-auto space-y-2.5 lg:space-y-0">
      <div className="flex flex-1 flex-col w-full h-full overflow-y-auto space-y-2.5 lg:space-y-0 lg:mb-5">
        {MENU_LINKS.map(({ icon, activeIcon, disabled, title, link, mobileOnly, showInPreview, onClick, submenu }) => {
          const showMenuItem = isPreviewMode ? showInPreview : true;

          if (showMenuItem) {
            return (
              <MenuItem
                key={link}
                title={title}
                icon={icon}
                activeIcon={activeIcon}
                onClick={onClick}
                link={link}
                mobileOnly={mobileOnly}
                submenu={submenu}
                disabled={disabled}
                changeActive={changeActive}
              />
            );
          }
        })}
      </div>
      <div className="hidden sm:block w-full">
        <LangSwitcher inMenu />
      </div>
    </div>
  );
};
