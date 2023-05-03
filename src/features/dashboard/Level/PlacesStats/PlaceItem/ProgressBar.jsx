import React, { useMemo } from 'react';
import BnbIcon from 'assets/tokens/BNB.svg';
import StartProgressIcon from 'assets/icons/start_progress.svg';
import SkipTriangleIcon from 'assets/icons/triangle_skip.svg';
import { usePreviewMode } from 'helpers/hooks/usePreviewMode';
import { useRouter } from 'next/router';
import { getRoundByLevel, ROUND_STYLES } from 'helpers/round';

export const ProgressBar = ({
  revenue,
  isActiveClone,
  activeLineIndex,
  grayLineIndex,
  revenueIndex,
  activeLineFill,
  registrationPercent,
}) => {
  const { query } = useRouter();
  const program = getRoundByLevel(query.level);
  const isPreviewMode = usePreviewMode();
  const isActiveLine = revenueIndex === activeLineIndex;
  const isGrayLine = revenueIndex === grayLineIndex;
  const isFirstGrayLine = isGrayLine && revenueIndex === 0;
  const isFirstActiveGrayLine = isGrayLine && revenueIndex === 0 && activeLineIndex === 0;
  const isCompletedLine = revenueIndex < activeLineIndex;

  const bg = useMemo(() => {
    if (isFirstGrayLine) {
      return 'bg-gray-550 rounded-b-none';
    }
    if (isGrayLine) {
      return 'bg-gray-650';
    }

    if (isPreviewMode && isActiveLine) {
      return ROUND_STYLES[program]?.previewLineGradient;
    }

    if (revenue.length || isActiveLine || isCompletedLine || !isActiveClone) {
      return ROUND_STYLES[program]?.gradient;
    }

    return '';
  }, [isGrayLine, revenue, isActiveLine, isFirstGrayLine, isPreviewMode, isCompletedLine, program, ROUND_STYLES]);

  const currentlineHeight = useMemo(() => {
    if (!isPreviewMode && isActiveLine) {
      return activeLineFill;
    }
    return 100;
  }, [activeLineFill, isFirstActiveGrayLine, isActiveLine, registrationPercent, isPreviewMode]);

  const grayLineRender = useMemo(() => {
    if (revenueIndex === 1) {
      return (
        <div className="flex flex-col justify-center items-center w-full h-full space-y-0.5">
          {Array.from(new Array(3)).map((index) => (
            <SkipTriangleIcon className="w-3 h-3 z-three" key={index} />
          ))}
        </div>
      );
    }
    return (
      <div className="bg-gray-650 rounded-b-3px w-full z-three" style={{ height: `${registrationPercent}%` }}>
        <StartProgressIcon className="absolute w-3 h-3 -translate-y-1 z-three left-1/2 -translate-x-1/2" />
      </div>
    );
  }, [registrationPercent, revenueIndex]);

  const percentCoins = useMemo(() => {
    return revenue.reduce((prev, current) => {
      let currentPercent = Math.round(current?.received_on_percent);
      prev?.forEach((item) => {
        if (currentPercent === item) {
          currentPercent += 5;
        }
      });

      prev.push(currentPercent);

      return prev;
    }, []);
  }, [revenue]);

  return (
    <div className="relative rounded-b-5px border border-light-grey p-0.5 h-75px w-5 sm:w-4 " key={revenueIndex}>
      <div className="relative flex items-end w-full h-full rounded-3px overflow-hidden">
        {isGrayLine ? (
          grayLineRender
        ) : (
          <div className="relative w-full max-h-[75%] h-full z-two">
            {percentCoins?.map((item, itemIndex) => {
              return (
                <BnbIcon
                  className="w-3 h-3 absolute left-1/2 -translate-x-1/2 border-[1px] bg-orange border-white-900 rounded-full drop-shadow-md sm:w-2.5 sm:h-2.5"
                  style={{ bottom: `${item}%` }}
                  key={itemIndex}
                />
              );
            })}
          </div>
        )}
        <div
          style={{ height: `${currentlineHeight}%` }}
          className={`absolute h-full w-full bottom-0 rounded-3px ${bg}`}
        />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -top-3.5 w-5 rounded-t-5px h-3.5 text-dark-grey flex justify-center items-center text-[10px] leading-[14px] drop-shadow-md bg-light-grey sm:w-4">
        {percentCoins.length}
      </div>
    </div>
  );
};
