import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useClickOutside } from 'helpers/hooks/useClickOutside';
import TriangleIcon from 'assets/icons/triangle.svg';

const Select = ({ className, value, onChange, data, backNumber = true }) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef();

  const onOptionClicked = useCallback(
    (value) => () => {
      onChange(backNumber ? Number(value) : value);
      setOpened(false);
    },
    [onChange, value],
  );

  const toggling = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  useClickOutside(ref, () => {
    setOpened(false);
  });

  const activeOption = useMemo(() => {
    return data?.find((item) => item.value === String(value));
  }, [value, data]);

  return (
    <div className="relative w-full" ref={ref}>
      <div
        className={`relative w-full min-h-50px bg-line-gray border border-transparent rounded-mini py-3 px-5 text-white outline-none hover:cursor-pointer hover:bg-gray-500 
              ${opened && 'border !border-yellow'} 
              ${className}
            `}
        onClick={toggling}
      >
        <span>{activeOption?.title}</span>
        <TriangleIcon
          className={`absolute w-2.5 h-2.5 right-3 top-1/2 -translate-y-1/2 transition duration-300 ease-in-out ${
            opened && 'rotate-180'
          } `}
        />
      </div>
      {opened && (
        <div className="absolute top-full z-20 max-h-200px sm:max-h-250px w-full bg-dark-grey-500 rounded-mini overflow-auto mt-1">
          <ul className="w-full drop-shadow-md rounded-mini text-white outline-none border border-white-200 p-2 space-y-2">
            {data?.map((option, index) => (
              <li
                key={index}
                className="min-h-50px py-3 px-5 rounded-mini hover:cursor-pointer hover:bg-black-100"
                onClick={onOptionClicked(option?.value)}
              >
                {option?.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Select };
