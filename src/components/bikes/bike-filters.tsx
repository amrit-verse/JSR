"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, RotateCcw, X, Filter } from "lucide-react";
import {
  BIKE_BRANDS,
  CONDITION_LABELS,
  OWNER_NUMBER_LABELS,
  FUEL_TYPE_LABELS,
} from "@/lib/constants";

interface BikeFiltersProps {
  brandCounts?: Record<string, number>;
  totalResults: number;
}

export function BikeFilters({
  brandCounts = {},
}: BikeFiltersProps): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = React.useTransition();

  // Mobile Filter Drawer Toggle
  const [isOpenMobile, setIsOpenMobile] = React.useState<boolean>(false);

  // Local state initialized from URL search params
  const currentSearch = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = React.useState<string>(currentSearch);

  // Sync search input if URL changes externally
  React.useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  // Selected multi-filters
  const selectedBrands = searchParams.getAll("brand");
  const selectedCondition = searchParams.getAll("condition");
  const selectedOwner = searchParams.getAll("owner");
  const selectedFuel = searchParams.getAll("fuel");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const availableOnly = searchParams.get("availableOnly") !== "false"; // default true
  const rcAvailableOnly = searchParams.get("rcOnly") === "true";
  const currentSort = searchParams.get("sort") || "newest";

  // Helper to push params to URL
  const updateUrl = (newParams: Record<string, string | string[] | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      params.delete(key);
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (val) params.append(key, val);
        });
      } else if (value !== null && value !== "") {
        params.set(key, value);
      }
    });

    // Always reset page to 1 when filters change
    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // 300ms Debounced Search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== currentSearch) {
        updateUrl({ query: searchQuery.trim() || null });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleBrand = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    updateUrl({ brand: updated });
  };

  const toggleCondition = (cond: string) => {
    const updated = selectedCondition.includes(cond)
      ? selectedCondition.filter((c) => c !== cond)
      : [...selectedCondition, cond];
    updateUrl({ condition: updated });
  };

  const toggleOwner = (owner: string) => {
    const updated = selectedOwner.includes(owner)
      ? selectedOwner.filter((o) => o !== owner)
      : [...selectedOwner, owner];
    updateUrl({ owner: updated });
  };

  const toggleFuel = (fuel: string) => {
    const updated = selectedFuel.includes(fuel)
      ? selectedFuel.filter((f) => f !== fuel)
      : [...selectedFuel, fuel];
    updateUrl({ fuel: updated });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCondition.length > 0 ||
    selectedOwner.length > 0 ||
    selectedFuel.length > 0 ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    Boolean(currentSearch) ||
    rcAvailableOnly ||
    !availableOnly;

  return (
    <div className="space-y-4">
      {/* Search Bar & Mobile Filter Trigger Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Requirement 12: Realistic Search Input with Examples */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder='Search brand, model, e.g., "Honda Activa" or "150cc"...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-11 text-sm bg-card border-border rounded-xl font-medium focus-visible:ring-saffron-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Sheet Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="lg:hidden h-11 px-4 border-border rounded-xl font-semibold gap-2 justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-saffron-500" />
            <span>Filters</span>
          </div>
          {hasActiveFilters && (
            <span className="h-5 w-5 rounded-full bg-saffron-500 text-white font-bold text-[10px] flex items-center justify-center">
              !
            </span>
          )}
        </Button>

        {/* Sort Order Selector */}
        <select
          value={currentSort}
          onChange={(e) => updateUrl({ sort: e.target.value })}
          className="h-11 px-3 text-xs sm:text-sm font-semibold rounded-xl bg-card border border-border text-foreground outline-none focus:border-saffron-500 cursor-pointer"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="price_asc">Sort: Price (Low to High)</option>
          <option value="price_desc">Sort: Price (High to Low)</option>
          <option value="year_desc">Sort: Year (Newest First)</option>
          <option value="odometer_asc">Sort: Kilometers (Low to High)</option>
        </select>
      </div>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 animate-in fade-in duration-200">
          <span className="text-xs font-bold text-muted-foreground">Active Filters:</span>
          {currentSearch && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 border border-saffron-500/20">
              Query: &quot;{currentSearch}&quot;
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateUrl({ query: null })} />
            </span>
          )}
          {selectedBrands.map((b) => (
            <span key={b} className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-foreground border border-border">
              Brand: {b}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(b)} />
            </span>
          ))}
          {selectedCondition.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-foreground border border-border">
              Condition: {CONDITION_LABELS[c] || c}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCondition(c)} />
            </span>
          ))}
          {rcAvailableOnly && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              RC Available Only
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateUrl({ rcOnly: null })} />
            </span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={clearAllFilters}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear All</span>
          </Button>
        </div>
      )}

      {/* Filter Sidebar (Desktop & Mobile Drawer Content) */}
      <div className={`lg:block ${isOpenMobile ? "block" : "hidden"} p-5 rounded-2xl bg-card border border-border space-y-6 shadow-card`}>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 font-heading font-bold text-base text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-saffron-500" />
            <span>Filter Inventory</span>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-bold text-saffron-600 hover:text-saffron-700"
            >
              Reset
            </button>
          )}
        </div>

        {/* 4. Requirement: "Available Only" Filter Toggle (default: true) */}
        <div className="space-y-2 border-b border-border pb-4">
          <label className="flex items-center justify-between text-xs font-bold text-foreground cursor-pointer">
            <span>Available Bikes Only</span>
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => updateUrl({ availableOnly: e.target.checked ? null : "false" })}
              className="h-4 w-4 rounded border-border text-saffron-500 focus:ring-saffron-500 cursor-pointer"
            />
          </label>
          <p className="text-[11px] text-muted-foreground">Hide bikes marked as sold out.</p>
        </div>

        {/* Brand Checkboxes */}
        <div className="space-y-3 border-b border-border pb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Brand</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {BIKE_BRANDS.map((brand) => (
              <label key={brand} className="flex items-center justify-between text-xs text-foreground cursor-pointer hover:text-saffron-600">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="h-4 w-4 rounded border-border text-saffron-500 focus:ring-saffron-500 cursor-pointer"
                  />
                  <span>{brand}</span>
                </div>
                {brandCounts[brand] !== undefined && (
                  <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {brandCounts[brand]}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Presets */}
        <div className="space-y-3 border-b border-border pb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price Presets</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Button
              type="button"
              variant={maxPrice === "50000" ? "default" : "outline"}
              size="xs"
              onClick={() => updateUrl({ minPrice: null, maxPrice: maxPrice === "50000" ? null : "50000" })}
              className="cursor-pointer"
            >
              Under ₹50k
            </Button>
            <Button
              type="button"
              variant={minPrice === "50000" && maxPrice === "100000" ? "default" : "outline"}
              size="xs"
              onClick={() =>
                updateUrl({
                  minPrice: minPrice === "50000" && maxPrice === "100000" ? null : "50000",
                  maxPrice: minPrice === "50000" && maxPrice === "100000" ? null : "100000",
                })
              }
              className="cursor-pointer"
            >
              ₹50k – ₹1 Lakh
            </Button>
            <Button
              type="button"
              variant={minPrice === "100000" ? "default" : "outline"}
              size="xs"
              onClick={() => updateUrl({ minPrice: minPrice === "100000" ? null : "100000", maxPrice: null })}
              className="cursor-pointer col-span-2"
            >
              ₹1 Lakh & Above
            </Button>
          </div>
        </div>

        {/* Condition Checkboxes */}
        <div className="space-y-3 border-b border-border pb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Condition</h4>
          <div className="space-y-2">
            {Object.entries(CONDITION_LABELS).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCondition.includes(value)}
                  onChange={() => toggleCondition(value)}
                  className="h-4 w-4 rounded border-border text-saffron-500 focus:ring-saffron-500 cursor-pointer"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Owner Checkboxes */}
        <div className="space-y-3 border-b border-border pb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Owner</h4>
          <div className="space-y-2">
            {Object.entries(OWNER_NUMBER_LABELS).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOwner.includes(value)}
                  onChange={() => toggleOwner(value)}
                  className="h-4 w-4 rounded border-border text-saffron-500 focus:ring-saffron-500 cursor-pointer"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fuel Type Checkboxes */}
        <div className="space-y-3 border-b border-border pb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fuel Type</h4>
          <div className="space-y-2">
            {Object.entries(FUEL_TYPE_LABELS).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFuel.includes(value)}
                  onChange={() => toggleFuel(value)}
                  className="h-4 w-4 rounded border-border text-saffron-500 focus:ring-saffron-500 cursor-pointer"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Document Status Switch */}
        <div className="space-y-2 pt-1">
          <label className="flex items-center justify-between text-xs font-semibold text-foreground cursor-pointer">
            <span>RC Paper Available Only</span>
            <input
              type="checkbox"
              checked={rcAvailableOnly}
              onChange={(e) => updateUrl({ rcOnly: e.target.checked ? "true" : null })}
              className="h-4 w-4 rounded border-border text-saffron-500 focus:ring-saffron-500 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
