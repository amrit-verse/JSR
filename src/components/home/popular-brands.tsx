import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Selected popular Indian motorcycle brands for visual showcase
const FEATURED_BRANDS = [
  { name: "Hero", icon: "🏍️" },
  { name: "Honda", icon: "🛵" },
  { name: "Bajaj", icon: "⚡" },
  { name: "TVS", icon: "🏆" },
  { name: "Royal Enfield", icon: "🛡️" },
  { name: "Yamaha", icon: "🏁" },
  { name: "Suzuki", icon: "💫" },
  { name: "KTM", icon: "🔥" },
];

export function PopularBrands(): React.JSX.Element {
  return (
    <section className="py-12 bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-widest">
              Top Manufacturers
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
              Popular Bike Brands
            </h2>
          </div>

          <Link
            href="/bikes"
            className="text-xs sm:text-sm font-semibold text-saffron-600 hover:text-saffron-700 dark:text-saffron-400 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {FEATURED_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/bikes?brand=${encodeURIComponent(brand.name)}`}
              className="group p-4 rounded-xl bg-card border border-border/70 hover:border-saffron-500/50 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col items-center justify-center gap-2 text-center"
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                {brand.icon}
              </span>
              <span className="font-heading font-bold text-xs sm:text-sm text-foreground group-hover:text-saffron-600 transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
