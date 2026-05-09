import Link from "next/link"
import { Package } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Package className="h-4 w-4" />
              </div>
              <span className="text-lg tracking-tight">ShopZone</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              A modern marketplace where stores meet shoppers. Built for speed, trust, and great deals.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground">All Products</Link></li>
              <li><Link href="/cart" className="hover:text-foreground">Cart</Link></li>
              <li><Link href="/orders" className="hover:text-foreground">Orders</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Account</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/login" className="hover:text-foreground">Login</Link></li>
              <li><Link href="/register" className="hover:text-foreground">Sign up</Link></li>
              <li><Link href="/profile" className="hover:text-foreground">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Sell on ShopZone</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-foreground">Store Dashboard</Link></li>
              <li><Link href="/dashboard/stores" className="hover:text-foreground">Manage Stores</Link></li>
              <li><Link href="/dashboard/products" className="hover:text-foreground">Manage Products</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} ShopZone. All rights reserved.</p>
          <p>Crafted with Next.js + Tailwind.</p>
        </div>
      </div>
    </footer>
  )
}
