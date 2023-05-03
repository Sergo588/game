import React, { memo, useMemo } from 'react';
import Snowflake from 'assets/icons/snowflake.svg';
import BNBIcon from 'assets/tokens/BNB.svg';

export const Title = memo(({ isFreezed, isMobile, isLevelPage, mainStyle, isCompleted, active, price, level }) => {
  const titleMargin = isLevelPage ? 'mb-5' : 'mb-2.5';
  const fixedPrice = parseFloat(price.toFixed(4));

  const styledText = useMemo(() => {
    if (isFreezed) return 'stroke-current text-lightBlue';
    if (isCompleted && active) return 'stroke-current text-yellow';
    if (isCompleted || !active) return 'stroke-current text-light-gray';
  }, [isCompleted, active, isFreezed]);

  const bnbIconStyle = useMemo(() => {
    if (isFreezed) return '#4599EF';
    if (!active) return '#929498';
    return 'gold';
  }, [isFreezed, active]);

  const snowflakeRender = useMemo(() => {
    if (isFreezed && !isMobile) {
      return <Snowflake className={`w-5 h-5 ${styledText}`} />;
    }
    return null;
  }, [isFreezed, isMobile, styledText]);

  return (
    <div className={`flex justify-between ${titleMargin}`}>
      <div className="flex items-center z-10 space-x-1.5 rtl:space-x-reverse">
        <span className={`flex items-center text-yellow mr-auto ${mainStyle?.textStyle?.title} ${styledText}`}>
          Lvl {level}
        </span>
        {snowflakeRender}
      </div>
      <div className="flex items-center z-10 space-x-1.5 rtl:space-x-reverse">
        <BNBIcon className={mainStyle?.titleIcon} fill={bnbIconStyle} />
        <div className={`text-white ${mainStyle?.textStyle?.title}`}>{fixedPrice}</div>
      </div>
    </div>
  );
});
