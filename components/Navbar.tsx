import React, { useCallback, useEffect, useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import useCurrentUser from '@/hooks/useCurrentUser';

import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import Link from 'next/link';

const images = [
  '/images/admin.png',
  '/images/digao.png',
  '/images/jhow.png',
  '/images/moy.png',
  '/images/raul.png',
  '/images/Wincler.png'
]

const TOP_OFFSET = 66;
const imgSrc = images[Math.floor(Math.random() * 4)];
const Navbar = () => {
  const { data: currentUser } = useCurrentUser();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <Link href="/">
        <img src="/images/logo.png" className="h-24 hidden lg:block" alt="Logo" />   
        <img src="/favicon.ico" className="h-7 lg:hidden" alt="Logo" />
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active href='/' />
          <NavbarItem label="Series" href='/'/>
          <NavbarItem label="Films" href='/'/>
          <NavbarItem label="New & Popular" href='/'/>
          <NavbarItem label="My List" href='/'/>
          <NavbarItem label="Browse by Languages" href='/'/>
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <MagnifyingGlassIcon className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon className="w-6" />
          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src={currentUser?.image || imgSrc} alt="" />
            </div>
            <ChevronDownIcon className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
