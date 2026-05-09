"use client";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/media";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const slides = [
  {
    id: "studio",
    eyebrow: "Limited drop",
    title: "Studio-grade audio gear",
    subtitle: "Upgrade your setup with precision sound and clean design.",
    cta: "Shop audio",
    href: "/products",
    image: "https://m.media-amazon.com/images/I/61k7S5Y6l2L._AC_SL1500_.jpg",
    gradient: "from-amber-400 via-orange-400 to-rose-500",
  },
  {
    id: "travel",
    eyebrow: "Travel ready",
    title: "Built for fast city movement",
    subtitle: "Lightweight essentials that keep up with your day.",
    cta: "Shop travel",
    href: "/products",
    image: "https://m.media-amazon.com/images/I/71kNhVZrgfL._AC_SL1500_.jpg",
    gradient: "from-sky-400 via-cyan-400 to-emerald-400",
  },
  {
    id: "work",
    eyebrow: "Desk refresh",
    title: "Smart lighting, calm focus",
    subtitle: "Modern workspace picks for clarity and comfort.",
    cta: "Shop workspace",
    href: "/products",
    image: "https://m.media-amazon.com/images/I/61m3g0p0V5L._AC_SL1500_.jpg",
    gradient: "from-blue-400 via-indigo-400 to-fuchsia-400",
  },
];

export default function CarouselSection({ products = [] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const apiSlides = useMemo(() => {
    const picks = products.filter((p) => p?.image || p?.images).slice(0, 3);
    if (picks.length === 0) return [];
    return picks.map((p, index) => ({
      id: p.id || `api-${index}`,
      eyebrow: "Featured pick",
      title: p.name || "Featured product",
      subtitle: "Hand-picked from trending products.",
      cta: "Shop now",
      href: "/products",
      image: getImageUrl(p.image || p.images),
      gradient:
        slides[index % slides.length]?.gradient ||
        "from-amber-400 via-orange-400 to-rose-500",
    }));
  }, [products]);

  const slideData = apiSlides.length ? apiSlides : slides;
  const slideCount = slideData.length;
  const current = useMemo(() => slideData[active], [active, slideData]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slideCount);
    }, 4500);
    return () => clearInterval(id);
  }, [paused, slideCount]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-white via-slate-50 to-slate-100 text-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 dark:text-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08),_transparent_55%)] dark:opacity-30 dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
        <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-amber-400/40 via-rose-400/25 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/30 via-indigo-400/25 to-transparent blur-3xl" />

        <div className="relative grid gap-8 px-6 py-10 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-12">
          <div className="flex flex-col justify-center">
            <span
              className={`inline-flex w-fit items-center rounded-full bg-gradient-to-r ${current.gradient} px-3 py-1 text-xs font-semibold text-black shadow-sm`}
            >
              {current.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {current.title}
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-white/80 sm:text-base">
              {current.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={current.href}>{current.cta}</Link>
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 dark:border-white/30 dark:text-white"
              >
                Explore deals
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {slideData.map((slide, index) => (
                <button
                  key={slide.id}
                  className={`h-2.5 w-7 rounded-full border border-primary/40 transition dark:border-white/30 ${
                    index === active ? "bg-primary" : "bg-primary/30"
                  }`}
                  onClick={() => setActive(index)}
                  aria-label={`Go to ${slide.title}`}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              {slideData.map((slide, index) => (
                <button
                  key={`${slide.id}-thumb`}
                  className={`relative h-11 w-11 overflow-hidden rounded-2xl border transition ${
                    index === active ? "border-primary/70" : "border-border/40"
                  }`}
                  onClick={() => setActive(index)}
                  aria-label={`Preview ${slide.title}`}
                >
                  {slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/10" />
                  )}
                  {index === active && (
                    <span className="absolute inset-0 rounded-2xl ring-2 ring-primary/50" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
            {current.image ? (
              <div className="relative rounded-3xl bg-white/70 p-4 shadow-2xl dark:bg-white/5">
                <div className="relative h-64 w-64 rounded-2xl overflow-hidden">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-contain"
                    sizes="256px"
                  />
                </div>
              </div>
            ) : (
              <div className="h-64 w-64 rounded-2xl bg-muted/30" />
            )}
          </div>
        </div>
        <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 sm:block">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground backdrop-blur transition hover:bg-muted"
            onClick={() =>
              setActive((prev) => (prev - 1 + slideCount) % slideCount)
            }
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground backdrop-blur transition hover:bg-muted"
            onClick={() => setActive((prev) => (prev + 1) % slideCount)}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
