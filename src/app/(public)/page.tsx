import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PopularBrands } from "@/components/home/popular-brands";
import { BikeCard } from "@/components/bikes/bike-card";
import { getHomepageData } from "@/actions/bike-actions";
import { getBusinessJsonLd } from "@/lib/metadata";
import { ShieldCheck, Award, ThumbsUp, ArrowRight, PhoneCall, Sparkles } from "lucide-react";

export const metadata = {
  title: "Jai Shree Ram Bike Point — Best Second-Hand Bikes in Muzaffarpur",
  description:
    "Buy verified second-hand motorcycles and scooters in Muzaffarpur, Bihar. Inspection checked, easy document transfer, best prices at No-04, Imamganj Naka, Sipahpur.",
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const { featuredBikes, latestArrivals, totalAvailable } = await getHomepageData();

  const businessJsonLd = getBusinessJsonLd({
    businessName: "Jai Shree Ram Bike Point",
    phone: "+916203777760",
    address: "No-04, Imamganj, Naka, Sipahpur, Muzaffarpur",
    openingHours: "Mo-Sa 09:00-19:00",
  });

  return (
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      {/* 1. Inventory-Focused Hero Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-saffron-950/40 border border-charcoal-800 text-white p-6 sm:p-10 md:p-12 shadow-2xl">
          <div className="max-w-3xl space-y-5 relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-saffron-500/20 text-saffron-400 border border-saffron-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{totalAvailable} Quality Bikes Available Today in Muzaffarpur</span>
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-tight">
              Browse Inspected <span className="text-saffron-400">Second-Hand Bikes</span> Ready For Transfer.
            </h1>
            <p className="text-sm sm:text-base text-charcoal-300 max-w-2xl leading-relaxed">
              Every bike is mechanic-checked, engine tested, and ready for instant RC transfer. Visit us at Imamganj Naka, Sipahpur, Muzaffarpur.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-1">
              <Link href="/bikes">
                <Button className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold h-11 sm:h-12 px-6 rounded-xl gap-2 shadow-lg shadow-saffron-500/25 cursor-pointer">
                  <span>Browse Full Inventory ({totalAvailable})</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+916203777760">
                <Button variant="outline" className="border-charcoal-700 bg-charcoal-900/60 hover:bg-charcoal-800 text-white font-bold h-11 sm:h-12 px-6 rounded-xl gap-2 cursor-pointer">
                  <PhoneCall className="h-4 w-4 text-saffron-400" />
                  <span>Call Dealership</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Bikes Showcase (Placed BEFORE Popular Brands per requirement #2) */}
      <section className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 font-mono">Curated Showcase</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">Featured Bikes</h2>
          </div>
          <Link href="/bikes?status=featured" className="text-sm font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-1">
            <span>View All Featured ({featuredBikes.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      {/* 3. Popular Brands Section (Placed AFTER Featured Bikes per requirement #2) */}
      <PopularBrands />

      {/* 4. Latest Arrivals Grid (Clean Grid per requirement #3) */}
      <section className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 font-mono">Fresh Inventory</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">Latest Arrivals</h2>
          </div>
          <Link href="/bikes" className="text-sm font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-1">
            <span>View All Inventory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArrivals.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      {/* Dealership Trust Badges */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border">
          <div className="space-y-2">
            <ShieldCheck className="h-8 w-8 text-saffron-500" />
            <h3 className="text-base font-heading font-bold text-foreground">Verified RC & Papers</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Original RC, insurance status, and tax verification provided for every bike.</p>
          </div>
          <div className="space-y-2">
            <Award className="h-8 w-8 text-gold-500" />
            <h3 className="text-base font-heading font-bold text-foreground">Mechanic Inspected</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Engine, brakes, and electricals thoroughly tested before listing.</p>
          </div>
          <div className="space-y-2">
            <ThumbsUp className="h-8 w-8 text-emerald-500" />
            <h3 className="text-base font-heading font-bold text-foreground">Best Price Guarantee</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Fair market pricing with zero hidden commission charges at Imamganj Naka, Sipahpur.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
