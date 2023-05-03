import React from 'react';
import { DefaultLayout } from 'layouts';
import { BreadCrumbs } from 'components';
import { List } from 'features/information/list';

const About = () => {
  const breadCrumbsProps = {
    title: 'Information',
  };

  return (
    <DefaultLayout withPadding>
      <BreadCrumbs {...breadCrumbsProps} />
      <div className="flex flex-col flex-1 w-full !mt-2.5 sm:px-5">
        <List />
      </div>
    </DefaultLayout>
  );
};

About.Layout = ({ children }) => {
  return children;
};

export default About;
