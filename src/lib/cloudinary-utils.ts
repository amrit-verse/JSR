// =============================================================================
// Client-Safe Cloudinary Transformation & Blur Placeholders
// =============================================================================
// This module contains pure string manipulation helpers and SVG data URIs
// for Cloudinary image optimization without importing Node.js SDK modules.
// =============================================================================

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
