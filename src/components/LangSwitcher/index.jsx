import React, { useState, useMemo, useRef, useEffect } from 'react';
import ArrowDown from 'assets/icons/arrow_down.svg';
import { useClickOutside } from 'helpers/hooks/useClickOutside';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';
import { Item } from './Item';

const langs = [
  {
    title: 'English',
    value: 'en',
  },
  {
    title: 'Russian',
    value: 'ru',
  },
  {
    title: 'Hindi',
    value: 'hi',
  },
  {
    title: 'Urdu',
    value: 'ur',
  },
  {
    title: 'Indonesian',
    value: 'id',
  },
  {
    title: 'Spanish',
    value: 'es',
  },
];

export const LangSwitcher = ({ inMenu = false, mobileSelect = false }) => {
  const { push, pathname, query } = useRouter();
  const { i18n } = useTranslation('common');
  const { isMobile } = useDetectChangeWindow();

  const [openSwitcher, setOpenSwitcher] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n?.language);
  const containerLangRef = useRef(null);

  const currentLangTitle = useMemo(() => {
    return langs.find(({ value }) => value === currentLang)?.title;
  }, [currentLang]);

  const toggleSwitcher = () => {
    setOpenSwitcher((prev) => !prev);
  };

  useClickOutside(containerLangRef, () => {
    setOpenSwitcher(false);
  });

  useEffect(() => {
    if (i18n.language === 'ur') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [i18n.language]);

  useEffect(() => {
    if (i18n.language !== currentLang) {
      setCurrentLang(i18n.language);
    }
  }, [i18n.language]);

  const langList = useMemo(() => {
    return langs?.map(({ title, value }, index) => {
      const isActive = currentLang === value;

      return (
        <Item
          isActive={isActive}
          titleKey={value}
          title={title}
          mobileSelect={mobileSelect}
          setLang={() => {
            push(
              {
                pathname,
                query,
              },
              undefined,
              { locale: value },
            );

            !isMobile && toggleSwitcher();
          }}
          key={index}
        />
      );
    });
  }, [langs, currentLang, pathname, query]);

  return (
    <div className={`relative min-w-[150px] sm:min-w-max ${inMenu ? 'pr-5' : ''}`} ref={containerLangRef}>
      <div
        onClick={toggleSwitcher}
        className={`flex items-center justify-between px-4 cursor-pointer space-x-4 sm:space-x-2.5 rtl:space-x-reverse ${
          mobileSelect ? '' : 'sm:hidden'
        }`}
      >
        <div className="flex item-center justify-start space-x-2.5 sm:space-x-0 rtl:space-x-reverse">
          <img className="w-5 h-5" src={`/flags/${currentLang}.svg`} alt="" />
          <span className="sm:hidden">{currentLangTitle}</span>
        </div>
        <ArrowDown className="stroke-current text-white w-3" />
      </div>
      {inMenu && (
        <div className="flex-col w-full pb-4 hidden sm:flex ">
          <span className="border-b border-white-500 w-full pb-2.5 mb-4">Select language:</span>
          <div className="flex flex-wrap">{langList}</div>
        </div>
      )}
      {openSwitcher && (
        <>
          <div
            className={`mt-2 absolute -top-100 left-0 rounded-[7px] overflow-hidden bg-black-light w-full ${
              mobileSelect ? '' : 'sm:hidden'
            }`}
          >
            {langList}
          </div>
        </>
      )}
    </div>
  );
};
