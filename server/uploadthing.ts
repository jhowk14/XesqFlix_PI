import serverAuth from "@/libs/serverAuth";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
 
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
 
const f = createUploadthing();
 
const auth = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'GET') {
          return res.status(405).end();
        }
    
        const { currentUser } = await serverAuth(req, res);
    
        return res.status(200).json(currentUser);
      } catch (error) {
        console.log(error);
        return res.status(500).end();
      }
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
 
  // Takes a 4 2mb images and/or 1 256mb video
  mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, res }) => {
      // This code runs on your server before upload
      const user = await serverAuth(req, res) as { currentUser: User };
 
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.currentUser.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      await prismadb.user.update({
        where: {
          id: metadata.userId // Corrigido para metadata.userId
        },
        data: {
          image: file.url
        }
      }).then(response => console.log(response));
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;