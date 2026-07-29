"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps): React.JSX.Element {
  React.useEffect(() => {
    console.error("Application error logged:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="h-20 w-20 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto shadow-sm">
          <AlertTriangle className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
            Application Error
          </span>
          <h1 className="text-3xl font-heading font-extrabold text-foreground tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while processing your request. Please try again.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>

          <Link href="/">
            <Button variant="outline" className="border-border font-bold gap-2 cursor-pointer">
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
