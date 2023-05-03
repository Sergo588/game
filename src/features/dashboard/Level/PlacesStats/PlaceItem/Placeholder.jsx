import React from 'react';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { Wrapper } from './Wrapper';

export const PlaceItemPlaceholder = () => {
  return (
    <Wrapper className="h-full w-full m-3 sm:m-1.5">
      <PuffLoadingIcon className="h-10 w-10" />
    </Wrapper>
  );
};
