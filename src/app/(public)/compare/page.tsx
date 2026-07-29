import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, ArrowRight, Bike } from "lucide-react";

export const metadata = {
  title: "Compare Bikes | Jay Shree Ram Bike Point",
  description:
    "Compare specifications, prices, mileage, and condition of pre-owned motorcycles side by side at Jay Shree Ram Bike Point.",
};

export default function ComparePage(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8 max-w-4xl">
      <div className="border-b border-border pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 font-mono">
            Vehicle Comparison
          </span>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-foreground mt-1 flex items-center gap-2">
            <span>Compare Bikes Side-by-Side</span>
            <Scale className="h-6 w-6 text-saffron-500" />
          </h1>
        </div>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border text-center space-y-5 shadow-card max-w-lg mx-auto">
        <div className="h-16 w-16 rounded-full bg-saffron-500/10 text-saffron-500 flex items-center justify-center mx-auto">
          <Bike className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-bold text-foreground">
            No bikes selected for comparison
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Browse our pre-owned inventory and select up to 3 bikes to compare engine capacity, mileage, price, and condition side-by-side.
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
