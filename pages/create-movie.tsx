import React, { useState, useCallback } from 'react';
import Input from '@/components/Input';
import { UploadButton } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import axios from 'axios';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const {data} = await axios.get(`/api/admin/user/email/${session?.user?.email}`)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  else if (!data.data.admin || data.data.admin == false){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  };
}

export default function CreateMovie() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [images, setImages] = useState<{
    fileUrl: string;
    fileKey: string;
  }[]>([]);
  const [video, setVideo] = useState<{
    fileUrl: string;
    fileKey: string;
  }[]>([]);

  const createMovie = useCallback(async () => {
    try {
      const response = await axios.post(`/api/admin/movie/create`, {
        title,
        description,
        genre,
        duration,
        thumbnailUrl: images[0].fileUrl,
        videoUrl: video[0].fileUrl
      });

      if (response.status === 200) {
        // Successful creation
        window.location.href = '/'; // Redirect to home page
      } else {
        // Handle error response
        const errorMessage = response.data.message; // Ajuste com base na estrutura da resposta da API
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while creating the movie.');
    }
    
    // Limpar os campos após a criação
    setDescription("");
    setDuration("");
    setGenre("");
    setTitle("");
    setImages([]);
    setVideo([]);
  }, [title, description, genre, duration, images, video]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">   
        <div className="bg-black bg-opacity-70 px-10 py-10 lg:max-w-md rounded-md w-full">
          <div className="flex flex-col gap-4">
            <div className="rounded-md flex items-center justify-center gap-3 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
              <UploadButton
                endpoint="videoImageUpload"
                content={{
                  button: "Enviar Imagem",
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
              <UploadButton
                endpoint="videoUpload"
                content={{
                  button: "Enviar video",
                }}
                appearance={{
                  button: {
                    // Customize the button appearance
                    backgroundColor: '#E32636',
                  },
                }}
                onClientUploadComplete={(res) => {
                  if (res) {
                    setVideo(res);
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
              id="title"
              type="text"
              label="Titulo"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <Input
              type="genre"
              id="text"
              label="Genero"
              value={genre}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)}
            />
            <Input
              type="text"
              id="duration"
              label="Duração"
              value={duration}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(e.target.value)}
            />
            <Input
              type="text"
              id="description"
              label="Descrição"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
            
            <button onClick={createMovie} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                Criar Filme
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
