"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { bikeCreateSchema } from "@/schemas/bike-schema";
import { generateSlug, appendSlugSuffix } from "@/lib/utils";
import { deleteCloudinaryImages } from "@/lib/cloudinary";
import { MAX_FEATURED_BIKES, BIKES_PER_PAGE } from "@/lib/constants";
import { logger } from "@/lib/logger";
import { type ActionResponse } from "@/types";
import { Bike, BikeImage } from "@prisma/client";

export type BikeWithImages = Bike & { images: BikeImage[] };

// =============================================================================
// Helper: Check Admin Authentication
// =============================================================================

async function requireAdminAuth(): Promise<void> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized access. Admin authentication required.");
  }
}

// =============================================================================
// 1. Create Bike Action
// =============================================================================

export async function createBikeAction(
  formData: unknown
): Promise<ActionResponse<{ id: string; slug: string }>> {
  try {
    await requireAdminAuth();

    // Validate form input using Zod
    const validated = bikeCreateSchema.safeParse(formData);
    if (!validated.success) {
      const errorMsg = validated.error.issues[0]?.message || "Validation error";
      return { success: false, error: errorMsg };
    }

    const data = validated.data;

    // Check featured bike limit if isFeatured is true
    if (data.isFeatured) {
      const featuredCount = await db.bike.count({
        where: { isFeatured: true, isSold: false },
      });
      if (featuredCount >= MAX_FEATURED_BIKES) {
        return {
          success: false,
          error: `Maximum ${MAX_FEATURED_BIKES} featured bikes allowed. Please un-feature a bike first.`,
        };
      }
    }

    // Generate unique slug
    const baseSlug = generateSlug(data.year, data.brand, data.model, data.colour);
    let finalSlug = baseSlug;

    const existingSlug = await db.bike.findUnique({
      where: { slug: baseSlug },
    });

    if (existingSlug) {
      finalSlug = appendSlugSuffix(baseSlug);
    }

    // Create bike record with nested images
    const bike = await db.bike.create({
      data: {
        slug: finalSlug,
        brand: data.brand,
        model: data.model,
        year: data.year,
        price: data.price,
        engineCC: data.engineCC,
        odometer: data.odometer,
        fuelType: data.fuelType,
        transmission: data.transmission,
        condition: data.condition,
        ownerNumber: data.ownerNumber,
        colour: data.colour,
        registrationNumber: data.registrationNumber || null,
        description: data.description,
        features: data.features,
        isFeatured: data.isFeatured,
        rcAvailable: data.rcAvailable,
        insuranceAvailable: data.insuranceAvailable,
        taxPaid: data.taxPaid,
        images: {
          create: data.images.map((img, index) => ({
            publicId: img.publicId,
            url: img.url,
            order: img.order ?? index,
          })),
        },
      },
    });

    logger.info(`Bike created successfully: ${bike.id} (${bike.slug})`);

    // Revalidate paths
    revalidatePath("/admin/bikes");
    revalidatePath("/admin");
    revalidatePath("/bikes");
    revalidatePath("/");

    return {
      success: true,
      data: { id: bike.id, slug: bike.slug },
    };
  } catch (error) {
    logger.error("Error creating bike:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create bike record.",
    };
  }
}

// =============================================================================
// 2. Update Bike Action
// =============================================================================

