import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const ObserverWrapper = ({ children, callback, options = {}, isNeedOneCall = false, userId }) => {
  const [callbackIsCalled, setCallbackIsCalled] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    ...options,
  });

  useEffect(() => {
    setCallbackIsCalled(false);
  }, [userId]);

  useEffect(() => {
    if (inView && !isNeedOneCall && !userId) {
      callback();
    }

    if (inView && isNeedOneCall && !callbackIsCalled && !userId) {
      setCallbackIsCalled(true);
      callback();
    }

    if (userId && inView && isNeedOneCall && !callbackIsCalled) {
      setCallbackIsCalled(true);
      callback();
    }
  }, [inView, userId]);

  return (
    <div className="w-full" ref={ref}>
      {children}
    </div>
  );
};
