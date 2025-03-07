import { ArrowUpRight, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function TrendingSection({ products = [] }) {
  return (
    <section className="section p-20">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold">
            <TrendingUp className="mr-1 inline h-4 w-4" /> Top Rated Products
          </span>
          <h2 className="font-heading mt-3 text-4xl font-bold">
            Trending Items
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-zinc-800 dark:text-zinc-200">
            Discover our best-reviewed products loved by customers
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group animate-fade-in relative overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-2 right-2 z-10 rounded-full bg-amber-600 p-2 font-semibold text-white">
                Top Rated!
              </div>

              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-64 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

              <div className="absolute right-0 bottom-0 left-0 translate-y-8 p-6 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <div className="mt-2 flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">({product.rating})</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">${product.price}</span>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-primary-600 rounded-full bg-amber-600 p-2 shadow-md transition-transform hover:scale-110"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
