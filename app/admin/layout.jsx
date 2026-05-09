"use client";

import AuthGuard from "@/components/AuthGuard";
import DashboardSidebar from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import {
  Boxes,
  ClipboardList,
  Layers,
  LayoutDashboard,
  Package,
  Store,
  Tag,
  Users,
} from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/stores", label: "Stores", icon: Store },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/brands", label: "Brands", icon: Tag },
  { href: "/admin/categories", label: "Categories", icon: Layers },
  { href: "/admin/store-categories", label: "Store Categories", icon: Boxes },
];

export default function AdminLayout({ children }) {
  return (
    <AuthGuard allow={["admin"]} strict>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1">
          <DashboardSidebar items={ITEMS} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
