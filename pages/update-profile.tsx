import React, { useState, useCallback } from 'react';
import Input from '@/components/Input';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UploadButton } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';

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
  };
}

export default function Home() {
  const { data: currentUser } = useCurrentUser();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [images, setImages] = useState<{
    fileUrl: string;
    fileKey: string;
  }[]>([]);

  const fileUrl = images.map(image => image.fileUrl);

  const updateUser = useCallback(async () => {
    if (!name || !password || name === "" || password === "") {
      window.location.href = '/';
    } else {
      try {
        const data = {
          name: name,
          password,
          image: fileUrl[0],
        };

        const response = await fetch(`/api/admin/update/user/${currentUser?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          // Successful update
          window.location.href = '/'; // Redirect to home page
        } else {
          // Handle error response
          const errorMessage = await response.text();
          alert(`Error: ${errorMessage}`);
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred while updating the profile.');
      }
    }
  }, [name, password, fileUrl, currentUser?.id]);
  
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">   
        <div className="bg-black bg-opacity-70 px-16 py-16 lg:max-w-md rounded-md w-full">
          <div className="flex flex-col gap-4">
            <div className="rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
              <img
                draggable={false}
                className="w-36 h-36 rounded-full object-cover m-4"
                src={fileUrl[0] || currentUser?.image}
                alt=""
              />
              <UploadButton
                endpoint="imageUpload"
                content={{
                  button: "Imagem de Perfil",
                }}
                appearance={{
                  button: {
                    // Customize the button appearance
                    backgroundColor: '#E32636',
                  },
                }}
                onClientUploadComplete={(res) => {
                  if (res) {
                    setImages(res);
                    const json = JSON.stringify(res);
                    console.log(json);
                  }
                }}
                onUploadError={(error: Error) => {
                  // Handle upload error
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
            <Input
              id="name"
              type="text"
              label="Usuario"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Input
              type="password"
              id="password"
              label="Senha"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              id="password_confirmation"
              label="Confirme a Senha"
              value={passwordConfirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
            />
            <button onClick={updateUser} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Atualizar Perfil
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
