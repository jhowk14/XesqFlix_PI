
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
      if (req.method !== 'GET') {
        return res.status(405).end();
      }
      const { email } = req.query
      console.log(email)
      const users = await prismadb.user.findUnique({
        where: {email: String(email)}
      });
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ocorreu um erro ao obter os usuários. '+error,
      });
    }
}