export async function updateBikeAction(
  id: string,
  formData: unknown
): Promise<ActionResponse<{ id: string; slug: string }>> {
  try {
    await requireAdminAuth();

    const validated = bikeCreateSchema.safeParse(formData);
    if (!validated.success) {
      const errorMsg = validated.error.issues[0]?.message || "Validation error";
      return { success: false, error: errorMsg };
    }

    const data = validated.data;

    // Fetch existing bike
    const existingBike = await db.bike.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existingBike) {
      return { success: false, error: "Bike not found." };
    }

    // Check featured limit if toggled to true
    if (data.isFeatured && !existingBike.isFeatured) {
      const featuredCount = await db.bike.count({
        where: { isFeatured: true, isSold: false },
      });
      if (featuredCount >= MAX_FEATURED_BIKES) {
        return {
          success: false,
          error: `Maximum ${MAX_FEATURED_BIKES} featured bikes allowed. Please un-feature a bike first.`,
        };
      }
    }

    // Identify images that were removed and delete them from Cloudinary
    const newPublicIds = new Set(data.images.map((img) => img.publicId));
    const removedPublicIds = existingBike.images
      .filter((img) => !newPublicIds.has(img.publicId))
      .map((img) => img.publicId);

    if (removedPublicIds.length > 0) {
      await deleteCloudinaryImages(removedPublicIds);
    }

    // Execute transaction to update bike and replace images
    const updatedBike = await db.$transaction(async (tx) => {
      // Delete existing image records
      await tx.bikeImage.deleteMany({
        where: { bikeId: id },
      });

      // Update bike record and recreate images
      return tx.bike.update({
        where: { id },
        data: {
          brand: data.brand,
          model: data.model,
          year: data.year,
          price: data.price,
          engineCC: data.engineCC,
          odometer: data.odometer,
          fuelType: data.fuelType,
          transmission: data.transmission,
          condition: data.condition,
          ownerNumber: data.ownerNumber,
          colour: data.colour,
          registrationNumber: data.registrationNumber || null,
          description: data.description,
          features: data.features,
          isFeatured: data.isFeatured,
          rcAvailable: data.rcAvailable,
          insuranceAvailable: data.insuranceAvailable,
          taxPaid: data.taxPaid,
          images: {
            create: data.images.map((img, index) => ({
              publicId: img.publicId,
              url: img.url,
              order: img.order ?? index,
            })),
          },
        },
      });
    });

    logger.info(`Bike updated successfully: ${updatedBike.id}`);

    // Revalidate paths
    revalidatePath("/admin/bikes");
    revalidatePath(`/admin/bikes/${id}/edit`);
    revalidatePath(`/bikes/${updatedBike.slug}`);
    revalidatePath("/bikes");
    revalidatePath("/");

    return {
      success: true,
      data: { id: updatedBike.id, slug: updatedBike.slug },
    };
  } catch (error) {
    logger.error("Error updating bike:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update bike record.",
    };
  }
}

// =============================================================================
// 3. Delete Bike Action
// =============================================================================

export async function deleteBikeAction(id: string): Promise<ActionResponse> {
  try {
    await requireAdminAuth();

    const bike = await db.bike.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!bike) {
      return { success: false, error: "Bike not found." };
    }

    // Delete associated images from Cloudinary
    const publicIds = bike.images.map((img) => img.publicId);
    if (publicIds.length > 0) {
      await deleteCloudinaryImages(publicIds);
    }

    // Delete bike record (cascade deletes BikeImage in DB)
    await db.bike.delete({
      where: { id },
    });

    logger.info(`Bike deleted: ${id}`);

    revalidatePath("/admin/bikes");
    revalidatePath("/admin");
    revalidatePath("/bikes");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    logger.error("Error deleting bike:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete bike.",
    };
  }
}

// =============================================================================
// 4. Toggle Sold Status Action
// =============================================================================

export async function toggleBikeSoldAction(
  id: string,
  isSold: boolean
): Promise<ActionResponse<{ isSold: boolean }>> {
  try {
    await requireAdminAuth();

    const updatedBike = await db.bike.update({
      where: { id },
      data: {
        isSold,
        // If marked as sold, automatically un-feature it
        ...(isSold && { isFeatured: false }),
      },
    });

    logger.info(`Bike ${id} sold status set to: ${isSold}`);

    revalidatePath("/admin/bikes");
    revalidatePath("/admin");
    revalidatePath(`/bikes/${updatedBike.slug}`);
    revalidatePath("/bikes");
    revalidatePath("/");

    return {
      success: true,
      data: { isSold: updatedBike.isSold },
    };
  } catch (error) {
    logger.error("Error toggling sold status:", error);
    return {
      success: false,
      error: "Failed to update sold status.",
    };
  }
}

// =============================================================================
// 5. Toggle Featured Status Action
// =============================================================================

