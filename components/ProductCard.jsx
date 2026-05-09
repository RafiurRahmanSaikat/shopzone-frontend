"use client";

import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { getImageUrl } from "@/lib/media";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;
  const reviewCount = product.reviews?.length || 0;
  const { addToCart } = useCart();
  const imageUrl = getImageUrl(product.image || product.images);

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <Card className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg pt-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={false}
              onError={() => {
                // Image component handles errors gracefully
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          {product.stock !== undefined &&
            product.stock <= 5 &&
            product.stock > 0 && (
              <Badge variant="secondary" className="absolute left-2 top-2">
                Only {product.stock} left
              </Badge>
            )}
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute left-2 top-2">
              Out of stock
            </Badge>
          )}
        </div>
        <CardContent className="space-y-1.5 p-2.5">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {product.brand?.name && (
              <span className="truncate">{product.brand.name}</span>
            )}
            {product.brand?.name && product.store?.name && <span>•</span>}
            {product.store?.name && (
              <span className="truncate">{product.store.name}</span>
            )}
          </div>
          <h3 className="line-clamp-2 text-xs font-medium leading-tight text-pretty min-h-[1.75rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <StarRating value={product.rating || 0} size={12} />
            <span className="text-xs text-muted-foreground">
              ({reviewCount})
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="font-semibold text-sm">
              {formatPrice(product.price)}
            </span>
            {product.categories?.[0] && (
              <span className="text-xs text-muted-foreground">
                {product.categories[0].name}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="w-full h-7 text-xs mt-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart && addToCart(product.id);
            }}
          >
            <ShoppingCart className="mr-1 h-3 w-3" />
            Add
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
