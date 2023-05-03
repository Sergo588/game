import React, { useMemo, useState } from 'react';
import { Button, Switcher } from 'components';
import { BUTTON_TYPES } from 'helpers/constants';
import { useModal } from 'helpers/hooks/useModal';
import { LevelPlacesLegendModal } from 'components/modals';
import QuestionIcon from 'assets/icons/question.svg';
import { useTranslation } from 'next-i18next';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';
import { PlaceItem } from './PlaceItem';
import { PlaceItemPlaceholder } from './PlaceItem/Placeholder';

export const PlacesStats = ({ clones = [], isLoading, activeLineFill }) => {
  const { t } = useTranslation('common');
  const { isMobile } = useDetectChangeWindow();
  const countPlaceholders = isMobile ? 2 : 3;
  const { openedModal, onOpen, onClose } = useModal();
  const [activeSwitcher, setActiveSwitcher] = useState(false);

  const toggleSwitcher = async () => {
    setActiveSwitcher((prev) => !prev);
  };

  const customClones = useMemo(() => {
    if (activeSwitcher) {
      return clones?.filter((item) => item?.active);
    }
    return clones;
  }, [activeSwitcher, clones]);

  const renderContent = useMemo(() => {
    return customClones.map((item, itemIndex) => (
      <PlaceItem
        {...item}
        number={itemIndex}
        key={itemIndex}
        activeLineFill={activeLineFill}
        className="h-184px m-3 sm:m-1.5 sm:h-200px"
      />
    ));
  }, [customClones, activeLineFill]);

  const renderPlaceholder = useMemo(() => {
    return Array.from(new Array(countPlaceholders)).map((index) => <PlaceItemPlaceholder key={index} />);
  }, [countPlaceholders]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-5 sm:flex-col sm:items-start sm:space-y-5">
        <div className="flex flex-wrap justify-start items-center w-full space-x-5 sm:space-x-0 rtl:space-x-reverse sm:flex-col sm:items-start">
          <span className="text-white font-medium text-2xl mr-5 sm:mr-0">{t('basicRewardsStats')}</span>
          <div className="flex flex-1 items-center justify-between sm:w-full sm:flex-wrap space-x-1.5 rtl:space-x-reverse">
            <Button
              type={BUTTON_TYPES?.WHITE_100}
              className="!leading-30px !py-0 !px-3 font-normal sm:mt-2.5 space-x-2 rtl:space-x-reverse"
              onClick={onOpen}
            >
              <QuestionIcon className="w-4 h-4 " />
              <span> {t('level&placesLegend')}</span>
            </Button>
            <div className="sm:mt-2.5">
              <Switcher title={t('showOnlyActive')} onChange={toggleSwitcher} checked={activeSwitcher} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -m-2 sm:-mx-px">{isLoading ? renderPlaceholder : renderContent}</div>
      <LevelPlacesLegendModal onClose={onClose} openedModal={openedModal} />
    </div>
  );
};
