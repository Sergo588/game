import { ROUND_1, ROUND_2, BUTTON_TYPES, GAME_START_DATES } from 'helpers/constants';
import { isBefore, fromUnixTime } from 'date-fns';

const NEXT_START_LEVEL_ROUND = {
  [ROUND_1]: 18,
  [ROUND_2]: null,
};

export const ROUND_STYLES = {
  [ROUND_1]: {
    dashboard: {
      textColor: 'text-purple',
      buttonType: BUTTON_TYPES?.GRADIENT_PURP_ORANGE,
      background: 'bg-purple',
      border: 'border-purple',
      wrapperBlur: '/img/round/dashboard_round_1.png',
    },
    levelPageBlur: '/img/round/levelPage_round_1.png',
    border: 'border_round_1',
    switcher: 'round_switcher_gradient_1',
    gradient: 'gradient-main',
    previewLineGradient: 'previewMode-line-gradient-1',
  },
  [ROUND_2]: {
    dashboard: {
      textColor: 'text-yellow',
      buttonType: BUTTON_TYPES?.GRADIENT_ORANGE_YELLOW,
      background: 'bg-yellow',
      border: 'border-yellow',
      wrapperBlur: '/img/round/dashboard_round_2.png',
    },
    levelPageBlur: '/img/round/levelPage_round_2.png',
    border: 'border_round_2',
    switcher: 'round_switcher_gradient_2',
    gradient: 'gradient-second',
    previewLineGradient: 'previewMode-line-gradient-2',
  },
};

export const checkNextRoundIsLocked = (round) => {
  const nextRoundLevel = NEXT_START_LEVEL_ROUND[round];
  if (nextRoundLevel) {
    const nextRoundTime = Object.values(GAME_START_DATES[nextRoundLevel - 1])[0];
    return isBefore(new Date(), fromUnixTime(nextRoundTime));
  }
  return false;
};

export const getRoundByLevel = (level) => {
  if (level <= 18) {
    return ROUND_2;
  }

  return ROUND_1;
};

export const CLONE_REVENUE_TYPES = {
  missed: 'missed',
  received: 'received',
};

export const INFO_DATA_LEVELCARD = {
  percent: 50,
  active: true,
  level: 36,
  clones: [],
  ref_bonus: 288,
  revenue: 450,
  total_missed_revenue: 18,
  program: 'smartgamepro1',
  isLevelPage: false,
  isShowMissed: true,
  isAllowButton: true,
  current_line_received_rewards_count: 2,
  current_line_total_rewards_count: 6,
  missed_line_rewards_count: 0,
  active_clones_count: 2,
  freeze_clones_count: 1,
  clones_count: 3,
};

export const INFO_DATA_CLONE = {
  activated_at: '2022-08-08T21:00:00+00:00',
  number: 0,
  active: true,
  active_line_index: 4,
  activeLineFill: 55,
  freeze: false,
  gray_line_index: 0,
  id: 4,
  index: 1,
  is_gray_line_active: false,
  registration_percent: 50,
  revenue: 90,
  revenue_count: 4,
  revenue_limit: 15,
  revenues: [
    [],
    [
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 25,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 35,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 75,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
    ],
    [
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 10,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 25,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 80,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
    ],
    [
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 10,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 35,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 90,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
    ],
    [
      {
        line: 1,
        received_at: '2022-08-08T21:00:00+00:00',
        received_on_percent: 25,
        status: 'received',
        tx: '0x239261bb477cb3cf13d69c527cc68af089347afb0159452069bcac9080b037c1',
      },
    ],
    [],
  ],
};
