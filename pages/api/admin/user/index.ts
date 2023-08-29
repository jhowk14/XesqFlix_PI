import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json({
        data: users,
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
