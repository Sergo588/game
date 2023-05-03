import React from 'react';
import { DefaultLayout } from 'layouts';

const Error = ({ children, statusCode }) => {
  return <DefaultLayout showLeftMenu={!statusCode}>{children}</DefaultLayout>;
};

Error.Layout = ({ children }) => {
  return children;
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 400;
  return { statusCode };
};

export default Error;
