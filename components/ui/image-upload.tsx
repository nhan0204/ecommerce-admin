"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [value]);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    if (typeof result.info === "object" && result.info !== null) {
      const { secure_url } = result.info;
      if (secure_url) {
        onChange(secure_url);
      } else {
        console.error("secure_url is missing from the upload result.");
      }
    } else {
      console.error("Upload result info is not an object.");
    }
  };

  return (
    <div>
      <div className="mb-4 flex-col items-center space-y-4">
        <div className="flex gap-x-4">
          {value.map((url) => (
            <div
              key={url}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                className="object-cover w-full h-auto"
                alt="Image"
                src={url}
              />
            </div>
          ))}
        </div>
        <CldUploadWidget
          onSuccess={(result, options) => {
            onUpload(result);
            console.log(options);
          }}
          uploadPreset="l8xedixc"
        >
          {({ open }) => {
            return (
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={() => {
                  open();
                }}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload an Image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ImageUpload;
