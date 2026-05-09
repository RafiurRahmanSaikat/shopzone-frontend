"use client";

import AuthGuard from "@/components/AuthGuard";
import PageShell from "@/components/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/fetchClient";
import { formatDate, formatPrice } from "@/lib/formatters";
import { getImageUrl } from "@/lib/media";
import { getStatusIcon, statusVariant } from "@/lib/status";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function OrderCard({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  const orderId = order.order_id || order.id;
  const items = order.order_products || order.items || [];
  const itemCount = items.reduce((sum, it) => sum + (it.quantity || 1), 0);

  return (
    <Card
      className={`border bg-gradient-to-br  transition-all hover:shadow-md`}
    >
      <CardContent className="p-0">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between p-5 text-left hover:opacity-80 transition-opacity">
              <div className="flex flex-wrap items-center gap-4 flex-1">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Order ID
                  </p>
                  <p className="font-mono text-sm font-semibold">
                    {String(orderId).slice(0, 13)}...
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Date
                  </p>
                  <p className="text-sm">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Items
                  </p>
                  <p className="text-sm">
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <Badge
                  variant={statusVariant(order.status)}
                  className="capitalize font-semibold"
                >
                  {getStatusIcon(order.status)} {order.status || "Pending"}
                </Badge>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(order.item_subtotal || order.total || 0)}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Separator />
            <div className="p-5 space-y-4 bg-background/50">
              <div className="space-y-3">
                {items.length === 0 ? (
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <Package className="h-5 w-5 mr-2" />
                    No items in this order
                  </div>
                ) : (
                  items.map((it, idx) => {
                    const name =
                      it.product_name ||
                      it.product?.name ||
                      `Product #${it.product}`;
                    const price = Number(
                      it.product_price ?? it.product?.price ?? it.price ?? 0,
                    );
                    const image = getImageUrl(
                      it.product_image || it.product?.image,
                    );
                    const totalPrice =
                      it.total_price ?? price * (it.quantity || 1);

                    return (
                      <div
                        key={it.id || idx}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3 hover:border-primary/30 transition-colors"
                      >
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center border border-border/60">
                          {image ? (
                            <Image
                              src={image}
                              alt={name}
                              fill
                              className="object-contain p-1"
                              sizes="56px"
                            />
                          ) : (
                            <Package className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm leading-tight line-clamp-2">
                            {name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            <span className="font-semibold text-foreground">
                              {formatPrice(price)}
                            </span>{" "}
                            × {it.quantity || 1}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-primary">
                            {formatPrice(totalPrice)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Line total
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
                <span className="text-sm font-semibold text-foreground">
                  Order Total:
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(order.item_subtotal || order.total || 0)}
                </span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

function OrdersInner() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await apiFetch("/orders/");
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.results || [];
        // Sort by date descending (newest first)
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrders(list);
      } catch (_err) {
        // handled by 401 redirect
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold tracking-tight">📦 Your Orders</h1>
          {orders.length > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-3 py-1">
              {orders.length} total
            </Badge>
          )}
        </div>
        <p className="text-base text-muted-foreground">
          Track your purchases, view order details, and check status
        </p>
      </div>

      {loading ? (
        <div className="mt-8 space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <Empty className="mt-12 border-2 border-dashed border-border rounded-lg p-8 bg-muted/20">
          <EmptyHeader>
            <div className="text-5xl mb-3">📦</div>
            <EmptyTitle>No orders yet</EmptyTitle>
            <EmptyDescription>
              Your orders will appear here once you place one. Start shopping
              now!
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
            <Link href="/products">🛍️ Start shopping</Link>
          </Button>
        </Empty>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <OrderCard key={o.order_id || o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AuthGuard>
      <PageShell>
        <OrdersInner />
      </PageShell>
    </AuthGuard>
  );
}
