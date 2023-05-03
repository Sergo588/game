import React, { forwardRef } from 'react';
import { Input, Button } from 'components';
import { copy } from 'helpers/text';
import { BUTTON_TYPES } from 'helpers/constants';
import CopyIcon from 'assets/icons/copy_white.svg';

const InputForm = forwardRef(({ className, title, inputStyles, withCopy = false, ...props }, ref) => {
  return (
    <div className={`w-full relative flex flex-col ${className}`}>
      {title && (
        <label className="mb-2.5 text-white sm:text-sm" htmlFor={props?.id}>
          {title}
        </label>
      )}
      <div className="w-full relative">
        <Input ref={ref} className={inputStyles} {...props} />
        {withCopy && props?.value && (
          <Button
            type={BUTTON_TYPES?.TRANSPARENT}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-3 h-full"
            onClick={() => copy(props?.value)}
          >
            <CopyIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
});

export { InputForm };
