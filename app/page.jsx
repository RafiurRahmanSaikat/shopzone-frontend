"use client";

import PageShell from "@/components/PageShell";
import CarouselSection from "@/components/sections/CarouselSection";
import FAQ from "@/components/sections/FAQ";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FlashSaleSection from "@/components/sections/FlashSaleSection";
import NewArrivalsSection from "@/components/sections/NewArrivalsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import PremiumDealsSection from "@/components/sections/PremiumDealsSection";
import ShopByCategorySection from "@/components/sections/ShopByCategorySection";
import Stats from "@/components/sections/Stats";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrendingSection from "@/components/sections/TrendingSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useApiFetch from "@/hooks/useApiFetch";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { data: productsData } = useApiFetch("/products/?page_size=all", {
    auth: false,
  });
  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.results || [];

  return (
    <PageShell search={search} setSearch={setSearch}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/30 via-background to-background">
        <div className="pointer-events-none absolute -left-24 top-[-6rem] h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-[-8rem] h-80 w-80 rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="mb-4 w-fit gap-1 shadow-sm">
              <Sparkles className="h-3 w-3" /> New season, new prices
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Shop smarter on <span className="text-primary">ShopZone</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed text-pretty">
              Discover thousands of products from trusted stores. Fast checkout,
              honest reviews, and prices that make sense.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                <Link href="/products">
                  Shop now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Become a seller</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure checkout
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Fast shipping
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Verified reviews
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-2xl bg-card border border-border shadow-sm relative">
                  <Image
                    src="https://m.media-amazon.com/images/I/61XO4bORHUL._AC_SX679_.jpg"
                    alt="Featured smartphone"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-card border border-border shadow-sm relative">
                  <Image
                    src="https://m.media-amazon.com/images/I/41S2OSRfBuL._AC_SL1200_.jpg"
                    alt="Featured laptop"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="aspect-square overflow-hidden rounded-2xl bg-card border border-border shadow-sm relative">
                  <Image
                    src="https://m.media-amazon.com/images/I/51W65QNlTlS._AC_SY575_.jpg"
                    alt="Featured sneakers"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-card border border-border shadow-sm relative">
                  <Image
                    src="https://m.media-amazon.com/images/I/813X74rfb1L._AC_SL1500_.jpg"
                    alt="Featured camera"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CarouselSection products={products} />
      <FlashSaleSection products={products} />
      <ShopByCategorySection products={products} />
      <NewArrivalsSection
        title="New arrivals"
        subtitle="Fresh drops selected for you"
        products={products}
      />
      <PremiumDealsSection products={products} />
      <TrendingSection search={search} />
      <FeaturesSection />
      <TestimonialsSection />
      <Stats />
      <NewsletterSection />
      <FAQ />
    </PageShell>
  );
}
