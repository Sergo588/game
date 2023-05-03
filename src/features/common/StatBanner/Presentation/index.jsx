import React, { useMemo, useRef, useState } from 'react';
import { Button, CustomLink } from 'components';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { BUTTON_TYPES, DOCUMENTS_IN_GAME } from 'helpers/constants';
import { copy } from 'helpers/text';
import { useClickOutside } from 'helpers/hooks/useClickOutside';

export const Presentation = () => {
  const [openedCopySelector, setOpenedCopySelector] = useState(false);
  const [openedPdfSelector, setOpenedPdfSelector] = useState(false);
  const linksRef = useRef(null);
  const copyRef = useRef(null);
  const { t } = useTranslation('common');

  const pdfs = useMemo(() => {
    return [
      {
        title: 'English',
        key: 'en',
        value: DOCUMENTS_IN_GAME.presEN,
      },
      {
        title: 'Hindi',
        key: 'hi',
        value: DOCUMENTS_IN_GAME.presHI,
      },
      {
        title: 'Spanish',
        key: 'es',
        value: DOCUMENTS_IN_GAME.presES,
      },
      {
        title: 'Russian',
        key: 'ru',
        value: DOCUMENTS_IN_GAME.presRU,
      },
      {
        title: 'Urdu',
        key: 'ur',
        value: DOCUMENTS_IN_GAME.presUR,
      },
    ];
  }, []);

  useClickOutside(linksRef, () => setOpenedPdfSelector(false));
  useClickOutside(copyRef, () => setOpenedCopySelector(false));

  return (
    <div className="flex flex-col justify-center items-center py-6 px-9 space-y-5 sm:space-y-2.5 bg-dark-grey rounded-small lg:w-full">
      <div className="flex items-center justify-between w-full">
        <span className="text-start text-white text-2xl font-medium max-w-190px lg:max-w-full">
          {t('smartGamePro')} {capitalize(t('presentation'))}
        </span>
        <img className="max-h-85px -mr-5 lg:hidden rtl:mr-0" src="/img/book.png" alt="" />
      </div>
      <div className="flex flex-col justify-evenly w-full">
        <div className="flex mb-2.5 space-x-2.5 sm:flex-col sm:space-x-0 sm:space-y-2.5 rtl:space-x-reverse">
          <div className="flex relative" ref={copyRef}>
            <Button
              className="!py-2 w-full"
              type={BUTTON_TYPES?.GRADIENT_BORDERED}
              onClick={() => setOpenedCopySelector((prev) => !prev)}
            >
              {t('copyLink')}
            </Button>
            {openedCopySelector && (
              <div className="mt-4 absolute min-w-[140px] top-full left-0 rounded-[7px] overflow-hidden bg-black-light w-full z-[999] border border-main-bg">
                {pdfs.map(({ title, key, value }) => (
                  <div key={key} onClick={() => copy(value)} className="flex-1">
                    <div
                      onClick={() => setOpenedCopySelector(false)}
                      className="flex items-center justify-between px-4 py-2 sm:px-2.5 sm:py-0 bg-black-light sm:bg-transparent hover:text-light-yellow-700 cursor-pointer space-x-2.5 rtl:space-x-reverse"
                    >
                      <div className="flex item-center justify-start sm:p-1 space-x-2.5 rtl:space-x-reverse">
                        <img className="w-5 h-5" src={`/flags/${key}.svg`} alt="" />
                        <span>{title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex relative" ref={linksRef}>
            <Button
              className="w-full !py-2"
              type={BUTTON_TYPES?.GRADIENT}
              onClick={() => setOpenedPdfSelector((prev) => !prev)}
            >
              {t('downloadPdf')}
            </Button>
            {openedPdfSelector && (
              <div className="mt-4 absolute top-full left-0 rounded-[7px] overflow-hidden bg-black-light w-full z-[999] border border-main-bg">
                {pdfs.map(({ title, key, value }) => (
                  <CustomLink key={key} href={value} targetBlank className="flex-1">
                    <div
                      onClick={() => setOpenedPdfSelector(false)}
                      className="flex items-center justify-between px-4 py-2 sm:px-2.5 sm:py-0 bg-black-light sm:bg-transparent hover:text-light-yellow-700 cursor-pointer space-x-2.5 rtl:space-x-reverse"
                    >
                      <div className="flex item-center justify-start sm:p-1 space-x-2.5 rtl:space-x-reverse">
                        <img className="w-5 h-5" src={`/flags/${key}.svg`} alt="" />
                        <span>{title}</span>
                      </div>
                    </div>
                  </CustomLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
