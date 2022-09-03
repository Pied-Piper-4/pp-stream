import React from 'react';

export const Footer = () => {
  return (
    <footer className=" p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 border border-gray-300 max-w-[1400px]">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{' '}
        <a href="https://pp-stream.live" className="hover:underline">
          PP-Stream
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            Terms and Conditions
          </a>
        </li>
      </ul>
    </footer>
  );
};
