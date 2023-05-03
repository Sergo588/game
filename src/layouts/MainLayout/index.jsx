import React from 'react';
import { useSelector } from 'react-redux';
import { Header, FixedWidget } from 'components';
import { getIsLoadingRouter } from 'store/routerSlice/selectors';
import PuffLoadingIcon from 'assets/animations/puff.svg';

export const MainLayout = ({ children }) => {
  const isLoadingRouter = useSelector(getIsLoadingRouter);

  return (
    <div className="relative flex justify-center items-center w-full h-screen pt-24">
      {isLoadingRouter && (
        <div className="flex absolute justify-center w-full h-full bg-gray opacity-75 z-999999 top-0 bottom-0 left-0 right-0">
          <div className="flex items-center justify-center w-screen h-screen">
            <PuffLoadingIcon className="!w-80px h-80px" />
          </div>
        </div>
      )}
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="flex flex-1 w-full text-white-500">{children}</div>
      </div>
      <FixedWidget />
    </div>
  );
};
