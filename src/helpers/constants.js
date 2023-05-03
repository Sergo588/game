import { addHours, fromUnixTime, getUnixTime } from 'date-fns';
import { BigNumber } from '@ethersproject/bignumber';
import config from './config';

export const MODAL_STATES = {
  BASE: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

export const ROUND_1 = 'smartgamepro1';
export const ROUND_2 = 'smartgamepro2';

export const DEFAULT_GAS_LIMIT = BigNumber.from(2000000);

export const MAX_VALUE = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
export const FORSAGE_BUSD_URL = '';

export const PROGRAM_NAMES = {
  GAME: 'game',
};

export const NETWORK_NAMES = {
  1: 'Ethereum Mainnet',
  97: 'BSC Testnet',
  56: 'Smart Chain',
};

export const INITIAL_PROGRAM_LEVEL_VALUES = {
  recycles: 0,
  isLastUnactive: 0,
  isFirstUnactive: 0,
  missed_revenue: 0,
  descendants: 0,
  active: false,
  freeze: false,
  programName: '',
  level: [],
  missed_partners: 0,
  isUserActivated: false,
  isNeedStartTimer: true,
  isLockedLevel: true,
};

export const GAME_URL = '';
export const GAME_STAGE_URL = '';
export const GAME_DEV_URL = '';

export const GAME_STAND_URL =
  config.stand === 'prod' ? GAME_URL : config.stand === 'stage' ? GAME_STAGE_URL : GAME_DEV_URL;

export const DOCUMENTS_IN_GAME = {
  presEN: `${GAME_STAND_URL}/docs/1.pdf`,
  presRU: `${GAME_STAND_URL}/docs/2.pdf`,
  presES: `${GAME_STAND_URL}/docs/3.pdf`,
  presHI: `${GAME_STAND_URL}/docs/4.pdf`,
  presUR: `${GAME_STAND_URL}/docs/5.pdf`,
  presID: `${GAME_STAND_URL}/docs/6.pdf`,
  brandBook: `${GAME_STAND_URL}/docs/7.pdf`,
};

export const LINKS_IN_GAME = {
  TELEGRAM_CHANNEL: '',
  NOTIFIER: '',
  FORSAGE_BUSD: '',
};

export const REFLINK_TYPES = {
  base: `${GAME_URL}/s/`,
};

export const ADD_CHAIN_ETHS_PARAMS = {
  56: {
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
    chainId: '0x38',
  },
  97: {
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-2-s3.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
    chainId: '0x61',
  },
};

export const CONTRACT_NAMES = {
  GAME: 'game',
  XBASE: 'xbase',
  PANCAKESWAP: 'pancakeswap',
  BUSD_TOKEN: 'busdtoken',
  ROUTER: 'router',
};

export const GAMES_CONTRACT_EVENTS = {
  REGISTRATION: '0x309bb360e8b69c23937ccc5fb01f9aeeead1c95a99604e175113ff82f2b1723a',
  UPGRADE: '0x191c9e1ae58578ec3535ff9627b1c5f056768d37f1230ff1a1f8d3545eaac2dc',
  NEW_USER_PLACE: '0x497c1eb1d4cce259671627923ad2854130062a084898c851e0bcfcd4c3aadc87',
  REWARD_MISSED: '0xb275bcad90f0550b7321803df3c65fe3aaa45deb50d9658e102cf8f5db73be32',
  REF_BONUS: '0x27ecaecd8b81d1b2499f3e7e6f7f25584d8df01fbfe2ef224c1f407a9f1ef6f0',
  REWARD_SENT: '0x29c06542b7b1fba68e22413e3d88c7d362a31465378674f05f1dc8daf3a22108',
};

const PRICES_DEV = {
  [PROGRAM_NAMES.GAME]: {
    1: 0.0000625,
    2: 0.00009,
    3: 0.00011,
    4: 0.000135,
    5: 0.000165,
    6: 0.00022,
    7: 0.0003,
    8: 0.0004,
    9: 0.0006,
    10: 0.0009,
    11: 0.0011,
    12: 0.00135,
    13: 0.00165,
    14: 0.0022,
    15: 0.003,
    16: 0.004,
    17: 0.006,
    18: 0.009,
    19: 0.00025,
    20: 0.00036,
    21: 0.00044,
    22: 0.00055,
    23: 0.00066,
    24: 0.00088,
    25: 0.0012,
    26: 0.0016,
    27: 0.0024,
    28: 0.0036,
    29: 0.0044,
    30: 0.0055,
    31: 0.0066,
    32: 0.0088,
    33: 0.012,
    34: 0.016,
    35: 0.024,
    36: 0.036,
  },
};

const PRICES_STAGE = {
  [PROGRAM_NAMES.GAME]: {
    1: 0.1,
    2: 0.135,
    3: 0.165,
    4: 0.13,
    5: 0.11,
    6: 0.075,
    7: 0.06,
    8: 0.05,
    9: 0.045,
    10: 0.033,
    11: 0.025,
    12: 0.02,
    13: 0.0165,
    14: 0.013,
    15: 0.01,
    16: 0.0075,
    17: 0.006,
    18: 0.005,
    19: 0.25,
    20: 0.36,
    21: 0.44,
    22: 0.55,
    23: 0.66,
    24: 0.88,
    25: 1.2,
    26: 1.6,
    27: 2.4,
    28: 3.6,
    29: 4.4,
    30: 5.5,
    31: 6.6,
    32: 8.8,
    33: 12,
    34: 16,
    35: 24,
    36: 36,
  },
};

const PRICES_PROD = {
  [PROGRAM_NAMES.GAME]: {
    1: 0.1,
    2: 0.135,
    3: 0.165,
    4: 0.13,
    5: 0.11,
    6: 0.075,
    7: 0.06,
    8: 0.05,
    9: 0.045,
    10: 0.033,
    11: 0.025,
    12: 0.02,
    13: 0.0165,
    14: 0.013,
    15: 0.01,
    16: 0.0075,
    17: 0.006,
    18: 0.005,
    19: 0.25,
    20: 0.36,
    21: 0.44,
    22: 0.55,
    23: 0.66,
    24: 0.88,
    25: 1.2,
    26: 1.6,
    27: 2.4,
    28: 3.6,
    29: 4.4,
    30: 5.5,
    31: 6.6,
    32: 8.8,
    33: 12,
    34: 16,
    35: 24,
    36: 36,
  },
};

export const PROGRAMS_PRICES =
  config.stand === 'prod' ? PRICES_PROD : config.stand === 'stage' ? PRICES_STAGE : PRICES_DEV;

export const BNB_COMMISSIONS = {
  [PROGRAM_NAMES.GAME]: 0.005,
};

const GAME_DEV_TIMES = [
  { 1: 1667480400 },
  { 2: 1667566800 },
  { 3: 1667653200 },
  { 4: 1667739600 },
  { 5: 1667826000 },
  { 6: 1667912400 },
  { 7: 1667998800 },
  { 8: 1668085200 },
  { 9: 1668171600 },
  { 10: 1668258000 },
  { 11: 1668344400 },
  { 12: 1668430800 },
  { 13: 1668517200 },
  { 14: 1668603600 },
  { 15: 1668690000 },
  { 16: 1668776400 },
  { 17: 1668862800 },
  { 18: 1668949200 },
  { 19: 1666101000 },
  { 20: 1666014600 },
  { 21: 1665928200 },
  { 22: 1665841800 },
  { 23: 1665755400 },
  { 24: 1665669000 },
  { 25: 1665582600 },
  { 26: 1665496200 },
  { 27: 1665409800 },
  { 28: 1665323400 },
  { 29: 1665237000 },
  { 30: 1665150600 },
  { 31: 1665064200 },
  { 32: 1664977800 },
  { 33: 1664891400 },
  { 34: 1664805000 },
  { 35: 1664718600 },
  { 36: 1664545800 },
];

const GAME_STAGE_TIMES = [
  { 1: 1668009600 },
  { 2: 1668096000 },
  { 3: 1668182400 },
  { 4: 1668268800 },
  { 5: 1668355200 },
  { 6: 1668441600 },
  { 7: 1668528000 },
  { 8: 1668614400 },
  { 9: 1668700800 },
  { 10: 1668787200 },
  { 11: 1668873600 },
  { 12: 1668960000 },
  { 13: 1669046400 },
  { 14: 1669132800 },
  { 15: 1669219200 },
  { 16: 1669305600 },
  { 17: 1669392000 },
  { 18: 1669478400 },
  { 19: 1666108800 },
  { 20: 1666022400 },
  { 21: 1665936000 },
  { 22: 1665849600 },
  { 23: 1665763200 },
  { 24: 1665676800 },
  { 25: 1665590400 },
  { 26: 1665504000 },
  { 27: 1665417600 },
  { 28: 1665331200 },
  { 29: 1665244800 },
  { 30: 1665158400 },
  { 31: 1665072000 },
  { 32: 1664985600 },
  { 33: 1664899200 },
  { 34: 1664812800 },
  { 35: 1664726400 },
  { 36: 1664640000 },
];

const GAME_PROD_TIMES = [
  { 1: 1668009600 },
  { 2: 1668096000 },
  { 3: 1668182400 },
  { 4: 1668268800 },
  { 5: 1668355200 },
  { 6: 1668441600 },
  { 7: 1668528000 },
  { 8: 1668614400 },
  { 9: 1668700800 },
  { 10: 1668787200 },
  { 11: 1668873600 },
  { 12: 1668960000 },
  { 13: 1669046400 },
  { 14: 1669132800 },
  { 15: 1669219200 },
  { 16: 1669305600 },
  { 17: 1669392000 },
  { 18: 1669478400 },
  { 19: 1666108800 },
  { 20: 1666022400 },
  { 21: 1665936000 },
  { 22: 1665849600 },
  { 23: 1665763200 },
  { 24: 1665676800 },
  { 25: 1665590400 },
  { 26: 1665504000 },
  { 27: 1665417600 },
  { 28: 1665331200 },
  { 29: 1665244800 },
  { 30: 1665158400 },
  { 31: 1665072000 },
  { 32: 1664985600 },
  { 33: 1664899200 },
  { 34: 1664812800 },
  { 35: 1664726400 },
  { 36: 1664640000 },
];

export const BUTTON_TYPES = {
  BLACK: 'black',
  WHITE_100: 'white-100',
  WHITE_100_ROUNDED: 'white-100-rounded',
  WHITE_100_CIRCLE: 'white-100-circle',
  WHITE_100_BORDERED: 'white-100-bordered',
  WHITE_300: 'white-300',
  WHITE_300_BORDERED: 'white-300-bordered',
  DARK_GREY: 'dark-grey',
  DARK_GREY_ROUNDED: 'dark-grey-rounded',
  DARK_GREY_CIRCLE: 'dark-grey-circle',
  YELLOW_BORDERED: 'yellow-bordered',
  BLUE: 'blue',
  TRANSPARENT: 'transparent',
  WHITE_700_TRANSPARENT: 'white-700-transparent',
  GRADIENT: 'gradient',
  GRADIENT_BORDERED: 'gradient-bordered',
  GRADIENT_ORANGE_PINK: 'gradient-orange-pink',
  GRADIENT_ORANGE_YELLOW: 'gradient-orange-yellow',
  GRADIENT_PURP_ORANGE: 'gradient-purp-orange',
  GRADIENT_MODAL_LOADING: 'gradient-modal-loading',
  GRADIENT_MODAL_SUCCESS: 'gradient-modal-success',
};

export const GAME_START_DATES =
  config.stand === 'prod' ? GAME_PROD_TIMES : config.stand === 'stage' ? GAME_STAGE_TIMES : GAME_DEV_TIMES;

export const MAX_ACTIVATES_COUNT = 3;

const ADDITION_HOURS = config.stand === 'dev' || config.stand === 'stage' ? 8 : 72;

export const GAME_ALLOW_CLONE_DATES = GAME_START_DATES.reduce((total, obj) => {
  const [level, time] = Object.entries(obj)[0];

  return [...total, { [level]: getUnixTime(addHours(fromUnixTime(time), ADDITION_HOURS)) }];
}, []);

export const ROUND_NAMES = {
  [ROUND_1]: 'Primary',
  [ROUND_2]: 'Main',
};

export const MAX_ROUND_LEVELS = 36;

export const ROUND_COUNT = 2;

export const NOTIFICATIONS_TYPES = {
  UPGRADE: 'upgrade',
  NEW_PARTNER: 'new_partner',
  PROFIT: 'profit',
  PARTNER_BONUS: 'partner_bonus',
  GIFT_PARTNER_BONUS: 'gift_partner_bonus',
  GIFT_PROFIT: 'gift_profit',
  PARTNER_BONUS_MISSED: 'partner_bonus_missed',
  PROFIT_MISSED: 'profit_missed',
  FINISH_REWARD: 'finish_reward',
};

export const TRANSACTIONS_TYPES = {
  ACTIVATE_PROGRAM: 'activate_program',
  UPGRADE: 'upgrade',
  REGISTRATION: 'registration',
  REF_BONUS: 'ref_bonus',
  GIFT_REG_BONUS: 'gift_ref_bonus',
  MISSED_REF_BONUS: 'missed_ref_bonus',
  MISSED_GIFT_REF_BONUS: 'missed_gift_ref_bonus',
  REWARD: 'reward',
  GIFT_REWARD: 'gift_reward',
  MISSED_REWARD: 'missed_reward',
  MISSED_GIFT_REWARD: 'missed_gift_reward',
  FINISH_REWARD: 'finish_reward',
};

export const TRANSACTIONS_TYPES_COLORS = {
  [TRANSACTIONS_TYPES?.REGISTRATION]: 'text-main-blue',
  [TRANSACTIONS_TYPES?.ACTIVATE_PROGRAM]: 'text-main-blue',
  [TRANSACTIONS_TYPES?.UPGRADE]: 'text-green',
  [TRANSACTIONS_TYPES?.MISSED_REF_BONUS]: 'text-red',
  [TRANSACTIONS_TYPES?.MISSED_GIFT_REF_BONUS]: 'text-red',
  [TRANSACTIONS_TYPES?.MISSED_GIFT_REWARD]: 'text-red',
};

export const PROGRAM_PERCENT = {
  [ROUND_1]: {
    profit: 75,
    direct_partner: 10,
    second_partner: 7,
    third_partner: 5,
    fourth_partner: 2,
    fifth_partner: 1,
  },
  [ROUND_2]: {
    profit: 70,
    direct_partner: 12,
    second_partner: 8,
    third_partner: 5,
    fourth_partner: 3,
    fifth_partner: 2,
  },
};

export const MAX_REWARDS_ROUND = {
  [ROUND_1]: 5,
  [ROUND_2]: 5,
};

export const MAX_PERCENT_ROUND = {
  [ROUND_1]: 450,
  [ROUND_2]: 420,
};

export const LOAD_MORE_TYPES = {
  LOAD_MORE: 'load_more',
  RECALL: 'recall',
  FILTER: 'filter',
};

export const EVENTS_PUBSUB = {
  CLOSE_SUCCES_BUY_NEW_LEVEL: 'closeSuccessBuyNewLevelModal',
};

export const TRANSACTION_BASE_GWEI = config.stand === 'dev' ? 10 : 5;

export const TRANSACTION_INITIAL_STATE = {
  isSuccess: false,
  isLoading: false,
  isPending: false,
  isError: false,
  hash: '',
};
