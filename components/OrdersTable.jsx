"use client";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import { OrdersTableSkeleton } from "@/components/SkeletonLoaders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useApiFetch from "@/hooks/useApiFetch";
import { apiFetch } from "@/lib/fetchClient";
import { formatDate, formatPrice } from "@/lib/formatters";
import { getImageUrl } from "@/lib/media";
import {
  ORDER_STATUSES,
  getStatusBorderColor,
  getStatusIcon,
  normalizeStatus,
} from "@/lib/status";
import { Package } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function OrdersTable({ canUpdateStatus = false }) {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useApiFetch(
    `/orders/?page=${page}`,
  );
  const { data: productsData } = useApiFetch("/products/?page_size=all", {
    auth: false,
  });
  const [updatingId, setUpdatingId] = useState(null);
  const orders = Array.isArray(data) ? data : data?.results || [];
  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.results || [];
  const count = data?.count ?? orders.length;
  const pageSize = data?.page_size || 10;
  const totalPages =
    data?.total_pages || Math.max(1, Math.ceil(count / pageSize));
  const hasPrev = Boolean(data?.previous) || page > 1;
  const hasNext = Boolean(data?.next) || page < totalPages;

  const productById = useMemo(() => {
    const m = new Map();
    for (const p of products) {
      if (p && p.id != null) m.set(Number(p.id), p);
    }
    return m;
  }, [products]);

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
        title="Failed to load orders"
      />
    );
  }

  if (loading) {
    return <OrdersTableSkeleton count={4} />;
  }

  async function updateStatus(orderId, status) {
    setUpdatingId(orderId);
    try {
      await apiFetch(`/orders/${orderId}/update_status/`, {
        method: "PATCH",
        body: { status },
      });
      toast.success("Order status updated");
      refetch();
    } catch (err) {
      toast.error(err.message || "Failed to update");
    } finally {
      setUpdatingId(null);
    }
  }

  if (orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <Package className="mx-auto h-10 w-10 text-muted-foreground" />
          <EmptyTitle>No orders</EmptyTitle>
          <EmptyDescription>
            Orders will appear here when placed.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => {
        const orderId = o.order_id || o.id;
        const items = o.order_products || o.items || [];
        const status = normalizeStatus(o.status);
        const total = items.reduce(
          (s, it) =>
            s + Number(it.product?.price || it.price || 0) * (it.quantity || 1),
          0,
        );

        return (
          <Card
            key={orderId}
            className={`border rounded-2xl  ${getStatusBorderColor(status)}`}
          >
            <CardHeader className="px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">
                      Order #{String(orderId).slice(0, 8)}
                    </span>
                    <Badge className="bg-background text-foreground border-foreground/20">
                      {items.length} item{items.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-semibold">
                      {formatDate(o.created_at)}
                    </span>
                    <span className="text-muted-foreground/60">•</span>
                    <span className="tabular-nums font-semibold text-foreground">
                      {formatPrice(o.item_subtotal || total)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  {canUpdateStatus ? (
                    <Select
                      value={status}
                      onValueChange={(v) => updateStatus(orderId, v)}
                      disabled={updatingId === orderId}
                    >
                      <SelectTrigger className="h-10 w-36 text-sm font-semibold bg-background border-foreground/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            <span className="font-semibold">{s}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className="h-8 px-3 text-sm font-bold capitalize bg-background text-foreground border-foreground/20">
                      {getStatusIcon(status)} {status}
                    </Badge>
                  )}

                  <div className="text-lg font-bold tabular-nums text-primary">
                    {formatPrice(o.item_subtotal || total)}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-5 pb-4 pt-0">
              <div className="border-t border-foreground/10 pt-3">
                {items.length === 0 ? (
                  <div className="flex items-center justify-center py-6 text-muted-foreground text-sm">
                    <Package className="h-5 w-5 mr-2" />
                    No items in this order
                  </div>
                ) : (
                  <div className="rounded-lg border border-foreground/10 bg-background/60 overflow-hidden">
                    <div className="divide-y divide-foreground/10">
                      {items.map((it, idx) => {
                        const name =
                          it.product_name || it.product?.name || "Product";
                        const price = Number(
                          it.product_price ??
                            it.product?.price ??
                            it.price ??
                            0,
                        );
                        const productId =
                          (typeof it.product === "object"
                            ? it.product?.id
                            : it.product) ??
                          it.product_id ??
                          it.productId ??
                          null;
                        const resolvedProduct =
                          productId != null
                            ? productById.get(Number(productId))
                            : null;

                        const image =
                          it.product_image ||
                          it.product?.image ||
                          it.product?.images ||
                          it.image ||
                          resolvedProduct?.image ||
                          resolvedProduct?.images ||
                          null;
                        const qty = it.quantity || 1;
                        const imageUrl = getImageUrl(image);
                        const lineTotal = Number(it.total_price ?? price * qty);

                        return (
                          <div
                            key={it.id || idx}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-background/50 transition-colors"
                          >
                            <div className="relative h-12 w-12 rounded-lg bg-gradient-to-br from-muted to-muted/60 overflow-hidden border border-foreground/10 flex items-center justify-center flex-shrink-0">
                              {imageUrl ? (
                                <Image
                                  src={imageUrl}
                                  alt={name}
                                  fill
                                  className="object-contain p-1"
                                  sizes="48px"
                                />
                              ) : (
                                <Package className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold leading-tight line-clamp-1">
                                {name}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                                {formatPrice(price)}
                              </p>
                            </div>

                            <div className="ml-auto flex items-center gap-4 text-sm tabular-nums text-muted-foreground">
                              <span className="min-w-[50px] text-right font-semibold">
                                ×{qty}
                              </span>
                              <span className="min-w-[80px] text-right font-bold text-foreground">
                                {formatPrice(lineTotal)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <div className="flex items-center justify-between pt-4 border-t">
        <p className="text-sm text-muted-foreground font-semibold">
          Page <span className="text-foreground">{page}</span> of{" "}
          <span className="text-foreground">{totalPages}</span> •{" "}
          <span className="text-foreground">{count} orders</span>
        </p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={!hasPrev}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="disabled:opacity-50"
          >
            ← Prev
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!hasNext}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="disabled:opacity-50"
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}
