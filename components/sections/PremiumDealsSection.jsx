import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatters";
import { getImageUrl } from "@/lib/media";
import Image from "next/image";

export default function PremiumDealsSection({ products = [] }) {
  const shuffled = [...products].sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5">
        <span className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-fuchsia-300 to-indigo-400 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
          Premium drop
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">
          Premium picks • 50% off
        </h2>
        <p className="text-sm text-muted-foreground">
          Luxury gear, bold savings for a limited time.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shuffled.map((product) => {
          const discounted = Number(product.price || 0) * 0.5;
          const imageUrl = getImageUrl(product.image || product.images);
          return (
            <Card key={product.id} className="overflow-hidden border-border/70">
              <div className="relative aspect-[4/3] bg-muted/30 overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="h-full w-full" />
                )}
                <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-semibold text-white">
                  -50%
                </span>
              </div>
              <CardContent className="space-y-2 p-3">
                <p className="text-sm font-semibold line-clamp-2">
                  {product.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-rose-500">
                    {formatPrice(discounted)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