export async function toggleBikeFeaturedAction(
  id: string,
  isFeatured: boolean
): Promise<ActionResponse<{ isFeatured: boolean }>> {
  try {
    await requireAdminAuth();

    if (isFeatured) {
      const bike = await db.bike.findUnique({ where: { id } });
      if (bike?.isSold) {
        return {
          success: false,
          error: "Sold bikes cannot be set as featured.",
        };
      }

      const featuredCount = await db.bike.count({
        where: { isFeatured: true, isSold: false },
      });
      if (featuredCount >= MAX_FEATURED_BIKES) {
        return {
          success: false,
          error: `Maximum ${MAX_FEATURED_BIKES} featured bikes allowed. Please un-feature a bike first.`,
        };
      }
    }

    const updatedBike = await db.bike.update({
      where: { id },
      data: { isFeatured },
    });

    logger.info(`Bike ${id} featured status set to: ${isFeatured}`);

    revalidatePath("/admin/bikes");
    revalidatePath("/admin");
    revalidatePath("/bikes");
    revalidatePath("/");

    return {
      success: true,
      data: { isFeatured: updatedBike.isFeatured },
    };
  } catch (error) {
    logger.error("Error toggling featured status:", error);
    return {
      success: false,
      error: "Failed to update featured status.",
    };
  }
}

// =============================================================================
// 6. Get Admin Paginated Bikes
// =============================================================================

