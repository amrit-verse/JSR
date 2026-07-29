import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, PhoneCall, MapPin, ArrowRight, Award, FileCheck } from "lucide-react";

export const metadata = {
  title: "About Us | Jai Shree Ram Bike Point — Sipahpur, Muzaffarpur",
  description:
    "Learn about Jai Shree Ram Bike Point at Imamganj Naka, Sipahpur, Muzaffarpur. Verified second-hand bikes, mechanic inspection, and hassle-free paper transfer.",
};

const MAPS_URL =
  "https://www.google.com/maps/place/JAI+SHREE+RAM+BIKE+POINT/@26.155375,85.4114003,17z";

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-12 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400 font-mono">
          Motorcycle Dealer · Sipahpur, Muzaffarpur
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
          About Jai Shree Ram Bike Point
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Located at No-04, Imamganj Naka, Sipahpur, Muzaffarpur, Jai Shree Ram Bike Point provides buyers and sellers with verified, mechanic-checked pre-owned motorcycles and scooters with complete registration transfer assistance.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-3">
          <ShieldCheck className="h-8 w-8 text-saffron-500" />
          <h3 className="text-lg font-heading font-bold text-foreground">Mechanic Inspection</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every bike in our inventory undergoes detailed inspection covering engine compression, electrical systems, brake wear, and frame alignment before display.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-3">
          <FileCheck className="h-8 w-8 text-emerald-500" />
          <h3 className="text-lg font-heading font-bold text-foreground">Complete RC Transfer</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We verify original Registration Certificate (RC), valid insurance status, and state tax clearance to make ownership transfer smooth and legal.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-3">
          <Award className="h-8 w-8 text-gold-500" />
          <h3 className="text-lg font-heading font-bold text-foreground">Transparent Pricing</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Fair market rates based on vehicle condition, mileage, and model year with clear upfront pricing and zero hidden fees.
          </p>
        </div>
      </div>

      {/* Dealership Details Section */}
      <div className="p-8 sm:p-10 rounded-3xl bg-muted/40 border border-border space-y-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Why Visit Our Sipahpur Showroom?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Test ride any available bike before purchase</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>On-spot document verification & paper inspection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Popular brands available: Hero, Honda, TVS, Bajaj, RE</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Direct contact with dealership team — no third-party agents</span>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 items-center border-t border-border/60">
          <Link href="/bikes">
            <Button className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold gap-2 cursor-pointer">
              <span>View Available Bikes</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="tel:+916203777760">
            <Button variant="outline" className="gap-2 cursor-pointer">
              <PhoneCall className="h-4 w-4 text-saffron-500" />
              <span>Call Dealership (+91 62037 77760)</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Location Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border shadow-card">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-saffron-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-heading font-bold text-sm text-foreground">Showroom Location</h4>
            <p className="text-xs text-muted-foreground">
              No-04, Imamganj, Naka, Sipahpur, Bihar 842001 (Mon–Sat: 9:00 AM – 7:00 PM)
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Located in: Radha Hari Motors First Choice</p>
          </div>
        </div>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="whitespace-nowrap font-bold">
            Get Directions
          </Button>
        </a>
      </div>
    </div>
  );
}
