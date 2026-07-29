"use client";

import * as React from "react";
import Image from "next/image";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { Upload, X, Star, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_IMAGES_PER_BIKE, CLOUDINARY_FOLDER } from "@/lib/constants";

export interface UploadedImage {
  publicId: string;
  url: string;
  order: number;
}

interface ImageUploaderProps {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  error?: string;
}

export function ImageUploader({
  value = [],
  onChange,
  error,
}: ImageUploaderProps): React.JSX.Element {
  const handleSuccess = (results: CloudinaryUploadWidgetResults): void => {
    if (typeof results.info === "object" && results.info?.secure_url && results.info?.public_id) {
      const newImage: UploadedImage = {
        publicId: results.info.public_id,
        url: results.info.secure_url,
        order: value.length,
      };

      if (value.length < MAX_IMAGES_PER_BIKE) {
        onChange([...value, newImage]);
      }
    }
  };

  const handleRemove = (publicId: string): void => {
    const filtered = value
      .filter((img) => img.publicId !== publicId)
      .map((img, idx) => ({ ...img, order: idx }));
    onChange(filtered);
  };

  const handleMakeCover = (index: number): void => {
    if (index === 0) return;
    const items = [...value];
    const [selected] = items.splice(index, 1);
    items.unshift(selected);

    // Re-index orders
    const reordered = items.map((img, idx) => ({ ...img, order: idx }));
    onChange(reordered);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-semibold text-foreground">
            Bike Photos ({value.length}/{MAX_IMAGES_PER_BIKE})
          </label>
          <p className="text-xs text-muted-foreground">
            First photo will be used as the main cover photo.
          </p>
        </div>

        {value.length < MAX_IMAGES_PER_BIKE && (
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            uploadPreset="ml_default" // Signed upload
            options={{
              maxFiles: MAX_IMAGES_PER_BIKE - value.length,
              folder: CLOUDINARY_FOLDER,
              clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
              maxFileSize: 10 * 1024 * 1024, // 10MB
            }}
            onSuccess={handleSuccess}
          >
            {({ open }) => (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => open()}
                className="gap-2 border-saffron-500/50 hover:bg-saffron-500/10 text-saffron-600 font-semibold cursor-pointer"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Photos</span>
              </Button>
            )}
          </CldUploadWidget>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Image Grid Preview */}
      {value.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {value.map((image, index) => (
            <div
              key={image.publicId}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden group border-2 transition-all ${
                index === 0
                  ? "border-saffron-500 shadow-md shadow-saffron-500/20"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <Image
                src={image.url}
                alt={`Uploaded bike photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover"
              />

              {/* Cover Badge */}
              {index === 0 && (
                <div className="absolute top-1.5 left-1.5 bg-saffron-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm z-10">
                  <Star className="h-3 w-3 fill-current" />
                  <span>Cover</span>
                </div>
              )}

              {/* Hover Controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="xs"
                    onClick={() => handleMakeCover(index)}
                    className="text-[10px] h-7 px-2 font-semibold bg-white/90 text-black hover:bg-white cursor-pointer"
                    title="Make main cover photo"
                  >
                    Set Cover
                  </Button>
                )}

                <Button
                  type="button"
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => handleRemove(image.publicId)}
                  className="h-7 w-7 rounded-full cursor-pointer"
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          uploadPreset="ml_default"
          options={{
            maxFiles: MAX_IMAGES_PER_BIKE,
            folder: CLOUDINARY_FOLDER,
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 10 * 1024 * 1024,
          }}
          onSuccess={handleSuccess}
        >
          {({ open }) => (
            <div
              onClick={() => open()}
              className="border-2 border-dashed border-border hover:border-saffron-500/60 rounded-2xl p-8 text-center bg-muted/30 hover:bg-saffron-500/5 transition-all cursor-pointer space-y-3"
            >
              <div className="h-12 w-12 rounded-full bg-saffron-500/10 text-saffron-600 flex items-center justify-center mx-auto">
                <Upload className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Click to upload bike photos
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, WEBP up to 10MB each (Min 1 photo, Max 10)
                </p>
              </div>
            </div>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
