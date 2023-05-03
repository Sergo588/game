import React from 'react';
import { RoundShape, TextRow } from 'react-placeholder/lib/placeholders';

export const Placeholders = () => {
  return new Array(8).fill({}).map((item, itemIndex) => (
    <div key={itemIndex} className="flex items-center justify-between py-7.5 border-line-gray border-b w-full sm:py-5">
      <div className="flex items-center justify-start w-full">
        <div className="flex w-10 h-10 items-center justify-center rounded-full">
          <RoundShape style={{ height: 24, width: 24, margin: 'auto' }} color="rgba(0,0,0, 0.4)" />
        </div>
        <div className="flex ml-5 items-center w-full">
          <TextRow style={{ margin: 0 }} color="rgba(0,0,0, 0.4)" className="rounded-mini" />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
      </div>
    </div>
  ));
};
