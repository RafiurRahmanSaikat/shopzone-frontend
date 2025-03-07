import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import UseFetch from "../hooks/UseFetch";
import { handlePostRequest } from "../utils/Actions";
import ProductCard from "./ui/cards/ProductCard";

const ProductsPage = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    sortBy: "newest",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [products, setProducts] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  // Get categories
  const { data: catData } = UseFetch("/categories/");

  useEffect(() => {
    if (catData && catData.results) {
      setCategories(catData.results);
    }
  }, [catData]);

  // Parse URL query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    const minPrice = params.get("price_min") || "";
    const maxPrice = params.get("price_max") || "";
    const category = params.get("categories") || "";
    const sortBy = params.get("sort") || "newest";

    setSearchFilters({
      search: searchQuery,
      minPrice,
      maxPrice,
      category,
      sortBy,
    });
  }, [location.search]);

  // Build query params for API request
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("page_size", pageSize.toString());

    if (searchFilters.search) params.append("search", searchFilters.search);
    if (searchFilters.minPrice)
      params.append("price_min", searchFilters.minPrice);
    if (searchFilters.maxPrice)
      params.append("price_max", searchFilters.maxPrice);
    if (searchFilters.category)
      params.append("categories", searchFilters.category);

    // Add sorting
    if (searchFilters.sortBy === "price_low")
      params.append("ordering", "price");
    if (searchFilters.sortBy === "price_high")
      params.append("ordering", "-price");
    if (searchFilters.sortBy === "rating") params.append("ordering", "-rating");

    return params.toString();
  };

  const url = `/products/?${buildQueryParams()}`;
  const { data, loading, error } = UseFetch(url);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchFilters]);

  // Update products when data changes
  useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        setProducts(data.results);
      } else {
        setProducts((prev) => {
          const allProducts = [...prev, ...data.results];
          const uniqueProducts = Array.from(
            new Map(
              allProducts.map((product) => [product.id, product]),
            ).values(),
          );
          return uniqueProducts;
        });
      }
      setAllLoaded(!data.next);
    }
  }, [data, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Update URL with search params
    const params = new URLSearchParams();
    if (searchFilters.search) params.append("search", searchFilters.search);
    if (searchFilters.minPrice)
      params.append("price_min", searchFilters.minPrice);
    if (searchFilters.maxPrice)
      params.append("price_max", searchFilters.maxPrice);
    if (searchFilters.category)
      params.append("categories", searchFilters.category);
    if (searchFilters.sortBy !== "newest")
      params.append("sort", searchFilters.sortBy);

    window.history.pushState(
      {},
      "",
      `${location.pathname}?${params.toString()}`,
    );
    setIsSidebarOpen(false);
  };

  const handleClearFilters = () => {
    setSearchFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      category: "",
      sortBy: "newest",
    });
    window.history.pushState({}, "", location.pathname);
  };

  const loadMore = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!productId) return;
    try {
      const payload = { product: productId, quantity };
      const response = await handlePostRequest("/cart/", payload);
      if (response) {
        toast.success("Product added to cart successfully!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Please login to add items to cart");
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* Mobile filter button */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h1 className="text-2xl font-bold dark:text-white">Products</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-sm dark:bg-zinc-800 dark:text-white"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:gap-6">
          {/* Sidebar - Desktop */}
          <div className="sticky top-24 hidden h-fit w-64 shrink-0 rounded-xl bg-white p-4 shadow-sm md:block dark:bg-zinc-800">
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold dark:text-white">
                Search
              </h2>
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
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold dark:text-white">
                Categories
              </h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cat-all"
                    name="category"
                    checked={!searchFilters.category}
                    onChange={() =>
                      setSearchFilters((prev) => ({ ...prev, category: "" }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-gray-600"
                  />
                  <label
                    htmlFor="cat-all"
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    All Categories
                  </label>
                </div>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`cat-${category.id}`}
                      name="category"
                      checked={
                        searchFilters.category === category.id.toString()
                      }
                      onChange={() =>
                        setSearchFilters((prev) => ({
                          ...prev,
                          category: category.id.toString(),
                        }))
                      }
                      className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`cat-${category.id}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold dark:text-white">
                Price Range
              </h2>
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
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
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
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold dark:text-white">
                Sort By
              </h2>
              <select
                value={searchFilters.sortBy}
                onChange={(e) =>
                  setSearchFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleSearchSubmit}
                className="flex-1 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:bg-violet-700 dark:hover:bg-violet-800"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearFilters}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Sidebar - Mobile */}
          {isSidebarOpen && (
            <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black md:hidden">
              <div className="h-full w-full max-w-xs overflow-y-auto bg-white p-4 dark:bg-zinc-800">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold dark:text-white">Filters</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold dark:text-white">
                    Search
                  </h2>
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
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                    />
                    <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold dark:text-white">
                    Categories
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="mobile-cat-all"
                        name="mobile-category"
                        checked={!searchFilters.category}
                        onChange={() =>
                          setSearchFilters((prev) => ({
                            ...prev,
                            category: "",
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-gray-600"
                      />
                      <label
                        htmlFor="mobile-cat-all"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        All Categories
                      </label>
                    </div>
                    {categories.map((category) => (
                      <div
                        key={`mobile-${category.id}`}
                        className="flex items-center"
                      >
                        <input
                          type="radio"
                          id={`mobile-cat-${category.id}`}
                          name="mobile-category"
                          checked={
                            searchFilters.category === category.id.toString()
                          }
                          onChange={() =>
                            setSearchFilters((prev) => ({
                              ...prev,
                              category: category.id.toString(),
                            }))
                          }
                          className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`mobile-cat-${category.id}`}
                          className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold dark:text-white">
                    Price Range
                  </h2>
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
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
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
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold dark:text-white">
                    Sort By
                  </h2>
                  <select
                    value={searchFilters.sortBy}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleSearchSubmit}
                    className="flex-1 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:bg-violet-700 dark:hover:bg-violet-800"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={handleClearFilters}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop header */}
            <div className="mb-6 hidden items-center justify-between md:flex">
              <h1 className="text-2xl font-bold dark:text-white">Products</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort by:
                  </span>
                  <select
                    value={searchFilters.sortBy}
                    onChange={(e) => {
                      setSearchFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }));
                      handleSearchSubmit(e);
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {products.length} products
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading && products.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <div className="text-xl font-bold text-red-600">
                  Error Loading Products
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
                <p className="mt-4">
                  Please check your connection and try again.
                </p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <div className="text-xl font-bold dark:text-white">
                  No Products Found
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      image={product.image}
                      rating={product.rating || 0}
                      categories={product.categories}
                      onAddToCart={() => handleAddToCart(product.id)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {!allLoaded && !loading && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={loadMore}
                      className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-violet-600 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:bg-zinc-800 dark:text-violet-400 dark:hover:bg-gray-700"
                    >
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Loading indicator for load more */}
            {loading && products.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
