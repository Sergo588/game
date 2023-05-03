import React from 'react';
import { Header, Footer } from 'components';

export const InviteLayout = ({ children }) => {
  return (
    <div className="relative flex justify-center items-center w-full">
      <div className="relative flex flex-col items-center w-full h-full">
        <Header customWidth="max-w-desktop-invite" />
        <div className="flex flex-1 w-full text-white-500">{children}</div>
        <Footer className="max-w-desktop-invite z-three" />
        <img className="absolute bottom-0 right-0" src="/img/invite/blur_4.png" alt="blur4" />
      </div>
    </div>
  );
};
