import React from 'react';
import { TextButton } from '../Buttons/TextButton';

export const Section = () => {
  return (
    <>
      <div className="bg-[#131418] h-[600px] max-w-[1400px] px-[80px] rounded-3xl my-[80px] mx-auto">
        <div className="flex overflow-hidden">
          <div className="p-14 ">
            <p className="text-white text-[24px] ">Unlimited Streaming</p>
            <h3 className="text-white text-[68px] max-w-[500px] leading-none pt-4">
              Now It's Unlimited, Stream like Mafia
            </h3>
            <p className="font-normal mt-3 text-gray-400 text-[1.25rem]  text-left max-w-xl ml-0">
              Here at Flowbite we compare a wide range of destinations, flights
              and hotels, Here at Flowbite we compare a wide range of
              destinations, flights and hotels, Here at Flowbite we compare a
              wide range of destinations, flights and hotels
            </p>
            <div className="pt-6">
              <TextButton text="Check it out" />
            </div>
          </div>
          <img src="/images/live.svg" alt="" />
        </div>
      </div>
    </>
  );
};
