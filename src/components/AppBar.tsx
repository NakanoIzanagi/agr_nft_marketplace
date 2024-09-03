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
interface AppBarProps{
  showSidebar:boolean;
  setShowSidebar:(val: boolean) => void;

}
export const AppBar: FC<AppBarProps> = ({showSidebar, setShowSidebar}) => {
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
