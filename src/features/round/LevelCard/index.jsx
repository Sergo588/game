import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { CustomLink, AnimatedNumber } from 'components';
import Lottie from 'react-lottie';
import ArrowRight from 'assets/icons/arrow_level_view.svg';
import { animationCardMapper, loadingModalCircle, loadingCircleSecond } from 'helpers/lottieAnimations';
import { useWeb3React } from '@web3-react/core';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { BuyProgramModal } from 'components/modals';
import { getStartDateByLevel } from 'helpers/common';
import { useTimerOver } from 'helpers/hooks/useTimerOver';
import WarningLevels from 'assets/icons/warning_levels.svg';
import { useRouter } from 'next/router';
import { PROGRAM_NAMES, PROGRAMS_PRICES, ROUND_1, ROUND_2 } from 'helpers/constants';
import { ROUND_STYLES } from 'helpers/round';
import { useModal } from 'helpers/hooks/useModal';
import { useInView } from 'react-intersection-observer';
import { linkWithQuery } from 'helpers/links';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';
import { useGetLevelTime } from 'helpers/hooks/useGetLevelTime';
import { isAfter, isBefore } from 'date-fns';
import { Title, LineCount, Rewards, ActivateButton, NotActivatedStates, StatsIcons, BonusTimer } from './Elements';

