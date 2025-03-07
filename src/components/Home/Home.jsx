import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FAQ, Hero, SearchBar, Stats } from "../../components";
import UseFetch from "../../hooks/UseFetch";
import { handlePostRequest } from "../../utils/Actions";
import { CategoriesSection } from "./categories-section";
import { FlashSaleSection } from "./flash-sale-section";
import { FridayDealsSection } from "./friday-deals-section";
import { NewArrivalsSection } from "./new-arrivals-section";
import { TestimonialsSection } from "./testimonials-section";
import { TrendingSection } from "./trending-section";

const HomePage = () => {
  const [searchFilters, setSearchFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  const { data: catData } = UseFetch("/categories/");
  console.log(catData);
  useEffect(() => {
    if (catData && catData.results) {
      setCategories(catData.results);
    }
  }, [catData]);

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
  };

  const handleClearSearch = () => {
    setSearchFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      category: "",
    });
  };

  const handleToggleCategory = (catId) => {
    setSearchFilters((prev) => ({
      ...prev,
      category: prev.category === catId ? "" : catId,
    }));
  };

  const loadMore = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const loadAll = () => {
    setPage(1);
    setPageSize("all");
    setAllLoaded(true);
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
    return (
      <div className="flex h-64 items-center justify-center">
        <p>lo</p>
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

  return (
    <div className="overflow-hidden">
      <Hero />

      <SearchBar
        searchFilters={searchFilters}
        onChange={setSearchFilters}
        onSubmit={handleSearchSubmit}
        onClear={handleClearSearch}
        categories={categories}
        onToggleCategory={handleToggleCategory}
      />

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

      {newArrivals.length > 0 && <NewArrivalsSection products={newArrivals} />}

      <TestimonialsSection />
      <Stats />
      <FAQ />
    </div>
  );
};

export default HomePage;

// // !Orginal
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { FAQ, Hero, SearchBar, Stats } from "../../components";
// import UseFetch from "../../hooks/UseFetch";
// import { handlePostRequest } from "../../utils/Actions";
// import ProductList from "./ProductList";

// export default function Home() {
//   const [searchFilters, setSearchFilters] = useState({
//     search: "",
//     minPrice: "",
//     maxPrice: "",
//     category: "",
//   });
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [products, setProducts] = useState([]);
//   const [allLoaded, setAllLoaded] = useState(false);
//   const [categories, setCategories] = useState([]);

//   const { data: catData } = UseFetch("/categories/");
//   console.log(catData);
//   useEffect(() => {
//     if (catData && catData.results) {
//       setCategories(catData.results);
//     }
//   }, [catData]);

//   const params = new URLSearchParams();
//   params.append("page", page);
//   params.append("page_size", pageSize);
//   if (searchFilters.search) params.append("search", searchFilters.search);
//   if (searchFilters.minPrice)
//     params.append("price_min", searchFilters.minPrice);
//   if (searchFilters.maxPrice)
//     params.append("price_max", searchFilters.maxPrice);

//   if (searchFilters.category) {
//     params.append("categories", searchFilters.category);
//   }
//   const url = `/products/?${params.toString()}`;

//   const { data, loading, error } = UseFetch(url);
//   console.log(data);
//   useEffect(() => {
//     setPage(1);
//   }, [searchFilters]);

//   useEffect(() => {
//     if (data?.results) {
//       if (page === 1) {
//         setProducts(data.results);
//       } else {
//         setProducts((prev) => {
//           const allProducts = [...prev, ...data.results];
//           const uniqueProducts = Array.from(
//             new Map(
//               allProducts.map((product) => [product.id, product]),
//             ).values(),
//           );
//           return uniqueProducts;
//         });
//       }
//       setAllLoaded(!data.next);
//     }
//   }, [data, page]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//   };

//   const handleClearSearch = () => {
//     setSearchFilters({
//       search: "",
//       minPrice: "",
//       maxPrice: "",
//       category: "",
//     });
//   };

//   const handleToggleCategory = (catId) => {
//     setSearchFilters((prev) => ({
//       ...prev,
//       category: prev.category === catId ? "" : catId,
//     }));
//   };

//   const loadMore = () => {
//     if (data?.next) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   const loadAll = () => {
//     setPage(1);
//     setPageSize("all");
//     setAllLoaded(true);
//   };

//   const handleAddToCart = async (productId, quantity = 1) => {
//     if (!productId) return;
//     try {
//       const payload = { product: productId, quantity };
//       const response = await handlePostRequest("/cart/", payload);
//       if (response) {
//         toast.success("Product added to cart successfully!");
//       }
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//     }
//   };

//   return (
//     <>
//       <Hero />
//       <SearchBar
//         searchFilters={searchFilters}
//         onChange={setSearchFilters}
//         onSubmit={handleSearchSubmit}
//         onClear={handleClearSearch}
//         categories={categories}
//         onToggleCategory={handleToggleCategory}
//       />
//       <ProductList
//         products={products}
//         loadAll={loadAll}
//         loadMore={loadMore}
//         loading={loading}
//         allLoaded={allLoaded}
//         pageSize={pageSize}
//         handleAddToCart={handleAddToCart}
//       />
//       <Stats />
//       <FAQ />
//     </>
//   );
// }

// ! V0 dev ;

// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// import UseFetch from "../../hooks/UseFetch";
// import Hero from "../ui/heros/Hero";
// import SearchBar from "../ui/search/SearchBar";
// import ProductSection from "./ProductSection";

// const Home = () => {
//   const [searchFilters, setSearchFilters] = useState({
//     search: "",
//     minPrice: "",
//     maxPrice: "",
//     category: "",
//   });

//   const [categories, setCategories] = useState([]);

//   // Fetch categories
//   const {
//     data: categoryData,
//     loading: categoryLoading,
//     error: categoryError,
//   } = UseFetch("/categories/");

//   useEffect(() => {
//     if (categoryData && categoryData.results) {
//       setCategories(categoryData.results);
//     }
//   }, [categoryData]);

//   // Fetch all products
//   const {
//     data: allProductsData,
//     loading: allProductsLoading,
//     error: allProductsError,
//   } = UseFetch("/products/");

//   // Fetch new arrivals (could be filtered by date in a real API)
//   const {
//     data: newArrivalsData,
//     loading: newArrivalsLoading,
//     error: newArrivalsError,
//   } = UseFetch("/products/?sort=-id");

//   // Fetch top selling products (in a real API, this would be sorted by sales)
//   const {
//     data: topSellingData,
//     loading: topSellingLoading,
//     error: topSellingError,
//   } = UseFetch("/products/?sort=-rating");

//   // Fetch discounted products (in a real API, this would filter by discount field)
//   const {
//     data: discountedData,
//     loading: discountedLoading,
//     error: discountedError,
//   } = UseFetch("/products/?page_size=4");

//   // Handle search submission
//   const handleSearchSubmit = () => {
//     // In a real app, this would navigate to the products page with filters applied
//     console.log("Search submitted with filters:", searchFilters);
//   };

//   // Handle clearing search filters
//   const handleClearSearch = () => {
//     setSearchFilters({
//       search: "",
//       minPrice: "",
//       maxPrice: "",
//       category: "",
//     });
//   };

//   // Handle toggling category filter
//   const handleToggleCategory = (categoryId) => {
//     setSearchFilters((prev) => ({
//       ...prev,
//       category: prev.category === categoryId ? "" : categoryId,
//     }));
//   };

//   // Handle adding product to cart
//   const handleAddToCart = (productId, quantity = 1) => {
//     // In a real app, this would call an API to add the product to the cart
//     console.log(
//       `Adding product ${productId} to cart with quantity ${quantity}`,
//     );
//     toast.success("Product added to cart!");
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <Hero />

//       {/* Search Bar */}
//       <SearchBar
//         searchFilters={searchFilters}
//         onChange={setSearchFilters}
//         onSubmit={handleSearchSubmit}
//         onClear={handleClearSearch}
//         categories={categories}
//         onToggleCategory={handleToggleCategory}
//       />

//       {/* Friday Deals Section */}
//       <ProductSection
//         title="Friday Deals"
//         subtitle="Special offers available today only!"
//         products={discountedData?.results || []}
//         loading={discountedLoading}
//         error={discountedError}
//         viewAllLink="/products?category=deals"
//         handleAddToCart={handleAddToCart}
//         bgColor="bg-gray-50 dark:bg-gray-800"
//       />

//       {/* New Arrivals Section */}
//       <ProductSection
//         title="New Arrivals"
//         subtitle="Check out our latest products"
//         products={newArrivalsData?.results || []}
//         loading={newArrivalsLoading}
//         error={newArrivalsError}
//         viewAllLink="/products?category=new-arrivals"
//         handleAddToCart={handleAddToCart}
//       />

//       {/* Top Selling Products Section */}
//       <ProductSection
//         title="Top Selling Products"
//         subtitle="Our most popular items"
//         products={topSellingData?.results || []}
//         loading={topSellingLoading}
//         error={topSellingError}
//         viewAllLink="/products?category=top-selling"
//         handleAddToCart={handleAddToCart}
//         bgColor="bg-gray-50 dark:bg-gray-800"
//       />

//       {/* Discounts Section */}
//       <ProductSection
//         title="Special Discounts"
//         subtitle="Save big on these selected items"
//         products={allProductsData?.results || []}
//         loading={allProductsLoading}
//         error={allProductsError}
//         viewAllLink="/products?category=discounts"
//         handleAddToCart={handleAddToCart}
//       />
//     </div>
//   );
// };

// export default Home;
