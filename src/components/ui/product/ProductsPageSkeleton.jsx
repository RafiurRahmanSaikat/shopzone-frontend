import React from "react";

// Product Card Skeleton Component
const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-zinc-800">
      {/* Image skeleton */}
      <div className="h-48 w-full rounded-t-lg bg-gray-300 dark:bg-gray-700"></div>

      {/* Content */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>

        {/* Rating skeleton */}
        <div className="mb-2 h-4 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>

        {/* Price skeleton */}
        <div className="mb-4 h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>

        {/* Button skeleton */}
        <div className="h-10 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

// Grid of product card skeletons for initial load or filter changes
export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
};

// Loading row for "Load More" functionality
export const LoadMoreSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={`loadmore-skeleton-${index}`} />
        ))}
    </div>
  );
};

// Skeleton for the entire products page
const ProductsPageSkeleton = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:gap-6">
          {/* Sidebar Skeleton */}
          <div className="hidden md:block">
            <div className="h-fit w-64 animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-800">
              {/* Search input skeleton */}
              <div className="mb-6">
                <div className="mb-3 h-5 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-10 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>

              {/* Categories skeleton */}
              <div className="mb-6">
                <div className="mb-3 h-5 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-5 w-full rounded bg-gray-300 dark:bg-gray-700"
                      ></div>
                    ))}
                </div>
              </div>

              {/* Price range skeleton */}
              <div className="mb-6">
                <div className="mb-3 h-5 w-28 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-10 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>

              {/* Sort by skeleton */}
              <div className="mb-6">
                <div className="mb-3 h-5 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-10 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>

              {/* Buttons skeleton */}
              <div className="flex space-x-2">
                <div className="h-10 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-10 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1">
            {/* Header skeleton */}
            <div className="mb-6 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
              <div className="h-8 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-10 w-40 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>

            {/* Products Grid Skeleton */}
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageSkeleton;
