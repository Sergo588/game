import React, { memo, useState } from 'react';
import TriangleIcon from 'assets/icons/triangle.svg';
import { useTranslation } from 'next-i18next';

export const Rules = memo(() => {
  const { t } = useTranslation('common');
  const [isOpenRules, setIsOpenRules] = useState(false);

  const toggleRules = () => {
    setIsOpenRules((prevActive) => !prevActive);
  };

  return (
    <div className="relative w-full min-h-50px border border-line-gray rounded-mini py-3 px-5 text-white outline-none hover:cursor-pointer w-full mb-10 sm:mb-0">
      <div className="flex justify-between items-center w-full cursor-pointer" onClick={toggleRules}>
        <span className="text-base">{t('termsAndRules')}</span>
        <button className="rounded-full h-5 w-5 justify-center items-center flex -mr-3">
          <TriangleIcon
            className={`absolute w-2.5 h-2.5 transition duration-300 ease-in-out ${isOpenRules && 'rotate-180'} `}
          />
        </button>
      </div>
      {isOpenRules && <div className=" pt-1 text-sm text-white-900">{t('registryRules')}</div>}
    </div>
  );
});
