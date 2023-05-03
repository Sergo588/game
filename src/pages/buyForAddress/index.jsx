import React from 'react';
import { BreadCrumbs } from 'components';
import { checkAuth } from 'helpers/auth';
import { BuyLevelForm } from 'features/buyForAddress/BuyForm';

const buyForAddress = () => {
  const breadCrumbsProps = {
    title: 'Buy for address',
  };

  return (
    <div className="flex flex-col space-y-10 px-10 sm:px-0">
      <div>
        <BreadCrumbs {...breadCrumbsProps} />
      </div>
      <div className="max-w-50% flex flex-1 overflow-hidden relative w-full bg-black-light rounded p-7.5 pb-5 sm:p-5 sm:rounded-none lg:max-w-full">
        <BuyLevelForm />
      </div>
    </div>
  );
};

buyForAddress.storeInitial = async ({ ctx }) => {
  checkAuth(ctx);

  return {};
};

export default buyForAddress;
