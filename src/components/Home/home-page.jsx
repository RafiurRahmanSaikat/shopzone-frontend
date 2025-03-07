import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { useFetch } from "../../hooks/use-fetch";
import { CategoriesSection } from "./categories-section";
import { FeaturedProductsSection } from "./featured-products-section";
import { FeaturesSection } from "./features-section";
import { FlashSaleSection } from "./flash-sale-section";
import { FridayDealsSection } from "./friday-deals-section";
import { HeroCarousel } from "./hero-carousel";
import { NewArrivalsSection } from "./new-arrivals-section";
import { NewsletterSection } from "./newsletter-section";
import { TestimonialsSection } from "./testimonials-section";
import { TrendingSection } from "./trending-section";

const HomePage = () => {
  // Fetch all products
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch(`/products/?page_size=all`);

  // Fetch all categories
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(`/categories/`);

  // Get products created this week for New Arrivals section
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

  // Get products with price > $500 for Friday Deals section
  const getFridayDeals = () => {
    if (!productsData?.results) return [];

    return productsData.results
      .filter((product) => Number.parseFloat(product.price) > 500)
      .slice(0, 4); // Limit to 4 products
  };

  // Get products with top ratings for Trending section
  const getTrendingProducts = () => {
    if (!productsData?.results) return [];

    // Sort by rating (highest first)
    return [...productsData.results]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4); // Limit to 4 products
  };

  // Get flash sale products (random selection with discount applied)
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

  // Get featured products (for general display)
  const getFeaturedProducts = () => {
    if (!productsData?.results) return [];
    // For demo purposes, let's consider the first 8 products as featured
    return productsData.results.slice(0, 8);
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">Error Loading Data</h2>
          <p className="mt-2 text-gray-600">
            {productsError || categoriesError}
          </p>
          <p className="mt-4">
            Please check your API connection and try again.
          </p>
        </div>
      </div>
    );
  }

  // Check if we have any products for each section
  const newArrivals = getNewArrivals();
  const fridayDeals = getFridayDeals();
  const trendingProducts = getTrendingProducts();
  const flashSaleProducts = getFlashSaleProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="overflow-hidden">
      <HeroCarousel />
      {flashSaleProducts.length > 0 && (
        <FlashSaleSection products={flashSaleProducts} />
      )}
      {trendingProducts.length > 0 && (
        <TrendingSection products={trendingProducts} />
      )}
      {categoriesData?.results && (
        <CategoriesSection categories={categoriesData.results} />
      )}
      {fridayDeals.length > 0 && (
        <FridayDealsSection featuredProducts={fridayDeals} />
      )}
      {newArrivals.length > 0 && <NewArrivalsSection products={newArrivals} />}
      {featuredProducts.length > 0 && (
        <FeaturedProductsSection products={featuredProducts} />
      )}
      <TestimonialsSection />
      <FeaturesSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
