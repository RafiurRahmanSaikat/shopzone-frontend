import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FAQ, Hero, Loading, Stats } from "../../components";
import UseFetch from "../../hooks/UseFetch";
import { handlePostRequest } from "../../utils/Actions";
import Error from "../ui/errors/Error";
import CategoriesSection from "../ui/sections/CategoriesSection";
import FeaturesSection from "../ui/sections/FeaturesSection";
import FlashSaleSection from "../ui/sections/FlashSaleSection";
import FridayDealsSection from "../ui/sections/FridayDealsSection";
import NewsletterSection from "../ui/sections/NewsletterSection";
import TestimonialsSection from "../ui/sections/TestimonialsSection";
import TrendingSection from "../ui/sections/TrendingSection";
import ProductList from "./ProductList";

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
  console.log(data);
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
  const getFeaturedProducts = () => {
    if (!productsData?.results) return [];
    // For demo purposes, let's consider the first 8 products as featured
    return productsData.results.slice(0, 8);
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

    // Filter products created within the last week
    // Using the most recent review's created_at as a proxy for product creation date
    // if the product itself doesn't have a created_at field
    return productsData.results
      .filter((product) => {
        if (product.created_at) {
          const createdDate = new Date(product.created_at);
          return createdDate >= oneWeekAgo;
        } else if (product.reviews && product.reviews.length > 0) {
          // Sort reviews by created_at date (newest first)
          const sortedReviews = [...product.reviews].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at),
          );
          const latestReviewDate = new Date(sortedReviews[0].created_at);
          return latestReviewDate >= oneWeekAgo;
        }
        return false;
      })
      .slice(0, 4); // Limit to 4 products
  };

  const getFridayDeals = () => {
    if (!productsData?.results) return [];

    return productsData.results
      .filter((product) => Number.parseFloat(product.price) > 500)
      .slice(0, 4); // Limit to 4 products
  };

  const getTrendingProducts = () => {
    if (!productsData?.results) return [];

    // Sort by rating (highest first)
    return [...productsData.results]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4); // Limit to 4 products
  };

  const getFlashSaleProducts = () => {
    if (!productsData?.results) return [];

    // For demo purposes, let's add flash sale properties to random 6 products
    return productsData.results
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 6)
      .map((product) => ({
        ...product,
        flashSalePrice: (Number.parseFloat(product.price) * 0.6).toFixed(2), // 40% off for flash sale
        flashSaleDiscount: 40,
      }));
  };

  if (productsLoading || categoriesLoading) {
    return <Loading />;
  }

  if (productsError || categoriesError) {
    return <Error />;
  }

  // Check if we have any products for each section
  const newArrivals = getNewArrivals();
  const fridayDeals = getFridayDeals();
  const trendingProducts = getTrendingProducts();
  const flashSaleProducts = getFlashSaleProducts();
  const featuredProducts = getFeaturedProducts();
  return (
    <div className="">
      <Hero />
      <ProductList products={data.results} />

      {fridayDeals.length > 0 && (
        <FridayDealsSection featuredProducts={fridayDeals} />
      )}
      {flashSaleProducts.length > 0 && (
        <FlashSaleSection products={flashSaleProducts} />
      )}
      {trendingProducts.length > 0 && (
        <TrendingSection products={trendingProducts} />
      )}
      {categoriesData?.results && (
        <CategoriesSection categories={categoriesData.results} />
      )}

      {/* {newArrivals.length > 0 && <NewArrivalsSection products={newArrivals} />} */}
      {/* {featuredProducts.length > 0 && (
        <FeaturedProductsSection products={featuredProducts} />
      )} */}
      <FeaturesSection />
      <NewsletterSection />
      <TestimonialsSection />
      <Stats />
      <FAQ />
    </div>
  );
};

export default HomePage;
