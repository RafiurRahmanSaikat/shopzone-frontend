"use client";
import { Search, X } from "lucide-react";
import { Button, Card, Heading } from "../../../components";

const FilterSidebar = ({
  searchFilters,
  setSearchFilters,
  categories = [],
  handleSearchSubmit,
  handleClearFilters,
  isMobile = false,
  onClose,
}) => {
  const idPrefix = isMobile ? "mobile-" : "";

  return (
    <Card
      variant="default"
      className={isMobile ? "h-full w-full" : "h-fit w-64"}
    >
      <Card.Body>
        {isMobile && (
          <div className="mb-4 flex items-center justify-between">
            <Heading as="h2" size="h4">
              Filters
            </Heading>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-label="Close filters"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}

        <div className="mb-6">
          <Heading as="h2" size="h5" className="mb-3">
            Search
          </Heading>
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchFilters.search}
                onChange={(e) =>
                  setSearchFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm transition-colors focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="mb-6">
          <Heading as="h2" size="h5" className="mb-3">
            Categories
          </Heading>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id={`${idPrefix}cat-all`}
                name={`${idPrefix}category`}
                checked={!searchFilters.category}
                onChange={() =>
                  setSearchFilters((prev) => ({ ...prev, category: "" }))
                }
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
              />
              <label
                htmlFor={`${idPrefix}cat-all`}
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                All Categories
              </label>
            </div>
            {categories.map((category) => (
              <div
                key={`${idPrefix}${category.id}`}
                className="flex items-center"
              >
                <input
                  type="radio"
                  id={`${idPrefix}cat-${category.id}`}
                  name={`${idPrefix}category`}
                  checked={searchFilters.category === category.id.toString()}
                  onChange={() =>
                    setSearchFilters((prev) => ({
                      ...prev,
                      category: category.id.toString(),
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
                />
                <label
                  htmlFor={`${idPrefix}cat-${category.id}`}
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Heading as="h2" size="h5" className="mb-3">
            Price Range
          </Heading>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={searchFilters.minPrice}
              onChange={(e) =>
                setSearchFilters((prev) => ({
                  ...prev,
                  minPrice: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
            />
            <span className="text-gray-500 dark:text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={searchFilters.maxPrice}
              onChange={(e) =>
                setSearchFilters((prev) => ({
                  ...prev,
                  maxPrice: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-6">
          <Heading as="h2" size="h5" className="mb-3">
            Sort By
          </Heading>
          <select
            value={searchFilters.sortBy}
            onChange={(e) =>
              setSearchFilters((prev) => ({
                ...prev,
                sortBy: e.target.value,
              }))
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleSearchSubmit}
          >
            Apply Filters
          </Button>
          <Button variant="secondary" size="sm" onClick={handleClearFilters}>
            Clear
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FilterSidebar;
