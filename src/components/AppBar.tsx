import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import NavElement from './nav-element';
import { navigation } from '../utils/navbar';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
interface AppBarProps {
  showSidebar: boolean;
  setShowSidebar: (val: boolean) => void;

}
export const AppBar: FC<AppBarProps> = ({ showSidebar, setShowSidebar }) => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  return (
    <div className="bg-[#0e160e] border-b shadow-lg border-zinc-600">
      <div className="container flex items-center justify-between h-20 px-5 mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-5 max-md:gap-1 ">
          <Image src="/logo.svg" alt="solana icon" width={156} height={96} />
          <div className="flex space-x-4 max-lg:hidden">
            {navigation.map((item) => (
              <div key={item.name} className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                <NavElement label={item.name} href={item.href} aria-current={item.current ? 'page' : undefined} />
              </div>
            ))}
          </div>
        </div>
        {/* Wallet Button and Hamburger */}
        <div className="flex items-center gap-6 max-md:gap-1">
          <WalletMultiButtonDynamic className="text-lg bg-gray-900 max-md:text-sm btn btn-ghost btn-sm rounded-btn hover:bg-gray-700 max-md:px-1" />
          <div className='flex items-center space-x-5 max-lg:ml-auto'>
            <Link href={'/user'}>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
              className="cursor-pointer hover:fill-[#a86d15] fill-[#e67b50] inline">
              <circle cx="10" cy="7" r="6" data-original="#000000" />
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000" />
            </svg>
              </Link>

            <span className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                className="cursor-pointer hover:fill-[#a86d15] fill-[#e67b50]  inline" viewBox="0 0 512 512">
                <path
                  d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                  data-original="#000000"></path>
              </svg>
              <span className="absolute top-0 left-auto px-1 py-0 -ml-1 text-xs text-white bg-red-500 rounded-full">0</span>
            </span>

            <button id="toggleOpen" className='lg:hidden !ml-7'>
              <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <label htmlFor="my-drawer" className="z-30 items-center justify-between mr-6 lg:hidden max-md:mx-0 btn-gh" onClick={() => setShowSidebar(!showSidebar)} >
            <div
              className="lg:hidden max-md:px-0 max-md:mx-0 ml-5 p-2 rounded-lg bg-[#1e293b] h-10 w-10 hover:bg-[#222b3a] transition duration-300 ease-in-out shadow-lg flex items-center justify-center"
            >
              {!showSidebar ? (
                <div className="space-y-2.5">
                  <div className="h-0.5 w-8 bg-white rounded" />
                  <div className="h-0.5 w-8 bg-white rounded" />
                  <div className="h-0.5 w-8 bg-white rounded" />
                </div>
              ) : (
                <div className="relative">
                  <div className="h-0.5 w-8 bg-white transform rotate-45 rounded" />
                  <div className="h-0.5 w-8 bg-white transform -rotate-45 mt-[-2px] rounded" />
                </div>
              )}
            </div>
            {/* <button className="relative group">
              <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                <div className="flex flex-col pt-1 justify-between w-[20px] h-[20px] transform transition-all duration-100 origin-center overflow-hidden group-focus:rotate-90">
                  <div className="bg-white h-[2px] w-7 transform transition-all duration-300 group-focus:w-0 delay-75"></div>
                  <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:w-0 delay-75"></div>
                  <div className="bg-white h-[2px] w-7 transform transition-all duration-300 group-focus:w-0 delay-75"></div>
                  <div className="w-0 h-0 overflow-hidden transition-all duration-300 delay-150 transform group-focus:w-12 group-focus:h-12 group-focus:-mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white w-6h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button> */}
          </label>
        </div>
      </div>
    </div>
  );
};
