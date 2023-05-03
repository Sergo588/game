import React from 'react';
import { Button, CustomLink } from 'components';
import { copy } from 'helpers/text';
import { BUTTON_TYPES } from 'helpers/constants';
import CopyIcon from 'assets/icons/copy_white.svg';
import DownloadIcon from 'assets/icons/download.svg';

export const PromoItem = ({ lang, title = '', url = '' }) => {
  return (
    <div className="flex justify-between space-x-2.5 items-center py-2.5 px-3 rounded-mini bg-white-50 w-full">
      <div className="w-full flex items-center text-white text-base sm:text-sm">
        {lang && <img src={`/flags/${lang}.svg`} className="w-5 h-5 mr-2.5" alt="" srcSet="" />}
        <span>{title}</span>
      </div>
      <div className="flex items-center justify-end space-x-2.5 rtl:space-x-reverse">
        <CustomLink href={url} targetBlank>
          <Button type={BUTTON_TYPES?.WHITE_100_CIRCLE} className="!leading-30px !py-1.5">
            <DownloadIcon className="w-5 h-5" />
          </Button>
        </CustomLink>
        <Button type={BUTTON_TYPES?.WHITE_100_CIRCLE} className="!leading-30px !py-1.5" onClick={() => copy(url)}>
          <CopyIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
