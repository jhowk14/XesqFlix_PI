import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
    const { id } = req.query
    const { email, name, password, image } = req.body;
      
    const hashedPassword = await bcrypt.hash(password, 12);

    const updateUser = await prisma.user.update({
        where: {
          id: String(id)
        },
        data: {
            name,
            hashedPassword,
            image,
            emailVerified: new Date(),
          }
      })

      return res.status(200).json({
        data: updateUser,
      });

    } catch (error) {
      return res.status(500).json({
        error: 'Ocorreu um erro ao obter os usuários.',
      });

    }
  } 
  else {
    return res.status(405).json({
      error: 'Método não permitido.',
    });
  }
}
