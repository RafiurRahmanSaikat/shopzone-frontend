import { Loading, ProductCard } from "@components";
import React from "react";
import NoData from "../ui/emptyStates/NoData";

const ProductList = ({
  loading,
  error,
  handleAddToCart,
  allLoaded,
  loadMore,
  products,
  loadAll,
  pageSize,
}) => {
  return (
    <section className="py-8">
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : products.length === 0 ? (
        <NoData />
      ) : (
        <>
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-500 dark:text-white">
            Latest Products
          </h2>
          {/* Use CSS grid for responsive layout */}
          <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-10 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={`${product.id}-${product.name}`}
                id={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                rating={product.rating}
                onAddToCart={handleAddToCart}
                categories={product.categories}
                // Remove any width classes as grid handles sizing
              />
            ))}
          </div>
        </>
      )}
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
