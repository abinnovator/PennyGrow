'use client'
import React, { useState } from 'react';
import SignUpButton from './SignUpButton';
import SignInButton from './SignInButton';
import GetStartedButton from './GetStartedButton';

const HeroSection = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className="w-full px-6 pb-12 antialiased bg-white tails-selected-element">
      <div className="mx-auto max-w-7xl">
        <nav className="relative z-50 h-24 select-none">
          <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2 lg:px-0">
            <div className="flex items-center justify-start w-1/4 h-full pr-4">
              <a href="#_" className="inline-block py-4 md:py-0">
                <span className="p-1 text-xl font-black leading-none text-gray-900">PennyGrow</span>
              </a>
            </div>
            <div
              className={`top-0 left-0 items-start ${
                showMenu ? 'flex fixed' : 'hidden'
              } w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex`}
            >
              <div className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                <a
                  href="#_"
                  className="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden"
                >
                  tails<span className="text-indigo-600">.</span>
                </a>
                <div className="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                  <a
                    href="/"
                    className="inline-block w-full py-2 mx-0 ml-6 font-medium text-left text-indigo-600 md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center"
                  >
                    Home
                  </a>
                  <a
                    href="#_"
                    className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
                  >
                    Contact
                  </a>
                </div>
                <div className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                  <a
                    href="/sign-in"
                    className="w-full px-3 py-2 mr-0 text-gray-700 md:mr-2 lg:mr-3 md:w-auto"
                  >
                    <SignInButton />
                  </a>
                  <a
                    href="/sign-up"
                    className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white md:px-3 md:w-auto lg:px-5 focus:outline-none"
                  >
                    <SignUpButton />
                  </a>
                </div>
              </div>
            </div>
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100"
            >
              {!showMenu ? (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="container max-w-lg px-4 py-32 mx-auto mt-px text-left md:max-w-none md:text-center">
          <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
            <span className="inline md:block">Manage your finances</span>{' '}
            <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
              Save more money
            </span>
          </h1>
          <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
            From textbooks to saving accounts Lets make it happen!
          </div>
          <div className="flex flex-col items-center mt-12 text-center">
            <span className="relative inline-flex w-full md:w-auto">
              <a
                href="/sign-up"
                type="button"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <GetStartedButton />
              </a>
            </span>
            <a href="#_" className="mt-3 text-sm text-indigo-500">
              Learn More
            </a>
          </div>
        </div>
        {/* End Main Hero Content */}
      </div>
    </section>
  );
};

export default HeroSection;
