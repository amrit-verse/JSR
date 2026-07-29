import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BikeCardSkeleton(): React.JSX.Element {
  return (
    <Card className="rounded-2xl border-border bg-card overflow-hidden flex flex-col h-full">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[16/10] w-full rounded-none" />

      {/* Content Skeleton */}
      <CardContent className="p-4 sm:p-5 flex-1 space-y-4">
        <Skeleton className="h-6 w-3/4 rounded-md" />

        {/* Specs Grid Skeleton */}
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-7 w-full rounded-lg" />
          <Skeleton className="h-7 w-full rounded-lg" />
          <Skeleton className="h-7 w-full rounded-lg" />
          <Skeleton className="h-7 w-full rounded-lg" />
        </div>
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="p-4 sm:p-5 pt-0 gap-2">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
