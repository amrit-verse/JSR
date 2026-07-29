import * as React from "react";
import Link from "next/link";
import { getPublicBikes } from "@/actions/bike-actions";
import { BikeCard } from "@/components/bikes/bike-card";
import { BikeFilters } from "@/components/bikes/bike-filters";
import { Button } from "@/components/ui/button";
import { SearchX, Bike, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export const metadata = {
  title: "Second-Hand Bikes & Scooters Inventory | Jay Shree Ram Bike Point",
  description:
    "Explore available second-hand motorcycles and scooters in Muzaffarpur, Bihar. Multi-brand inventory, inspected engines, best market prices.",
};

interface InventoryPageProps {
  searchParams: Promise<{
    query?: string;
    brand?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    condition?: string | string[];
    owner?: string | string[];
    fuel?: string | string[];
    availableOnly?: string;
    rcOnly?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function InventoryPage({
  searchParams,
}: InventoryPageProps): Promise<React.JSX.Element> {
  const resolved = await searchParams;

  const brands = Array.isArray(resolved.brand)
    ? resolved.brand
    : resolved.brand
    ? [resolved.brand]
    : [];

  const condition = Array.isArray(resolved.condition)
    ? resolved.condition
    : resolved.condition
    ? [resolved.condition]
    : [];

  const ownerNumber = Array.isArray(resolved.owner)
    ? resolved.owner
    : resolved.owner
    ? [resolved.owner]
    : [];

  const fuelType = Array.isArray(resolved.fuel)
    ? resolved.fuel
    : resolved.fuel
    ? [resolved.fuel]
    : [];

  const page = parseInt(resolved.page || "1", 10);
  const minPrice = resolved.minPrice ? parseInt(resolved.minPrice, 10) : undefined;
  const maxPrice = resolved.maxPrice ? parseInt(resolved.maxPrice, 10) : undefined;

  const data = await getPublicBikes({
    query: resolved.query,
    brands,
    minPrice,
    maxPrice,
    condition,
    ownerNumber,
    fuelType,
    availableOnly: resolved.availableOnly !== "false",
    rcAvailableOnly: resolved.rcOnly === "true",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sort: (resolved.sort as any) || "newest",
    page,
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-border pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 font-mono">
            Muzaffarpur Inventory
          </span>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-foreground mt-1">
            Browse Second-Hand Bikes
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
          Showing <span className="font-bold text-foreground">{data.bikes.length}</span> of{" "}
          <span className="font-bold text-foreground">{data.total}</span> bikes available
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filter Sidebar (4 Cols) */}
        <div className="lg:col-span-4">
          <BikeFilters brandCounts={data.brandCounts} totalResults={data.total} />
        </div>

        {/* Right Column: Bikes Grid (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {data.bikes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.bikes.map((bike) => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>
          ) : (
            /* 5. Requirement: Improved Empty State with Helpful Suggestions & Clear Filters Action */
            <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border text-center space-y-5 shadow-card max-w-lg mx-auto">
              <div className="h-16 w-16 rounded-full bg-saffron-500/10 text-saffron-500 flex items-center justify-center mx-auto">
                <SearchX className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-heading font-bold text-foreground">
                  No bikes match your selected criteria
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Try broadening your search query, removing brand filters, or resetting price range limits.
                </p>
              </div>

              {/* Suggestions Box */}
              <div className="p-4 rounded-2xl bg-muted/50 border border-border text-left space-y-2 text-xs">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <Bike className="h-3.5 w-3.5 text-saffron-500" />
                  <span>Search Suggestions:</span>
                </span>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Try searching by engine capacity like &quot;125cc&quot; or &quot;150cc&quot;</li>
                  <li>Clear specific brand or condition filters</li>
                  <li>Toggle &quot;Available Bikes Only&quot; to inspect all listings</li>
                </ul>
              </div>

              <div className="pt-2">
                <Link href="/bikes">
                  <Button className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold gap-2 px-6 cursor-pointer">
                    <RotateCcw className="h-4 w-4" />
                    <span>Clear All Filters</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {data.currentPage > 1 ? (
                <Link href={`/bikes?page=${data.currentPage - 1}`}>
                  <Button variant="outline" size="sm" className="gap-1 cursor-pointer">
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled className="gap-1 opacity-50">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
              )}

              <span className="text-xs font-bold px-4 py-2 rounded-lg bg-card border border-border text-foreground">
                Page {data.currentPage} of {data.totalPages}
              </span>

              {data.currentPage < data.totalPages ? (
                <Link href={`/bikes?page=${data.currentPage + 1}`}>
                  <Button variant="outline" size="sm" className="gap-1 cursor-pointer">
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled className="gap-1 opacity-50">
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
