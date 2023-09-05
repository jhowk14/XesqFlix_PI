import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

const images = [
  '/images/default-1.png',
  '/images/default-3.png',
  '/images/default-2.png',
  '/images/default-4.png'
]

interface UserCardProps {
  name: string;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const UserCard: React.FC<UserCardProps> = ({ name }) => {
  const { data: currentUser } = useCurrentUser();
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <img draggable={false} className="w-max h-max object-contain" src={currentUser?.image || imgSrc} alt="" />
        </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
   </div>
  );
}

const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push('/');
  }, [router]);
  const updateRote = useCallback(() => {
    router.push('/update-profile');
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Quem esta Assistindo?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div className="gap-10 flex flex-col items-center justify-center">
            <div  onClick={() => selectProfile()}>
            <UserCard name={currentUser?.name} />
            </div>
            <button onClick={() => updateRote()} className="text-white bg-black p-3 text-lg">Atualizar Perfil</button>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default App;
