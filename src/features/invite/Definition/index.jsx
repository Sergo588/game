import React from 'react';
import { useTranslation } from 'next-i18next';

export const Definition = ({ sectionStyle }) => {
  const { t } = useTranslation('common');
  return (
    <section className={`relative mb-52 ${sectionStyle} sm:mb-36`}>
      <div className="w-full flex items-center max-w-desktop-invite px-5 space-x-1.5">
        <div className="h-full flex justify-center sm:hidden rtl:order-3">
          <img src="/img/invite/left_branch.png" alt="" />
        </div>
        <div className="flex flex-col items-center justify-center sm:items-start rtl:order-2">
          <span className="text-center text-yellow text-40px leading-48px font-medium mb-6 uppercase sm:text-3xl sm:mb-2.5 sm:text-left">
            {t('smartGamePro')}
          </span>
          <span className="text-center text-white text-3xl max-w-850px sm:text-xl sm:text-left">
            {t('isTheFirstEverAutoScalingSmartContractGameWithPassiveRewardsInBNBDirectlyToYourOwnWallet')}.
          </span>
        </div>
        <div className="h-full flex justify-center sm:hidden rtl:order-1">
          <img src="/img/invite/right_branch.png" alt="" />
        </div>
      </div>
    </section>
  );
};
