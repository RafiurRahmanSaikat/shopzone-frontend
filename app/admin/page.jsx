"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/fetchClient";
import {
  ArrowRight,
  Boxes,
  Layers,
  Package,
  Store,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function StatCard({ icon: Icon, label, value, href, loading }) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          {loading ? (
            <Skeleton className="mt-2 h-8 w-20" />
          ) : (
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {value}
            </p>
          )}
          {href && (
            <Link
              href={href}
              className="mt-2 inline-flex items-center text-xs text-primary hover:underline"
            >
              Manage <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
        <div className="rounded-md bg-accent p-2">
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    stores: 0,
    brands: 0,
    categories: 0,
    storeCats: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      apiFetch("/accounts/users").catch(() => null),
      apiFetch("/products/?page_size=all", { auth: false }).catch(() => null),
      apiFetch("/stores/").catch(() => null),
      apiFetch("/brands/", { auth: false }).catch(() => null),
      apiFetch("/categories/", { auth: false }).catch(() => null),
      apiFetch("/stores/storeCategory").catch(() => null),
    ]).then(([u, p, s, b, c, sc]) => {
      if (cancelled) return;
      const cnt = (d) =>
        d?.count ?? (Array.isArray(d) ? d.length : d?.results?.length || 0);
      setStats({
        users: cnt(u),
        products: cnt(p),
        stores: cnt(s),
        brands: cnt(b),
        categories: cnt(c),
        storeCats: cnt(sc),
      });
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  console.log(stats);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage platform-wide resources
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Users}
          label="Users"
          value={stats.users}
          href="/admin/users"
          loading={loading}
        />
        <StatCard
          icon={Package}
          label="Products"
          value={stats.products}
          href="/admin/products"
          loading={loading}
        />
        <StatCard
          icon={Store}
          label="Stores"
          value={stats.stores}
          href="/admin/stores"
          loading={loading}
        />
        <StatCard
          icon={Tag}
          label="Brands"
          value={stats.brands}
          href="/admin/brands"
          loading={loading}
        />
        <StatCard
          icon={Layers}
          label="Categories"
          value={stats.categories}
          href="/admin/categories"
          loading={loading}
        />
        <StatCard
          icon={Boxes}
          label="Store Categories"
          value={stats.storeCats}
          href="/admin/store-categories"
          loading={loading}
        />
      </div>
    </div>
  );
}
