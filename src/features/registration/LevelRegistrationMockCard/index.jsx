import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LevelCard } from 'features/round';
import { useDetectChangeWindow } from 'helpers/hooks/useDetectChangeWindow';
import { getRoundByLevel, INFO_DATA_LEVELCARD } from 'helpers/round';
import { coinAnimation } from 'helpers/lottieAnimations';
import Lottie from 'react-lottie';
import { PROGRAM_NAMES, PROGRAM_PERCENT, PROGRAMS_PRICES } from 'helpers/constants';

export const LevelRegistrationMockCard = ({ level }) => {
  const { isMobile } = useDetectChangeWindow();
  const interval = useRef();
  const [cardPercnt, setCardPercent] = useState(50);
  const lottieRef = useRef();
  const [rewards, setRewards] = useState({
    countRewards: 0,
    clones: 1,
    rewardsIteration: 0,
  });

  const currentLevelCardInfo = useMemo(() => {
    const round = getRoundByLevel(level);

    return {
      ...INFO_DATA_LEVELCARD,
      level,
      clones: [{ active: true }],
      percent: cardPercnt,
      active_clones_count: rewards.clones,
      freeze_clones_count: 0,
      clones_count: rewards.clones,
      total_missed_revenue: 0,
      current_line_received_rewards_count: rewards.rewardsIteration + 1,
      revenue:
        (PROGRAM_PERCENT[round].profit / 100) * rewards.countRewards * PROGRAMS_PRICES[PROGRAM_NAMES.GAME][level],
      ref_bonus:
        (PROGRAM_PERCENT[round].direct_partner / 100) *
        rewards.countRewards *
        PROGRAMS_PRICES[PROGRAM_NAMES.GAME][level],
    };
  }, [level, cardPercnt, rewards]);

  const onIntervalPercent = () => {
    const prevStateMapper = (prevPercent) => {
      const nextPercent = prevPercent + Math.floor(Math.random() * 3 + 3);

      return nextPercent > 100 ? 15 : nextPercent;
    };

    setCardPercent(prevStateMapper);

    clearTimeout(interval.current);

    setTimeout(onIntervalPercent, 2000 + Math.floor(Math.random() * 1100 + 400));
  };

  useEffect(() => {
    interval.current = setTimeout(onIntervalPercent, 2000);

    return () => {
      clearTimeout(interval.current);
    };
  }, []);

  useEffect(() => {
    setRewards({
      countRewards: 0,
      clones: 1,
      rewardsIteration: 0,
    });

    lottieRef.current.anim.onLoopComplete = () => {
      setRewards((prev) => ({
        countRewards: prev.countRewards + 1,
        clones: prev.rewardsIteration === 5 ? prev.clones + 1 : prev.clones,
        rewardsIteration: prev.rewardsIteration >= 5 ? 0 : prev.rewardsIteration + 1,
      }));
    };
  }, [level]);

  return (
    <div className="min-w-[325px] flex items-center relative sm:w-full sm:justify-center">
      <div className="flex absolute right-[19%] z-[999] h-3/4 bottom-[53%] sm:hidden">
        <Lottie
          ref={lottieRef}
          options={{
            loop: true,
            autoplay: true,
            animationData: coinAnimation,
            rendererSettings: {
              progressiveLoad: true,
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
      </div>
      <LevelCard
        key="test"
        isMobile={isMobile}
        isShowMissed={false}
        infinityAnimation
        {...currentLevelCardInfo}
        isAllowButton={false}
      />
    </div>
  );
};
