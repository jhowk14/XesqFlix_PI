
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
    const { id } = req.query
    const { description, genre, duration, thumbnailUrl, title, videoUrl } = req.body;
      


    const updateUser = await prismadb.movie.update({
        where: {
          id: String(id)
        },
        data: {
            description,
            genre,
            duration,
            thumbnailUrl,
            title,
            videoUrl
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