export const LevelCard = ({
  percent = 0,
  active,
  level,
  clones,
  ref_bonus,
  revenue,
  onFetchLevels,
  total_missed_revenue,
  isMobile,
  program,
  onNewLine,
  isLevelPage = false,
  isShowMissed = true,
  isAllowButton = true,
  infinityAnimation = false,
  current_line_received_rewards_count,
  current_line_total_rewards_count,
  missed_line_rewards_count,
  active_clones_count,
  freeze_clones_count,
  clones_count,
  is_linked_level_active,
  className,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { openedModal, onOpen, onClose } = useModal();
  const [isStoppedAnimation, setIsStoppedAnimation] = useState(true);
  const { isCompleted, onComplete } = useTimerOver(getStartDateByLevel(level));
  const { query } = useRouter();
  const { account } = useWeb3React();
  const { t } = useTranslation('common');
  const authId = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const isAvailableActivation = !!(account && authId) && !query.user;
  const price = PROGRAMS_PRICES[PROGRAM_NAMES.GAME][level];
  const roundStyles = ROUND_STYLES[program];
  const isPreview = !!previewAccount?.id;
  const areThereAnyMissed = isShowMissed && !!total_missed_revenue;
  const isAnyActiveLineClone = useMemo(() => {
    if (!clones?.length) {
      return false;
    }

    return !clones.some((clone) => !clone.is_gray_line_active && clone.active);
  }, [clones]);

  useComponentDidUpdate(
    (prev) => {
      if (prev.percent && prev.percent > percent && prev.level === level) {
        onNewLine?.(level);
      }
    },
    {
      percent,
      level,
    },
  );

  const mainStyle = useMemo(() => {
    if (isLevelPage) {
      return {
        wrapper: `min-h-363px w-full ${roundStyles?.border}`,
        contentWrapper: 'flex-1 w-full !p-6 sm:!pt-9',
        percentWrapper: 'max-w-250px w-full sm:max-w-full',
        cardPersonPercent: 'text-base max-h-40px h-full min-w-114px level_card_percent_border_on_level',
        titleIcon: 'h-8 w-8 sm:w-5 sm:h-5',
        textStyle: {
          title: 'text-4xl sm:text-xl',
          rewards: 'text-18px space-y-1 sm:text-sm',
          rewardsTitle: 'text-18px sm:text-sm',
          totalRewards: 'text-26px sm:text-base',
          stats: '',
          percent: 'text-42px',
        },
        statsIcons: 'w-9 h-9',
        buttonStyle: 'max-h-55px h-full w-full text-18px',
      };
    }

    return {
      wrapper: `w-full max-w-309px min-h-[195px] sm:max-w-158px ${roundStyles?.border}`,
      contentWrapper: 'w-full  sm:max-w-158px',
      percentWrapper: 'flex-shrink-0 w-114px',
      cardPersonPercent: 'text-sup-xs max-h-18px min-w-49px level_card_percent_border',
      titleIcon: 'h-4 h-4',
      textStyle: {
        title: 'leading-19px',
        rewards: 'text-12px',
        rewardsTitle: 'text-10px',
        totalRewards: 'text-12px',
        stats: 'text-10px',
        percent: 'text-xl leading-6',
      },
      statsIcons: 'w-4 h-4',
      buttonStyle: 'max-h-30px rounded-5px text-10px text-white leading-12px h-full w-full',
    };
  }, [isLevelPage]);

  useEffect(() => {
    setIsStoppedAnimation(false);
    const tm = setTimeout(() => {
      setIsStoppedAnimation(true);
    }, (1 + 2 / 3) * 2000);

    return () => {
      clearTimeout(tm);
    };
  }, [percent]);

  const isCompleteAllClones = useMemo(() => {
    return active && clones?.every((clone) => !clone.active);
  }, [clones]);

  const isFreezed = useMemo(() => {
    return clones?.some((item) => item.freeze) && !isCompleteAllClones;
  }, [clones, isCompleteAllClones]);

  const renderAnimation = useMemo(() => {
    if (isCompleted && active && !previewAccount.id) {
      return (
        <div className="flex flex-col relative h-full w-full">
          <Lottie
            isClickToPauseDisabled
            isStopped={infinityAnimation ? !infinityAnimation : isStoppedAnimation && inView && !isLevelPage}
            options={{
              loop: true,
              autoplay: false,
              animationData: animationCardMapper(
                percent,
                program,
                isMobile,
                isFreezed,
                isAnyActiveLineClone,
                isCompleteAllClones,
              ),
              rendererSettings: {
                progressiveLoad: true,
                preserveAspectRatio: isMobile ? 'none' : 'xMidYMid slice',
              },
            }}
          />
          {!isMobile && (
            <div className="absolute flex items-center justify-center top-0 bottom-0 right-0 left-0 pointer-events-none sm:hidden">
              <span className={`text-center whitespace-nowrap text-white-700 ${mainStyle?.textStyle?.percent}`}>
                <AnimatedNumber value={percent} />%
              </span>
            </div>
          )}
          {!isLevelPage && (
            <div className="absolute flex bottom-6 justify-center items-center right-0 left-0 space-x-1 rtl:space-x-reverse text-10px leading-3 text-white-700 sm:hidden">
              <span>{t('cardLevelView')}</span> <ArrowRight className="w-5" />
            </div>
          )}
        </div>
      );
    }

    return null;
  }, [
    percent,
    isCompleted,
    active,
    previewAccount,
    isStoppedAnimation,
    inView,
    isMobile,
    isFreezed,
    isAnyActiveLineClone,
    isCompleteAllClones,
  ]);

  const onCloseModal = useCallback(() => {
    onClose();
    onFetchLevels();
  }, [onClose, onFetchLevels]);

  const renderImages = useMemo(() => {
    const getImage = () => {
      if (isCompleted && !active && !!total_missed_revenue && isShowMissed) {
        return (
          <div className="flex z-10 relative w-full space-y-2.5 flex-col h-full items-center justify-center">
            <WarningLevels className={`z-10 ${isLevelPage ? 'w-158px h-158px' : 'w-88px h-88px'}`} />
            {!isLevelPage && (
              <div className="absolute flex bottom-6 right-0 left-0 justify-center items-center space-x-1 rtl:space-x-reverse text-10px leading-3 text-white-700 sm:hidden">
                <span>{t('cardLevelView')}</span> <ArrowRight className="w-5" />
              </div>
            )}
          </div>
        );
      }

      if (isPreview || !isCompleted || !active) {
        return (
          <div className="flex z-10 relative w-full space-y-2.5 flex-col h-full items-center justify-center sm:hidden">
            <div className={isLevelPage ? 'w-170px h-170px' : 'w-18 h-18'}>
              <Lottie
                isClickToPauseDisabled
                isPaused={!inView || !isCompleted}
                options={{
                  loop: true,
                  autoplay: false,
                  animationData: program === ROUND_1 ? loadingModalCircle() : loadingCircleSecond(),
                  rendererSettings: {
                    progressiveLoad: true,
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
              />
            </div>
            {!isLevelPage && (
              <div className="absolute flex bottom-6 right-0 left-0 justify-center items-center space-x-1 rtl:space-x-reverse text-10px leading-3 text-white-700 sm:hidden">
                <span>{t('cardLevelView')}</span> <ArrowRight className="w-5" />
              </div>
            )}
          </div>
        );
      }

      return <>{renderAnimation}</>;
    };

    const imageWrapperStyle = () => {
      if (active && isCompleted) {
        if (isFreezed) {
          return 'border border-lightBlue';
        }
        return roundStyles?.border;
      }
      return 'border border-light-gray z-three';
    };

    return (
      <div
        className={`flex flex-col justify-center items-center overflow-hidden rounded-small relative sm:absolute sm:left-0 sm:top-0 sm:right-0 sm:bottom-0 sm:w-full sm:z-one
         ${imageWrapperStyle()} ${mainStyle?.percentWrapper}`}
      >
        {getImage()}
        {isFreezed && <img className="absolute top-0 left-0 w-full h-full z-10" src="/img/round/freeze.png" alt="" />}
      </div>
    );
  }, [
    isMobile,
    isFreezed,
    isCompleted,
    active,
    total_missed_revenue,
    renderAnimation,
    roundStyles,
    isShowMissed,
    program,
    inView,
    isLevelPage,
    is_linked_level_active,
  ]);

  const mobilePercent = useMemo(() => {
    if (isMobile && active) {
      return (
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-0 rounded-b-md items-center flex justify-center ml-auto mr-auto  sm:z-two ${mainStyle?.cardPersonPercent}`}
        >
          <AnimatedNumber value={percent} />%
        </div>
      );
    }
    return null;
  }, [isMobile, active, percent, mainStyle]);

  const { getLevelTimeWithDelay } = useGetLevelTime();
  const timeWithDelay = getLevelTimeWithDelay(level, 600);
  const timeBeforeStart = getLevelTimeWithDelay(level, -600);
  const isShowBonusButton = useMemo(() => {
    return program === ROUND_2 && isAfter(new Date(), timeBeforeStart) && isBefore(new Date(), timeWithDelay);
  }, [percent]);

  return (
    <>
      <CustomLink
        className={`bg-gray-950 rounded-small flex relative ${mainStyle?.wrapper} ${className}`}
        withLink={!isLevelPage && isAllowButton}
        href={linkWithQuery(`/dashboard/${level}`, { user: query.user })}
      >
        <div className="relative flex w-full" ref={ref}>
          {isShowBonusButton && (
            <BonusTimer
              timeWithDelay={timeWithDelay}
              isLevelPage={isLevelPage}
              isAvailableLevel={isCompleted}
              level={level}
              isAvailableBonus={is_linked_level_active}
            />
          )}
          {mobilePercent}
          <div
            className={`flex z-three ${isMobile ? 'pt-12px pb-18px pr-8px pl-8px' : 'p-12px'} ${
              mainStyle?.contentWrapper
            }`}
          >
            <div className="relative flex flex-col w-full">
              <Title
                isFreezed={isFreezed}
                isMobile={isMobile}
                isLevelPage={isLevelPage}
                mainStyle={mainStyle}
                isCompleted={isCompleted}
                active={active}
                price={price}
                level={level}
              />
              <LineCount
                current_line_received_rewards_count={current_line_received_rewards_count}
                current_line_total_rewards_count={current_line_total_rewards_count}
                missed_line_rewards_count={missed_line_rewards_count}
                mainStyle={mainStyle}
                isLevelPage={isLevelPage}
              />
              <Rewards
                areThereAnyMissed={areThereAnyMissed}
                mainStyle={mainStyle}
                total_missed_revenue={total_missed_revenue}
                revenue={revenue}
                ref_bonus={ref_bonus}
              />
              <div className="flex flex-col flex-1 justify-end">
                <StatsIcons
                  mainStyle={mainStyle}
                  activeClonesCount={active_clones_count}
                  clonesLength={clones_count}
                  freezeClonesCount={freeze_clones_count}
                  isLevelPage={isLevelPage}
                  isMobile={isMobile}
                />
                <ActivateButton
                  clones={clones}
                  account={account}
                  isLevelPage={isLevelPage}
                  isAvailableActivation={isAvailableActivation}
                  level={level}
                  isCompleted={isCompleted}
                  active={active}
                  isPreview={isPreview}
                  isAllowButton={isAllowButton}
                  mainStyle={mainStyle}
                  onOpen={onOpen}
                  isMobile={isMobile}
                />
              </div>
              <NotActivatedStates
                program={program}
                isCompleted={isCompleted}
                onComplete={onComplete}
                active={active}
                level={level}
                total_missed_revenue={total_missed_revenue}
                isLevelPage={isLevelPage}
                isPreview={isPreview}
                areThereAnyMissed={areThereAnyMissed}
              />
            </div>
            {(!isCompleted || !active) && (
              <div className="absolute top-0 left-0 w-full h-full blur_level_card border border-light-gray rounded-small z-two" />
            )}
          </div>
          {renderImages}
          {isFreezed && !(!isCompleted || !active) && (
            <div className="absolute top-0 left-0 w-full h-full border border-lightBlue rounded-small" />
          )}
        </div>
      </CustomLink>
      {openedModal && <BuyProgramModal level={level} openedModal={onOpen} onClose={onCloseModal} />}
    </>
  );
};
