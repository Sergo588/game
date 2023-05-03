import React from 'react';

export const List = () => {
  const numPages = 16;
  const imgPath = '/img/pdfPictures/';
  return (
    <div className="flex flex-col space-y-5">
      {Array.from(new Array(numPages), (el, index) => (
        <img src={`${imgPath}${index + 1}.png`} />
      ))}
    </div>
  );
};
