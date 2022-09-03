import React from 'react';
import { AppStore } from '../Buttons/AppStore';
import { Playstore } from '../Buttons/Playstore';

export const Banner = () => {
  return (
    <>
      <div className="max-w-[1400px] px-[80px] mx-auto ">
        <div className="flex pb-[80px]">
          <div className=" max-w-2xl justify-start ml-0 mt-24">
            <h1 className="text-[68px] text-left font-extrabold leading-tight ">
              The Best
              <span className="text-[68px] text-transparent text-[] bg-clip-text bg-gradient-to-r from-[#B1D7B4] to-[#FAD9A1]">
                {' '}
                Video Podcast{' '}
              </span>
              for tech enthusiastics.
            </h1>
            <p className="font-normal mt-3 text-gray-400 text-[1.25rem]  text-left max-w-xl ml-0">
              Here at Flowbite we compare a wide range of destinations, flights
              and hotels
            </p>
            <span className="flex ml-0 space-x-8 mt-6 justify-	">
              <Playstore />
              <AppStore />
            </span>
            <div className="flex divide-x-2 space-x-8  pt-14">
              <div className="flex -space-x-4">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="/images/avatar1.jpeg"
                  alt=""
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="/images/avatar2.jpeg"
                  alt=""
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  src="/images/avatar4.jpeg"
                  alt=""
                />
                <a
                  className="flex justify-center items-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
                  href="#"
                >
                  +99
                </a>
              </div>
              {/* <div className="divide-x-4"></div> */}
              <div className="pl-6">
                <img
                  className=""
                  src="images/trustpilot-dark.svg"
                  alt="trustpilot"
                />
                <p className="text-gray-600 text-sm">
                  Rated Best Over <span className="text-gray-900">20+ </span>
                  Reviews
                </p>
              </div>
            </div>
          </div>
          <div className="self-center">
            <img src="/images/banner.jpg" alt="banner" className="" />
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};
