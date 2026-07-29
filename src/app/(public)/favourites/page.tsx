import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Bike } from "lucide-react";

export const metadata = {
  title: "Your Saved Favourites | Jay Shree Ram Bike Point",
  description:
    "View your saved pre-owned bikes and scooters shortlist at Jay Shree Ram Bike Point, Muzaffarpur.",
};

export default function FavouritesPage(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8 max-w-4xl">
      <div className="border-b border-border pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 font-mono">
            Personal Shortlist
          </span>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-foreground mt-1 flex items-center gap-2">
            <span>Saved Favourites</span>
            <Heart className="h-6 w-6 text-rose-500 fill-current" />
          </h1>
        </div>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border text-center space-y-5 shadow-card max-w-lg mx-auto">
        <div className="h-16 w-16 rounded-full bg-saffron-500/10 text-saffron-500 flex items-center justify-center mx-auto">
          <Bike className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-bold text-foreground">
            No saved bikes in your shortlist
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Click the heart icon on any bike card in our inventory to save it here for quick reference during your showroom visit.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/bikes">
            <Button className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold gap-2 px-6 cursor-pointer">
              <span>Browse All Inventory</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
