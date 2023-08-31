import React, { useState } from 'react';
import Input from '@/components/Input';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UploadButton } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

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

  const updateUser = async () => {
    try {
      const response = await fetch(`/api/admin/update/user/${currentUser?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
          image: images[0].fileUrl, // Assuming you're only using one image
        }),
      });

      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-black bg-opacity-70 px-16 py-16 lg:w-2/5 lg:max-w-md rounded-md w-full">
        <div className="flex flex-col gap-4">
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
          <UploadButton
            endpoint="videoImageUpload"
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
          <button onClick={updateUser} className="btn-primary bg-blue-600 rounded-sm">
            Update User
          </button>
        </div>
      </div>
    </div>
  );
}
