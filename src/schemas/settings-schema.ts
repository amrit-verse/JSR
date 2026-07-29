import { z } from "zod";

// =============================================================================
// Settings Schema
// =============================================================================

export const settingsSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be at most 100 characters")
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .trim(),
  whatsapp: z
    .string()
    .min(10, "WhatsApp number must be at least 10 digits")
    .max(15, "WhatsApp number is too long")
    .trim(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address is too long")
    .trim(),
  googleMapsEmbed: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  facebook: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  instagram: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  openingHours: z
    .string()
    .max(200, "Opening hours text is too long")
    .optional()
    .or(z.literal("")),
});

// =============================================================================
// Inferred Types
// =============================================================================

export type SettingsInput = z.infer<typeof settingsSchema>;
