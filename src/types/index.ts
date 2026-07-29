// =============================================================================
// Type Definitions — Barrel Export
// =============================================================================

export type { BikeCreateInput, BikeUpdateInput } from "@/schemas/bike-schema";
export type { LoginInput } from "@/schemas/auth-schema";
export type { SettingsInput } from "@/schemas/settings-schema";

// =============================================================================
// Server Action Response Types
// =============================================================================

export interface ActionResponse<T = undefined> {
  success: boolean;
  error?: string;
  data?: T;
}
