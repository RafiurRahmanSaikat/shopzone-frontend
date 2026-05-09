"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  ShoppingCart,
  Search,
  Sun,
  Moon,
  User,
  LogOut,
  LayoutDashboard,
  Shield,
  Package,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"

export default function Navbar({ search, setSearch }) {
  const { user, logout, isAuthenticated } = useAuth()
  const { itemCount } = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isCustomer = !user || user.role === "customer"

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
  ]
  if (user && user.role === "customer") {
    navLinks.push({ href: "/orders", label: "Orders" })
  }

  const initials = (user?.username || "U").slice(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${pathname === l.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                    }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <span className="text-lg tracking-tight">ShopZone</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${pathname === l.href ? "bg-accent text-accent-foreground" : "text-foreground/70"
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search (only on home/products) */}
        {setSearch ? (
          <div className="ml-2 hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search || ""}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-9"
                aria-label="Search products"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isCustomer && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => router.push("/cart")}
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]"
                  variant="default"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          )}

          {!isAuthenticated ? (
            <div className="ml-2 flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button size="sm" onClick={() => router.push("/register")}>
                Sign up
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 gap-2 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.profile_picture || undefined} alt={user?.username} />
                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm sm:inline">{user?.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span>{user?.get_full_name || user?.username}</span>
                  <span className="text-xs font-normal text-muted-foreground capitalize">
                    {user?.role?.replace("_", " ")}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                {user?.role === "customer" && (
                  <DropdownMenuItem onClick={() => router.push("/orders")}>
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                )}
                {user?.role === "store_owner" && (
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                )}
                {user?.role === "admin" && (
                  <DropdownMenuItem onClick={() => router.push("/admin")}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
