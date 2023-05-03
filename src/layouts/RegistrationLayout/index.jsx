import React from 'react';

export const RegistrationLayout = ({ children }) => {
  const stylesProps = { backgroundImage: "url('/img/registration/bg.png')", backgroundSize: 'cover' };

  return (
    <div
      style={stylesProps}
      className="relative flex flex-col bg-main-bg items-center justify-center min-h-screen min-w-full overflow-hidden text-white-500"
    >
      <div className="flex w-full h-full justify-center max-w-desktop-full px-10 sm:px-5">{children}</div>
    </div>
  );
};
