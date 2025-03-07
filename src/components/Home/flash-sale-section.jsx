import { Heart, ShoppingCart, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function FlashSaleSection({ products = [] }) {
  console.log(products);
  const flashSaleEndTime = useRef(new Date(Date.now() + 24 * 60 * 60 * 1000)); // 24 hours from now
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Update countdown timer every second
    const timerInterval = setInterval(() => {
      const now = new Date();
      const difference = flashSaleEndTime.current - now;

      if (difference <= 0) {
        // Reset timer to new 24 hours when it ends
        flashSaleEndTime.current = new Date(Date.now() + 24 * 60 * 60 * 1000);
      } else {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <section className="relative overflow-hidden p-20">
      <div className='bg-[url(&apos;data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fillOpacity="0.05" fillRule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"%3E%3C/circle%3E%3Ccircle cx="13" cy="13" r="3"%3E%3C/circle%3E%3C/g%3E%3C/svg%3E&apos;)] absolute inset-0 opacity-20'></div>
      <div className="bg-secondary-500 absolute -top-20 -left-20 h-40 w-40 rounded-full opacity-20 blur-3xl"></div>
      <div className="bg-accent-500 absolute -right-20 -bottom-20 h-60 w-60 rounded-full opacity-20 blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="mb-12 flex flex-col items-center space-y-6 text-center md:flex-row md:justify-between md:space-y-0">
          <div className="md:max-w-xl">
            <div className="flash-sale-badge mb-4 inline-flex items-center">
              <Zap className="mr-2 h-5 w-5 animate-pulse" />
              FLASH SALE
            </div>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              <span className="animate-pulse text-yellow-300">40% OFF</span>{" "}
              Today Only!
            </h2>
            <p className="mt-3 text-lg text-white/90">
              Incredible deals on top products. Hurry, these offers expire soon!
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-bold text-white">Ends In:</h3>
              <div className="flex items-center justify-center space-x-3">
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <span className="text-3xl font-bold text-white">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-white/80">Hours</span>
                </div>
                <span className="text-3xl font-bold text-white">:</span>
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <span className="text-3xl font-bold text-white">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-white/80">Minutes</span>
                </div>
                <span className="text-3xl font-bold text-white">:</span>
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <span className="text-3xl font-bold text-white">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-white/80">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group animate-fade-in transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <span className="absolute top-3 left-0 z-10 animate-pulse rounded-r-lg bg-red-500 px-2 py-1 text-sm font-bold text-white shadow-md">
                  -{product.flashSaleDiscount}%
                </span>
                <Link to={`/products/${product.id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="z-10 h-44 w-full object-cover object-center transition-transform group-hover:scale-110"
                  />
                </Link>

                <div className="absolute right-0 -bottom-10 left-0 flex justify-center space-x-2 bg-white/30 p-2 backdrop-blur-sm transition-all group-hover:bottom-0 dark:bg-zinc-800/50">
                  <button className="rounded-full p-2 shadow transition-transform hover:scale-110">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                  <button className="text-primary-500 hover:text-primary-600 rounded-full p-2 shadow transition-transform hover:scale-110">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-b-sm p-4 backdrop-blur-2xl">
                <h3 className="truncate text-sm font-medium">{product.name}</h3>
                <div className="mt-1 flex items-center">
                  <span className="text-lg font-bold text-yellow-300">
                    ${product.flashSalePrice}
                  </span>
                  <span className="ml-2 text-sm text-gray-300 line-through">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-10 text-center">
          <Link
            to="/products"
            className="text-primary-600 hover:bg-primary-50 inline-flex items-center rounded-full bg-white px-6 py-3 text-base font-semibold shadow-md transition-all hover:shadow-lg"
          >
            View All Deals <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
