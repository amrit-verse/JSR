import { z } from "zod";
import { BIKE_BRANDS, MAX_IMAGES_PER_BIKE } from "@/lib/constants";

// =============================================================================
// Bike Image Schema
// =============================================================================

export const bikeImageSchema = z.object({
  publicId: z.string().min(1, "Image public ID is required"),
  url: z.string().url("Invalid image URL"),
  order: z.number().int().min(0),
});

// =============================================================================
// Bike Create Schema
// =============================================================================

export const bikeCreateSchema = z.object({
  brand: z.enum(BIKE_BRANDS, {
    message: "Please select a valid brand",
  }),
  model: z
    .string()
    .min(2, "Model must be at least 2 characters")
    .max(100, "Model must be at most 100 characters")
    .trim(),
  year: z
    .number()
    .int("Year must be a whole number")
    .min(1990, "Year must be 1990 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  price: z
    .number()
    .int("Price must be a whole number")
    .min(1000, "Price must be at least ₹1,000")
    .max(1000000, "Price must be at most ₹10,00,000"),
  engineCC: z
    .number()
    .int("Engine CC must be a whole number")
    .min(50, "Engine CC must be at least 50")
    .max(2500, "Engine CC must be at most 2500"),
  odometer: z
    .number()
    .int("Odometer must be a whole number")
    .min(0, "Odometer cannot be negative")
    .max(500000, "Odometer must be at most 5,00,000 km"),
  fuelType: z.enum(["PETROL", "ELECTRIC"], {
    message: "Please select a fuel type",
  }),
  transmission: z.enum(["MANUAL", "AUTOMATIC"], {
    message: "Please select a transmission type",
  }),
  condition: z.enum(["EXCELLENT", "VERY_GOOD", "GOOD", "AVERAGE"], {
    message: "Please select the bike condition",
  }),
  ownerNumber: z.enum(["FIRST", "SECOND", "THIRD_PLUS"], {
    message: "Please select the owner number",
  }),
  colour: z
    .string()
    .min(2, "Colour must be at least 2 characters")
    .max(50, "Colour must be at most 50 characters")
    .trim(),
  registrationNumber: z
    .string()
    .max(20, "Registration number is too long")
    .trim()
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be at most 2000 characters")
    .trim(),
  features: z.array(z.string().trim().min(1)),
  isFeatured: z.boolean(),
  rcAvailable: z.boolean(),
  insuranceAvailable: z.boolean(),
  taxPaid: z.boolean(),
  images: z
    .array(bikeImageSchema)
    .min(1, "At least 1 image is required")
    .max(MAX_IMAGES_PER_BIKE, `Maximum ${MAX_IMAGES_PER_BIKE} images allowed`),
});

// =============================================================================
// Bike Update Schema
// =============================================================================

export const bikeUpdateSchema = bikeCreateSchema.partial().extend({
  id: z.string().uuid("Invalid bike ID"),
});

// =============================================================================
// Inferred Types
// =============================================================================

export type BikeCreateInput = z.infer<typeof bikeCreateSchema>;
export type BikeUpdateInput = z.infer<typeof bikeUpdateSchema>;
