import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { 
      description,
      genre,
      duration,
      thumbnailUrl,
      title,
      videoUrl 
    } = req.body;

    const creteMovie = await prismadb.movie.create({
      data: {
          description,
          genre,
          duration,
          thumbnailUrl,
          title,
          videoUrl
        }
    })

    return res.status(200).json(creteMovie);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
