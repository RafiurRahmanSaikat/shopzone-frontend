import { ArrowRight, Heart, ShoppingCart, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Heading from "../common/Heading";
import Text from "../common/Text";

export function NewArrivalsSection({ products = [] }) {
  return (
    <section className="px-4 py-16">
      <div className="container mx-auto">
        {/* Section Header */}

        <div className="mb-12 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <span className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
              <Sparkles className="mr-1 inline h-4 w-4" /> This Week&apos;s
              Arrivals
            </span>
            <Heading className="text-white">
              <span className="animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text font-bold text-transparent transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
                NEW ! {"  "}
              </span>
              Arrival Items
            </Heading>
            <Text size="lg" className="mt-6 text-zinc-800 dark:text-zinc-300">
              The latest products added to our store this week
            </Text>
          </div>
          <Button shape="rounded">
            <Link
              to="/products?sort=newest"
              className="text-primary-600 mt-4 inline-flex items-center hover:underline md:mt-0"
            >
              View All New Arrivals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product, index) => (
            <div
              key={product.id}
              className="group relative transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 dark:bg-zinc-800"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <span className="absolute top-3 right-0 z-10 rounded-l-lg bg-green-500 px-2 py-1 text-xs font-bold text-white uppercase shadow-md">
                  Just Added
                </span>
                <Link to={`/products/${product.id}`} className="block">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-64 w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                {/* Quick Action Buttons */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full transform justify-center space-x-2 bg-white/80 p-2 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 dark:bg-zinc-800/80">
                  <button className="bg-primary-500 hover:bg-primary-600 rounded-full p-2 text-white shadow transition-transform hover:scale-110">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                  <button className="text-primary-500 hover:text-primary-600 rounded-full bg-white p-2 shadow transition-transform hover:scale-110">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-zinc-200">
                  {product.name}
                </h3>
                <div className="mb-2 flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                    ({Math.floor(product.rating)})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-zinc-100">
                    ${product.price}
                  </span>
                  {product.brand && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {product.brand.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
