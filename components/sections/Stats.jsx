const stats = [
  { label: "Active shoppers", value: "180k+" },
  { label: "Orders shipped", value: "1.2M" },
  { label: "Trusted stores", value: "4,800+" },
  { label: "Avg. rating", value: "4.8/5" },
]

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8 shadow-sm dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <p className="text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
