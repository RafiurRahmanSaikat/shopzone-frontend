"use client";

import OrdersTable from "@/components/OrdersTable";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const canUpdate =
    !!user && (user.role === "admin" || user.role === "store_owner");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-indigo/20 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold tracking-tight text-indigo-900 dark:text-indigo-100">
            📦 All Orders
          </h1>
          <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100 border-indigo-200 dark:border-indigo-800">
            Admin View
          </Badge>
        </div>
        <p className="mt-2 text-base text-muted-foreground">
          {canUpdate
            ? "Manage and update platform-wide order statuses"
            : "View all platform orders"}
        </p>
      </header>
      <OrdersTable canUpdateStatus={canUpdate} isAdmin={true} />
    </div>
  );
}
