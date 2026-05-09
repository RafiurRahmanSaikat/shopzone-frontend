"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-8 w-full rounded" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded" />
        ))}
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-20 rounded" />
      </div>
    </div>
  );
}

export function OrdersTableSkeleton({ count = 4 }) {
  return (
    <div className="space-y-2">
      {[...Array(count)].map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CarouselSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-96 w-full rounded-lg" />
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-16 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
