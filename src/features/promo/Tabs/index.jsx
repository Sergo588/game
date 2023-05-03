import React, { useState, useMemo } from 'react';
import { Button } from 'components';
import { PromoItem } from '../PromoItem';

export const Tabs = ({ data = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  const onSwitchTab = (tabNumber) => () => {
    if (activeTab !== tabNumber) {
      setActiveTab(tabNumber);
    }
  };

  const tabBtns = useMemo(() => {
    return data?.map((item, itemIndex) => {
      const btnType = activeTab === itemIndex ? 'gradient' : 'dark-grey';

      return (
        <Button type={btnType} className="!rounded-b-none" onClick={onSwitchTab(itemIndex)} key={itemIndex}>
          {item?.title}
        </Button>
      );
    });
  }, [data, activeTab]);

  const tabContent = useMemo(() => {
    const currentFilesTitle = data[activeTab]?.sectionSubtitle;
    const currentFiles = data[activeTab]?.files;
    return (
      <div className="flex flex-col w-full">
        <span>{currentFilesTitle}</span>
        <div className="w-full grid gap-5 grid-cols-2 sm:grid-cols-1">
          {currentFiles?.map((item, itemIndex) => (
            <PromoItem {...item} key={itemIndex} />
          ))}
        </div>
      </div>
    );
  }, [data, activeTab]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-start">{tabBtns}</div>
      <div className="flex flex-1 bg-black-light rounded p-7.5 sm:p-5 rounded-t-none sm:rounded-none">{tabContent}</div>
    </div>
  );
};
