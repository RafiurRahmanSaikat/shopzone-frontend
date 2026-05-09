"use client"

import { LayoutDashboard, Package, Store, ClipboardList } from "lucide-react"
import Navbar from "@/components/Navbar"
import DashboardSidebar from "@/components/DashboardSidebar"
import AuthGuard from "@/components/AuthGuard"

const ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/stores", label: "Stores", icon: Store },
  { href: "/dashboard/orders", label: "Orders", icon: ClipboardList },
]

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard allow={["store_owner", "admin"]} strict>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1">
          <DashboardSidebar items={ITEMS} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
