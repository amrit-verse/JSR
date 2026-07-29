// =============================================================================
// Cloudinary Configuration & Optimization Helpers
// =============================================================================

import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_FOLDER, CLOUDINARY_ASSETS_FOLDER } from "./constants";
import { logger } from "./logger";

// Configure Cloudinary SDK (server-side only)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary, CLOUDINARY_FOLDER, CLOUDINARY_ASSETS_FOLDER };

/**
 * Standard inline SVG blur placeholder DATA URI for low-quality image preview (LQIP).
 */
export const BLUR_IMAGE_DATA_URL =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Crect width='8' height='5' fill='%231f2937'/%3E%3C/svg%3E";

/**
 * Constructs an optimized Cloudinary image URL with auto-format (f_auto)
 * and auto-quality (q_auto), plus optional width, height, and crop transformations.
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: string | number;
    crop?: "fill" | "fit" | "limit" | "thumb" | "scale";
  }
): string {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  const { width, height, quality = "auto", crop = "fill" } = options || {};
  const transformations: string[] = ["f_auto", `q_${quality}`];

  if (width) {transformations.push(`w_${width}`);}
  if (height) {transformations.push(`h_${height}`);}
  if (width || height) {transformations.push(`c_${crop}`);}

  const transformString = transformations.join(",");

  // Insert transformations into Cloudinary URL path after /upload/
  if (url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/${transformString}/`);
  }

  return url;
}

/**
 * Deletes an image from Cloudinary by its public ID.
 */
export async function deleteCloudinaryImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    logger.error(`Failed to delete Cloudinary image: ${publicId}`, error);
    // Non-critical — log but don't throw.
  }
}

/**
 * Deletes multiple images from Cloudinary.
 */
export async function deleteCloudinaryImages(
  publicIds: string[]
): Promise<void> {
  if (publicIds.length === 0) {return;}

  try {
    await cloudinary.api.delete_resources(publicIds);
  } catch (error) {
    logger.error("Failed to delete Cloudinary images", error);
  }
}
