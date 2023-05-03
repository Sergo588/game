import React from 'react';

export const Wrapper = ({ children, wrapperStyle = '', className = '' }) => {
  return <div className={`bg-gray-950 rounded-small flex relative ${wrapperStyle} ${className}`}>{children}</div>;
};
