"use client";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import PageShell from "@/components/PageShell";
import ReviewSection from "@/components/ReviewSection";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { apiFetch } from "@/lib/fetchClient";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, use as usePromise, useState } from "react";
import { toast } from "sonner";

export default function ProductDetailPage({ params }) {
  const { id } = usePromise(params);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(`/products/${id}/`, { auth: false });
      setProduct(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAddToCart() {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "customer") {
      toast.error("Only customers can add to cart");
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.id, qty);
      toast.success(`Added ${qty} × ${product.name} to cart`);
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  }

  async function handleBuyNow() {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "customer") {
      toast.error("Only customers can place orders");
      return;
    }
    setBuying(true);
    try {
      await apiFetch("/orders/", {
        method: "POST",
        body: { product_id: product.id, quantity: qty },
      });
      toast.success("Order placed!");
      router.push("/orders");
    } catch (err) {
      toast.error(err.message || "Failed to place order");
    } finally {
      setBuying(false);
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-4 -ml-3">
          <Link href="/products">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to products
          </Link>
        </Button>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        ) : error ? (
          <ErrorDisplay
            error={error}
            onRetry={load}
            title="Failed to load product"
          />
        ) : !product ? (
          <div className="py-12 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Product not found
            </h2>
            <p className="mt-2 text-muted-foreground">
              The product you're looking for doesn't exist.
            </p>
            <Button asChild className="mt-4">
              <Link href="/products">Back to products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-square">
                  {product.image ? (
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain p-6"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {product.brand?.name && (
                    <Badge variant="outline">{product.brand.name}</Badge>
                  )}
                  {product.store?.name && (
                    <span>Sold by {product.store.name}</span>
                  )}
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance">
                  {product.name}
                </h1>

                <div className="mt-3 flex items-center gap-2">
                  <StarRating value={product.rating || 0} size={18} />
                  <span className="text-sm text-muted-foreground">
                    {(product.rating || 0).toFixed(1)} ·{" "}
                    {product.reviews?.length || 0} reviews
                  </span>
                </div>

                <p className="mt-4 text-3xl font-semibold tracking-tight">
                  {formatPrice(product.price)}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(product.categories || []).map((c) => (
                    <Badge key={c.id} variant="secondary">
                      {c.name}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Quantity + actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center text-sm">{qty}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() =>
                        setQty(Math.min(product.stock || 99, qty + 1))
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={adding || product.stock === 0}
                    className="flex-1 sm:flex-none"
                  >
                    {adding ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="mr-2 h-4 w-4" />
                    )}
                    Add to cart
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleBuyNow}
                    disabled={buying || product.stock === 0}
                    className="flex-1 sm:flex-none"
                  >
                    {buying ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Zap className="mr-2 h-4 w-4" />
                    )}
                    Buy now
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <ReviewSection
                productId={product.id}
                reviews={product.reviews || []}
                onChange={load}
              />
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
