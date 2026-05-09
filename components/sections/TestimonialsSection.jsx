import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Amelia T.",
    role: "Verified buyer",
    quote: "Fast delivery and the product quality was exactly as described. Smooth checkout!",
  },
  {
    name: "Jordan P.",
    role: "Store owner",
    quote: "ShopZone makes it easy to manage orders and build trust with customers.",
  },
  {
    name: "Priya S.",
    role: "Frequent shopper",
    quote: "Great prices and a clean experience. I keep coming back for the new drops.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5">
        <span className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-rose-300 to-pink-300 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
          Community love
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">Loved by shoppers</h2>
        <p className="text-sm text-muted-foreground">Real feedback from the ShopZone community.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="border-border/70 bg-card/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="space-y-3 p-4">
              <div className="text-3xl text-primary/40">“</div>
              <p className="-mt-2 text-sm text-muted-foreground leading-relaxed">{t.quote}</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
