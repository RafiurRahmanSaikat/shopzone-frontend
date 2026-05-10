import ProductsGrid from "@/components/ProductsGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TrendingSection({ search }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <span className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-sky-300 to-emerald-300 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
            Trending now
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Trending products
          </h2>
          <p className="text-sm text-muted-foreground">
            Browse our most popular picks
          </p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/products">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <ProductsGrid search={search} pageSize={10} showPagination />
    </section>
  );
}
