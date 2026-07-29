import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://jsrbikepoint.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${APP_URL}/bikes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${APP_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic public available bike detail routes
  try {
    const bikes = await db.bike.findMany({
      where: {
        isSold: false, // Include ONLY available bike listings
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const bikeRoutes: MetadataRoute.Sitemap = bikes.map((bike) => ({
      url: `${APP_URL}/bikes/${bike.slug}`,
      lastModified: bike.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...bikeRoutes];
  } catch (error) {
    console.error("Failed to generate bike routes for sitemap:", error);
    return staticRoutes;
  }
}
