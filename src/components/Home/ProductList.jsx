import React from "react";
import useFetch from "../../hooks/UseFetch";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { data: products, loading, error } = useFetch("/products");
  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <section className="py-8">
      <h2 className="mb-8 text-center text-3xl font-semibold text-gray-500 dark:text-white">
        Latest Products
      </h2>
      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.results?.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
