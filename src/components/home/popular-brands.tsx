import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Selected popular Indian motorcycle brands with clean typography chips & authentic brand accents
const FEATURED_BRANDS = [
  { name: "Hero", badge: "HERO", color: "from-red-600 to-red-700 text-white" },
  { name: "Honda", badge: "HONDA", color: "from-red-700 to-rose-800 text-white" },
  { name: "Bajaj", badge: "BAJAJ", color: "from-blue-700 to-indigo-800 text-white" },
  { name: "TVS", badge: "TVS", color: "from-blue-600 to-cyan-700 text-white" },
  { name: "Royal Enfield", badge: "RE", color: "from-amber-600 to-amber-700 text-white" },
  { name: "Yamaha", badge: "YAMAHA", color: "from-blue-800 to-blue-950 text-white" },
  { name: "Suzuki", badge: "SUZUKI", color: "from-sky-700 to-blue-800 text-white" },
  { name: "KTM", badge: "KTM", color: "from-orange-600 to-amber-600 text-white" },
];

export function PopularBrands(): React.JSX.Element {
  return (
    <section className="py-10 bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-widest font-mono">
              Top Indian Manufacturers
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight mt-0.5">
              Popular Bike Brands
            </h2>
          </div>

          <Link
            href="/bikes"
            className="text-xs sm:text-sm font-semibold text-saffron-600 hover:text-saffron-700 dark:text-saffron-400 flex items-center gap-1 group"
          >
            <span>View All Brands</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Brand Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {FEATURED_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/bikes?brand=${encodeURIComponent(brand.name)}`}
              className="group p-3.5 rounded-2xl bg-card border border-border/70 hover:border-saffron-500/50 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col items-center justify-center gap-2 text-center"
            >
              <div
                className={`h-9 w-14 rounded-lg bg-gradient-to-br ${brand.color} font-heading font-black text-xs tracking-wider flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
              >
                {brand.badge}
              </div>
              <span className="font-heading font-bold text-xs text-foreground group-hover:text-saffron-600 transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
