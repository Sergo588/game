import React from 'react';

export const Switcher = ({ title, onChange, checked = false }) => {
  return (
    <div className="flex justify-end space-x-5 rtl:space-x-reverse">
      <span>{title}</span>
      <div className="flex justify-center">
        <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            onChange={onChange}
            id="default-toggle"
            className="sr-only peer"
            checked={checked}
          />
          <div className="w-11 h-6 bg-grey-160 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow" />
        </label>
      </div>
    </div>
  );
};
