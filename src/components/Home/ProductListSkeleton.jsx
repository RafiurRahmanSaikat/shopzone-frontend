import React from "react";
import Grid from "../ui/common/Grid";
import Heading from "../ui/common/Heading";

const ProductListSkeleton = () => {
  // Create an array of 10 items for the skeleton
  const skeletonItems = Array.from({ length: 10 });

  return (
    <div className="mx-auto my-10 w-fit">
      <div className="mb-10 text-center">
        <Heading>
          All{" "}
          <span className="text-violet-600 dark:text-violet-400">Products</span>
        </Heading>
      </div>

      <Grid className="w-[80vw]" cols={5} gap={5}>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-zinc-200 shadow-md transition-all duration-300 dark:bg-zinc-700"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Skeleton image */}
            <div className="h-64 w-full animate-pulse bg-zinc-300 dark:bg-zinc-600"></div>

            {/* Skeleton content */}
            <div className="p-6">
              {/* Title skeleton */}
              <div className="h-6 w-3/4 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-600"></div>

              {/* Rating skeleton */}
              <div className="mt-2 flex items-center">
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-600"
                    ></div>
                  ))}
                </div>
                <div className="ml-2 h-4 w-8 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-600"></div>
              </div>

              {/* Price and button skeleton */}
              <div className="mt-3 flex items-center justify-between">
                <div className="h-5 w-16 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-600"></div>
                <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
              </div>
            </div>
          </div>
        ))}
      </Grid>
      <div className="mt-10 flex justify-center">
        {/* View all products button skeleton */}
        <div className="h-12 w-40 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
