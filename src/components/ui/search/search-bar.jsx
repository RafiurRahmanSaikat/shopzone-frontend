"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  searchFilters,
  onChange,
  onSubmit,
  onClear,
  categories = [],
  onToggleCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build query params
    const params = new URLSearchParams();
    if (searchFilters.search) params.append("search", searchFilters.search);
    if (searchFilters.minPrice)
      params.append("price_min", searchFilters.minPrice);
    if (searchFilters.maxPrice)
      params.append("price_max", searchFilters.maxPrice);
    if (searchFilters.category)
      params.append("categories", searchFilters.category);

    // Navigate to products page with search params
    navigate(`/products?${params.toString()}`);

    // Call the original onSubmit if provided
    if (onSubmit) onSubmit(e);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="rounded-xl bg-white p-4 shadow-md dark:bg-zinc-800">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            {/* Search Input */}
            <div className="flex-1">
              <label
                htmlFor="search"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="What are you looking for?"
                  value={searchFilters.search}
                  onChange={(e) =>
                    onChange({ ...searchFilters, search: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                />
                <Search className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium text-violet-600 hover:text-violet-700 md:hidden dark:text-violet-400"
            >
              {isExpanded ? "Hide Filters" : "Show Filters"}
            </button>

            {/* Price Range - Always visible on desktop, conditionally on mobile */}
            <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
              <label
                htmlFor="min-price"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  id="min-price"
                  placeholder="Min"
                  value={searchFilters.minPrice}
                  onChange={(e) =>
                    onChange({ ...searchFilters, minPrice: e.target.value })
                  }
                  className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                />
                <span className="text-gray-500 dark:text-gray-400">-</span>
                <input
                  type="number"
                  id="max-price"
                  placeholder="Max"
                  value={searchFilters.maxPrice}
                  onChange={(e) =>
                    onChange({ ...searchFilters, maxPrice: e.target.value })
                  }
                  className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:bg-violet-700 dark:hover:bg-violet-800"
              >
                Search
              </button>
              {(searchFilters.search ||
                searchFilters.minPrice ||
                searchFilters.maxPrice ||
                searchFilters.category) && (
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters - Conditionally visible */}
          {isExpanded && categories.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => onToggleCategory(category.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      searchFilters.category === category.id.toString()
                        ? "bg-violet-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
