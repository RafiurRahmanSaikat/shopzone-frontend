"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function DashboardSidebar({ items }) {
  const pathname = usePathname()
  return (
    <aside className="hidden w-56 flex-shrink-0 border-r border-border bg-card/30 md:block">
      <nav className="sticky top-16 flex flex-col gap-1 p-3">
        {items.map((it) => {
          const active = pathname === it.href || (it.href !== "/dashboard" && pathname.startsWith(it.href))
          const Icon = it.icon
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-accent",
              )}
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              {it.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
