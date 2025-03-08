import { ShoppingCart, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Container from "../common/Container";
import Grid from "../common/Grid";
import Heading from "../common/Heading";
import Text from "../common/Text";

const FlashSaleSection = ({
  products = [],
  title = "Flash Sale",
  subtitle = "Incredible deals on top products. Hurry, these offers expire soon!",
  discountPercentage = 40,
  endTime = 24, // hours from now
  className = "",
  ...props
}) => {
  const flashSaleEndTime = useRef(
    new Date(Date.now() + endTime * 60 * 60 * 1000),
  );
  const [timeLeft, setTimeLeft] = useState({
    hours: endTime,
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
        flashSaleEndTime.current = new Date(
          Date.now() + endTime * 60 * 60 * 1000,
        );
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
  }, [endTime]);

  // Process products to add flash sale data
  const flashSaleProducts = products.map((product) => ({
    ...product,
    flashSaleDiscount: discountPercentage,
    flashSalePrice: (
      Number.parseFloat(product.price) *
      (1 - discountPercentage / 100)
    ).toFixed(2),
  }));

  return (
    <section className={`overflow-hidden py-10`}>
      <Container>
        <div className="mb-12 flex flex-col items-center space-y-6 text-center md:flex-row md:justify-between md:space-y-0">
          <div className="md:max-w-xl">
            <Badge
              variant="secondary"
              size="lg"
              className="mb-4 bg-zinc-700 text-zinc-200 dark:bg-violet-600/20 dark:text-violet-200"
            >
              <Zap className="mr-2 h-5 w-5 animate-pulse" />
              FLASH SALE
            </Badge>

            <Heading className="text-white">
              <span className="animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text font-bold text-transparent transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 dark:text-yellow-300">
                {discountPercentage}% OFF {"  "}
              </span>
              Today Only!
            </Heading>
            <Text size="lg" className="mt-6 text-zinc-800 dark:text-zinc-300">
              {subtitle}
            </Text>
          </div>

          <div className="rounded-2xl bg-zinc-800 p-6 backdrop-blur-sm dark:bg-white/10">
            <div className="text-center">
              <Text size="lg" weight="bold" className="mb-2 text-white">
                Ends In:
              </Text>
              <div className="flex items-center justify-center space-x-3">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm md:h-20 md:w-20">
                  <span className="text-2xl font-bold text-white md:text-3xl">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-white/80">Hours</span>
                </div>
                <span className="text-2xl font-bold text-white md:text-3xl">
                  :
                </span>
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm md:h-20 md:w-20">
                  <span className="text-2xl font-bold text-white md:text-3xl">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-white/80">Minutes</span>
                </div>
                <span className="text-2xl font-bold text-white md:text-3xl">
                  :
                </span>
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm md:h-20 md:w-20">
                  <span className="text-2xl font-bold text-white md:text-3xl">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-white/80">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Grid cols={6} gap={4}>
          {flashSaleProducts.map((product, index) => (
            <div
              key={product.id}
              className="group animate-fade-in transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image Section */}
              <div className="relative overflow-hidden rounded-t-xl bg-white shadow-md dark:bg-zinc-900">
                {product.flashSaleDiscount > 0 && (
                  <span className="absolute top-3 left-0 z-10 animate-pulse rounded-r-lg bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-md">
                    -{product.flashSaleDiscount}%
                  </span>
                )}
                <Link to={`/products/${product.id}`} className="block">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="z-10 h-44 w-full object-cover object-center transition-transform group-hover:scale-110"
                  />
                </Link>

                {/* Quick Action Buttons */}
                <div className="absolute right-0 -bottom-10 left-0 flex justify-center space-x-2 bg-white/40 p-2 backdrop-blur-md transition-all group-hover:bottom-0 dark:bg-zinc-800/50">
                  <button className="rounded-full bg-white p-2 text-zinc-800 shadow transition-transform hover:scale-110 dark:bg-zinc-700 dark:text-zinc-200">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="rounded-b-xl bg-white p-4 shadow-md dark:bg-zinc-900 dark:text-zinc-200">
                <Text
                  size="sm"
                  weight="medium"
                  className="truncate text-zinc-800 dark:text-zinc-100"
                >
                  {product.name}
                </Text>
                <div className="mt-1 flex items-center">
                  <Text
                    size="lg"
                    weight="bold"
                    className="text-yellow-500 dark:text-yellow-400"
                  >
                    ${product.flashSalePrice}
                  </Text>
                  <Text
                    size="sm"
                    className="ml-2 text-zinc-500 line-through dark:text-zinc-400"
                  >
                    ${product.price}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default FlashSaleSection;
