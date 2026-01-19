"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useUploadThing } from "@/lib/uploadthing-client";
import { toast } from "sonner";
import { useBookData } from "@/components/book/BookDataContext";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/hooks/useAuthModal";

interface ImageBoxProps {
  id: string;
  rotation: string;
  size?: "default" | "large" | "xlarge" | "horizontal" | "vertical" | "tall-vertical" | "portrait" | "portrait-large";
  showWhiteBar?: boolean;
  placeholderText?: string;
  className?: string;
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  id,
  rotation,
  size = "default",
  showWhiteBar = true,
  placeholderText,
  className = ""
}) => {
  const { data, isReadOnly } = useBookData();
  const { data: session } = useSession();
  const { openModal } = useAuthModal();
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("bookImageUploader", {
    onClientUploadComplete: async (files) => {
      if (files && files[0]) {
        const uploadedUrl = files[0].url;

        // Save the URL to MongoDB
        try {
          const response = await fetch("/api/book-images", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageId: id,
              imageUrl: uploadedUrl,
            }),
          });

          if (response.ok) {
            setImage(uploadedUrl);
            toast.success("Image uploaded successfully!");
          } else {
            throw new Error("Failed to save image URL");
          }
        } catch (error) {
          console.error("Error saving image URL:", error);
          toast.error("Failed to save image. Please try again.");
        }
      }
      setIsUploading(false);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
      setIsUploading(false);
    },
  });

  // Effect to sync with context data or fetch if needed
  useEffect(() => {
    // If we have data from context (especially in read-only mode), use it
    if (data.images && data.images[id]) {
      setImage(data.images[id]);
      return;
    }

    // Only self-fetch if NOT in read-only mode (edit mode), 
    // and we haven't already got the image from context.
    if (!isReadOnly) {
      const fetchImage = async () => {
        try {
          const response = await fetch("/api/book-images");
          if (response.ok) {
            const result = await response.json();
            if (result.images && result.images[id]) {
              setImage(result.images[id]);
            }
          }
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      fetchImage();
    }
  }, [id, data.images, isReadOnly]);

  const handleBoxClick = () => {
    if (isReadOnly) return;

    if (!session) {
      openModal("signin");
      return;
    }

    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("Image size must be less than 4MB");
        return;
      }

      setIsUploading(true);
      toast.info("Uploading image...");

      try {
        await startUpload([file]);
      } catch (error) {
        console.error("Error starting upload:", error);
        toast.error("Failed to upload image");
        setIsUploading(false);
      }
    }
  };

  const handleDeleteImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isReadOnly) return;

    try {
      const response = await fetch(`/api/book-images?imageId=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setImage(null);
        toast.success("Image deleted successfully!");
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "large":
        return {
          box: "h-28 w-28 sm:h-36 sm:w-36 lg:h-[200px] lg:w-[200px]",
          bar: "w-28 sm:w-36 lg:w-[200px]"
        };
      case "xlarge":
        return {
          box: "h-32 w-32 sm:h-40 sm:w-40 lg:h-[250px] lg:w-[250px]",
          bar: "w-32 sm:w-40 lg:w-[250px]"
        };
      case "horizontal":
        return {
          box: "h-[120px] w-[280px] sm:h-[180px] sm:w-[400px] lg:h-[250px] lg:w-[550px]",
          bar: "w-[280px] sm:w-[400px] lg:w-[550px]"
        };
      case "vertical":
        return {
          box: "h-[110px] w-[95px] sm:h-[160px] sm:w-[140px] lg:h-[220px] lg:w-[190px]",
          bar: "w-[95px] sm:w-[140px] lg:w-[190px]"
        };
      case "tall-vertical":
        return {
          box: "h-[280px] w-[120px] sm:h-[400px] sm:w-[180px] lg:h-[550px] lg:w-[250px]",
          bar: "w-[120px] sm:w-[180px] lg:w-[250px]"
        };
      case "portrait":
        return {
          box: "w-20 h-28 sm:w-28 sm:h-36 lg:w-[150px] lg:h-[200px]",
          bar: "w-20 sm:w-28 lg:w-[150px]"
        };
      case "portrait-large":
        return {
          box: "w-48 h-64 sm:w-56 sm:h-80 lg:w-[300px] lg:h-[400px]",
          bar: "w-48 sm:w-56 lg:w-[300px]"
        };
      default:
        return {
          box: "h-20 w-20 sm:h-28 sm:w-28 lg:h-[150px] lg:w-[150px]",
          bar: "w-20 sm:w-28 lg:w-[150px]"
        };
    }
  };

  const { box: boxSizeClasses, bar: whiteBarSizeClasses } = getSizeClasses();

  return (
    <div className={`${rotation} ${className}`}>
      <div
        onClick={handleBoxClick}
        className={`${boxSizeClasses} bg-black/45 ${!isReadOnly ? 'cursor-pointer hover:opacity-80' : ''} overflow-hidden relative transition-opacity group flex items-center justify-center`}
      >
        {isUploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : image ? (
          <>
            <Image
              src={image}
              alt="Uploaded"
              fill
              className="w-full h-full object-cover scale-125"
              priority
            />
            {!isReadOnly && (
              <button
                onClick={handleDeleteImage}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                aria-label="Delete image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </>
        ) : placeholderText ? (
          <p className="text-black font-handwritten text-2xl sm:text-3xl lg:text-4xl font-black text-center px-2">
            {placeholderText}
          </p>
        ) : null}
      </div>
      {showWhiteBar && (
        <div className={`bg-white ${whiteBarSizeClasses} h-[12px] sm:h-[16px] lg:h-[20px]`}></div>
      )}
      {!isReadOnly && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
      )}
    </div>
  );
};