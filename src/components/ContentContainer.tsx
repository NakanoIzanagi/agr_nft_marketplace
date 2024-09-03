import { FC } from 'react';
import Link from "next/link";
import Text from './Text';
import NavElement from './nav-element';
import { navigation } from 'utils/navbar';
interface Props {
  children: React.ReactNode;
  showSidebar: boolean;
  setShowSidebar: (val: boolean) => void;
}

export const ContentContainer: React.FC<Props> = ({ children, showSidebar, setShowSidebar }) => {

  return (
    <div className="flex-col justify-between flex-1 drawer h-52">
      <input id="my-drawer" type="checkbox" className="grow drawer-toggle" />
      <div className="flex flex-col items-center z-0 justify-between drawer-content bg-[url('/bac.png')] bg-cover bg-center" >
        <div className="absolute inset-0 pointer-events-none top-20 bg-gradient-to-b from-black/30 via-transparent to-black/70" ></div>
        {children}
      </div>
      {/* SideBar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="gap-6 drawer-overlay" onClick={() => { setShowSidebar(false) }}></label>

        <ul className="items-center gap-10 p-4 overflow-y-auto menu w-80 bg-base-100 sm:flex">
          <li>
            <Text variant="heading" className='mt-10 font-extrabold tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-br from-[#69f869] to-[#ff9409]'>Menu</Text>
          </li>
          {navigation.map((navItem) => (<li>
            <NavElement
              label={navItem.name}
              href={navItem.href}
            />
          </li>))}

        </ul>
      </div>
    </div>
  );
};
