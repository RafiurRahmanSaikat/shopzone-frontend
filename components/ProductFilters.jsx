/**
 * Product Filters Component
 * Reusable filter controls for product listing
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";

export default function ProductFilters({
  categories = [],
  brands = [],
  priceMin = "",
  priceMax = "",
  selectedCategory = null,
  selectedBrand = null,
  onCategoryChange,
  onBrandChange,
  onPriceMinChange,
  onPriceMaxChange,
  onReset,
}) {
  const hasActiveFilters =
    selectedCategory || selectedBrand || priceMin || priceMax;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex gap-2 flex-wrap items-end">
        {/* Category Filter */}
        <Select value={selectedCategory || ""} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Brand Filter */}
        <Select value={selectedBrand || ""} onValueChange={onBrandChange}>
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={String(brand.id)}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range */}
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min $"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            className="w-20 h-8 text-xs"
          />
          <span className="text-xs text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max $"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
            className="w-20 h-8 text-xs"
          />
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-2"
          >
            <X className="h-3 w-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Filter className="h-3 w-3" />
          Filters active
        </div>
      )}
    </div>
  );
}
