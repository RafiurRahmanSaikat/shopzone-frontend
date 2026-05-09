const faqs = [
  {
    q: "How do I track my order?",
    a: "Open your profile and visit Orders to see live tracking details for each shipment.",
  },
  {
    q: "Can I return an item?",
    a: "Yes. Eligible items can be returned within 7 days. Start a return from your order page.",
  },
  {
    q: "How do seller payouts work?",
    a: "Sellers are paid weekly after delivery is confirmed and the return window closes.",
  },
  {
    q: "Is my payment information secure?",
    a: "All payments are encrypted and processed through PCI-compliant providers.",
  },
]

export default function FAQ() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5">
        <span className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-emerald-300 to-lime-300 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
          Quick answers
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <p className="text-sm text-muted-foreground">Quick answers to the most common questions.</p>
      </div>
      <div className="grid gap-3">
        {faqs.map((item) => (
          <div
            key={item.q}
            className="rounded-xl border border-border/60 bg-card px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="mb-2 inline-flex h-1 w-10 rounded-full bg-gradient-to-r from-emerald-300 to-lime-300" />
            <p className="text-sm font-semibold">{item.q}</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
