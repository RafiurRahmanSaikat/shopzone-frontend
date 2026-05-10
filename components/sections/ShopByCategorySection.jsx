import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function getCategoryColor(index) {
  const palettes = [
    "from-amber-400/30 via-orange-300/30 to-rose-400/30",
    "from-emerald-400/30 via-cyan-300/30 to-sky-400/30",
    "from-indigo-400/30 via-blue-300/30 to-cyan-300/30",
    "from-rose-400/30 via-pink-300/30 to-fuchsia-300/30",
    "from-lime-400/30 via-emerald-300/30 to-teal-300/30",
  ];
  return palettes[index % palettes.length];
}

export default function ShopByCategorySection({ products = [] }) {
  const categoryMap = new Map();
  const categoryCounts = new Map();
  products.forEach((p) => {
    (p.categories || []).forEach((c) => {
      if (!categoryMap.has(c.id)) categoryMap.set(c.id, c);
      categoryCounts.set(c.id, (categoryCounts.get(c.id) || 0) + 1);
    });
  });
  const categories = Array.from(categoryMap.values())
    .map((c) => ({ ...c, count: categoryCounts.get(c.id) || 0 }))
    .slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <span className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-amber-300 to-rose-400 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
            New season, new prices
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Shop by category
          </h2>
          <p className="text-sm text-muted-foreground">
            Pick a lane and discover the best of it.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href="/products"
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${getCategoryColor(index)} blur-2xl`}
            />
            <div className="relative flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${getCategoryColor(index)}`}
              >
                <span className="text-sm font-semibold text-zinc-900">
                  {category.name?.slice(0, 1)?.toUpperCase() || "C"}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                  {category.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {category.count} items
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge variant="secondary" className="h-6 px-2 text-xs">
                Shop now
              </Badge>
              <span className="text-xs text-muted-foreground">Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
