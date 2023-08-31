import serverAuth from "@/libs/serverAuth";
import { User } from "@prisma/client";

 
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug

  videoImageUpload: f({
    image: { maxFileSize: "32MB", maxFileCount: 1},
    video: { maxFileSize: "1024GB", maxFileCount: 1}
  })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for movieId:", file.url);
 

    }),
    videoUpload: f({
      video: { maxFileSize: "1024GB", maxFileCount: 1}
    })
      // Set permissions and file types for this FileRoute
      .onUploadComplete(async ({ file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log("Upload complete for movieId:", file.url);
   
  
      }),

  imageUpload: f({
    image: { maxFileSize: "32MB", maxFileCount: 4 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, res }) => {
      // This code runs on your server before upload
      const user = await serverAuth(req, res) as { currentUser: User}
 
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
      }).then(Response => console.log(Response));
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;