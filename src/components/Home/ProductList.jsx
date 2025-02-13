import { Loading, ProductCard } from "@components";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UseFetch from "../../hooks/UseFetch";
import { handlePostRequest } from "../../utils/Actions";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  const url = `/products?page=${page}&page_size=${pageSize}`;
  const { data, loading, error } = UseFetch(url);
  console.log(data);

  useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        setProducts(data.results);
      } else {
        setProducts((prev) => [...prev, ...data.results]);
      }
      if (!data.next) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }
    }
  }, [data, page]);

  const loadMore = () => {
    if (data?.next && typeof pageSize === "number") {
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
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <section className="py-8">
      <h2 className="mb-8 text-center text-3xl font-semibold text-gray-500 dark:text-white">
        Latest Products
      </h2>
      <div className="flex flex-wrap justify-evenly gap-6 px-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            rating={product.rating}
            name={product.name}
            onAddToCart={handleAddToCart}
            categories={product.categories}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-4">
        {typeof pageSize === "number" && !allLoaded && (
          <button
            onClick={loadMore}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Load More
          </button>
        )}
        {typeof pageSize === "number" && (
          <button
            onClick={loadAll}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Load All
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductList;
