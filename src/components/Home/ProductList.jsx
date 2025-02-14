import { Loading, ProductCard } from "@components";
import React from "react";
import NoData from "../ui/emptyStates/Nodata";

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
          <div className="flex flex-wrap justify-evenly gap-6 px-4">
            {products.map((product) => (
              <ProductCard
                key={`${product.id}-${product.name}`}
                // key={product.id}
                id={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                rating={product.rating}
                onAddToCart={handleAddToCart}
                categories={product.categories}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
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
