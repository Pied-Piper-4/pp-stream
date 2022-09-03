import { useState } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

// import Sidebar from "./Sidebar";

export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-[80px]">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              {/* <span className="text-xl text-gray-700 font-semibold">
                ppstream
              </span> */}
              <img src="/images/logo.jpg" alt="logo" className="h-10" />
              {/* <span> | </span> */}
              {/* <div className="flex self-center space-x-8">
                <h3>Home</h3>
                <h3>About</h3>
                <h3>Community</h3>
              </div> */}
            </div>

            <h3>People</h3>
            <button
              type="button"
              className="text-gray-900 flex self-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            >
              <p>Get Started</p>{' '}
              <BiRightArrowAlt className="self-center text-4" />
            </button>

            {/* <div className="flex space-x-4 text-gray-900">
              <a href="#">Dashboard</a>
              <a href="#">About</a>
              <a href="#">Projects</a>
              <a href="#">Contact</a>
            </div> */}
          </div>
        </div>
      </nav>
    </>
  );
};
