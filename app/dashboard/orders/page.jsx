"use client";

import OrdersTable from "@/components/OrdersTable";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

export default function DashboardOrdersPage() {
  const { user } = useAuth();
  const canUpdate =
    !!user && (user.role === "admin" || user.role === "store_owner");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 border-b pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold tracking-tight">📦 Orders</h1>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            Dashboard
          </Badge>
        </div>
        <p className="mt-2 text-base text-muted-foreground">
          {canUpdate
            ? "Manage and track all store orders"
            : "View your order history"}
        </p>
      </header>
      <OrdersTable canUpdateStatus={canUpdate} />
    </div>
  );
}
