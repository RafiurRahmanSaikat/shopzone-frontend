import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMemo } from "react"

export default function NewArrivalsSection({
  title = "New arrivals",
  subtitle = "Fresh drops selected for you",
  products = [],
  limit = 6,
}) {
  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      const aDate = a.created_at ? new Date(a.created_at).getTime() : null
      const bDate = b.created_at ? new Date(b.created_at).getTime() : null
      if (aDate && bDate) return bDate - aDate
      return (b.id || 0) - (a.id || 0)
    })
  }, [products])

  const items = sorted.slice(0, limit)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <span className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-amber-300 to-rose-400 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
            New season, new prices
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/products">View all</Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  )
}
