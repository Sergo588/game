import React from 'react';
import clsx from 'clsx';

const buttonStyles = {
  disabled: 'bg-white-100 cursor-not-allowed',
  black: 'bg-main-bg text-white hover:bg-dark-grey-800 active:bg-black-2',
  'white-100': 'bg-white-100 text-white hover:bg-white-200 active:bg-white-50',
  'white-100-rounded': 'bg-white-100 text-white hover:bg-white-200 active:bg-white-50 !rounded-full !px-3 !py-2',
  'white-100-bordered':
    'border border-white-100 text-white hover:border-transparent hover:bg-white-100 active:border-transparent active:bg-white-200',
  'white-100-circle': 'bg-white-100 text-white hover:bg-white-200 active:bg-white-50 !rounded-full !px-2.5 !py-2.5',
  'white-300': 'bg-white-300 text-white hover:bg-white-350 active:bg-white-200',
  'white-300-bordered':
    'border border-white-300 text-white hover:border-transparent hover:bg-white-300 active:border-transparent active:bg-white-100',
  'dark-grey': 'bg-dark-grey text-white hover:bg-hover-dark-gray active:bg-active-dark-gray',
  'dark-grey-rounded':
    'bg-dark-grey text-white !rounded-full !px-3 !py-2 hover:bg-hover-dark-gray active:bg-active-dark-gray',
  'dark-grey-circle': '!px-2.5 !py-2.5 bg-dark-grey !rounded-full hover:bg-hover-dark-gray active:bg-active-dark-gray',
  'yellow-bordered':
    'border border-yellow !px-7 !py-3 text-yellow hover:bg-yellow hover:text-white active:bg-active-yellow active:text-white',
  blue: 'px-5 py-3 bg-main-blue hover:bg-hover-main-blue active:bg-active-main-blue',
  transparent: '!px-0 !py-0 bg-transparent',
  'white-700-transparent':
    '!px-0 !py-0 border border-transparent bg-transparent text-white-700 hover:border hover:border-white-700 !rounded-5px',
  gradient: 'btn_gradient_purp_orange',
  'gradient-bordered': 'relative btn__bordered_gradient',
  'gradient-orange-pink': 'btn_gradient_orange_pink',
  'gradient-orange-yellow': 'btn_gradient_orange_yellow',
  'gradient-purp-orange': 'btn_gradient_purp_orange',
  'gradient-modal-loading': 'modal_btn__gradient_loading',
  'gradient-modal-success': 'modal_btn__gradient_success',
};

const baseClasses =
  'py-3 px-5 max-w-max flex justify-center items-center text-center text-base font-medium text-white rounded-mini sm:text-sm outline-none';

const Button = ({ type, className, buttonType, children, disabled, ...props }) => {
  const totalClassName = disabled ? buttonStyles['disabled'] : buttonStyles[type];

  return (
    <button type={buttonType} disabled={disabled} className={clsx(baseClasses, totalClassName, className)} {...props}>
      {children}
    </button>
  );
};

export { Button };
