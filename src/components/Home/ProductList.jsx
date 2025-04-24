import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handlePostRequest } from "../../utils/Actions";
import ProductCard from "../product/ProductCard";
import { Grid, Heading } from "../ui";

const ProductList = ({ products }) => {
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
    <div className="mx-auto my-10 w-fit">
      <div className="mb-10 text-center">
        <Heading>
          All{" "}
          <span className="text-violet-600 dark:text-violet-400">Products</span>
        </Heading>
      </div>

      <Grid className="w-[80vw]" cols={5} gap={5}>
        {products?.map((product, index) => (
          <ProductCard
            product={product}
            key={product.id}
            index={index}
            onAddToCart={() => handleAddToCart(product.id)}
          />

          // <div
          //   key={product.id}
          //   className="group animate-fade-in relative overflow-hidden rounded-2xl bg-zinc-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-zinc-800"
          //   style={{ animationDelay: `${index * 150}ms` }}
          // >
          //   <div className="absolute top-2 right-2 z-10 rounded-full bg-amber-600 p-2 font-semibold text-white">
          //     Top Rated!
          //   </div>

          //   <img
          //     src={product.image || "/placeholder.svg"}
          //     alt={product.name}
          //     className="h-64 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          //   />

          //   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

          //   <div className="absolute right-0 bottom-0 left-0 translate-y-8 p-6 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          //     <Text size="xl" weight="bold">
          //       {product.name}
          //     </Text>

          //     <div className="mt-2 flex items-center">
          //       <div className="flex">
          //         {Array.from({ length: 5 }).map((_, i) => (
          //           <Star
          //             key={i}
          //             className={`h-4 w-4 ${
          //               i < Math.floor(product.rating)
          //                 ? "fill-yellow-400 text-yellow-400"
          //                 : "text-zinc-300"
          //             }`}
          //           />
          //         ))}
          //       </div>
          //       <span className="ml-2 text-sm">({product.rating})</span>
          //     </div>

          //     <div className="mt-3 flex items-center justify-between">
          //       <div>
          //         <Text size="lg" weight="bold">
          //           ${product.price}
          //         </Text>
          //       </div>
          //       <Link
          //         to={`/products/${product.id}`}
          //         className="rounded-full bg-amber-600 p-2 shadow-md transition-transform hover:scale-110"
          //       >
          //         <ArrowUpRight className="h-5 w-5 text-white" />
          //       </Link>
          //     </div>
          //   </div>
          // </div>
        ))}
      </Grid>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          to="/products"
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-center text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/25 dark:shadow-indigo-700/20"
        >
          <span className="relative z-10 flex items-center justify-center">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
