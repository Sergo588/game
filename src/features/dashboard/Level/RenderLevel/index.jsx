import React, { useMemo } from 'react';
import { CustomLink, Button } from 'components';
import { LevelCard } from 'features/round';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import ArrowLeft from 'assets/icons/arrow_left.svg';
import ArrowRight from 'assets/icons/arrow_right.svg';
import { linkWithQuery } from 'helpers/links';
import { MAX_ROUND_LEVELS, BUTTON_TYPES } from 'helpers/constants';
import { useTranslation } from 'next-i18next';
import { capitalize } from 'lodash';
import { getRoundByLevel } from 'helpers/round';
import { Upline } from './Upline';
import { MissedBanner } from './MissedBanner';

export const RenderLevel = ({ data, isLoading, onNewLine, callProgramLevel, actualPercent }) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const { isMobile } = useDetectChangeWindow();
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const userId = previewAccount.id || authProfile?.id;
  const currentLevel = Number(data?.level);
  const maxLevel = MAX_ROUND_LEVELS;
  const program = getRoundByLevel(currentLevel);

  // В связи с изменением порядка лвлов в раундах - логика кнопок вправо/влево
  const selectorLevelNext = useMemo(() => {
    if (currentLevel > 19) return currentLevel - 1;
    if (currentLevel === 19) return 1;
    if (currentLevel < 19) return currentLevel + 1;
  }, [currentLevel]);

  const selectorLevelPrev = useMemo(() => {
    if (currentLevel >= 19) return currentLevel + 1;
    if (currentLevel === 1) return 19;
    if (currentLevel < 19) return currentLevel - 1;
  }, [currentLevel]);

  const selectorStyle = 'flex items-center justify-center font-normal w-full h-full space-x-2.5 rtl:space-x-reverse';

  const rightSelector = useMemo(() => {
    const isAllowLeftSwipe = currentLevel < 18 || currentLevel > 18;
    return (
      <CustomLink
        withLink={isAllowLeftSwipe}
        scroll={false}
        className="flex-1 h-full"
        href={`${linkWithQuery(`/dashboard/${selectorLevelNext}`, { user: query.user })}`}
      >
        <Button
          type={BUTTON_TYPES?.DARK_GREY}
          className="flex-1 w-full rounded h-full lg:rounded-small lg:justify-end lg:!p-5"
          disabled={!isAllowLeftSwipe || isLoading}
        >
          {isAllowLeftSwipe ? (
            <div className={selectorStyle}>
              <span className="text-white text-base">
                {capitalize(t('level'))} {selectorLevelNext}
              </span>
              <ArrowRight className="flex-shrink-0" />
            </div>
          ) : (
            <div className=""> &nbsp; </div>
          )}
        </Button>
      </CustomLink>
    );
  }, [currentLevel, query.user, program, isLoading]);

  const leftSelector = useMemo(() => {
    const isAllowRightSwipe = currentLevel < maxLevel;
    return (
      <CustomLink
        withLink={isAllowRightSwipe}
        scroll={false}
        className="flex-1 h-full"
        href={`${linkWithQuery(`/dashboard/${selectorLevelPrev}`, { user: query.user })}`}
      >
        <Button
          type={BUTTON_TYPES?.DARK_GREY}
          className="flex-1 w-full rounded h-full lg:rounded-small lg:justify-end lg:!p-5"
          disabled={!isAllowRightSwipe || isLoading}
        >
          {isAllowRightSwipe ? (
            <div className={selectorStyle}>
              <ArrowLeft className="flex-shrink-0" />
              <span className="text-white text-base">
                {capitalize(t('level'))} {selectorLevelPrev}
              </span>
            </div>
          ) : (
            <div className=""> &nbsp; </div>
          )}
        </Button>
      </CustomLink>
    );
  }, [currentLevel, query.user, program, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-start items-center w-full space-y-5">
        {!!data?.upline?.user_id && <Upline upline={data?.upline} />}
        <div className="flex justify-between items-center space-x-9 w-full lg:space-x-0 rtl:space-x-reverse">
          <div className="max-w-140px w-full h-full lg:hidden">{leftSelector}</div>
          <div className="flex flex-col items-center max-w-685px w-full lg:max-w-full">
            {isLoading ? (
              <div className="h-363px justify-center items-center flex left-0 bg-dark-grey rounded-small w-full right-0 z-20 bottom-0 top-0">
                <PuffLoadingIcon className="w-40 h-40 ml-auto mr-auto" />
              </div>
            ) : (
              <LevelCard
                key={`${data?.level}_${userId}`}
                onFetchLevels={callProgramLevel}
                program={program}
                percent={actualPercent}
                isMobile={isMobile}
                level={query?.level}
                clones={data?.clones}
                onNewLine={onNewLine}
                isLevelPage
                {...data}
              />
            )}
            <div className="hidden lg:flex items-center justify-between w-full space-x-5 rtl:space-x-reverse py-5">
              {leftSelector}
              {rightSelector}
            </div>
          </div>
          <div className="max-w-140px w-full h-full lg:hidden">{rightSelector}</div>
        </div>
        {!!data?.total_missed_revenue && (
          <MissedBanner program={program} level={query?.level} missed={data?.total_missed_revenue} />
        )}
      </div>
    </div>
  );
};
