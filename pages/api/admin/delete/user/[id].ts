
import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
    const { id } = req.query

    const updateUser = await prismadb.user.delete({
        where: {
          email: String(id)
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