export async function getAdminBikes(params?: {
  query?: string;
  brand?: string;
  status?: string; // "available" | "sold" | "featured" | "all"
  page?: number;
}): Promise<{
  bikes: BikeWithImages[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  await requireAdminAuth();

  const page = params?.page || 1;
  const take = BIKES_PER_PAGE;
  const skip = (page - 1) * take;

  // Build Prisma where query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (params?.query) {
    const q = params.query.trim();
    where.OR = [
      { brand: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
      { registrationNumber: { contains: q, mode: "insensitive" } },
      { colour: { contains: q, mode: "insensitive" } },
    ];
  }

  if (params?.brand && params.brand !== "all") {
    where.brand = params.brand;
  }

  if (params?.status === "available") {
    where.isSold = false;
  } else if (params?.status === "sold") {
    where.isSold = true;
  } else if (params?.status === "featured") {
    where.isFeatured = true;
    where.isSold = false;
  }

  const [bikes, total] = await Promise.all([
    db.bike.findMany({
      where,
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    db.bike.count({ where }),
  ]);

  return {
    bikes,
    total,
    totalPages: Math.ceil(total / take) || 1,
    currentPage: page,
  };
}

// =============================================================================
// 7. Get Public Paginated & Multi-Filtered Bikes
// =============================================================================

export interface PublicBikesQueryParams {
  query?: string;
  brands?: string[]; // Array of selected brands
  minPrice?: number;
  maxPrice?: number;
  minEngineCC?: number;
  maxEngineCC?: number;
  condition?: string[];
  ownerNumber?: string[];
  fuelType?: string[];
  transmission?: string;
  availableOnly?: boolean;
  rcAvailableOnly?: boolean;
  sort?: "newest" | "price_asc" | "price_desc" | "year_desc" | "odometer_asc";
  page?: number;
  limit?: number;
}

export async function getPublicBikes(params?: PublicBikesQueryParams): Promise<{
  bikes: BikeWithImages[];
  total: number;
  totalPages: number;
  currentPage: number;
  brandCounts: Record<string, number>;
}> {
  const page = params?.page || 1;
  const take = params?.limit || BIKES_PER_PAGE;
  const skip = (page - 1) * take;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  // Available only filter (default: true unless specified false)
  if (params?.availableOnly !== false) {
    where.isSold = false;
  }

  // RC available filter
  if (params?.rcAvailableOnly) {
    where.rcAvailable = true;
  }

  // Search query (text + engine CC integer match)
  if (params?.query) {
    const q = params.query.trim();
    const parsedCC = parseInt(q, 10);

    where.OR = [
      { brand: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
      { colour: { contains: q, mode: "insensitive" } },
      ...(isNaN(parsedCC) ? [] : [{ engineCC: parsedCC }]),
    ];
  }

  // Multi-brand selection
  if (params?.brands && params.brands.length > 0) {
    where.brand = { in: params.brands };
  }

  // Price range
  if (params?.minPrice !== undefined || params?.maxPrice !== undefined) {
    where.price = {};
    if (params.minPrice !== undefined && params.minPrice > 0) {
      where.price.gte = params.minPrice;
    }
    if (params.maxPrice !== undefined && params.maxPrice > 0) {
      where.price.lte = params.maxPrice;
    }
  }

  // Engine CC range
  if (params?.minEngineCC !== undefined || params?.maxEngineCC !== undefined) {
    where.engineCC = {};
    if (params.minEngineCC !== undefined && params.minEngineCC > 0) {
      where.engineCC.gte = params.minEngineCC;
    }
    if (params.maxEngineCC !== undefined && params.maxEngineCC > 0) {
      where.engineCC.lte = params.maxEngineCC;
    }
  }

  // Condition filter
  if (params?.condition && params.condition.length > 0) {
    where.condition = { in: params.condition };
  }

  // Owner Number filter
  if (params?.ownerNumber && params.ownerNumber.length > 0) {
    where.ownerNumber = { in: params.ownerNumber };
  }

  // Fuel type filter
  if (params?.fuelType && params.fuelType.length > 0) {
    where.fuelType = { in: params.fuelType };
  }

  // Transmission filter
  if (params?.transmission && params.transmission !== "all") {
    where.transmission = params.transmission;
  }

  // Sort order mapping
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderBy: any = { createdAt: "desc" };
  if (params?.sort === "price_asc") {
    orderBy = { price: "asc" };
  } else if (params?.sort === "price_desc") {
    orderBy = { price: "desc" };
  } else if (params?.sort === "year_desc") {
    orderBy = { year: "desc" };
  } else if (params?.sort === "odometer_asc") {
    orderBy = { odometer: "asc" };
  }

  const [bikes, total, allBrands] = await Promise.all([
    db.bike.findMany({
      where,
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
      orderBy,
      skip,
      take,
    }),
    db.bike.count({ where }),
    db.bike.groupBy({
      by: ["brand"],
      where: { isSold: false },
      _count: { brand: true },
    }),
  ]);

  const brandCounts: Record<string, number> = {};
  allBrands.forEach((item) => {
    brandCounts[item.brand] = item._count.brand;
  });

  return {
    bikes,
    total,
    totalPages: Math.ceil(total / take) || 1,
    currentPage: page,
    brandCounts,
  };
}

// =============================================================================
// 8. Get Single Public Bike By Slug with Similar Bike Recommendations
// =============================================================================

export async function getPublicBikeBySlug(slug: string): Promise<{
  bike: BikeWithImages | null;
  similarBikes: BikeWithImages[];
}> {
  const bike = await db.bike.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!bike) {
    return { bike: null, similarBikes: [] };
  }

  // Fetch similar bikes (same brand or similar price range, excluding current bike)
  const similarBikes = await db.bike.findMany({
    where: {
      id: { not: bike.id },
      isSold: false,
      OR: [
        { brand: bike.brand },
        {
          price: {
            gte: Math.max(0, bike.price - 25000),
            lte: bike.price + 25000,
          },
        },
      ],
    },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return { bike, similarBikes };
}

// =============================================================================
// 9. Get Homepage Data
// =============================================================================

export async function getHomepageData(): Promise<{
  featuredBikes: BikeWithImages[];
  latestArrivals: BikeWithImages[];
  totalAvailable: number;
}> {
  const [featuredBikes, latestArrivals, totalAvailable] = await Promise.all([
    db.bike.findMany({
      where: { isFeatured: true, isSold: false },
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { order: "asc" } } },
    }),
    db.bike.findMany({
      where: { isSold: false },
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { order: "asc" } } },
    }),
    db.bike.count({ where: { isSold: false } }),
  ]);

  return {
    featuredBikes,
    latestArrivals,
    totalAvailable,
  };
}

