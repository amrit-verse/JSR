// =============================================================================
// Application Constants
// =============================================================================

/** Maximum number of bikes that can be featured at once */
export const MAX_FEATURED_BIKES = 6;

/** Number of bikes per page in inventory grid */
export const BIKES_PER_PAGE = 12;

/** Maximum number of images allowed per bike */
export const MAX_IMAGES_PER_BIKE = 10;

/** Number of days a bike is considered "new" */
export const NEW_BIKE_DAYS = 7;

/** Maximum bikes allowed in comparison tray */
export const MAX_COMPARE_BIKES = 3;

// =============================================================================
// Predefined Brand List
// =============================================================================

export const BIKE_BRANDS = [
  "Hero",
  "Honda",
  "Bajaj",
  "TVS",
  "Royal Enfield",
  "Yamaha",
  "Suzuki",
  "KTM",
  "Jawa",
  "Benelli",
  "Kawasaki",
  "BMW",
  "Harley-Davidson",
  "Triumph",
  "Other",
] as const;

export type BikeBrand = (typeof BIKE_BRANDS)[number];

// =============================================================================
// Fuel Type Labels
// =============================================================================

export const FUEL_TYPE_LABELS: Record<string, string> = {
  PETROL: "Petrol",
  ELECTRIC: "Electric",
} as const;

// =============================================================================
// Transmission Labels
// =============================================================================

export const TRANSMISSION_LABELS: Record<string, string> = {
  MANUAL: "Manual",
  AUTOMATIC: "Automatic",
} as const;

// =============================================================================
// Bike Condition Labels
// =============================================================================

export const CONDITION_LABELS: Record<string, string> = {
  EXCELLENT: "Excellent",
  VERY_GOOD: "Very Good",
  GOOD: "Good",
  AVERAGE: "Average",
} as const;

// =============================================================================
// Owner Number Labels
// =============================================================================

export const OWNER_NUMBER_LABELS: Record<string, string> = {
  FIRST: "1st Owner",
  SECOND: "2nd Owner",
  THIRD_PLUS: "3rd+ Owner",
} as const;

// =============================================================================
// EMI Calculator Defaults
// =============================================================================

export const EMI_DEFAULTS = {
  MIN_TENURE_MONTHS: 6,
  MAX_TENURE_MONTHS: 60,
  DEFAULT_TENURE_MONTHS: 24,
  MIN_INTEREST_RATE: 8,
  MAX_INTEREST_RATE: 20,
  DEFAULT_INTEREST_RATE: 12,
  MIN_DOWN_PAYMENT_PERCENT: 0,
  MAX_DOWN_PAYMENT_PERCENT: 90,
  DEFAULT_DOWN_PAYMENT_PERCENT: 20,
} as const;

// =============================================================================
// WhatsApp Message Template
// =============================================================================

export function getWhatsAppMessage(bikeName: string, bikePrice: string): string {
  return `Hello Jay Shree Ram Bike Point,

I am interested in this bike.

Bike:
${bikeName}

Price:
${bikePrice}

Could you please let me know if it is still available?

Thank you.`;
}

// =============================================================================
// Default Business Settings (for seeding)
// =============================================================================

export const DEFAULT_SETTINGS = {
  businessName: "Jai Shree Ram Bike Point",
  phone: "+916203777760",
  whatsapp: "+916203777760",
  address: "No-04, Imamganj, Naka, Sipahpur, Bihar 842001, India",
  openingHours: "Mon – Sat: 9:00 AM – 7:00 PM",
} as const;

// =============================================================================
// Sort Options
// =============================================================================

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

// =============================================================================
// Cloudinary Paths
// =============================================================================

export const CLOUDINARY_FOLDER = "jsr-bike-point/bikes";
export const CLOUDINARY_ASSETS_FOLDER = "jsr-bike-point/assets";

