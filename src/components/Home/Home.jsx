import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FAQ, Hero, Stats } from "../../components";
import UseFetch from "../../hooks/UseFetch";
import { handlePostRequest } from "../../utils/Actions";
import Error from "../ui/errors/Error";
import CategoriesSection from "../ui/sections/CategoriesSection";
import FeaturesSection from "../ui/sections/FeaturesSection";
import FlashSaleSection from "../ui/sections/FlashSaleSection";
import FridayDealsSection from "../ui/sections/FridayDealsSection";
import { NewArrivalsSection } from "../ui/sections/NewArrivalsSection";
import NewsletterSection from "../ui/sections/NewsletterSection";
import TestimonialsSection from "../ui/sections/TestimonialsSection";
import TrendingSection from "../ui/sections/TrendingSection";
import ProductList from "./ProductList";
import ProductListSkeleton from "./ProductListSkeleton";

const HomePage = () => {
  const [searchFilters, setSearchFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const params = new URLSearchParams();
  params.append("page", page);
  params.append("page_size", pageSize);
  if (searchFilters.search) params.append("search", searchFilters.search);
  if (searchFilters.minPrice)
    params.append("price_min", searchFilters.minPrice);
  if (searchFilters.maxPrice)
    params.append("price_max", searchFilters.maxPrice);

  if (searchFilters.category) {
    params.append("categories", searchFilters.category);
  }
  const url = `/products/?${params.toString()}`;

  const { data, loading, error } = UseFetch(url);

  useEffect(() => {
    setPage(1);
  }, [searchFilters]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleClearSearch = () => {
    setSearchFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      category: "",
    });
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
    }
  };

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = UseFetch(`/products/?page_size=all`);

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = UseFetch(`/categories/`);

  const getNewArrivals = () => {
    if (!productsData?.results) return [];

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return productsData.results
      .filter((product) => {
        if (product.created_at) {
          const createdDate = new Date(product.created_at);
          return createdDate >= oneWeekAgo;
        } else if (product.reviews && product.reviews.length > 0) {
          const sortedReviews = [...product.reviews].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at),
          );
          const latestReviewDate = new Date(sortedReviews[0].created_at);
          return latestReviewDate >= oneWeekAgo;
        }
        return false;
      })
      .slice(0, 4);
  };

  const getFridayDeals = () => {
    if (!productsData?.results) return [];

    return productsData.results
      .filter((product) => Number.parseFloat(product.price) > 500)
      .slice(0, 4);
  };

  const getTrendingProducts = () => {
    if (!productsData?.results) return [];

    return [...productsData.results]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  };

  const getFlashSaleProducts = () => {
    if (!productsData?.results) return [];

    return productsData.results
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .map((product) => ({
        ...product,
        flashSalePrice: (Number.parseFloat(product.price) * 0.6).toFixed(2),
        flashSaleDiscount: 40,
      }));
  };

  if (productsError || categoriesError) {
    return <Error />;
  }

  // Check if we have any products for each section
  const newArrivals = getNewArrivals();
  const fridayDeals = getFridayDeals();
  const trendingProducts = getTrendingProducts();
  const flashSaleProducts = getFlashSaleProducts();

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800">
      <Hero />

      {/* Show skeleton while loading products */}
      {loading ? (
        <ProductListSkeleton />
      ) : (
        <ProductList loading={loading} products={data?.results} />
      )}

      {/* Show skeleton or actual categories */}
      {categoriesLoading ? (
        <div className="mx-auto my-10 w-[80vw] animate-pulse">
          <div className="mx-auto mb-6 h-10 w-48 rounded-lg bg-zinc-300 dark:bg-zinc-600"></div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-40 rounded-lg bg-zinc-300 dark:bg-zinc-600"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        categoriesData?.results && (
          <CategoriesSection categories={categoriesData.results} />
        )
      )}

      {/* Conditionally render sections with skeletons when loading */}
      {productsLoading ? (
        <div className="mx-auto my-10 w-[80vw] animate-pulse">
          <div className="mx-auto mb-6 h-10 w-48 rounded-lg bg-zinc-300 dark:bg-zinc-600"></div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-64 rounded-lg bg-zinc-300 dark:bg-zinc-600"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {newArrivals.length > 0 && (
            <NewArrivalsSection products={newArrivals} />
          )}
          {fridayDeals.length > 0 && (
            <FridayDealsSection featuredProducts={fridayDeals} />
          )}
          {flashSaleProducts.length > 0 && (
            <FlashSaleSection products={flashSaleProducts} />
          )}
          {trendingProducts.length > 0 && (
            <TrendingSection products={trendingProducts} />
          )}
        </>
      )}

      <FeaturesSection />
      <NewsletterSection />
      <TestimonialsSection />
      <Stats />
      <FAQ />
    </div>
  );
};

export default HomePage;
