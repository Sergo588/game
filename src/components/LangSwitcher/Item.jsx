import React from 'react';
import ActiveIcon from 'assets/icons/check.svg';

export const Item = ({ isActive = false, mobileSelect = false, titleKey = '', title = '', setLang }) => {
  return (
    <div
      onClick={() => setLang()}
      className={`flex items-center justify-between px-4 py-2 sm:px-2.5 sm:py-0 bg-black-light sm:bg-transparent hover:text-light-yellow-700 ${
        isActive ? 'text-yellow' : 'text-white'
      } cursor-pointer ${mobileSelect ? 'sm:py-1 sm:space-x-0' : ''} space-x-2.5 rtl:space-x-reverse`}
    >
      <div
        className={`flex item-center justify-start sm:p-1 space-x-2.5 sm:space-x-0 rtl:space-x-reverse  ${
          isActive && !mobileSelect ? 'sm:rounded-full sm:border sm:border-yellow' : ''
        } `}
      >
        <img className={`w-5 h-5 ${mobileSelect ? '' : 'sm:w-8 sm:h-8'} `} src={`/flags/${titleKey}.svg`} alt="" />
        <span className="sm:hidden">{title}</span>
      </div>
      {isActive && (
        <ActiveIcon className={`stroke-current text-yellow flex-shrink-0 w-6 ${mobileSelect ? '' : 'sm:hidden'}`} />
      )}
    </div>
  );
};
