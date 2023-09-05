import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    
    const { id } = req.query;
    const { name, password, image, admin } = req.body;
      
    const hashedPassword = await bcrypt.hash(password, 12);

    if (typeof id !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!id) {
      throw new Error('Missing Id');
    }

    const movies = await prismadb.user.update({
      where: {
        id: id
      },
      data: {
          name,
          hashedPassword,
          image,
          admin,
          emailVerified: new Date(),
        }
    });

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
