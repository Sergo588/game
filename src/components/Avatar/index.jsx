import React from 'react';
import { AvatarIcon } from 'assets/avatar.svg';

export const Avatar = ({ photo }) => {
  const stylesProps = photo ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover' } : {};

  return (
    <div className="flex-shrink-0 relative w-100px h-100px rounded-full" style={stylesProps}>
      {!photo && <AvatarIcon />}
    </div>
  );
};
