import * as React from "react";
import Link from "next/link";
import { Bike, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found (404)",
};

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="max-w-md space-y-6">
        {/* Visual Badge */}
        <div className="h-20 w-20 rounded-full bg-saffron-500/10 text-saffron-500 flex items-center justify-center mx-auto shadow-sm">
          <Bike className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="text-3xl font-heading font-extrabold text-foreground tracking-tight sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The bike listing or page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold gap-2 cursor-pointer">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>

          <Link href="/bikes">
            <Button variant="outline" className="border-border font-bold gap-2 cursor-pointer">
              <Bike className="h-4 w-4" />
              <span>Browse Inventory</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
