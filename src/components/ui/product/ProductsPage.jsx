import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import UseFetch from "../../../hooks/UseFetch";
import { handlePostRequest } from "../../../utils/Actions";
import ProductCard from "../cards/ProductCard";
import Button from "../common/Button";
import Heading from "../common/Heading";
import Spinner from "../common/Spinner";
import Text from "../common/Text";
import ProductFilters from "./ProductFilters";
import ProductListHeader from "./ProductListHeader";

const ProductsPage = () => {
  const location = useLocation();
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
  const [activeFilters, setActiveFilters] = useState(0);

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

    // Count active filters for badge
    let count = 0;
    if (searchQuery) count++;
    if (minPrice || maxPrice) count++;
    if (category) count++;
    if (sortBy !== "newest") count++;
    setActiveFilters(count);
  }, [location.search]);

  // Build query params for API request
  const buildQueryParams = useCallback(() => {
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
  }, [page, pageSize, searchFilters]);

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

  const handleApplyFilters = () => {
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

    // Count active filters for badge
    let count = 0;
    if (searchFilters.search) count++;
    if (searchFilters.minPrice || searchFilters.maxPrice) count++;
    if (searchFilters.category) count++;
    if (searchFilters.sortBy !== "newest") count++;
    setActiveFilters(count);
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
    setActiveFilters(0);
  };

  const handleSortChange = (e) => {
    setSearchFilters((prev) => ({
      ...prev,
      sortBy: e.target.value,
    }));

    // Auto-apply sort change
    setTimeout(() => {
      handleApplyFilters();
    }, 0);
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
        <div className="flex flex-col md:flex-row md:gap-6">
          {/* Sidebar Filters */}
          <ProductFilters
            categories={categories}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Products Header */}
            <ProductListHeader
              title="ALL Products"
              productCount={products.length}
              activeFilters={activeFilters}
              sortBy={searchFilters.sortBy}
              onSortChange={handleSortChange}
            />

            {/* Products Grid */}
            {loading && products.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner size="lg" variant="primary" />
              </div>
            ) : error ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <Heading as="h2" size="h4" className="text-red-600">
                  Error Loading Products
                </Heading>
                <Text muted className="mt-2">
                  {error}
                </Text>
                <Text className="mt-4">
                  Please check your connection and try again.
                </Text>
              </div>
            ) : products.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <Heading as="h2" size="h4">
                  No Products Found
                </Heading>
                <Text muted className="mt-2">
                  Try adjusting your search or filter criteria.
                </Text>
                <Button
                  variant="primary"
                  size="md"
                  className="mt-4"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        rating: product.rating || 0,
                        stock: product.stock || 10, // Default stock if not provided
                        categories: product.categories || [],
                      }}
                      onAddToCart={() => handleAddToCart(product.id)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {!allLoaded && !loading && (
                  <div className="mt-8 flex justify-center">
                    <Button variant="secondary" size="md" onClick={loadMore}>
                      Load More Products
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Loading indicator for load more */}
            {loading && products.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Spinner size="md" variant="primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
