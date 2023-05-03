import React from 'react';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { Wrapper } from './Wrapper';

export const PlaceholderLevelCard = () => {
  return (
    <Wrapper className="flex justify-center items-center w-full h-full border border-transparent max-w-309px h-187px m-2.5 sm:m-2 sm:h-205px sm:max-w-158px">
      <PuffLoadingIcon className="h-10 w-10" />
    </Wrapper>
  );
};
