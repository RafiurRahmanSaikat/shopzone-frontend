"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/media";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function getTimeLeft(target) {
  const total = Math.max(0, target.getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  const days = Math.floor(total / 1000 / 60 / 60 / 24);
  return { total, days, hours, minutes, seconds };
}

export default function FlashSaleSection({ products = [] }) {
  const target = useMemo(() => {
    const now = new Date();
    return new Date(now.getTime() + 1000 * 60 * 60 * 24);
  }, []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const picks = products.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-white via-rose-50 to-amber-50 p-6 text-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-black dark:text-white lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge className="mb-3 bg-primary/10 text-primary dark:bg-white/10 dark:text-white">
              Flash sale
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight">
              40% OFF today only
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">
              High-demand picks with a fast clock.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((slot) => (
              <div
                key={slot.label}
                className="rounded-xl border border-border/60 bg-white/70 px-3 py-2 text-center dark:border-white/20 dark:bg-white/10"
              >
                <p className="text-xl font-semibold tabular-nums">
                  {String(slot.value).padStart(2, "0")}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-white/70">
                  {slot.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((product) => {
            const price = Number(product.price || 0);
            const discounted = price * 0.6;
            return (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 dark:bg-white/5"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white/80 dark:bg-white/10">
                  {getImageUrl(product.image) ? (
                    <Image
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                      sizes="64px"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold line-clamp-1">
                    {product.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <span className="font-semibold text-amber-600 dark:text-amber-300">
                      ${discounted.toFixed(2)}
                    </span>
                    <span className="text-zinc-500 line-through dark:text-white/60">
                      ${price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link href="/products">Shop</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
