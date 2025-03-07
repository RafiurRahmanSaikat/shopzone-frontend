import React from "react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "../../Home/hero-carousel";

const Hero = () => {
  return (
    <div>
      <div className="mx-auto max-w-[90vw] px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-24 lg:px-8">
        {/* Announcement Banner */}
        {/* <div className="mb-8 flex justify-center">
          <div className="animate-pulse-slow inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white/80 p-2 px-3 text-xs text-gray-600 backdrop-blur-sm transition hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300">
            <span className="animate-shimmer from-primary/0 via-primary/50 to-primary/0 rounded-full bg-gradient-to-r bg-[length:400%_100%] px-2 py-0.5">
              New
            </span>
            Summer Collection Available Now!
            <span className="flex items-center gap-x-1">
              <span className="text-primary dark:text-primary-light border-s border-gray-200 ps-2 dark:border-gray-700">
                Shop Now
              </span>
              <svg
                className="text-primary dark:text-primary-light size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </div>
        </div> */}

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              <span className="block">Discover the Latest</span>
              <span className="text-primary dark:text-primary-light block">
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
                className="bg-primary shadow-primary/30 hover:bg-primary-light hover:shadow-primary/40 focus:ring-primary dark:shadow-primary/20 dark:hover:shadow-primary/30 rounded-full px-8 py-3 text-center text-sm font-medium text-white shadow-lg transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
              >
                Shop Now
              </Link>
              <Link
                to="/categories"
                className="rounded-full bg-white px-8 py-3 text-center text-sm font-medium text-gray-900 shadow-lg transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-900"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Hero Carousel */}
          <div className="relative mt-12 lg:mt-0">
            <HeroCarousel />

            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white/90 p-4 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"
                    alt="Smart Watch"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Smart Watch
                  </p>
                  <p className="text-primary dark:text-primary-light text-sm">
                    $199.99
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 rounded-xl bg-white/90 p-4 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    alt="Headphones"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Headphones
                  </p>
                  <p className="text-primary dark:text-primary-light text-sm">
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
