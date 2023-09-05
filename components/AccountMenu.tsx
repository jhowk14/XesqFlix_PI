import { signOut } from 'next-auth/react';
import React from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import Link from 'next/link';

const images = [
  '/images/default-1.png',
  '/images/default-3.png',
  '/images/default-2.png',
  '/images/default-4.png'
]
const imgSrc = images[Math.floor(Math.random() * 4)];

interface AccountMenuProps {
  visible?: boolean;
}



const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src={currentUser?.image || imgSrc} alt="" />
          <Link href="/update-profile">
          <p className="text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
          </Link>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
        Sair do XesqFlix
      </div>
      <div className="px-3 text-center text-white text-sm hover:underline">
        <Link href="/update-profile"> 
        Atualizar Perfil
        </Link>
      </div>
      <div className="px-3 text-center text-white text-sm hover:underline">
        <Link href="/profiles"> 
        Perfil
        </Link>
      </div>
      {currentUser?.admin ? <div className="px-3 text-center text-white text-sm hover:underline">
        <Link href="/create-movie"> 
        Cadastrar Filme
        </Link>
      </div> : ""}
    </div>
  )
}

export default AccountMenu;
