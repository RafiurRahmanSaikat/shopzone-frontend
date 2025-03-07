"use client";
import { SlidersHorizontal } from "lucide-react";
import Badge from "../common/Badge";
import Heading from "../common/Heading";
import Text from "../common/Text";

const ProductListHeader = ({
  title = "Products",
  productCount = 0,
  activeFilters = 0,
  sortBy = "newest",
  onSortChange,
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <Heading as="h1" size="h3">
        {title}
        {activeFilters > 0 && (
          <Badge variant="primary" size="sm" className="ml-2">
            {activeFilters} {activeFilters === 1 ? "filter" : "filters"} applied
          </Badge>
        )}
      </Heading>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <Text
            size="sm"
            weight="medium"
            className="text-gray-700 dark:text-gray-300"
          >
            Sort by:
          </Text>
          <select
            value={sortBy}
            onChange={onSortChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm transition-colors focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <Text size="sm" muted>
          {productCount} {productCount === 1 ? "product" : "products"}
        </Text>
      </div>
    </div>
  );
};

export default ProductListHeader;
