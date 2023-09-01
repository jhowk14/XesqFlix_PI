import React, { useState, useCallback } from 'react';
import Input from '@/components/Input';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UploadButton } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import axios from 'axios';

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

        // Use o Axios para fazer a requisição PUT
        const response = await axios.put(`/api/admin/update/user/${currentUser?.id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // Successful update
          window.location.href = '/'; // Redirect to home page
        } else {
          // Handle error response
          const errorMessage = response.data.message; // Você deve ajustar isso com base na estrutura da resposta da sua API
          alert(`Error: ${errorMessage}`);
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred while updating the profile.');
      }
    }
    setImages([])
    setName("")
    setPassword("")
    setPasswordConfirm("")
  }, [name, password, fileUrl, currentUser?.id]);
  
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">   
        <div className="bg-black bg-opacity-70 px-6 py-6 lg:max-w-md rounded-md w-full">
          <div className="flex flex-col gap-3">
            <div className="rounded-md flex items-center justify-center border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
              <img
                draggable={false}
                className="w-20 h-20 rounded-full object-cover m-4"
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
