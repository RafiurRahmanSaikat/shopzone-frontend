"use client"

import { useState } from "react"
import PageShell from "@/components/PageShell"
import ProductsGrid from "@/components/ProductsGrid"

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  return (
    <PageShell search={search} setSearch={setSearch}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Filter by category or search to find what you need.
          </p>
        </header>
        <ProductsGrid search={search} />
      </div>
    </PageShell>
  )
}
