import React from 'react';
import { TextRow } from 'react-placeholder/lib/placeholders';

export const Placeholders = ({ countColumns }) => {
  return Array.from(new Array(3))
    .fill({})
    .map((value, index) => (
      <tr className="border-b border-white-100 last:border-b-0" key={index}>
        {Array.from(new Array(countColumns)).map((v, indexMap) => (
          <td className="p-6 xl:p-4 lg:p-6 text-left whitespace-nowrap flex-shrink-0 w-20 h-20" key={indexMap}>
            <div className="text-white font-medium text-xs">
              <TextRow color="rgba(0,0,0, 0.4)" className="rounded-mini" />
            </div>
          </td>
        ))}
      </tr>
    ));
};
