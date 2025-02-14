import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FAQ, Hero, SearchBar, Stats } from "../../components";
import UseFetch from "../../hooks/UseFetch";
import { handlePostRequest } from "../../utils/Actions";
import ProductList from "./ProductList";

export default function Home() {
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

  return (
    <>
      <Hero />
      <SearchBar
        searchFilters={searchFilters}
        onChange={setSearchFilters}
        onSubmit={handleSearchSubmit}
        onClear={handleClearSearch}
        categories={categories}
        onToggleCategory={handleToggleCategory}
      />
      <ProductList
        products={products}
        loadAll={loadAll}
        loadMore={loadMore}
        loading={loading}
        allLoaded={allLoaded}
        pageSize={pageSize}
        handleAddToCart={handleAddToCart}
      />
      <Stats />
      <FAQ />
    </>
  );
}
