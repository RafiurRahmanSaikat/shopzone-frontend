import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "../carousels/HeroCarousel";

const Hero = () => {
  return (
    <div className="over flow-hidden relative">
      {/* Background decoration */}
      {/* <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-100 opacity-70 blur-3xl dark:bg-indigo-900/30"></div>
        <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-purple-100 opacity-70 blur-3xl dark:bg-purple-900/30"></div> */}

      <div className="relative mx-auto max-w-[90vw] px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-24 lg:px-8">
        {/* Announcement Banner */}
        <div className="mb-8 flex justify-center">
          <div className="animate-pulse-slow inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white/90 p-2 px-3 text-xs text-gray-600 shadow-sm backdrop-blur-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-zinc-800/90 dark:text-gray-300">
            <span className="animate-shimmer rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 bg-[length:400%_100%] px-2 py-0.5 font-medium text-white">
              New
            </span>
            <span>Summer Collection Available Now!</span>
            <Link to="/products" className="flex items-center gap-x-1">
              <span className="border-s border-gray-200 ps-2 font-medium text-indigo-600 dark:border-gray-700 dark:text-indigo-400">
                Shop Now
              </span>
              <ArrowRight className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
            </Link>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              <span className="block">Discover the Latest</span>
              <span className="mt-1 block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                Fashion Trends
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-xl text-gray-600 lg:mx-0 dark:text-gray-300">
              Explore our curated collection of premium products at unbeatable
              prices. Free shipping on orders over $50!
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/products"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-center text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/25 dark:shadow-indigo-700/20"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Link>
              <Link
                to="products/?categories"
                className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-center text-sm font-medium text-gray-900 shadow-lg transition-all duration-300 hover:shadow-gray-300/50 dark:bg-zinc-700 dark:text-white dark:hover:shadow-gray-900/50"
              >
                <span className="relative z-10">Browse Categories</span>
              </Link>
            </div>
          </div>

          {/* Hero Carousel */}
          <div className="relative z-10 mt-12 lg:mt-0">
            <HeroCarousel />

            {/* Product cards floating around carousel */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-zinc-800/95">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"
                    alt="Smart Watch"
                    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Smart Watch
                  </p>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    $199.99
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-zinc-800/95">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    alt="Headphones"
                    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Headphones
                  </p>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    $149.99
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
