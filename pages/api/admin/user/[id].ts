
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const users = await prismadb.user.findUnique({
        where: {id: String(id)}
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
  else {
    return res.status(405).json({
      error: 'Método não permitido.',
    });
  }
}
