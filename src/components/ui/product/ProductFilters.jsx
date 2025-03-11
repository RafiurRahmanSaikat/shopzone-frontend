import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import FilterSidebar from "./FilterSidebar";

const ProductFilters = ({
  categories = [],
  searchFilters,
  setSearchFilters,
  onApplyFilters,
  onClearFilters,
}) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (searchFilters.search) count++;
    if (searchFilters.minPrice || searchFilters.maxPrice) count++;
    if (searchFilters.category) count++;
    if (searchFilters.sortBy !== "newest") count++;
    setActiveFilters(count);
  }, [searchFilters]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    onApplyFilters();
    setIsSidebarOpen(false);
  };

  const handleClearFilters = () => {
    onClearFilters();
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="mb-4 md:hidden">
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Filter className="h-4 w-4" />}
          onClick={() => setIsSidebarOpen(true)}
          className="relative"
        >
          Filters
          {activeFilters > 0 && (
            <Badge
              variant="primary"
              size="sm"
              className="absolute -top-2 -right-2"
            >
              {activeFilters}
            </Badge>
          )}
        </Button>
      </div>

      {/* Desktop sidebar */}
      <div className="sticky top-24 hidden h-fit md:block">
        <FilterSidebar
          searchFilters={searchFilters}
          setSearchFilters={setSearchFilters}
          categories={categories}
          handleSearchSubmit={handleSearchSubmit}
          handleClearFilters={handleClearFilters}
        />
      </div>

      {/* Mobile sidebar modal */}
      {isSidebarOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black md:hidden">
          <div className="h-full w-full max-w-xs overflow-y-auto bg-white p-4 dark:bg-zinc-800">
            <FilterSidebar
              searchFilters={searchFilters}
              setSearchFilters={setSearchFilters}
              categories={categories}
              handleSearchSubmit={handleSearchSubmit}
              handleClearFilters={handleClearFilters}
              isMobile={true}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;
