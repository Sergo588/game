import React, { memo, useCallback, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import ActiveLevels from 'assets/icons/active_levels.svg';
import FreezeLevels from 'assets/icons/freeze_levels.svg';
import TotalLevels from 'assets/icons/summ_levels.svg';
import { useClickOutside } from 'helpers/hooks/useClickOutside';
import { useTranslation } from 'next-i18next';

export const StatsIcons = memo(
  ({ mainStyle, activeClonesCount, freezeClonesCount, clonesLength, isLevelPage, isMobile, areThereAnyMissed }) => {
    const { t } = useTranslation();
    const statsRef = useRef();
    const [visibility, setVisibility] = useState(false);

    const onClickButtonWrapper = useCallback((e) => {
      e.stopPropagation();
      e.preventDefault();
    }, []);

    useClickOutside(statsRef, () => {
      setVisibility(false);
    });

    return (
      <div className={`h-full w-full flex items-center justify-center ${!areThereAnyMissed ? 'py-2.5' : 'py-0.5'}`}>
        <Tippy
          visible={isMobile ? visibility : undefined}
          className="z-10"
          content={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <div
              className={`flex flex-col space-y-2 rounded-mini p-4 bg-gray sm:p-2 ${
                isLevelPage ? 'w-210px sm:w-180px' : ''
              }`}
            >
              <div className="flex text-white text-sm sm:text-mini items-center space-x-1 rtl:space-x-reverse">
                <ActiveLevels className={mainStyle?.statsIcons} /> <span>{t('activePlaces')}</span>
              </div>
              <div className="flex text-white text-sm sm:text-mini items-center space-x-1 rtl:space-x-reverse">
                <FreezeLevels className={mainStyle?.statsIcons} />
                <span>{t('frozenPlaces')}</span>
              </div>
              <div className="flex text-white text-sm sm:text-mini items-center space-x-1 rtl:space-x-reverse">
                <TotalLevels className={mainStyle?.statsIcons} />
                <span>{t('totalPlaces')}</span>
              </div>
            </div>
          }
        >
          <div
            className="flex items-center justify-evenly w-full cursor-pointer space-x-3 rtl:space-x-reverse"
            onClick={isMobile ? onClickButtonWrapper : () => {}}
            ref={statsRef}
            onTouchStart={isMobile ? () => setVisibility(true) : () => {}}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <ActiveLevels className={mainStyle?.statsIcons} />
              <span className={`text-white ${mainStyle?.textStyle?.stats}`}>{activeClonesCount}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FreezeLevels className={mainStyle?.statsIcons} />
              <span className={`text-white ${mainStyle?.textStyle?.stats}`}>{freezeClonesCount}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <TotalLevels className={mainStyle?.statsIcons} />
              <span className={`text-white ${mainStyle?.textStyle?.stats}`}>{clonesLength}</span>
            </div>
          </div>
        </Tippy>
      </div>
    );
  },
);
