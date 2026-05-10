"use client";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import PaginationControls from "@/components/PaginationControls";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { ProductGridSkeleton } from "@/components/SkeletonLoaders";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import useApiFetch from "@/hooks/useApiFetch";
import { usePagination } from "@/hooks/usePagination";
import { PackageOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ProductsGrid({
  search = "",
  pageSize = 10,
  showPagination = true,
}) {
  const { data, loading, error, refetch } = useApiFetch(
    "/products/?page_size=all",
    { auth: false },
  );

  // Pagination hook
  const {
    page,
    goToPage,
    nextPage,
    prevPage,
    calculateTotal,
    calculateOffset,
  } = usePagination(1, pageSize);

  // Filter state
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const products = Array.isArray(data) ? data : data?.results || [];

  // Build unique categories from products
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) =>
      (p.categories || []).forEach((c) => {
        if (!map.has(c.id)) map.set(c.id, c);
      }),
    );
    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [products]);

  // Build brands list
  const brands = useMemo(() => {
    const m = new Map();
    products.forEach((p) => {
      if (p.brand && p.brand.id) m.set(p.brand.id, p.brand);
    });
    return Array.from(m.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    const min = priceMin === "" ? null : Number(priceMin);
    const max = priceMax === "" ? null : Number(priceMax);
    return products.filter((p) => {
      const matchesQ =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.brand?.name?.toLowerCase().includes(q);
      const matchesCat =
        !categoryId || (p.categories || []).some((c) => c.id === categoryId);
      const matchesBrand = !brandId || (p.brand && p.brand.id === brandId);
      const price = Number(p.price || 0);
      const matchesPrice =
        (min == null || price >= min) && (max == null || price <= max);
      return matchesQ && matchesCat && matchesBrand && matchesPrice;
    });
  }, [products, search, categoryId, brandId, priceMin, priceMax]);

  // Reset to first page on filter change
  useEffect(() => {
    goToPage(1);
  }, [search, categoryId, brandId, priceMin, priceMax, goToPage]);

  const totalPages = calculateTotal(filtered.length);
  const offset = calculateOffset();
  const pageItems = filtered.slice(offset, offset + pageSize);

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
        title="Failed to load products"
      />
    );
  }

  if (loading) {
    return (
      <div>
        <div className="mb-3 flex gap-1.5 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-16 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
        <ProductGridSkeleton count={6} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <PackageOpen className="h-8 w-8" />
        </EmptyHeader>
        <EmptyTitle>No products available</EmptyTitle>
        <EmptyDescription>
          The backend might be offline. Please try again later.
        </EmptyDescription>
        <Button onClick={refetch} className="mt-4">
          Retry
        </Button>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <ProductFilters
        categories={categories}
        brands={brands}
        priceMin={priceMin}
        priceMax={priceMax}
        selectedCategory={categoryId}
        selectedBrand={brandId}
        onCategoryChange={(v) => setCategoryId(v ? Number(v) : null)}
        onBrandChange={(v) => setBrandId(v ? Number(v) : null)}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        onReset={() => {
          setCategoryId(null);
          setBrandId(null);
          setPriceMin("");
          setPriceMax("");
        }}
      />

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <PackageOpen className="mx-auto h-10 w-10 text-muted-foreground" />
          </EmptyHeader>
          <EmptyTitle>No products found</EmptyTitle>
          <EmptyDescription>Try a different search or filter.</EmptyDescription>
        </Empty>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          {showPagination && totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <PaginationControls
                page={page}
                totalPages={totalPages}
                onPreviousPage={prevPage}
                onNextPage={nextPage}
                onGoToPage={goToPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
