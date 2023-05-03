import PeopleIcon from 'assets/icons/people.svg';
import PeopleActiveIcon from 'assets/icons/people_active.svg';
import BoxesIcon from 'assets/icons/boxes.svg';
import BoxesActiveIcon from 'assets/icons/boxes_active.svg';
import StatsIcon from 'assets/icons/stats.svg';
import StatsActiveIcon from 'assets/icons/stats_active.svg';
import InformationIcon from 'assets/icons/information.svg';
import InformationActiveIcon from 'assets/icons/information_active.svg';
import TelegramIcon from 'assets/icons/telegram.svg';
import TelegramActiveIcon from 'assets/icons/telegram_active.svg';
import ExitIcon from 'assets/icons/exit.svg';
import MegaphoneIcon from 'assets/icons/megaphone.svg';
import MegaphoneActiveIcon from 'assets/icons/megaphone_active.svg';
import EarthIcon from 'assets/icons/earth.svg';
import EarthActiveIcon from 'assets/icons/earth_active.svg';

export const MENU_LINKS = [
  {
    title: 'Dashboard',
    icon: BoxesIcon,
    activeIcon: BoxesActiveIcon,
    link: '/dashboard',
    showInPreview: true,
  },
  {
    title: 'Partners',
    icon: PeopleIcon,
    activeIcon: PeopleActiveIcon,
    link: '/partners',
    showInPreview: true,
  },
  {
    title: 'Global Activity',
    icon: EarthIcon,
    activeIcon: EarthActiveIcon,
    link: '/activity',
    showInPreview: true,
  },
  {
    title: 'Stats',
    icon: StatsIcon,
    activeIcon: StatsActiveIcon,
    link: '/stats',
    showInPreview: true,
  },
  {
    title: 'Information',
    icon: InformationIcon,
    activeIcon: InformationActiveIcon,
    link: '/about',
    showInPreview: true,
  },
  {
    title: 'Telegram bots',
    icon: TelegramIcon,
    activeIcon: TelegramActiveIcon,
    link: '/tbots',
    showInPreview: true,
  },
  {
    title: 'Promo',
    icon: MegaphoneIcon,
    activeIcon: MegaphoneActiveIcon,
    link: '/promo',
    showInPreview: true,
    newVersion: true,
  },
  {
    title: 'Log out',
    icon: ExitIcon,
    activeIcon: ExitIcon,
    link: '/',
    mobileOnly: true,
    showInPreview: false,
  },
];
