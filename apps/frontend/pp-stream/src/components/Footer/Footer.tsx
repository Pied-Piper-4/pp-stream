import React from 'react';

export const Footer = () => {
  return (
    <div>
      <hr />
      <div className="flex justify-between ">
        <div className="flex self-end">
          <img className="h-12" src="/images/logo.jpg" alt="" />
          <p>iedPiper</p>
        </div>
        <div className="flex space-x-2">
          <p>Appstore</p>
          <p>Playstore</p>
        </div>
      </div>
      <div className="flex justify-between ">
        <p>Copyright © ppstream 2022, Inc all rights received</p>
        <div className="flex space-x-2">
          <p>Appstore</p>
          <p>Playstore</p>
        </div>
      </div>
    </div>
  );
};
