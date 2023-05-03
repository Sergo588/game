import React from 'react';
import GiftIcon from 'assets/icons/gift.svg';
import OverflowDown from 'assets/icons/rocket_down.svg';
import UpgradeIcon from 'assets/icons/upgrade.svg';
import SnowIcon from 'assets/icons/snowflake.svg';
import WalletIcon from 'assets/icons/wallet.svg';
import PartnerBonusIcon from 'assets/icons/partner_bonus.svg';

const IconTypes = {
  profit: {
    icon: WalletIcon,
    iconBg: 'bg-green-200',
    iconColor: 'fill-current text-green',
  },
  gift_reward: {
    icon: GiftIcon,
    iconBg: 'bg-light-blue-100',
    iconColor: 'fill-current text-light-blue',
  },
  finish_reward: {
    icon: GiftIcon,
    iconBg: 'bg-green-200',
    iconColor: 'fill-current text-green',
  },
  gift_ref_bonus: {
    icon: PartnerBonusIcon,
    iconBg: 'bg-green-100',
    iconColor: 'stroke-current text-green-light',
  },
  registration: {
    iconPng: '/img/icons/activate_program.png',
    iconBg: 'bg-main-blue-200',
  },
  upgrade: {
    icon: UpgradeIcon,
    iconBg: 'bg-green-100',
    iconColor: 'fill-current text-green-light',
  },
  missed_reward: {
    icon: SnowIcon,
    iconBg: 'bg-red-200',
    iconColor: 'stroke-current text-red',
  },
  missed_ref_bonus: {
    icon: OverflowDown,
    iconBg: 'bg-red-200',
    iconColor: 'fill-current text-red',
  },
  ref_bonus: {
    icon: GiftIcon,
    iconBg: 'bg-green-200',
    iconColor: 'stroke-current text-green',
  },
  reward: {
    icon: WalletIcon,
    iconBg: 'bg-green-200',
    iconColor: 'fill-current text-green',
  },
  missed_gift_reward: {
    icon: GiftIcon,
    iconBg: 'bg-red-200',
    iconColor: 'fill-current text-red',
  },
  missed_gift_ref_bonus: {
    icon: GiftIcon,
    iconBg: 'bg-red-200',
    iconColor: 'fill-current text-red',
  },
};

export const TableIcons = ({ type, overflow = false, reinvestIndex }) => {
  const IconStyle = overflow ? IconTypes[type][`overflow_${overflow}`] : IconTypes[type];
  const Icon = !!IconStyle?.icon && IconStyle?.icon;

  return (
    <div
      className={`relative flex items-center justify-center rounded-full ${IconStyle?.iconBg} w-11 h-11 sm:w-7.5 sm:h-7.5`}
    >
      {Icon && <Icon className={`${IconStyle?.iconColor} h-18px w-18px `} />}
      {!!IconStyle?.iconPng && <img src={IconStyle?.iconPng} className="h-18px w-18px " alt={type} />}
      {!!reinvestIndex && (
        <span className={`absolute top-0 right-0 text-mini leading-3 ${IconStyle?.iconColor}`}>{reinvestIndex}</span>
      )}
    </div>
  );
};
