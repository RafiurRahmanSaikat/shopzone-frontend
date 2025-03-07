import { Flame } from "lucide-react";

export function FridayDealsSection({ featuredProducts = [] }) {
  return (
    <section className="p-20">
      <div className="relative z-10 bg-white dark:bg-zinc-900">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Flame className="text-secondary-300 mr-2 h-5 w-5 animate-pulse" />
              <span className="text-sm font-bold tracking-wide uppercase">
                Premium Products - 50% OFF
              </span>
            </div>
            <h2 className="font-display mt-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="animate-pulse text-yellow-300">50% OFF</span>{" "}
              Premium Items
            </h2>
            <p className="mt-6 text-xl text-white/90">
              Exclusive savings on our premium products priced over $500.
              Limited-time offers on high-end items!
            </p>
            {/* <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                to="/products"
                className="text-secondary-600 inline-flex items-center rounded-full bg-white px-8 py-4 text-lg font-medium shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/products?price_min=500"
                className="bg-secondary-600 hover:bg-secondary-700 inline-flex items-center rounded-full px-8 py-4 text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
              >
                View Premium <Tag className="ml-2 h-5 w-5" />
              </Link>
            </div> */}
          </div>

          <div className="relative">
            <div className="animate-spin-slow absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10"></div>
            <div className="animate-spin-slow - absolute -bottom-8 left-8 h-24 w-24 rounded-full bg-white/10"></div>

            <div className="animate-float glass rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-5 bg-white/10 dark:bg-zinc-900">
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-lg bg-white/10 shadow-md backdrop-blur-2xl dark:bg-zinc-900/40"
                  >
                    <div className="bg-secondary-500 absolute -top-12 -right-12 z-10 h-24 w-24 rotate-12 shadow"></div>
                    <span className="absolute top-1 right-1 z-20 text-xs font-bold text-white">
                      -50%
                    </span>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-32 w-full object-cover object-center transition-transform group-hover:scale-110"
                    />
                    <div className="p-3">
                      <h3 className="truncate text-xs font-medium">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-secondary-600 text-sm font-bold">
                          ${(Number.parseFloat(product.price) * 0.5).toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
