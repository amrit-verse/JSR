import { Metadata } from "next";

// =============================================================================
// SEO Metadata & Schema.org Structured Data Helpers
// =============================================================================

const APP_NAME = "Jai Shree Ram Bike Point";
const APP_DESCRIPTION =
  "Buy verified second-hand motorcycles and scooters at Jai Shree Ram Bike Point, Sipahpur, Muzaffarpur. Mechanic-inspected, document-verified, best prices at No-04, Imamganj Naka.";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://jsrbikepoint.com";

/**
 * Generates base metadata shared across all public pages.
 */
export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(APP_URL),
    title: {
      default: `${APP_NAME} — Verified Second-Hand Bikes in Muzaffarpur`,
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    alternates: {
      canonical: "./",
    },
    keywords: [
      "second hand bikes",
      "used bikes Muzaffarpur",
      "Sipahpur",
      "Imamganj",
      "Bihar",
      "motorcycle dealer",
      "Jai Shree Ram Bike Point",
      "Hero",
      "Honda",
      "Bajaj",
      "Royal Enfield",
      "TVS",
      "Yamaha",
    ],
    authors: [{ name: APP_NAME }],
    creator: APP_NAME,
    publisher: APP_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "2Qed6_xczrk_9zQRGHh3F6lYqK4eDRTF9wBTEGgGjRk",
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: APP_URL,
      siteName: APP_NAME,
      title: `${APP_NAME} — Verified Second-Hand Bikes in Muzaffarpur`,
      description: APP_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: `${APP_NAME} — Verified Second-Hand Bikes in Muzaffarpur`,
      description: APP_DESCRIPTION,
    },
  };
}

/**
 * Generates metadata for a specific bike detail page.
 */
export function getBikeMetadata(bike: {
  brand: string;
  model: string;
  year: number;
  price: number;
  slug: string;
  description: string;
  images: { url: string }[];
}): Metadata {
  const title = `${bike.year} ${bike.brand} ${bike.model}`;
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(bike.price);

  const description = `Buy ${title} for ${formattedPrice} at ${APP_NAME}, Muzaffarpur. ${bike.description.substring(0, 120)}`;
  const imageUrl = bike.images[0]?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `/bikes/${bike.slug}`,
    },
    openGraph: {
      title: `${title} — ${formattedPrice}`,
      description,
      url: `${APP_URL}/bikes/${bike.slug}`,
      type: "website",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${formattedPrice}`,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

/**
 * Generates JSON-LD structured data for the dealership (MotorcycleDealer & LocalBusiness schema).
 */
export function getBusinessJsonLd(settings: {
  businessName: string;
  phone: string;
  address: string;
  openingHours?: string | null;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["MotorcycleDealer", "LocalBusiness"],
    name: settings.businessName,
    description: APP_DESCRIPTION,
    url: APP_URL,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Sipahpur",
      addressRegion: "Bihar",
      postalCode: "842001",
      addressCountry: "IN",
    },
    priceRange: "₹₹",
    ...(settings.openingHours && {
      openingHours: settings.openingHours,
    }),
  };
}

/**
 * Generates JSON-LD structured data for an individual bike (Product schema).
 */
export function getBikeJsonLd(bike: {
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  slug: string;
  isSold: boolean;
  images: { url: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${bike.year} ${bike.brand} ${bike.model}`,
    description: bike.description,
    url: `${APP_URL}/bikes/${bike.slug}`,
    brand: {
      "@type": "Brand",
      name: bike.brand,
    },
    offers: {
      "@type": "Offer",
      price: bike.price,
      priceCurrency: "INR",
      itemCondition: "https://schema.org/UsedCondition",
      availability: bike.isSold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      seller: {
        "@type": "MotorcycleDealer",
        name: APP_NAME,
      },
    },
    ...(bike.images.length > 0 && {
      image: bike.images.map((img) => img.url),
    }),
  };
}
