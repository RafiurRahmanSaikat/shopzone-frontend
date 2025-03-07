import { ArrowRight, Award } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ui/cards/ProductCard";

export function FeaturedProductsSection({ products = [] }) {
  return (
    <section className="section bg-gray-50 py-24 dark:bg-zinc-900">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold dark:text-zinc-300">
            <Award className="mr-1 inline h-4 w-4" /> Featured Products
          </span>
          <h2 className="font-heading mt-3 text-4xl font-bold text-gray-900 dark:text-zinc-100">
            Our Best Sellers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 dark:text-zinc-400">
            Shop our most popular products curated for quality and value
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="bg-primary-600 hover:bg-primary-700 inline-flex items-center rounded-full px-8 py-4 text-base font-medium text-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
          >
            View All Products <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
