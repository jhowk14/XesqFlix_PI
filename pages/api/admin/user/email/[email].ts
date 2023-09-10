
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    try {
      if (req.method !== 'GET') {
        return res.status(405).end();
      }
      await serverAuth(req, res);
      const { email } = req.query
      const users = await prismadb.user.findUnique({
        where: {email: String(email)}
      });
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ocorreu um erro ao obter os usuários.',
      });
    }
}