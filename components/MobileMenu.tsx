import Link from 'next/link';
import React from 'react';

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <Link href="/">
          <div className="px-3 text-center text-white hover:underline">
            Home
          </div>
        </Link>
        <Link href="/my-list">
          <div className="px-3 text-center text-white hover:underline">
            My List
          </div>
        </Link>
        <Link href="/profiles">
          <div className="px-3 text-center text-white hover:underline">
            Perfil
          </div>
        </Link>
        <Link href='/update-profile'>
          <div className="px-3 text-center text-white hover:underline">
            Atualizar Perfil
          </div>
        </Link>
      </div>
    </div>
  )
}

export default MobileMenu;
