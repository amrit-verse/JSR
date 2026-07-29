import { z } from "zod";

// =============================================================================
// Auth Schema
// =============================================================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

// =============================================================================
// Inferred Types
// =============================================================================

export type LoginInput = z.infer<typeof loginSchema>;
