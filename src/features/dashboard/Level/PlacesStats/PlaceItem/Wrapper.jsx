import React from 'react';

export const Wrapper = ({ className, children }) => {
  return (
    <div
      className={`flex flex-col py-5 px-6 bg-dark-grey rounded-small w-full space-y-2.5 max-w-320px sm:max-w-158px sm:!p-4 ${className}`}
    >
      {children}
    </div>
  );
};
