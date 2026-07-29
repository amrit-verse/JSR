import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// =============================================================================
// Class Name Utility
// =============================================================================

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 * Uses clsx for conditional classes and tailwind-merge for deduplication.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// =============================================================================
// Price Formatting
// =============================================================================

/**
 * Formats a price integer to Indian Rupee notation.
 * e.g., 85000 → "₹85,000" | 150000 → "₹1,50,000"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// =============================================================================
// Number Formatting
// =============================================================================

/**
 * Formats a number with Indian comma notation.
 * e.g., 45000 → "45,000"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

/**
 * Formats engine CC for display.
 * e.g., 110 → "110cc"
 */
export function formatEngineCC(cc: number): string {
  return `${formatNumber(cc)}cc`;
}

/**
 * Formats odometer reading for display.
 * e.g., 45000 → "45,000 km"
 */
export function formatOdometer(km: number): string {
  return `${formatNumber(km)} km`;
}

// =============================================================================
// Slug Generation
// =============================================================================

/**
 * Generates a URL-friendly slug from bike details.
 * e.g., (2022, "Honda", "Shine", "Black") → "2022-honda-shine-black"
 */
export function generateSlug(
  year: number,
  brand: string,
  model: string,
  colour: string
): string {
  const parts = [year.toString(), brand, model, colour];
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Appends a random suffix to a slug for uniqueness.
 * e.g., "2022-honda-shine-black" → "2022-honda-shine-black-a3f2"
 */
export function appendSlugSuffix(slug: string): string {
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${slug}-${suffix}`;
}

// =============================================================================
// Date Utilities
// =============================================================================

/**
 * Checks if a date is within the last N days.
 */
export function isWithinDays(date: Date, days: number): boolean {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

/**
 * Formats a date for display.
 * e.g., "15 Jul 2026"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

// =============================================================================
// WhatsApp URL
// =============================================================================

/**
 * Generates a WhatsApp click-to-chat URL with a pre-filled message.
 */
export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Generates a tel: URL for direct calling.
 */
export function getPhoneUrl(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  return `tel:${cleanPhone}`;
}

// =============================================================================
// EMI Calculator
// =============================================================================

/**
 * Calculates monthly EMI using the standard formula.
 * EMI = [P × r × (1+r)^n] / [(1+r)^n – 1]
 *
 * @param principal - Loan amount in INR
 * @param annualRate - Annual interest rate (e.g., 12 for 12%)
 * @param tenureMonths - Loan tenure in months
 * @returns Monthly EMI amount (rounded to nearest rupee)
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  if (principal <= 0 || tenureMonths <= 0) {return 0;}
  if (annualRate === 0) {return Math.round(principal / tenureMonths);}

  const monthlyRate = annualRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

// =============================================================================
// Misc
// =============================================================================

/**
 * Truncates text to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {return text;}
  return text.substring(0, maxLength).trim() + "…";
}

/**
 * Capitalizes the first letter of each word.
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
