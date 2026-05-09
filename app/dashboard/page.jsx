"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/fetchClient";
import {
  ArrowRight,
  ClipboardList,
  DollarSign,
  Package,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function StatCard({ icon: Icon, label, value, href, loading }) {
  return (
    <Card
      className={`border bg-gradient-to-br  transition-all hover:shadow-lg hover:scale-105`}
    >
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          {loading ? (
            <Skeleton className="mt-3 h-10 w-24" />
          ) : (
            <p className="mt-2 text-4xl font-bold tracking-tight">{value}</p>
          )}
          {href && (
            <Link
              href={href}
              className="mt-3 inline-flex items-center text-sm font-semibold  hover:underline"
            >
              View details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
        <div className={`rounded-lg p-3 `}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    stores: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [productsData, storesData, ordersData] = await Promise.all([
          apiFetch("/products/my_products?page=1").catch(() => null),
          apiFetch("/stores/").catch(() => null),
          apiFetch("/orders/").catch(() => null),
        ]);
        if (cancelled) return;
        const productCount =
          productsData?.count ?? (productsData?.results?.length || 0);
        const storeList = Array.isArray(storesData)
          ? storesData
          : storesData?.results || [];
        const orderList = Array.isArray(ordersData)
          ? ordersData
          : ordersData?.results || [];
        const revenue = orderList.reduce(
          (s, o) => s + Number(o.item_subtotal || o.total || 0),
          0,
        );
        setStats({
          products: productCount,
          stores: storeList.length,
          orders: orderList.length,
          revenue,
        });
      } catch (_err) {
        // ignored
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 border-b  pb-6">
        <h1 className="text-4xl font-bold tracking-tight">
          👋 Welcome back, {user?.first_name || user?.username}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          {"Here's an overview of your store performance today."}
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Package}
          label="My Products"
          value={stats.products}
          href="/dashboard/products"
          loading={loading}
        />
        <StatCard
          icon={Store}
          label="My Stores"
          value={stats.stores}
          href="/dashboard/stores"
          loading={loading}
        />
        <StatCard
          icon={ClipboardList}
          label="Orders"
          value={stats.orders}
          href="/dashboard/orders"
          loading={loading}
        />
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(stats.revenue || 0)}
          loading={loading}
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Card className=" md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">⚡ Quick Actions</h2>
              <Badge className="">Manage</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Quick access to your most important tasks
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="">
                <Link href="/dashboard/products">➕ Add product</Link>
              </Button>
              <Button asChild className="">
                <Link href="/dashboard/stores">🏪 New store</Link>
              </Button>
              <Button asChild className="">
                <Link href="/dashboard/orders">📦 View orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardContent className="p-6">
            <h2 className="font-bold mb-3 flex items-center gap-2">
              💡 Pro Tips
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ High-quality images = higher sales</li>
              <li>✓ Keep stock counts updated</li>
              <li>✓ Reply to orders quickly</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
