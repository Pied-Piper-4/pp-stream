import React from 'react';

export const VideoFuture = () => {
  return (
    <>
      <div className="grid grid-cols-2 max-w-[1400px] px-[80px] py-[50px]">
        {/* <h3 className="text-[58px] text-center pt-[100px]">
          Future of live Streaming
        </h3> */}
        <div>
          <img src="/images/banner.jpg" alt="why use piperstream" />
          <h3 className="text-[40px] text-semibold pt-[40px]">
            Why Use PPStream
          </h3>
          <p className="font-normal mt-3 text-gray-400 text-[1.25rem]  text-left w-3/5 ml-0">
            all the straming features are here so don't you worry, we have got
            you covered
          </p>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-14">
            <div className="h-[300px]  bg-[#A5F1E9] rounded-[80px]">
              <div className="bg-white h-[100px] w-[100px] rounded-full mt-[40px] mx-auto">
                <img
                  className="p-4"
                  src="/images/icons/dollar.png"
                  alt="free"
                />
              </div>
              <h4 className="mx-auto text-gray-900 text-xl font-normal w-3/5 text-center pt-2">
                Lifetime Free Access
              </h4>
              <p className="font-normal mt-3 text-gray-700 text-sm mx-auto text-center w-3/5 ">
                PPStream is completely free and open to use
              </p>
            </div>
            <div className="h-[300px]  bg-[#B1D7B4] rounded-[80px]">
              <div className="bg-white h-[100px] w-[100px] rounded-full mt-[40px] mx-auto">
                <img
                  className="p-4"
                  src="/images/icons/dollar.png"
                  alt="free"
                />
              </div>
              <h4 className="mx-auto text-gray-900 text-xl font-normal w-3/5 text-center pt-2">
                Lifetime Free Access
              </h4>
              <p className="font-normal mt-3 text-gray-700 text-sm mx-auto text-center w-3/5 ">
                PPStream is completely free and open to use
              </p>
            </div>
            <div className="h-[300px]  bg-[#FFB4B4] rounded-[80px]">
              {' '}
              <div className="bg-white h-[100px] w-[100px] rounded-full mt-[40px] mx-auto">
                <img
                  className="p-4"
                  src="/images/icons/dollar.png"
                  alt="free"
                />
              </div>
              <h4 className="mx-auto text-gray-900 text-xl font-normal w-3/5 text-center pt-2">
                Lifetime Free Access
              </h4>
              <p className="font-normal mt-3 text-gray-700 text-sm mx-auto text-center w-3/5 ">
                PPStream is completely free and open to use
              </p>
            </div>
            <div className="h-[300px]  bg-[#B1D7B4] rounded-[80px]">
              <div className="bg-white h-[100px] w-[100px] rounded-full mt-[40px] mx-auto">
                <img
                  className="p-4"
                  src="/images/icons/dollar.png"
                  alt="free"
                />
              </div>
              <h4 className="mx-auto text-gray-900 text-xl font-normal w-3/5 text-center pt-2">
                Lifetime Free Access
              </h4>
              <p className="font-normal mt-3 text-gray-700 text-sm mx-auto text-center w-3/5 ">
                PPStream is completely free and open to use
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
