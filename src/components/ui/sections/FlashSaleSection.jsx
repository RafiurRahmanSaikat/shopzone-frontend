"use client";

import { Heart, ShoppingCart, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Container from "../common/Container";
import Grid from "../common/Grid";
import Heading from "../common/Heading";
import Section from "../common/Section";
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
    <Section
      className={`overflow-hidden bg-gradient-to-tr from-zinc-700 to-zinc-900 ${className}`}
      {...props}
    >
      {/* Background patterns */}
      <div className='bg-[url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fillOpacity="0.05" fillRule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"%3E%3C/circle%3E%3Ccircle cx="13" cy="13" r="3"%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")] absolute inset-0 opacity-20'></div>
      <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-violet-500 opacity-20 blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-violet-500 opacity-20 blur-3xl"></div>

      <Container>
        <div className="mb-12 flex flex-col items-center space-y-6 text-center md:flex-row md:justify-between md:space-y-0">
          <div className="md:max-w-xl">
            <Badge
              variant="secondary"
              size="lg"
              className="mb-4 bg-violet-600/20 text-violet-200"
            >
              <Zap className="mr-2 h-5 w-5 animate-pulse" />
              FLASH SALE
            </Badge>

            <Heading className="text-white">
              <span className="animate-pulse text-yellow-300">
                {discountPercentage}% OFF
              </span>{" "}
              Today Only!
            </Heading>

            <Text size="lg" className="mt-3 text-zinc-200">
              {subtitle}
            </Text>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
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
              <div className="relative overflow-hidden rounded-t-xl bg-white dark:bg-zinc-800">
                <span className="absolute top-3 left-0 z-10 animate-pulse rounded-r-lg bg-red-500 px-2 py-1 text-sm font-bold text-white shadow-md">
                  -{product.flashSaleDiscount}%
                </span>
                <Link to={`/products/${product.id}`} className="block">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="z-10 h-44 w-full object-cover object-center transition-transform group-hover:scale-110"
                  />
                </Link>

                <div className="absolute right-0 -bottom-10 left-0 flex justify-center space-x-2 bg-white/30 p-2 backdrop-blur-sm transition-all group-hover:bottom-0 dark:bg-zinc-800/50">
                  <button className="rounded-full bg-white p-2 text-zinc-800 shadow transition-transform hover:scale-110 dark:bg-zinc-700 dark:text-zinc-200">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                  <button className="rounded-full bg-white p-2 text-violet-600 shadow transition-transform hover:scale-110 dark:bg-zinc-700 dark:text-violet-400">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-b-sm bg-white/10 p-4 backdrop-blur-2xl dark:bg-zinc-800/10">
                <Text size="sm" weight="medium" className="truncate text-white">
                  {product.name}
                </Text>
                <div className="mt-1 flex items-center">
                  <Text size="lg" weight="bold" className="text-yellow-300">
                    ${product.flashSalePrice}
                  </Text>
                  <Text size="sm" className="ml-2 text-zinc-300 line-through">
                    ${product.price}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default FlashSaleSection;
