import React from 'react';
import PuffLoadingIcon from 'assets/animations/puff.svg';

export const PlaceholderRound = ({ roundCount }) => {
  return Array.from(new Array(roundCount)).map((index) => (
    <div
      className="relative flex justify-center items-center overflow-hidden w-full bg-white-50 rounded-mini p-7.5 min-h-228px sm:min-h-318px sm:py-5"
      key={index}
    >
      <PuffLoadingIcon className="w-20 h-20 ml-auto mr-auto mt-auto mb-auto" />
    </div>
  ));
};
