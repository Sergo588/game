import React from 'react';
import { useTranslation } from 'next-i18next';

export const MainVideo = ({ sectionStyle }) => {
  const { t } = useTranslation('common');
  return (
    <section className={` mb-52 ${sectionStyle} sm:mb-16`}>
      <div className="flex flex-col justify-start items-center w-full px-5">
        <span className="text-white text-40px leading-48px uppercase mb-18 sm:text-3xl sm:mb-7.5">
          {t('joinNowAndplaylikeAPro')}!
        </span>
        <div className="relative max-w-760px h-424px h-full w-full sm:h-220px">
          <div className="w-full h-full relative">
            <img src="/img/invite/joystic.png" className="absolute -top-24 -left-28 z-one sm:hidden" alt="" />
            <img src="/img/invite/chest.png" className="absolute -bottom-1/4 -right-1/4 z-one sm:hidden" alt="" />
          </div>
          <iframe
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded z-three overflow-hidden"
            width="574"
            height="323"
            src="https://www.youtube.com/embed/pgwsP-sGKqI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};
