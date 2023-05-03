import { useCallback, useEffect, useState } from 'react';

const mobileSize = 767;
const tabletSize = 1121;

export const useDetectChangeWindow = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const onChangeSize = useCallback(() => {
    setIsMobile(window.innerWidth <= mobileSize);
    setIsTablet(window.innerWidth <= tabletSize && window.innerWidth >= mobileSize);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth <= mobileSize);
    setIsTablet(window.innerWidth <= tabletSize && window.innerWidth >= mobileSize);

    window.addEventListener('resize', onChangeSize);

    return () => {
      window.removeEventListener('resize', onChangeSize);
    };
  }, [onChangeSize]);

  return {
    isMobile,
    isTablet,
  };
};
