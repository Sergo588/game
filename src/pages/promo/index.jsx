import React from 'react';
import { DefaultLayout } from 'layouts';
import { BreadCrumbs } from 'components';
import { Tabs } from 'features/promo/Tabs';
import { DOCUMENTS_IN_GAME } from 'helpers/constants';

const Promo = () => {
  const breadCrumbsProps = {
    title: 'Promo',
  };

  const promoMatrials = [
    {
      title: 'Presentations',
      sectionSubtitle: '',
      files: [
        {
          lang: 'en',
          title: 'PDF Presenatation (English)',
          url: DOCUMENTS_IN_GAME?.presEN,
        },
        {
          lang: 'ru',
          title: 'PDF Presenatation (Russian)',
          url: DOCUMENTS_IN_GAME?.presRU,
        },
        {
          lang: 'es',
          title: 'PDF Presenatation (Spanish)',
          url: DOCUMENTS_IN_GAME?.presES,
        },
        {
          lang: 'hi',
          title: 'PDF Presenatation (Hindi)',
          url: DOCUMENTS_IN_GAME?.presHI,
        },
        {
          lang: 'ur',
          title: 'PDF Presenatation (Urdu)',
          url: DOCUMENTS_IN_GAME?.presUR,
        },
        {
          lang: 'id',
          title: 'PDF Presenatation (Indonesian)',
          url: DOCUMENTS_IN_GAME?.presID,
        },
      ],
    },
    {
      title: 'BrandBook',
      sectionSubtitle: '',
      files: [
        {
          title: 'BrandBook pdf',
          url: DOCUMENTS_IN_GAME?.brandBook,
        },
      ],
    },
  ];

  return (
    <>
      <DefaultLayout withPadding>
        <BreadCrumbs {...breadCrumbsProps} />
        <Tabs data={promoMatrials} />
      </DefaultLayout>
    </>
  );
};

Promo.Layout = ({ children }) => {
  return children;
};

export default Promo;
