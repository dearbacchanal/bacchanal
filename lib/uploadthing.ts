import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app
export const ourFileRouter = {
  // Image uploader for book pages
  bookImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // You can add authentication here if needed
      // For now, we'll allow all uploads

      // Return metadata to be available in onUploadComplete
      return {
        userId: "user",
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload
      console.log("Upload complete for user:", metadata.userId);
      console.log("File info:", file);

      // Return data to be sent to the client
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;